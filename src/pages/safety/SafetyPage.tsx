import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, ArrowRight, ShieldCheck, Search } from 'lucide-react';
import { SAFETY_ARTICLES } from '../../data/articlesData';

export const SafetyPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'All',
    'Packaging Standards',
    'Consumer Guidance',
    'Counterfeit Prevention',
    'Home Care',
    'Safety Action Protocol'
  ];

  const filteredArticles = SAFETY_ARTICLES.filter((art) => {
    const matchesCategory =
      selectedCategory === 'All' || art.category === selectedCategory;
    const matchesQuery =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Header */}
      <div className="space-y-2 pb-2 border-b border-[#E4ECE7]">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#167A55]">
          <BookOpen className="w-4 h-4" />
          <span>Consumer Educational Library</span>
        </div>
        <h2 className="text-2xl font-bold text-[#172923]">Medicine Safety & Awareness</h2>
        <p className="text-xs sm:text-sm text-[#687871] max-w-2xl leading-relaxed">
          Practical guides, packaging inspection standards, and storage best practices to help you protect yourself and your family.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`
                px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors cursor-pointer
                ${
                  selectedCategory === cat
                    ? 'bg-[#167A55] text-white shadow-xs'
                    : 'bg-white border border-[#E4ECE7] text-[#687871] hover:text-[#172923] hover:bg-[#F2F6F4]'
                }
              `}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#687871] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-56 py-1.5 pl-9 pr-3 text-xs bg-white border border-[#E4ECE7] rounded-lg focus:outline-none focus:border-[#167A55] text-[#172923]"
          />
        </div>
      </div>

      {/* Article Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article) => (
          <Link
            key={article.id}
            to={`/app/safety/${article.slug}`}
            className="bg-white rounded-2xl border border-[#E4ECE7] hover:border-[#167A55] hover:shadow-[0_4px_16px_rgba(0,0,0,0.04)] transition-all p-6 flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#167A55] bg-[#EBF3EF] px-2 py-0.5 rounded">
                  {article.category}
                </span>
                <span className="text-[#687871] flex items-center gap-1 text-[11px]">
                  <Clock className="w-3 h-3" />
                  {article.readTime}
                </span>
              </div>

              <h3 className="text-base font-bold text-[#172923] group-hover:text-[#167A55] transition-colors leading-snug">
                {article.title}
              </h3>

              <p className="text-xs text-[#687871] line-clamp-3 leading-relaxed">
                {article.summary}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-[#E4ECE7] flex items-center justify-between text-xs font-semibold text-[#167A55]">
              <span>Read Full Article</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>

      {/* Educational Notice */}
      <div className="p-4 bg-[#F0F8F4] border border-[#D1EBDD] rounded-xl text-xs text-[#165C39] flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-[#167A55] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="font-semibold">Educational Purpose Disclaimer:</strong> All articles in this section are authored solely for consumer awareness and physical packaging safety verification. They do not constitute formal medical diagnoses, prescriptive therapy, or clinical pharmaceutical evaluations. Always consult a licensed physician or registered pharmacist.
        </p>
      </div>
    </div>
  );
};
