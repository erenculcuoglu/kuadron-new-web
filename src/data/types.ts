export type Locale = 'tr' | 'en';

export interface ProjectItem {
  id: string;
  client: string;
  title: string;
  description: string;
  features: string[];
  image: string;
  homeImage?: string;
  url: string;
  ctaLabel: string;
  featuredOnHome?: boolean;
  categoryBadge: string;
}

export interface ProductItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  visual?: 'ozbi-flow';
  featuredOnHome?: boolean;
  isNew?: boolean;
  url?: string;
  ctaLabel?: string;
  statusBadge: string;
}

export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  avatar: string;
}

export interface FeaturedNewsCard {
  title: string;
  excerpt: string;
  image: string;
  url: string;
  source: string;
  ctaLabel: string;
}

export interface WorkflowStep {
  number: string;
  title: string;
  description: string;
}

