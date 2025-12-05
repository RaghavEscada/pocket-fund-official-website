import Link from "next/link";

export function BlogList() {
  const posts = [
    {
      title: "Understanding Market Volatility in 2024",
      excerpt: "A comprehensive guide to navigating market fluctuations and protecting your investments.",
      date: "January 15, 2024",
      category: "Market Analysis",
      slug: "understanding-market-volatility-2024",
    },
    {
      title: "5 Essential Financial Planning Tips",
      excerpt: "Key strategies to help you build a solid financial foundation for the future.",
      date: "January 10, 2024",
      category: "Financial Planning",
      slug: "5-essential-financial-planning-tips",
    },
    {
      title: "Investment Trends to Watch This Year",
      excerpt: "Discover the emerging investment opportunities and trends shaping the financial landscape.",
      date: "January 5, 2024",
      category: "Investments",
      slug: "investment-trends-2024",
    },
  ];

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-12">Latest Articles</h2>
        <div className="space-y-8">
          {posts.map((post, index) => (
            <article key={index} className="border-b border-gray-200 pb-8 last:border-0">
              <div className="flex items-center gap-4 mb-3">
                <span className="text-sm text-gray-500">{post.date}</span>
                <span className="text-sm bg-[#005f2a] text-white px-3 py-1 rounded-full">
                  {post.category}
                </span>
              </div>
              <Link href={`/blog/${post.slug}`}>
                <h3 className="text-2xl font-semibold mb-3 hover:text-[#005f2a] transition-colors">
                  {post.title}
                </h3>
              </Link>
              <p className="text-gray-700 mb-4">{post.excerpt}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="text-[#005f2a] font-medium hover:underline"
              >
                Read More →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}





