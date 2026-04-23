export const PAGE_CATEGORIES = [
  {
    name: 'Marketing',
    pages: [
      { id: 'home', label: 'Landing / Home', icon: '🏠' },
      { id: 'about', label: 'About Us', icon: 'ℹ️' },
      { id: 'services', label: 'Services', icon: '⚙️' },
      { id: 'pricing', label: 'Pricing', icon: '💰' },
      { id: 'testimonials', label: 'Testimonials', icon: '💬' },
      { id: 'partners', label: 'Partners', icon: '🤝' },
      { id: 'caseStudies', label: 'Case Studies', icon: '📈' },
      { id: 'contact', label: 'Contact', icon: '📞' },
    ]
  },
  {
    name: 'Content',
    pages: [
      { id: 'blog', label: 'Blog', icon: '📰' },
      { id: 'blogDetail', label: 'Blog Post', icon: '📄' },
      { id: 'portfolio', label: 'Portfolio', icon: '🖼️' },
      { id: 'faq', label: 'FAQ', icon: '❓' },
    ]
  },
  {
    name: 'Commerce',
    pages: [
      { id: 'products', label: 'Product Catalog', icon: '🛍️' },
      { id: 'productDetail', label: 'Product Detail', icon: '📦' },
      { id: 'checkout', label: 'Checkout', icon: '💳' },
      { id: 'billing', label: 'Billing & Invoices', icon: '🧾' },
    ]
  },
  {
    name: 'Application',
    pages: [
      { id: 'dashboard', label: 'Dashboard', icon: '📊' },
      { id: 'analytics', label: 'Analytics', icon: '📈' },
      { id: 'reports', label: 'Reports', icon: '📋' },
      { id: 'notifications', label: 'Notifications', icon: '🔔' },
      { id: 'messages', label: 'Messages', icon: '💬' },
    ]
  },
  {
    name: 'User',
    pages: [
      { id: 'profile', label: 'Profile', icon: '👤' },
      { id: 'settings', label: 'Settings', icon: '⚙️' },
      { id: 'team', label: 'Team', icon: '👥' },
    ]
  },
  {
    name: 'Auth',
    pages: [
      { id: 'login', label: 'Login', icon: '🔑' },
      { id: 'signup', label: 'Sign Up', icon: '✍️' },
      { id: 'forgot', label: 'Forgot Password', icon: '🔓' },
    ]
  },
  {
    name: 'Other',
    pages: [
      { id: 'careers', label: 'Careers', icon: '💼' },
      { id: 'jobDetail', label: 'Job Detail', icon: '📌' },
      { id: 'notFound', label: '404 Error', icon: '⚠️' },
    ]
  }
];

export const ALL_PAGES = PAGE_CATEGORIES.flatMap(c => c.pages);
