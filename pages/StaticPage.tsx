import React, { useEffect } from 'react';
import { getCalculatorContent } from '../data/content';

interface StaticPageProps {
  type: string;
}

const StaticPage: React.FC<StaticPageProps> = ({ type }) => {
  const content = getCalculatorContent(type);

  useEffect(() => {
    document.title = content.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', content.metaDescription);
    }
    window.scrollTo(0, 0);
  }, [type, content]);

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8">{content.content.heading}</h1>
        <div 
            className="prose prose-lg prose-blue max-w-none text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: content.content.body }} 
        />
        
        {content.content.faq.length > 0 && (
            <div className="mt-12 bg-slate-50 p-8 rounded-2xl border border-slate-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
                <div className="space-y-6">
                    {content.content.faq.map((item, idx) => (
                        <div key={idx}>
                            <h4 className="font-bold text-gray-800 text-lg mb-2">{item.question}</h4>
                            <p className="text-gray-600">{item.answer}</p>
                        </div>
                    ))}
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default StaticPage;