export const INDUSTRIES = [
  { id: 'healthcare', label: 'Healthcare', icon: '🏥', color: '#0ea5e9', desc: 'Medical & Wellness Platform' },
  { id: 'ecommerce', label: 'E-Commerce', icon: '🛍️', color: '#f59e0b', desc: 'Online Shopping & Retail' },
  { id: 'fintech', label: 'Finance & Banking', icon: '🏦', color: '#6366f1', desc: 'Financial Services & Fintech' },
  { id: 'education', label: 'Education', icon: '🎓', color: '#10b981', desc: 'Learning Management System' },
  { id: 'realestate', label: 'Real Estate', icon: '🏠', color: '#ef4444', desc: 'Property & Real Estate Platform' },
  { id: 'saas', label: 'SaaS / Tech', icon: '💻', color: '#8b5cf6', desc: 'Software as a Service' },
  { id: 'restaurant', label: 'Restaurant & Food', icon: '🍽️', color: '#f97316', desc: 'Food & Dining Platform' },
  { id: 'travel', label: 'Travel & Tourism', icon: '✈️', color: '#06b6d4', desc: 'Travel Booking & Tourism' },
  { id: 'fitness', label: 'Fitness & Sports', icon: '💪', color: '#84cc16', desc: 'Fitness & Health Tracking' },
  { id: 'media', label: 'Media & Entertainment', icon: '🎬', color: '#ec4899', desc: 'Streaming & Content Platform' },
];

export const getIndustryData = (industryName) => {
  const name = industryName.trim();
  const matched = INDUSTRIES.find(i => 
    i.label.toLowerCase().includes(name.toLowerCase()) || 
    name.toLowerCase().includes(i.label.toLowerCase()) ||
    i.id.toLowerCase().includes(name.toLowerCase())
  );

  const base = matched || {
    id: 'custom',
    label: name,
    icon: '🚀',
    color: '#6366f1',
    desc: `${name} Platform`,
  };

  return {
    ...base,
    name: name || base.label,
    brandName: getBrandName(name || base.label),
    tagline: getTagline(name || base.label),
    description: getDescription(name || base.label),
    primaryColor: matched?.color || '#6366f1',
    features: getFeatures(name || base.label),
    stats: getStats(name || base.label),
    testimonials: getTestimonials(name || base.label),
    plans: getPlans(name || base.label),
    team: getTeam(),
    products: getProducts(name || base.label),
    blogPosts: getBlogPosts(name || base.label),
  };
};

const getBrandName = (industry) => {
  const names = {
    healthcare: 'MediCare Pro',
    ecommerce: 'ShopVerse',
    finance: 'FinFlow',
    banking: 'FinFlow',
    education: 'EduLearn',
    'real estate': 'PropVista',
    realestate: 'PropVista',
    saas: 'CloudSuite',
    tech: 'TechNova',
    restaurant: 'DineSync',
    food: 'DineSync',
    travel: 'Wanderlust',
    fitness: 'FitPulse',
    media: 'MediaStream',
  };
  const key = Object.keys(names).find(k => industry.toLowerCase().includes(k));
  return key ? names[key] : `${industry.charAt(0).toUpperCase() + industry.slice(1)}Hub`;
};

const getTagline = (industry) => {
  const taglines = {
    healthcare: 'Your Health, Our Priority',
    ecommerce: 'Shop Smarter, Live Better',
    finance: 'Banking Made Effortless',
    education: 'Learn Without Limits',
    'real estate': 'Find Your Dream Home',
    saas: 'Build. Scale. Succeed.',
    restaurant: 'Taste the Difference',
    travel: 'Adventure Awaits You',
    fitness: 'Transform Your Body & Mind',
    media: 'Stream. Watch. Enjoy.',
  };
  const key = Object.keys(taglines).find(k => industry.toLowerCase().includes(k));
  return key ? taglines[key] : `The Future of ${industry}`;
};

const getDescription = (industry) => 
  `A complete ${industry} platform built for modern businesses. Manage everything from one powerful dashboard with real-time analytics and seamless integrations.`;

const getFeatures = (industry) => [
  { icon: '⚡', title: 'Lightning Fast', desc: 'Optimized for performance with sub-second load times.' },
  { icon: '🔒', title: 'Secure & Reliable', desc: 'Enterprise-grade security with 99.9% uptime guarantee.' },
  { icon: '📊', title: 'Smart Analytics', desc: 'Real-time insights and data-driven decision making.' },
  { icon: '🤝', title: 'Team Collaboration', desc: 'Work together seamlessly with built-in collaboration tools.' },
  { icon: '📱', title: 'Mobile First', desc: 'Fully responsive design that works on any device.' },
  { icon: '🔗', title: 'Easy Integration', desc: 'Connect with 100+ popular tools and services.' },
];

