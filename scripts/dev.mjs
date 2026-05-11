import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDir, '..');
const serverDir = path.join(projectRoot, 'server');

const processes = [
  spawn('npm', ['run', 'dev'], {
    cwd: serverDir,
    stdio: 'inherit',
    shell: true,
  }),
  spawn('npm', ['run', 'dev'], {
    cwd: projectRoot,
    stdio: 'inherit',
    shell: true,
  }),
];

const shutdown = () => {
  for (const childProcess of processes) {
    if (!childProcess.killed) {
      childProcess.kill('SIGINT');
    }
  }
  process.exit(0);
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

for (const childProcess of processes) {
  childProcess.on('exit', (code) => {
    if (code && code !== 0) {
      shutdown();
    }
  });
}