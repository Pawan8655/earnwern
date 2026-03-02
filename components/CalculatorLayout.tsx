import React, { useEffect } from 'react';
import { Share2, Download, HelpCircle, TrendingUp, Calculator, Percent, Wallet, CreditCard, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEOContentData } from '../types';
import { products } from '../data/products';

interface CalculatorLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
  seoContent: SEOContentData;
}

const CalculatorLayout: React.FC<CalculatorLayoutProps> = ({ title, description, children, seoContent }) => {

  // Set page meta data and FAQ Schema
  useEffect(() => {
    document.title = seoContent.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', seoContent.metaDescription);
    }

    // FAQ Schema
    const scriptId = 'faq-schema';
    let script = document.getElementById(scriptId) as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": seoContent.content.faq.map(f => ({
        "@type": "Question",
        "name": f.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.answer
        }
      }))
    };

    script.text = JSON.stringify(faqSchema);

    window.scrollTo(0, 0);

    return () => {
      const existingScript = document.getElementById(scriptId);
      if (existingScript) existingScript.remove();
    };
  }, [seoContent]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container mx-auto px-4 py-2">

      {/* Tool Header */}
      <div className="mb-4 text-center max-w-2xl mx-auto">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">{title}</h1>
        <p className="text-gray-500 text-xs md:text-sm">{description}</p>
      </div>

      {/* Main Tool Area */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden mb-4">
        <div className="p-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
        <div className="p-3 md:p-5">
          <div className="flex justify-end gap-2 mb-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all border border-transparent hover:border-slate-200"
            >
              <Download size={14} /> Export PDF
            </button>
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert("Link copied to clipboard!");
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all active:scale-95 border border-blue-500"
            >
              <Share2 size={14} /> Share Results
            </button>
          </div>
          {children}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Content */}
        <div className="lg:col-span-2 space-y-8">
          <article className="prose prose-blue max-w-none bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{seoContent.content.heading}</h2>
            <div dangerouslySetInnerHTML={{ __html: seoContent.content.body }} className="text-gray-700 leading-relaxed space-y-4" />

            <div className="mt-8 bg-blue-50 p-6 rounded-lg border border-blue-100">
              <h3 className="text-xl font-bold text-blue-900 mb-4">Key Benefits</h3>
              <ul className="space-y-2">
                {seoContent.content.keyTakeaways.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-blue-800">
                    <span className="mt-1.5 w-1.5 h-1.5 bg-blue-600 rounded-full flex-shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </article>

          {/* FAQs */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <HelpCircle className="text-blue-600" /> Frequently Asked Questions
            </h3>
            <div className="space-y-4">
              {seoContent.content.faq.map((faq, idx) => (
                <div key={idx} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                  <h4 className="font-semibold text-gray-900 mb-2">{faq.question}</h4>
                  <p className="text-gray-600 text-sm">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Sidebar & Ads */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
            <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
              <TrendingUp size={20} className="text-blue-600" /> Related Tools
            </h3>
            <div className="space-y-4">
              {[
                { name: "EMI Calculator", link: "/calculator/emi-calculator", icon: <Calculator size={16} /> },
                { name: "SIP Calculator", link: "/calculator/sip-calculator", icon: <TrendingUp size={16} /> },
                { name: "Income Tax Tool", link: "/calculator/income-tax-calculator", icon: <Wallet size={16} /> },
                { name: "FD Calculator", link: "/calculator/fd-calculator", icon: <Percent size={16} /> }
              ].map((tool, idx) => (
                <Link to={tool.link} key={idx} className="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50 text-gray-700 font-semibold text-sm transition-all group">
                  <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    {tool.icon}
                  </div>
                  {tool.name}
                </Link>
              ))}
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mt-6 md:hidden lg:block">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <CreditCard size={18} className="text-blue-600" /> Best Marketplace Offers
              </h3>
              <div className="space-y-4">
                {products.slice(0, 3).map(product => (
                  <Link to={`/product/${product.slug}`} key={product.id} className="block group">
                    <div className="p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                      <p className="text-[10px] font-bold text-blue-600 uppercase tracking-tighter">{product.provider}</p>
                      <h4 className="font-bold text-slate-800 text-sm group-hover:text-blue-600 transition-colors">{product.name}</h4>
                      <p className="text-[10px] text-slate-500 mt-1 line-clamp-1">{product.features[0]}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <Link to="/products" className="block w-full text-center mt-6 text-xs font-bold text-blue-600 hover:text-blue-700">
                View All Marketplace &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorLayout;