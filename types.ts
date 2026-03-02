import { LucideIcon } from 'lucide-react';

export interface CalculatorRoute {
  id: string;
  title: string;
  category: 'loan' | 'investment' | 'tax' | 'personal' | 'banking';
  path: string;
  icon: LucideIcon;
  description: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  provider: string;
  type: 'credit_card' | 'loan' | 'investment' | 'insurance' | 'banking' | 'demat';
  image: string;
  features: string[];
  rating: number;
  applyLink: string;
  interest?: string;
  fees?: string;
  tag?: string;
}

export interface SEOContentData {
  title: string;
  metaDescription: string;
  content: {
    heading: string;
    body: string; // HTML string allowed for richness
    keyTakeaways: string[];
    faq: { question: string; answer: string }[];
  };
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // HTML content
  category: 'Loans' | 'Investments' | 'Tax' | 'Credit Cards' | 'General';
  author: string;
  date: string;
  image: string;
  readTime: string;
  relatedToolLink?: string; // Link to a calculator
  relatedToolName?: string;
  relatedProductLink?: string; // Link to marketplace
}