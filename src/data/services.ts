import { 
  Globe2, MessageSquare, Search, Shield, 
  PenTool, Calendar, Users, AlertCircle,
  Megaphone, GraduationCap
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Service {
  title: string;
  description: string;
  features: string[];
  Icon: LucideIcon;
}

export const services: Service[] = [
  {
    title: "Website Creation & Management",
    description: "Custom websites that perfectly capture your brand's essence",
    features: [
      "Custom-built responsive websites",
      "Mobile-friendly design",
      "E-commerce integration",
      "Regular maintenance and updates"
    ],
    Icon: Globe2
  },
  {
    title: "Social Media Management",
    description: "Strategic social media presence across all major platforms",
    features: [
      "Content creation and scheduling",
      "Community engagement",
      "Performance analytics",
      "Multi-platform management"
    ],
    Icon: MessageSquare
  },
  {
    title: "Search Engine Optimization",
    description: "Boost your visibility and reach your target audience",
    features: [
      "Keyword optimization",
      "Local SEO",
      "Google My Business management",
      "Performance tracking"
    ],
    Icon: Search
  },
  {
    title: "Online Reputation Management",
    description: "Build and maintain a stellar online presence",
    features: [
      "Review management",
      "Brand monitoring",
      "Response strategy",
      "Reputation building"
    ],
    Icon: Shield
  },
  {
    title: "Content Creation",
    description: "Engaging content that tells your brand's story",
    features: [
      "Professional photography",
      "Video production",
      "Blog writing",
      "Graphic design"
    ],
    Icon: PenTool
  },
  {
    title: "Event Promotion",
    description: "Maximize attendance and engagement for your events",
    features: [
      "Event strategy planning",
      "Social media promotion",
      "Email marketing campaigns",
      "Post-event content"
    ],
    Icon: Calendar
  },
  {
    title: "Influencer Marketing",
    description: "Connect with influential voices in your industry",
    features: [
      "Influencer partnerships",
      "Campaign management",
      "Performance tracking",
      "Brand alignment"
    ],
    Icon: Users
  },
  {
    title: "Crisis Management",
    description: "Professional handling of online reputation challenges",
    features: [
      "24/7 monitoring",
      "Rapid response strategy",
      "Damage control",
      "Prevention planning"
    ],
    Icon: AlertCircle
  },
  {
    title: "Promotional Design",
    description: "Eye-catching materials that drive engagement",
    features: [
      "Custom poster design",
      "Digital ad creation",
      "Sale campaign materials",
      "Brand consistency"
    ],
    Icon: Megaphone
  },
  {
    title: "Training & Support",
    description: "Empower your team with digital knowledge",
    features: [
      "Custom training sessions",
      "Ongoing support",
      "Resource materials",
      "Strategy consultation"
    ],
    Icon: GraduationCap
  }
];