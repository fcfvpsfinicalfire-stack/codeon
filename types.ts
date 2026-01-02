
export interface Plan {
  id: string;
  ram: number;
  cores: number;
  disk: number;
  price: number;
  category: HostingCategory;
  cpu?: string; // Specific for Dedicated
  isRecommended?: boolean;
}

export type HostingCategory = 'MINECRAFT' | 'ARK' | 'VPS' | 'V2RAY' | 'CLOUD' | 'DEDICATED' | 'RUST' | 'MTA' | 'NODEJS';

export type BillingCycle = 'MONTHLY' | 'QUARTERLY' | 'ANNUALLY';

export interface Partner {
  name: string;
  type: string;
  url: string;
  img?: string;
}

export interface OrderDetails {
  planId: string;
  serverName: string;
  description: string;
  email: string;
  discordUser: string;
  location: string;
  currency: 'LKR' | 'EUR';
}

export interface SiteNotification {
  id: string;
  message: string;
  timestamp: number;
  type: 'order' | 'info';
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: string;
  color: string;
}