const getStats = (industry) => [
  { label: 'Active Users', value: '50K+' },
  { label: 'Customer Satisfaction', value: '98%' },
  { label: 'Data Points Processed', value: '2M+' },
  { label: 'Countries Served', value: '45+' },
];

const getTestimonials = (industry) => [
  {
    name: 'Sarah Johnson', role: 'CEO', company: 'TechStart Inc.',
    text: `Switching to this platform transformed how we manage our ${industry} operations. Incredible ROI within 3 months.`,
    avatar: 'SJ', rating: 5,
  },
  {
    name: 'Michael Chen', role: 'Operations Director', company: 'Growth Labs',
    text: `The best ${industry} solution we've ever used. The team loves it and productivity has doubled.`,
    avatar: 'MC', rating: 5,
  },
  {
    name: 'Emily Rodriguez', role: 'Product Manager', company: 'Innovate Co.',
    text: 'Exceptional platform with outstanding support. Would recommend to any team looking to scale.',
    avatar: 'ER', rating: 5,
  },
];

const getPlans = (industry) => [
  { name: 'Starter', price: '$29', period: '/mo', features: ['Up to 5 users', '10GB storage', 'Basic analytics', 'Email support', 'API access'], highlighted: false },
  { name: 'Professional', price: '$79', period: '/mo', features: ['Up to 25 users', '100GB storage', 'Advanced analytics', 'Priority support', 'Full API access', 'Custom integrations'], highlighted: true },
  { name: 'Enterprise', price: '$199', period: '/mo', features: ['Unlimited users', 'Unlimited storage', 'Custom analytics', '24/7 dedicated support', 'SLA guarantee', 'White-label option', 'Custom development'], highlighted: false },
];

const getTeam = () => [
  { name: 'Alex Morgan', role: 'CEO & Founder', avatar: 'AM', dept: 'Leadership' },
  { name: 'Jordan Lee', role: 'CTO', avatar: 'JL', dept: 'Engineering' },
  { name: 'Taylor Smith', role: 'Head of Design', avatar: 'TS', dept: 'Design' },
  { name: 'Casey Wilson', role: 'VP of Sales', avatar: 'CW', dept: 'Sales' },
  { name: 'Riley Davis', role: 'Head of Marketing', avatar: 'RD', dept: 'Marketing' },
  { name: 'Drew Parker', role: 'Head of Support', avatar: 'DP', dept: 'Support' },
];

const getProducts = (industry) => [
  { name: 'Starter Kit', price: '$49', category: 'Essential', rating: 4.8, reviews: 234, badge: 'Popular' },
  { name: 'Pro Suite', price: '$149', category: 'Professional', rating: 4.9, reviews: 567, badge: 'Best Value' },
  { name: 'Enterprise Pack', price: '$499', category: 'Enterprise', rating: 5.0, reviews: 123, badge: 'Premium' },
  { name: 'Add-on Module', price: '$29', category: 'Add-on', rating: 4.7, reviews: 89, badge: null },
  { name: 'Analytics Pro', price: '$99', category: 'Analytics', rating: 4.8, reviews: 345, badge: 'New' },
  { name: 'Integration Hub', price: '$79', category: 'Integration', rating: 4.6, reviews: 156, badge: null },
];

const getBlogPosts = (industry) => [
  { title: `Top 10 Trends in ${industry} for 2024`, category: 'Trends', date: 'Mar 15, 2024', readTime: '5 min', author: 'Alex Morgan' },
  { title: `How to Scale Your ${industry} Business`, category: 'Growth', date: 'Mar 10, 2024', readTime: '8 min', author: 'Jordan Lee' },
  { title: `The Future of ${industry}: AI & Automation`, category: 'Technology', date: 'Mar 5, 2024', readTime: '6 min', author: 'Taylor Smith' },
  { title: `${industry} Best Practices for 2024`, category: 'Guide', date: 'Feb 28, 2024', readTime: '7 min', author: 'Casey Wilson' },
  { title: `Customer Success Stories in ${industry}`, category: 'Case Study', date: 'Feb 20, 2024', readTime: '4 min', author: 'Riley Davis' },
  { title: `Getting Started with ${industry} Analytics`, category: 'Tutorial', date: 'Feb 15, 2024', readTime: '10 min', author: 'Drew Parker' },
];
