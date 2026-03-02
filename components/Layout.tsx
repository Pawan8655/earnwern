import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Calculator, TrendingUp, CreditCard, Facebook, Twitter, Instagram, Linkedin, Youtube, ArrowRight } from 'lucide-react';
import PromoPopup from './PromoPopup';
import Breadcrumbs from './Breadcrumbs';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-600";

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans animate-page">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm transition-all duration-300">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20"> {/* Increased height for a more premium feel */}
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center text-white font-black text-2xl shadow-lg group-hover:rotate-12 transition-transform">
                E
              </div>
              <span className="text-2xl font-black text-gray-900 tracking-tighter group-hover:text-blue-600 transition-colors">EARNWERN<span className="text-blue-600">.IN</span></span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link to="/" className={isActive('/') + " font-bold transition-all"}>Home</Link>
              <div className="relative group cursor-pointer py-5">
                <span className={`flex items-center gap-1 font-bold ${location.pathname.startsWith('/tools') ? "text-blue-600" : "text-gray-600 hover:text-blue-600"}`}>
                  Tools <ChevronDown size={14} />
                </span>
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-64 bg-white shadow-2xl rounded-3xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 p-3">
                  <div className="grid gap-1">
                    <Link to="/tools#loan" className="flex items-center gap-3 p-3 hover:bg-blue-50 rounded-2xl text-gray-700 font-bold text-sm transition-colors">
                      <Calculator size={18} className="text-blue-500" /> Loan Calculators
                    </Link>
                    <Link to="/tools#investment" className="flex items-center gap-3 p-3 hover:bg-emerald-50 rounded-2xl text-gray-700 font-bold text-sm transition-colors">
                      <TrendingUp size={18} className="text-emerald-500" /> Investment Tools
                    </Link>
                    <Link to="/tools#tax" className="flex items-center gap-3 p-3 hover:bg-orange-50 rounded-2xl text-gray-700 font-bold text-sm transition-colors">
                      <CreditCard size={18} className="text-orange-500" /> Tax & Salary
                    </Link>
                  </div>
                </div>
              </div>
              <Link to="/products" className={isActive('/products') + " font-bold transition-all"}>Marketplace</Link>
              <Link to="/blog" className={isActive('/blog') + " font-bold transition-all"}>Blog</Link>
            </nav>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <Link to="/search" className="p-2.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all" title="Search Tools & Products">
                <Menu size={20} className="hidden" /> {/* Placeholder spacing if needed */}
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-search"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
              </Link>
              <Link to="/tools" className="bg-slate-900 hover:bg-blue-600 text-white px-6 py-2.5 rounded-2xl font-black transition-all shadow-lg hover:shadow-blue-200 text-sm">
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-gray-700" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-200">
            <div className="px-4 pt-2 pb-6 space-y-3">
              <Link to="/" className="block py-2 text-gray-700 font-medium" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link to="/tools" className="block py-2 text-gray-700 font-medium" onClick={() => setIsMenuOpen(false)}>All Tools</Link>
              <Link to="/products" className="block py-2 text-gray-700 font-medium" onClick={() => setIsMenuOpen(false)}>Marketplace</Link>
              <Link to="/blog" className="block py-2 text-gray-700 font-medium" onClick={() => setIsMenuOpen(false)}>Blog</Link>
              <Link to="/about" className="block py-2 text-gray-700 font-medium" onClick={() => setIsMenuOpen(false)}>About Us</Link>
              <Link to="/tools" className="block w-full text-center bg-blue-600 text-white py-3 rounded-lg font-bold" onClick={() => setIsMenuOpen(false)}>
                Get Started
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Search Engines Love Breadcrumbs */}
      <div className="bg-white border-b border-gray-100">
        <Breadcrumbs />
      </div>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Promotional Popup */}
      <PromoPopup />

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 text-white font-bold text-xl mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">E</div>
                EARNWERN.IN
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Your trusted companion for financial planning. Calculate loans, investments, and taxes accurately. Compare the best financial products in the market.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors text-white">
                  <Facebook size={16} />
                </a>
                <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-sky-500 transition-colors text-white">
                  <Twitter size={16} />
                </a>
                <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors text-white">
                  <Instagram size={16} />
                </a>
                <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors text-white">
                  <Linkedin size={16} />
                </a>
                <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors text-white">
                  <Youtube size={16} />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-6">Calculators</h4>
              <ul className="space-y-3 text-sm">
                <li><Link to="/calculator/sip-calculator" className="hover:text-white transition-colors">SIP Calculator</Link></li>
                <li><Link to="/calculator/emi-calculator" className="hover:text-white transition-colors">EMI Calculator</Link></li>
                <li><Link to="/calculator/gst-calculator" className="hover:text-white transition-colors">GST Calculator</Link></li>
                <li><Link to="/calculator/income-tax-calculator" className="hover:text-white transition-colors">Income Tax</Link></li>
                <li><Link to="/calculator/fd-calculator" className="hover:text-white transition-colors">FD Calculator</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-6">Marketplace</h4>
              <ul className="space-y-3 text-sm">
                <li><Link to="/products/credit-cards" className="hover:text-white transition-colors">Credit Cards</Link></li>
                <li><Link to="/products/loans" className="hover:text-white transition-colors">Personal Loans</Link></li>
                <li><Link to="/products/investments" className="hover:text-white transition-colors">Mutual Funds</Link></li>
                <li><Link to="/products/insurance" className="hover:text-white transition-colors">Insurance</Link></li>
                <li><Link to="/blog" className="hover:text-white transition-colors">Financial Blog</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-6">Company</h4>
              <ul className="space-y-3 text-sm">
                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Use</Link></li>
                <li><Link to="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
            <p>&copy; {new Date().getFullYear()} EARNWERN.IN. All rights reserved.</p>
            <p className="max-w-xl text-center md:text-right">
              Disclaimer: EARNWERN.IN is an informational platform. We do not provide financial advice. Please consult a certified financial advisor before making investment decisions.
            </p>
          </div>
        </div>
      </footer>
      {/* Back to Top Button */}
      <ScrollToTop />
    </div>
  );
};

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  React.useEffect(() => {
    const toggleVisible = () => {
      if (window.pageYOffset > 300) setVisible(true);
      else setVisible(false);
    };
    window.addEventListener('scroll', toggleVisible);
    return () => window.removeEventListener('scroll', toggleVisible);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-50 p-4 bg-white text-blue-600 rounded-2xl shadow-2xl border border-gray-100 transition-all duration-500 transform ${visible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-50'} hover:bg-blue-600 hover:text-white hover:-translate-y-1 active:scale-90 group`}
    >
      <ArrowRight size={24} className="-rotate-90 group-hover:-translate-y-0.5 transition-transform" />
    </button>
  );
};

export default Layout;