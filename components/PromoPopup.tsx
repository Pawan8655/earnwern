import React, { useState, useEffect } from 'react';
import { X, ArrowRight, CreditCard, Shield, TrendingUp, Wallet } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const PromoPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Reset state on route change
    setIsOpen(false);
    setIsVisible(false);

    // Do not show popup on products/marketplace pages
    if (location.pathname.startsWith('/products')) {
      return;
    }

    // Show popup after 2 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
      // Small delay to allow render before opacity transition
      setTimeout(() => setIsVisible(true), 50);
    }, 2000);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => setIsOpen(false), 300);
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm" 
        onClick={handleClose}
      ></div>
      
      {/* Modal Content */}
      <div className={`relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all duration-300 ${isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}>
        
        {/* Header Image/Gradient */}
        <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-8 text-white text-center relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            
            <button 
                onClick={handleClose}
                className="absolute top-3 right-3 text-white/70 hover:text-white hover:bg-white/20 p-1.5 rounded-full transition-colors z-10"
            >
                <X size={20} />
            </button>
            
            <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-xs font-bold mb-4 shadow-sm">
                LIMITED TIME OFFERS
            </span>
            <h2 className="text-2xl font-extrabold mb-2 leading-tight">Financial Freedom Starts Here</h2>
            <p className="text-blue-100 text-sm">Compare & Apply for the best products in India.</p>
        </div>

        <div className="p-6">
            {/* Quick Categories */}
            <div className="grid grid-cols-2 gap-3 mb-6">
                <Link to="/products/credit-cards" onClick={handleClose} className="flex items-center gap-3 p-3 bg-slate-50 hover:bg-blue-50 border border-slate-100 hover:border-blue-200 rounded-xl transition-all group">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-blue-600 group-hover:scale-110 transition-transform">
                        <CreditCard size={20} />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-800">Credit Cards</p>
                        <p className="text-[10px] text-green-600 font-bold">Lifetime Free</p>
                    </div>
                </Link>

                <Link to="/products/loans" onClick={handleClose} className="flex items-center gap-3 p-3 bg-slate-50 hover:bg-purple-50 border border-slate-100 hover:border-purple-200 rounded-xl transition-all group">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-purple-600 group-hover:scale-110 transition-transform">
                        <Wallet size={20} />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-800">Personal Loans</p>
                        <p className="text-[10px] text-green-600 font-bold">Low Interest</p>
                    </div>
                </Link>

                <Link to="/products/investments" onClick={handleClose} className="flex items-center gap-3 p-3 bg-slate-50 hover:bg-emerald-50 border border-slate-100 hover:border-emerald-200 rounded-xl transition-all group">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-emerald-600 group-hover:scale-110 transition-transform">
                        <TrendingUp size={20} />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-800">Investments</p>
                        <p className="text-[10px] text-green-600 font-bold">High Returns</p>
                    </div>
                </Link>

                <Link to="/products/insurance" onClick={handleClose} className="flex items-center gap-3 p-3 bg-slate-50 hover:bg-orange-50 border border-slate-100 hover:border-orange-200 rounded-xl transition-all group">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-orange-600 group-hover:scale-110 transition-transform">
                        <Shield size={20} />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-800">Insurance</p>
                        <p className="text-[10px] text-green-600 font-bold">Max Cover</p>
                    </div>
                </Link>
            </div>

            {/* CTA */}
            <div className="space-y-3">
                <Link 
                    to="/products" 
                    onClick={handleClose}
                    className="flex w-full bg-slate-900 hover:bg-blue-600 text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-blue-500/30 text-center transition-all items-center justify-center gap-2 group"
                >
                    Check All Offers <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PromoPopup;