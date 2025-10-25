import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ServiceRowProps {
  title: string;
  description: string;
  features: string[];
  Icon: LucideIcon;
}

function ServiceRow({ title, description, features, Icon }: ServiceRowProps) {
  return (
    <tr className="border-b border-gray-800 hover:bg-[#111] transition-colors group">
      <td className="py-6 pl-6">
        <div className="flex items-center gap-3">
          <Icon className="w-6 h-6 text-blue-500 group-hover:scale-110 transition-transform" />
          <span className="font-semibold text-white">{title}</span>
        </div>
      </td>
      <td className="py-6 px-4 text-gray-400">{description}</td>
      <td className="py-6 pr-6">
        <ul className="space-y-1">
          {features.map((feature, index) => (
            <li key={index} className="text-gray-300 text-sm flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
              {feature}
            </li>
          ))}
        </ul>
      </td>
    </tr>
  );
}

export function ServicesTable({ services }: { services: ServiceRowProps[] }) {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-gray-800">
      <table className="w-full min-w-[768px]">
        <thead className="bg-[#111]">
          <tr>
            <th className="py-4 pl-6 text-left text-sm font-semibold text-gray-300 w-[200px]">Service</th>
            <th className="py-4 px-4 text-left text-sm font-semibold text-gray-300 w-[250px]">Description</th>
            <th className="py-4 pr-6 text-left text-sm font-semibold text-gray-300">Features</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service, index) => (
            <ServiceRow key={index} {...service} />
          ))}
        </tbody>
      </table>
    </div>
  );
}