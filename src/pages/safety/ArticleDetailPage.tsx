import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Clock,
  BookOpen,
  CheckCircle2,
  Share2,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { SAFETY_ARTICLES } from '../../data/articlesData';

export const ArticleDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const article = SAFETY_ARTICLES.find((a) => a.slug === slug) || SAFETY_ARTICLES[0];
  const relatedArticles = SAFETY_ARTICLES.filter((a) =>
    article.relatedSlugs.includes(a.slug)
  );

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in">
      {/* Top Breadcrumb */}
      <div>
        <Link
          to="/app/safety"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#167A55] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Safety Articles</span>
        </Link>
      </div>

      {/* Main Article Container */}
      <article className="bg-white rounded-2xl border border-[#E4ECE7] shadow-xs p-6 sm:p-10 space-y-6">
        {/* Article Header */}
        <header className="space-y-3 pb-6 border-b border-[#E4ECE7]">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-[#167A55] bg-[#EBF3EF] px-2.5 py-0.5 rounded">
              {article.category}
            </span>
            <span className="text-[#687871] flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-[#172923] leading-tight">
            {article.title}
          </h1>

          <p className="text-sm text-[#687871] leading-relaxed">
            {article.summary}
          </p>
        </header>

        {/* Article Body Sections */}
        <div className="space-y-6 text-sm text-[#172923] leading-relaxed">
          {article.sections.map((sec, idx) => (
            <section key={idx} className="space-y-3">
              <h2 className="text-lg font-bold text-[#172923] pt-2">
                {sec.heading}
              </h2>

              {sec.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="text-[#172923]/90">
                  {p}
                </p>
              ))}

              {sec.checklist && sec.checklist.length > 0 && (
                <div className="bg-[#F7FAF8] rounded-xl border border-[#E4ECE7] p-4 sm:p-5 space-y-2 mt-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#167A55]">
                    Recommended Inspection Checklist
                  </h4>
                  <ul className="space-y-2 pt-1 text-xs">
                    {sec.checklist.map((item, cIdx) => (
                      <li key={cIdx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#218653] shrink-0 mt-0.5" />
                        <span className="text-[#172923] leading-normal">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Footer Disclaimer */}
        <footer className="pt-6 border-t border-[#E4ECE7] text-xs text-[#687871] space-y-2">
          <div className="flex items-center gap-1.5 font-semibold text-[#172923]">
            <ShieldAlert className="w-4 h-4 text-[#167A55]" />
            <span>Healthcare Notice</span>
          </div>
          <p className="leading-relaxed">
            This article is published for educational and awareness purposes only. AushadhiSetu does not provide direct medical advice, diagnosis, or clinical prescriptions. If you experience unexpected side effects from medication, contact your physician or visit the nearest emergency hospital immediately.
          </p>
        </footer>
      </article>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-base font-bold text-[#172923]">Related Safety Articles</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedArticles.map((rel) => (
              <Link
                key={rel.id}
                to={`/app/safety/${rel.slug}`}
                className="bg-white rounded-xl border border-[#E4ECE7] p-4 hover:border-[#167A55] transition-all group"
              >
                <span className="text-[10px] font-semibold text-[#167A55] bg-[#EBF3EF] px-2 py-0.5 rounded">
                  {rel.category}
                </span>
                <h4 className="text-sm font-semibold text-[#172923] group-hover:text-[#167A55] mt-2 line-clamp-2">
                  {rel.title}
                </h4>
                <div className="flex items-center justify-between text-xs text-[#167A55] font-medium pt-3 mt-3 border-t border-[#E4ECE7]">
                  <span>Read article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
