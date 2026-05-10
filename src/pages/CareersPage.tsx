import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Star, MapPin, Clock, Users, Send, Upload, X, CheckCircle } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { ApplicationModal } from '../components/ApplicationModal';

const CareersPage: React.FC = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<'positions' | 'talent'>('positions');
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<string>('');
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  
  // Talent submission form state
  const [talentForm, setTalentForm] = useState({
    vision: '',
    fullName: '',
    email: '',
    phone: '',
    portfolio: null as File | null
  });
  const [isSubmittingTalent, setIsSubmittingTalent] = useState(false);
  const [showTalentSuccess, setShowTalentSuccess] = useState(false);

  const positions = [
    {
      title: "Senior Full-Stack Developer",
      department: "Engineering",
      location: "Remote / Hybrid",
      type: "Full-time",
      description: "Join our engineering team to build cutting-edge web applications using modern technologies.",
      requirements: [
        "5+ years of experience with React, Node.js, and TypeScript",
        "Experience with cloud platforms (AWS, GCP, or Azure)",
        "Strong understanding of database design and optimization",
        "Experience with CI/CD pipelines and DevOps practices"
      ],
      responsibilities: [
        "Develop and maintain scalable web applications",
        "Collaborate with cross-functional teams on product features",
        "Mentor junior developers and conduct code reviews",
        "Contribute to technical architecture decisions"
      ]
    },
    {
      title: "UI/UX Designer",
      department: "Design",
      location: "Remote / On-site",
      type: "Full-time",
      description: "Create beautiful, intuitive user experiences that delight our customers and drive business growth.",
      requirements: [
        "3+ years of experience in UI/UX design",
        "Proficiency in Figma, Sketch, or similar design tools",
        "Strong portfolio showcasing web and mobile designs",
        "Understanding of design systems and accessibility principles"
      ],
      responsibilities: [
        "Design user interfaces for web and mobile applications",
        "Conduct user research and usability testing",
        "Create and maintain design systems",
        "Collaborate with developers to ensure design implementation"
      ]
    },
    {
      title: "Digital Marketing Specialist",
      department: "Marketing",
      location: "Remote / Hybrid",
      type: "Full-time",
      description: "Drive our digital marketing efforts and help us reach new audiences through innovative campaigns.",
      requirements: [
        "2+ years of experience in digital marketing",
        "Experience with Google Ads, Facebook Ads, and SEO",
        "Strong analytical skills and data-driven mindset",
        "Excellent written and verbal communication skills"
      ],
      responsibilities: [
        "Develop and execute digital marketing campaigns",
        "Manage social media presence and content strategy",
        "Analyze campaign performance and optimize for ROI",
        "Collaborate with design team on marketing materials"
      ]
    },
    {
      title: "Product Manager",
      department: "Product",
      location: "Hybrid / On-site",
      type: "Full-time",
      description: "Lead product strategy and work with engineering teams to deliver exceptional user experiences.",
      requirements: [
        "3+ years of product management experience",
        "Experience with agile development methodologies",
        "Strong analytical and problem-solving skills",
        "Excellent communication and leadership abilities"
      ],
      responsibilities: [
        "Define product roadmap and strategy",
        "Work with engineering teams to deliver features",
        "Conduct market research and competitive analysis",
        "Gather and prioritize customer feedback"
      ]
    },
    {
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Remote / Hybrid",
      type: "Full-time",
      description: "Build and maintain our infrastructure to ensure scalable, reliable, and secure systems.",
      requirements: [
        "4+ years of experience in DevOps or infrastructure",
        "Experience with Docker, Kubernetes, and cloud platforms",
        "Knowledge of CI/CD pipelines and automation tools",
        "Strong scripting skills (Python, Bash, or similar)"
      ],
      responsibilities: [
        "Manage cloud infrastructure and deployment pipelines",
        "Implement monitoring and alerting systems",
        "Ensure security best practices across all systems",
        "Collaborate with development teams on infrastructure needs"
      ]
    }
  ];

  const handleApplyClick = (position: string) => {
    setSelectedPosition(position);
    setIsApplicationModalOpen(true);
  };

  const handleTalentFormChange = (field: string, value: string | File | null) => {
    setTalentForm(prev => ({
      ...prev,
      [field]: value
    }));
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
      
      if (talentForm.portfolio) {
        formData.append('portfolio', talentForm.portfolio);
      }

      const response = await fetch('http://localhost:3001/apply', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setShowTalentSuccess(true);
        setTalentForm({
          vision: '',
          fullName: '',
          email: '',
          phone: '',
          portfolio: null
        });
        setTimeout(() => setShowTalentSuccess(false), 3000);
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('Error submitting talent form:', error);
      alert('There was an error submitting your application. Please try again.');
    } finally {
      setIsSubmittingTalent(false);
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#0A0B14]' : 'bg-gray-50'} transition-colors duration-300`}>
      {/* Hero Section */}
      <div className={`${theme === 'dark' ? 'bg-gradient-to-br from-[#0D0B1F] to-[#0A0B14]' : 'bg-gradient-to-br from-blue-50 to-indigo-100'} py-20`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-5xl md:text-6xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
          >
            Join Our Team
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}
          >
            Build the future of web development with us. We're looking for passionate individuals who want to make a difference.
          </motion.p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center mb-12">
          <div className={`flex rounded-lg p-1 ${theme === 'dark' ? 'bg-[#0D0B1F]' : 'bg-white'} shadow-lg`}>
            <button
              onClick={() => setActiveTab('positions')}
              className={`flex items-center px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                activeTab === 'positions'
                  ? theme === 'dark'
                    ? 'bg-[#00F5FF] text-black shadow-lg'
                    : 'bg-blue-500 text-white shadow-lg'
                  : theme === 'dark'
                    ? 'text-gray-300 hover:text-white hover:bg-[#00F5FF]/10'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Briefcase className="w-5 h-5 mr-2" />
              Open Positions
            </button>
            <button
              onClick={() => setActiveTab('talent')}
              className={`flex items-center px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                activeTab === 'talent'
                  ? theme === 'dark'
                    ? 'bg-[#00F5FF] text-black shadow-lg'
                    : 'bg-blue-500 text-white shadow-lg'
                  : theme === 'dark'
                    ? 'text-gray-300 hover:text-white hover:bg-[#00F5FF]/10'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Star className="w-5 h-5 mr-2" />
              Talent Submissions
            </button>
          </div>
        </div>

        {/* Open Positions Section */}
        {activeTab === 'positions' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {positions.map((position, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`${theme === 'dark' ? 'bg-[#0D0B1F] border-[#00F5FF]/20' : 'bg-white border-gray-200'} border rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer`}
                onClick={() => setExpandedCard(expandedCard === index ? null : index)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {position.title}
                    </h3>
                    <div className="flex flex-wrap gap-4 mb-4">
                      <div className="flex items-center">
                        <Users className={`w-4 h-4 mr-2 ${theme === 'dark' ? 'text-[#00F5FF]' : 'text-blue-500'}`} />
                        <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                          {position.department}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className={`w-4 h-4 mr-2 ${theme === 'dark' ? 'text-[#00F5FF]' : 'text-blue-500'}`} />
                        <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                          {position.location}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Clock className={`w-4 h-4 mr-2 ${theme === 'dark' ? 'text-[#00F5FF]' : 'text-blue-500'}`} />
                        <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                          {position.type}
                        </span>
                      </div>
                    </div>
                    <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                      {position.description}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleApplyClick(position.title);
                    }}
                    className={`ml-6 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                      theme === 'dark'
                        ? 'bg-[#00F5FF] text-black hover:bg-[#00F5FF]/90 hover:shadow-lg hover:shadow-[#00F5FF]/25'
                        : 'bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg'
                    }`}
                  >
                    Apply Now
                  </button>
                </div>

                {/* Expanded Content */}
                {expandedCard === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700"
                  >
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className={`text-lg font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          Requirements
                        </h4>
                        <ul className="space-y-2">
                          {position.requirements.map((req, reqIndex) => (
                            <li key={reqIndex} className={`flex items-start ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                              <div className={`w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0 ${theme === 'dark' ? 'bg-[#00F5FF]' : 'bg-blue-500'}`} />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className={`text-lg font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          Responsibilities
                        </h4>
                        <ul className="space-y-2">
                          {position.responsibilities.map((resp, respIndex) => (
                            <li key={respIndex} className={`flex items-start ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                              <div className={`w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0 ${theme === 'dark' ? 'bg-[#00F5FF]' : 'bg-blue-500'}`} />
                              {resp}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Talent Submissions Section */}
        {activeTab === 'talent' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className={`${theme === 'dark' ? 'bg-[#0D0B1F]' : 'bg-white'} rounded-xl p-8 shadow-lg`}>
              <div className="text-center mb-8">
                <Star className={`w-16 h-16 mx-auto mb-4 ${theme === 'dark' ? 'text-[#00F5FF]' : 'text-blue-500'}`} />
                <h2 className={`text-3xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Can't find your role? Show us what you've got.
                </h2>
                <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
                  Tell us how you can bring value to WebHub — whether it's creativity, strategy, or tech innovation. 
                  We're always open to future leaders and creators.
                </p>
              </div>

              <form onSubmit={handleTalentSubmit} className="space-y-6">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
                    Your Vision for WebHub *
                  </label>
                  <textarea
                    required
                    value={talentForm.vision}
                    onChange={(e) => handleTalentFormChange('vision', e.target.value)}
                    placeholder="I can help WebHub grow by creating short-form viral videos, automating design workflows, or bringing influencer partnerships..."
                    rows={4}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 ${
                      theme === 'dark'
                        ? 'bg-[#0A0B14] border-[#00F5FF]/30 text-white placeholder-gray-400 focus:border-[#00F5FF] focus:ring-2 focus:ring-[#00F5FF]/20'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                    }`}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={talentForm.fullName}
                      onChange={(e) => handleTalentFormChange('fullName', e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 ${
                        theme === 'dark'
                          ? 'bg-[#0A0B14] border-[#00F5FF]/30 text-white placeholder-gray-400 focus:border-[#00F5FF] focus:ring-2 focus:ring-[#00F5FF]/20'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={talentForm.email}
                      onChange={(e) => handleTalentFormChange('email', e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 ${
                        theme === 'dark'
                          ? 'bg-[#0A0B14] border-[#00F5FF]/30 text-white placeholder-gray-400 focus:border-[#00F5FF] focus:ring-2 focus:ring-[#00F5FF]/20'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={talentForm.phone}
                    onChange={(e) => handleTalentFormChange('phone', e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 ${
                      theme === 'dark'
                        ? 'bg-[#0A0B14] border-[#00F5FF]/30 text-white placeholder-gray-400 focus:border-[#00F5FF] focus:ring-2 focus:ring-[#00F5FF]/20'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
                    Upload Portfolio
                  </label>
                  <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-200 ${
                    theme === 'dark'
                      ? 'border-[#00F5FF]/30 hover:border-[#00F5FF]/50'
                      : 'border-gray-300 hover:border-blue-400'
                  }`}>
                    <Upload className={`w-8 h-8 mx-auto mb-2 ${theme === 'dark' ? 'text-[#00F5FF]' : 'text-blue-500'}`} />
                    <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
                      Upload your portfolio (PDF, ZIP, DOC, DOCX)
                    </p>
                    <input
                      type="file"
                      accept=".pdf,.zip,.doc,.docx"
                      onChange={(e) => handleTalentFormChange('portfolio', e.target.files?.[0] || null)}
                      className="hidden"
                      id="portfolio-upload"
                    />
                    <label
                      htmlFor="portfolio-upload"
                      className={`inline-block px-4 py-2 rounded-lg cursor-pointer transition-colors duration-200 ${
                        theme === 'dark'
                          ? 'bg-[#00F5FF]/10 text-[#00F5FF] hover:bg-[#00F5FF]/20'
                          : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                      }`}
                    >
                      Choose File
                    </label>
                    {talentForm.portfolio && (
                      <p className={`mt-2 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        Selected: {talentForm.portfolio.name}
                      </p>
                    )}
                  </div>
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmittingTalent}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center ${
                    theme === 'dark'
                      ? 'bg-[#00F5FF] text-black hover:bg-[#00F5FF]/90 hover:shadow-lg hover:shadow-[#00F5FF]/25'
                      : 'bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg'
                  } ${isSubmittingTalent ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isSubmittingTalent ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current mr-2" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Submit Your Talent
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        )}
      </div>

      {/* Why Work at WebHub Section */}
      <div className={`py-20 ${theme === 'dark' ? 'bg-[#0D0B1F]' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Why Work at WebHub?
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              We're not just building websites – we're crafting digital experiences that transform businesses and delight users.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="w-8 h-8" />,
                title: "Collaborative Culture",
                description: "Work with talented individuals who share your passion for innovation and excellence."
              },
              {
                icon: <Star className="w-8 h-8" />,
                title: "Growth Opportunities",
                description: "Continuous learning, skill development, and career advancement in a fast-growing company."
              },
              {
                icon: <MapPin className="w-8 h-8" />,
                title: "Flexible Work",
                description: "Remote-first culture with flexible hours and work-life balance that works for you."
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`text-center p-6 rounded-xl ${theme === 'dark' ? 'bg-[#0A0B14]' : 'bg-gray-50'}`}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                  theme === 'dark' ? 'bg-[#00F5FF]/10 text-[#00F5FF]' : 'bg-blue-100 text-blue-600'
                }`}>
                  {benefit.icon}
                </div>
                <h3 className={`text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {benefit.title}
                </h3>
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className={`py-20 ${theme === 'dark' ? 'bg-gradient-to-r from-[#0A0B14] to-[#0D0B1F]' : 'bg-gradient-to-r from-blue-50 to-indigo-100'}`}>
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className={`text-4xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Ready to Join Our Team?
          </h2>
          <p className={`text-xl mb-8 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Whether you're looking for a specific role or want to show us your unique talents, we'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setActiveTab('positions')}
              className={`px-8 py-4 rounded-lg font-medium transition-all duration-200 ${
                theme === 'dark'
                  ? 'bg-[#00F5FF] text-black hover:bg-[#00F5FF]/90 hover:shadow-lg hover:shadow-[#00F5FF]/25'
                  : 'bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg'
              }`}
            >
              View Open Positions
            </button>
            <button
              onClick={() => setActiveTab('talent')}
              className={`px-8 py-4 rounded-lg font-medium transition-all duration-200 ${
                theme === 'dark'
                  ? 'border-2 border-[#00F5FF] text-[#00F5FF] hover:bg-[#00F5FF]/10'
                  : 'border-2 border-blue-500 text-blue-500 hover:bg-blue-50'
              }`}
            >
              Submit Your Talent
            </button>
          </div>
        </div>
      </div>

      {/* Application Modal */}
      <ApplicationModal
        isOpen={isApplicationModalOpen}
        onClose={() => setIsApplicationModalOpen(false)}
        position={selectedPosition}
      />

      {/* Talent Success Modal */}
      {showTalentSuccess && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className={`${theme === 'dark' ? 'bg-[#0D0B1F]' : 'bg-white'} rounded-xl p-8 max-w-md w-full text-center shadow-2xl`}
          >
            <CheckCircle className={`w-16 h-16 mx-auto mb-4 ${theme === 'dark' ? 'text-[#00F5FF]' : 'text-green-500'}`} />
            <h3 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Thanks for sharing your talent!
            </h3>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
              If there's a match, you'll hear from us soon.
            </p>
            <button
              onClick={() => setShowTalentSuccess(false)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                theme === 'dark'
                  ? 'bg-[#00F5FF] text-black hover:bg-[#00F5FF]/90'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default CareersPage;