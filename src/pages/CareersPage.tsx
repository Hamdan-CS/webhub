import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Star, MapPin, Clock, Users, Send, Upload, CheckCircle } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { ApplicationModal } from '../components/ApplicationModal';

const CareersPage: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState<'positions' | 'talent'>('positions');
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<string>('');
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const [talentForm, setTalentForm] = useState({
    vision: '', fullName: '', email: '', phone: '',
    portfolio: null as File | null
  });
  const [isSubmittingTalent, setIsSubmittingTalent] = useState(false);
  const [showTalentSuccess, setShowTalentSuccess] = useState(false);

  const positions = [
    { title: "Senior Full-Stack Developer", department: "Engineering", location: "Remote / Hybrid", type: "Full-time",
      description: "Join our engineering team to build cutting-edge web applications using modern technologies.",
      requirements: ["5+ years of experience with React, Node.js, and TypeScript", "Experience with cloud platforms (AWS, GCP, or Azure)", "Strong understanding of database design and optimization", "Experience with CI/CD pipelines and DevOps practices"],
      responsibilities: ["Develop and maintain scalable web applications", "Collaborate with cross-functional teams on product features", "Mentor junior developers and conduct code reviews", "Contribute to technical architecture decisions"] },
    { title: "UI/UX Designer", department: "Design", location: "Remote / On-site", type: "Full-time",
      description: "Create beautiful, intuitive user experiences that delight our customers and drive business growth.",
      requirements: ["3+ years of experience in UI/UX design", "Proficiency in Figma, Sketch, or similar design tools", "Strong portfolio showcasing web and mobile designs", "Understanding of design systems and accessibility principles"],
      responsibilities: ["Design user interfaces for web and mobile applications", "Conduct user research and usability testing", "Create and maintain design systems", "Collaborate with developers to ensure design implementation"] },
    { title: "Digital Marketing Specialist", department: "Marketing", location: "Remote / Hybrid", type: "Full-time",
      description: "Drive our digital marketing efforts and help us reach new audiences through innovative campaigns.",
      requirements: ["2+ years of experience in digital marketing", "Experience with Google Ads, Facebook Ads, and SEO", "Strong analytical skills and data-driven mindset", "Excellent written and verbal communication skills"],
      responsibilities: ["Develop and execute digital marketing campaigns", "Manage social media presence and content strategy", "Analyze campaign performance and optimize for ROI", "Collaborate with design team on marketing materials"] },
    { title: "Product Manager", department: "Product", location: "Hybrid / On-site", type: "Full-time",
      description: "Lead product strategy and work with engineering teams to deliver exceptional user experiences.",
      requirements: ["3+ years of product management experience", "Experience with agile development methodologies", "Strong analytical and problem-solving skills", "Excellent communication and leadership abilities"],
      responsibilities: ["Define product roadmap and strategy", "Work with engineering teams to deliver features", "Conduct market research and competitive analysis", "Gather and prioritize customer feedback"] },
    { title: "DevOps Engineer", department: "Engineering", location: "Remote / Hybrid", type: "Full-time",
      description: "Build and maintain our infrastructure to ensure scalable, reliable, and secure systems.",
      requirements: ["4+ years of experience in DevOps or infrastructure", "Experience with Docker, Kubernetes, and cloud platforms", "Knowledge of CI/CD pipelines and automation tools", "Strong scripting skills (Python, Bash, or similar)"],
      responsibilities: ["Manage cloud infrastructure and deployment pipelines", "Implement monitoring and alerting systems", "Ensure security best practices across all systems", "Collaborate with development teams on infrastructure needs"] },
  ];

  const handleApplyClick = (position: string) => { setSelectedPosition(position); setIsApplicationModalOpen(true); };

  const handleTalentFormChange = (field: string, value: string | File | null) => {
    setTalentForm(prev => ({ ...prev, [field]: value }));
  };

  const handleTalentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingTalent(true);
    try {
      const formData = new FormData();
      formData.append('vision', talentForm.vision);
      formData.append('fullName', talentForm.fullName);
      formData.append('email', talentForm.email);
      formData.append('phone', talentForm.phone);
      formData.append('submissionType', 'talent');
      if (talentForm.portfolio) formData.append('portfolio', talentForm.portfolio);

      const response = await fetch('http://localhost:3001/apply', { method: 'POST', body: formData });
      if (response.ok) {
        setShowTalentSuccess(true);
        setTalentForm({ vision: '', fullName: '', email: '', phone: '', portfolio: null });
        setTimeout(() => setShowTalentSuccess(false), 3000);
      } else { throw new Error('Submission failed'); }
    } catch (error) {
      console.error('Error submitting talent form:', error);
      alert('There was an error submitting your application. Please try again.');
    } finally { setIsSubmittingTalent(false); }
  };

  const inputClass = isDarkMode
    ? 'w-full px-4 py-3 rounded-xl bg-[var(--color-bg)] border text-[var(--color-text)] focus:ring-2 transition-all'
    : 'w-full px-4 py-3 rounded-xl bg-[var(--color-bg-elevated)] border text-[var(--color-text)] focus:ring-2 transition-all';
  const inputStyle = { borderColor: 'var(--color-border-strong)' };

  return (
    <div className="min-h-screen transition-colors duration-400">
      {/* Hero */}
      <div className="pt-24 pb-12 mesh-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display text-5xl md:text-6xl font-bold mb-6 tracking-tight text-[var(--color-text)]">
            Join Our Team
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-[var(--color-text-secondary)]">
            Build the future of web development with us. We're looking for passionate individuals who want to make a difference.
          </motion.p>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center mb-12">
          <div className="flex rounded-xl p-1 glass-card">
            <button onClick={() => setActiveTab('positions')} className="flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-200" style={{ background: activeTab === 'positions' ? 'linear-gradient(135deg, var(--color-accent), var(--color-accent-2))' : 'transparent', color: activeTab === 'positions' ? 'white' : 'var(--color-text-secondary)' }}>
              <Briefcase className="w-5 h-5 mr-2" />Open Positions
            </button>
            <button onClick={() => setActiveTab('talent')} className="flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-200" style={{ background: activeTab === 'talent' ? 'linear-gradient(135deg, var(--color-accent), var(--color-accent-2))' : 'transparent', color: activeTab === 'talent' ? 'white' : 'var(--color-text-secondary)' }}>
              <Star className="w-5 h-5 mr-2" />Talent Submissions
            </button>
          </div>
        </div>

        {/* Open Positions */}
        {activeTab === 'positions' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {positions.map((position, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="glass-card p-6 cursor-pointer hover:shadow-elevated transition-all duration-300" onClick={() => setExpandedCard(expandedCard === index ? null : index)}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2 text-[var(--color-text)]">{position.title}</h3>
                    <div className="flex flex-wrap gap-4 mb-4">
                      <div className="flex items-center"><Users className="w-4 h-4 mr-2 accent-text" /><span className="text-sm text-[var(--color-text-secondary)]">{position.department}</span></div>
                      <div className="flex items-center"><MapPin className="w-4 h-4 mr-2 accent-text" /><span className="text-sm text-[var(--color-text-secondary)]">{position.location}</span></div>
                      <div className="flex items-center"><Clock className="w-4 h-4 mr-2 accent-text" /><span className="text-sm text-[var(--color-text-secondary)]">{position.type}</span></div>
                    </div>
                    <p className="text-[var(--color-text-secondary)] mb-4">{position.description}</p>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); handleApplyClick(position.title); }} className="btn-accent ml-6 px-6 py-3 rounded-xl font-medium whitespace-nowrap">Apply Now</button>
                </div>
                {expandedCard === index && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-6 pt-6 border-t" style={{ borderColor: 'var(--color-border)' }}>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-lg font-semibold mb-3 text-[var(--color-text)]">Requirements</h4>
                        <ul className="space-y-2">{position.requirements.map((req, i) => <li key={i} className="flex items-start text-[var(--color-text-secondary)]"><div className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0" style={{ background: 'var(--color-accent)' }} />{req}</li>)}</ul>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold mb-3 text-[var(--color-text)]">Responsibilities</h4>
                        <ul className="space-y-2">{position.responsibilities.map((resp, i) => <li key={i} className="flex items-start text-[var(--color-text-secondary)]"><div className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0" style={{ background: 'var(--color-accent)' }} />{resp}</li>)}</ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Talent Submissions */}
        {activeTab === 'talent' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
            <div className="glass-card p-8">
              <div className="text-center mb-8">
                <Star className="w-16 h-16 mx-auto mb-4 accent-text" />
                <h2 className="font-display text-3xl font-bold mb-4 text-[var(--color-text)]">Can't find your role? Show us what you've got.</h2>
                <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">Tell us how you can bring value to WebHub — whether it's creativity, strategy, or tech innovation. We're always open to future leaders and creators.</p>
              </div>
              <form onSubmit={handleTalentSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-[var(--color-text)]">Your Vision for WebHub *</label>
                  <textarea required value={talentForm.vision} onChange={(e) => handleTalentFormChange('vision', e.target.value)} placeholder="I can help WebHub grow by creating short-form viral videos, automating design workflows, or bringing influencer partnerships..." rows={4} className={`${inputClass} resize-none`} style={inputStyle} />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-[var(--color-text)]">Full Name *</label>
                    <input type="text" required value={talentForm.fullName} onChange={(e) => handleTalentFormChange('fullName', e.target.value)} className={inputClass} style={inputStyle} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-[var(--color-text)]">Email *</label>
                    <input type="email" required value={talentForm.email} onChange={(e) => handleTalentFormChange('email', e.target.value)} className={inputClass} style={inputStyle} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-[var(--color-text)]">Phone Number</label>
                  <input type="tel" value={talentForm.phone} onChange={(e) => handleTalentFormChange('phone', e.target.value)} className={inputClass} style={inputStyle} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-[var(--color-text)]">Upload Portfolio</label>
                  <div className="border-2 border-dashed rounded-xl p-6 text-center transition-colors duration-200" style={{ borderColor: 'var(--color-border-strong)', background: 'var(--color-bg-elevated)' }}>
                    <Upload className="w-8 h-8 mx-auto mb-2 accent-text" />
                    <p className="text-[var(--color-text-secondary)] mb-2">Upload your portfolio (PDF, ZIP, DOC, DOCX)</p>
                    <input type="file" accept=".pdf,.zip,.doc,.docx" onChange={(e) => handleTalentFormChange('portfolio', e.target.files?.[0] || null)} className="hidden" id="portfolio-upload" />
                    <label htmlFor="portfolio-upload" className="btn-outline inline-block px-4 py-2 rounded-lg cursor-pointer">Choose File</label>
                    {talentForm.portfolio && <p className="mt-2 text-sm text-[var(--color-text-secondary)]">Selected: {talentForm.portfolio.name}</p>}
                  </div>
                </div>
                <motion.button type="submit" disabled={isSubmittingTalent} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} className={`btn-accent w-full py-4 rounded-xl font-medium transition-all duration-200 flex items-center justify-center ${isSubmittingTalent ? 'opacity-50 cursor-not-allowed' : ''}`}>
                  {isSubmittingTalent ? <><div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current mr-2" />Submitting...</> : <><Send className="w-5 h-5 mr-2" />Submit Your Talent</>}
                </motion.button>
              </form>
            </div>
          </motion.div>
        )}
      </div>

      {/* Why Work at WebHub */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold mb-6 text-[var(--color-text)]">Why Work at WebHub?</h2>
            <p className="text-xl max-w-3xl mx-auto text-[var(--color-text-secondary)]">We're not just building websites – we're crafting digital experiences that transform businesses and delight users.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Users className="w-8 h-8" />, title: "Collaborative Culture", description: "Work with talented individuals who share your passion for innovation and excellence." },
              { icon: <Star className="w-8 h-8" />, title: "Growth Opportunities", description: "Continuous learning, skill development, and career advancement in a fast-growing company." },
              { icon: <MapPin className="w-8 h-8" />, title: "Flexible Work", description: "Remote-first culture with flexible hours and work-life balance that works for you." },
            ].map((benefit, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} viewport={{ once: true }} className="text-center p-6 glass-card">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ background: 'color-mix(in srgb, var(--color-accent) 12%, transparent)', color: 'var(--color-accent-light)' }}>{benefit.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-[var(--color-text)]">{benefit.title}</h3>
                <p className="text-[var(--color-text-secondary)]">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-20 mesh-bg">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="font-display text-4xl font-bold mb-6 text-[var(--color-text)]">Ready to Join Our Team?</h2>
          <p className="text-xl mb-8 text-[var(--color-text-secondary)]">Whether you're looking for a specific role or want to show us your unique talents, we'd love to hear from you.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => setActiveTab('positions')} className="btn-accent px-8 py-4 rounded-xl font-medium">View Open Positions</button>
            <button onClick={() => setActiveTab('talent')} className="btn-outline px-8 py-4 rounded-xl font-medium">Submit Your Talent</button>
          </div>
        </div>
      </div>

      <ApplicationModal isOpen={isApplicationModalOpen} onClose={() => setIsApplicationModalOpen(false)} position={selectedPosition} />

      {showTalentSuccess && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass-card p-8 max-w-md w-full text-center">
            <CheckCircle className="w-16 h-16 mx-auto mb-4 accent-text" />
            <h3 className="font-display text-2xl font-bold mb-4 text-[var(--color-text)]">Thanks for sharing your talent!</h3>
            <p className="text-[var(--color-text-secondary)] mb-6">If there's a match, you'll hear from us soon.</p>
            <button onClick={() => setShowTalentSuccess(false)} className="btn-accent px-6 py-3 rounded-xl font-medium">Close</button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default CareersPage;
