export const SITE_CONFIG = {
  name: "Pocket Fund",
  url: "https://pocketfund.com",
  description: "Your Trusted Financial Partner",
  ogImage: "/og-image.jpg",
  email: "hello@pocket-fund.com",
  address: "Mumbai, India",
};

export const PAGE_METADATA = {
  home: {
    title: `${SITE_CONFIG.name} - Home | Your Trusted Financial Partner`,
    description: "Discover Pocket Fund's comprehensive financial services. Expert guidance for your financial future with innovative investment solutions.",
    keywords: ["pocket fund", "financial services", "investment", "wealth management", "financial planning"],
    canonical: `${SITE_CONFIG.url}`,
  },
  about: {
    title: `About Us | ${SITE_CONFIG.name} - Our Story & Mission`,
    description: "Learn about Pocket Fund's mission, values, and the team dedicated to your financial success. Discover our commitment to excellence.",
    keywords: ["about pocket fund", "company history", "financial advisors", "team", "mission"],
    canonical: `${SITE_CONFIG.url}/about`,
  },
  team: {
    title: `Our Team | ${SITE_CONFIG.name} - Meet the Experts`,
    description: "Meet the experienced financial professionals at Pocket Fund. Our team of experts is committed to helping you achieve your financial goals.",
    keywords: ["pocket fund team", "financial advisors", "investment experts", "wealth managers"],
    canonical: `${SITE_CONFIG.url}/team`,
  },
  careers: {
    title: `Careers | ${SITE_CONFIG.name} - Join Our Team`,
    description: "Join Pocket Fund and build your career in finance. Explore exciting opportunities with a leading financial services company.",
    keywords: ["pocket fund careers", "finance jobs", "financial services careers", "job opportunities"],
    canonical: `${SITE_CONFIG.url}/careers`,
  },
  blog: {
    title: `Blog | ${SITE_CONFIG.name} - Financial Insights & News`,
    description: "Stay informed with the latest financial insights, market updates, and investment strategies from Pocket Fund's expert team.",
    keywords: ["financial blog", "investment news", "market insights", "financial advice"],
    canonical: `${SITE_CONFIG.url}/blog`,
  },
  contact: {
    title: `Contact Us | ${SITE_CONFIG.name} - Get in Touch`,
    description: "Get in touch with Pocket Fund. Contact our team for financial advice, investment opportunities, or general inquiries.",
    keywords: ["contact pocket fund", "financial consultation", "investment inquiry", "customer service"],
    canonical: `${SITE_CONFIG.url}/contact`,
  },
};

