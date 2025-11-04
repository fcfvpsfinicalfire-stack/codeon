
export interface Feature {
  iconClass: string;
  title: string;
  description: string;
}

export interface HostingPlan {
  name: string;
  price: string;
  period: string;
  features: string[];
  isPopular: boolean;
  game?: 'ark' | 'minecraft';
}
