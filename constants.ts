
import { Plan, FAQItem, Feature, Partner } from './types';

export const LKR_TO_EUR = 0.0031; 
export const DISCOUNT_PERCENT = 26;
export const NEW_YEAR_COUPON = "CODEON2026";

export const GAMES = ["Minecraft", "ARK", "Rust", "Multi Theft Auto", "NodeJS"];

export const DISCORD_CONFIG = {
  clientId: '1434212125194063942',
  clientSecret: 'kUSr9KjGjY43LaLuMXHlaCAJoSL3sdk7'
};

const RAM_OPTIONS = [1, 2, 4, 6, 8, 12, 16, 24, 32, 48, 64];
const BASE_PRICE_LKR = 350; 

export const DIRT_BLOCK_URL = "https://image2url.com/r2/default/images/1767360297993-31645f26-2dd5-4bd1-a225-1565a07e9b8b.png";

export const PLANS: Plan[] = [
  ...RAM_OPTIONS.map((ram) => ({
    id: `mc-${ram}gb`,
    ram,
    cores: ram <= 2 ? 1 : ram <= 8 ? 2 : 4,
    disk: ram * 10,
    price: ram * BASE_PRICE_LKR,
    category: 'MINECRAFT' as any,
    isRecommended: ram === 8
  })),
  { id: 'nodejs-basic', ram: 1, cores: 1, disk: 10, price: 350, category: 'NODEJS' as any, isRecommended: false },
  { id: 'nodejs-pro', ram: 3, cores: 1.5, disk: 25, price: 1050, category: 'NODEJS' as any, isRecommended: true },
  { id: 'cloud-s', ram: 4, cores: 2, disk: 100, price: 2800, category: 'CLOUD' as any },
  { id: 'cloud-m', ram: 16, cores: 4, disk: 250, price: 6500, category: 'CLOUD' as any },
  {
    id: 'dedi-ryzen7-extreme',
    ram: 64,
    cores: 16,
    disk: 1024,
    price: 48000,
    cpu: 'AMD Ryzen 7 5800X (4.7GHz)',
    category: 'DEDICATED' as any
  },
  {
    id: 'dedi-ryzen9-beast',
    ram: 128,
    cores: 32,
    disk: 2048,
    price: 92000,
    cpu: 'AMD Ryzen 9 7950X (5.7GHz)',
    category: 'DEDICATED' as any
  }
];

export const LOCATIONS = [
  { id: 'SG', name: 'Singapore, AS', flag: '🇸🇬', domain: 'sg.codeon.codes', ping: '42 ms', status: 'Best', stock: 100, datacenter: 'SGNS CODEON DATACENTER', city: 'Jurong West, Singapore' },
  { id: 'UK', name: 'London, UK', flag: '🇬🇧', domain: 'uk.codeon.codes', ping: '184 ms', status: 'Maintenance', stock: 0, datacenter: 'Equinix LD8', city: 'London' },
  { id: 'US', name: 'New York, US', flag: '🇺🇸', domain: 'us.codeon.codes', ping: '240 ms', status: 'Full', stock: 0, datacenter: 'DigitalOcean NYC3', city: 'New York City' },
  { id: 'JP', name: 'Tokyo, JP', flag: '🇯🇵', domain: 'jp.codeon.codes', ping: '95 ms', status: 'Queued', stock: 0, datacenter: 'Linode JP-02', city: 'Tokyo' }
];

export const FEATURES: Feature[] = [
  { title: 'AMD Ryzen CPUs', description: 'Experience blazing-fast performance with Ryzen 7 & 9 series processors clocked at up to 5.7GHz.', icon: '⚡', color: 'blue' },
  { title: 'NVMe SSD Storage', description: 'Low-latency disks ensure your server chunks and plugins load instantly without lag.', icon: '🚀', color: 'cyan' },
  { title: '1Tbps DDoS Shield', description: 'Stay online during the heaviest attacks with our advanced enterprise-grade filtration systems.', icon: '🛡️', color: 'purple' },
  { title: 'Singapore Premium', description: 'The lowest latency for South Asia & SE Asia, powered by high-tier bandwidth partners.', icon: '🇸🇬', color: 'green' },
  { title: 'Instant Provisioning', description: 'No waiting. Your server is deployed automatically the moment your payment is confirmed.', icon: '🕒', color: 'orange' },
  { title: 'Dedicated Support', description: 'Our team is available on Discord 24/7 to help you with modpacks, plugins, and setup.', icon: '💬', color: 'red' }
];

export const FAQS: FAQItem[] = [
  { question: "How long does it take to activate my server?", answer: "Deployment is instant for automated payments. For manual LKR bank transfers or mCash, activation takes between 5-30 minutes after you send the receipt to our Discord support." },
  { question: "Can I upgrade my RAM later?", answer: "Yes! You can upgrade or downgrade your RAM cycle at any time from your control panel without losing any of your server data." },
  { question: "Do you support Modpacks and Plugins?", answer: "Absolutely. Our Game Panel supports one-click installers for thousands of modpacks (Forge/Fabric) and all major plugin platforms." },
  { question: "Where are the servers located?", answer: "Our main hardware is located in the SGNS Datacenter in Jurong West, Singapore, offering the best route to Sri Lanka, India, and SE Asia." }
];

export const TEAM = {
  founders: [
    { name: 'MrBlaze', realName: 'Minuda Sandilu', role: 'Fullstack Developer' },
    { name: 'FinicalFire', realName: 'Sachintha Shaymal', role: 'Network Engineer' },
    { name: 'SIKK4', realName: 'Inuka Vihas', role: 'Fullstack Developer / Network Administrator' }
  ],
  members: [
    { name: 'Navindu', role: 'Head Admin' },
    { name: 'DarkShadow', role: 'Billing Manager' },
    { name: 'Jimmy', role: 'Support Agent' },
    { name: 'Akain Perera', role: 'Network Engineer / V2Ray Developer' },
    { name: 'NotzBB', role: 'Minecraft Server Developer / Minecraft Hosting Manager' },
    { name: 'HanzoFer', role: 'Support / CEO' },
    { name: 'Peheya', role: 'HR' }
  ]
};

export const PARTNERS: Partner[] = [
  { name: 'RasManer', type: 'Youtuber', url: 'https://www.youtube.com/@RasManer', img: 'https://yt3.googleusercontent.com/lDVeBdL0eKUfMSpczh9TV4Gkv5AvnzZVXy5rGx4Z4omP5ogYrNQ2OWSvp0pCrK_r-QHEWBP8ZHo=s160-c-k-c0x00ffffff-no-rj' },
  { name: 'DrMaxwave', type: 'Gaming Youtuber', url: 'https://www.youtube.com/@DRMaxWaveGaming', img: 'https://yt3.googleusercontent.com/IOg8CzTBG6fQf5EBDhrdTlx7JjC5lTapQSXmtG1CjOZ_8w3eTX7052y9Y2PmW9m-1jmJdUEu0tc=s160-c-k-c0x00ffffff-no-rj' },
  { name: 'CryingCraft', type: 'Minecraft Youtuber', url: 'https://www.youtube.com/@CryingCraftMc', img: 'https://yt3.googleusercontent.com/_62dEHdO-6MuCm8J4gjjlm-ie9hA1cSdI6g-4nl7alR6gzB5JNzjZ0aq5oOnucj1RRJYHU2jwQ=s160-c-k-c0x00ffffff-no-rj' }
];
