import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Star, Shield, Check, Info, ArrowRight, ChevronLeft, CreditCard, Landmark, TrendingUp, Zap, Calculator } from 'lucide-react';
import { products } from '../data/products';

const ProductDetail = () => {
    const { productSlug } = useParams();
    const product = products.find(p => p.slug === productSlug);

    useEffect(() => {
        if (product) {
            document.title = `${product.name} - Features, Fees & Apply Online | EARNWERN.IN`;
            const metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc) {
                metaDesc.setAttribute('content', `Get detailed information about ${product.name} by ${product.provider}. Check interest rates, rewards, fees and apply online at EARNWERN.IN.`);
            }
        }
        window.scrollTo(0, 0);
    }, [product]);

    if (!product) {
        return <Navigate to="/products" replace />;
    }

    const getTypeIcon = () => {
        switch (product.type) {
            case 'credit_card': return <CreditCard size={24} />;
            case 'loan': return <Landmark size={24} />;
            case 'investment': return <TrendingUp size={24} />;
            default: return <Zap size={24} />;
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans pb-20">
            {/* Dynamic Header */}
            <div className="bg-slate-900 text-white pt-16 pb-32 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] -mr-20 -mt-20"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <Link to="/products" className="inline-flex items-center text-slate-400 hover:text-white mb-8 transition-colors">
                        <ChevronLeft size={20} /> Back to Marketplace
                    </Link>

                    <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                        <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-xl">
                            <div className="text-blue-400">{getTypeIcon()}</div>
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <span className="bg-blue-600 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-widest">{product.provider}</span>
                                <div className="flex items-center gap-1 text-amber-400 font-bold text-sm">
                                    <Star size={14} fill="currentColor" /> {product.rating}
                                </div>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-2">{product.name}</h1>
                            <p className="text-slate-400 text-lg">EarnWern Marketplace - Compare & Apply</p>
                        </div>
                        <div className="md:ml-auto">
                            <a
                                href={product.applyLink}
                                className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-10 rounded-2xl shadow-xl shadow-blue-900/50 transition-all transform hover:scale-105 inline-flex items-center gap-2"
                            >
                                Apply Now <ArrowRight size={20} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-16 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Features */}
                        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12 overflow-hidden relative">
                            <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3 relative z-10">
                                <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
                                Key Features & Benefits
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                                {product.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                        <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                                            <Check size={18} strokeWidth={3} />
                                        </div>
                                        <span className="text-slate-700 font-medium leading-relaxed">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* About */}
                        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12">
                            <h2 className="text-2xl font-bold text-slate-900 mb-6">About {product.name}</h2>
                            <div className="prose prose-slate max-w-none text-slate-600">
                                <p>Checking out {product.name} from {product.provider}? You represent a pool of smart consumers seeking maximum value and minimal fees. This {product.type.replace('_', ' ')} is curated by EarnWern for its high performance and reliability.</p>
                            </div>
                        </div>

                        {/* Recommended Tools - Dynamic SEO Links */}
                        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
                            <h2 className="text-2xl font-black mb-4 relative z-10 flex items-center gap-2">
                                <Calculator size={24} /> Recommended Tools
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                                {product.type === 'loan' ? (
                                    <>
                                        <Link to="/calculator/emi-calculator" className="bg-white/10 hover:bg-white text-white hover:text-blue-700 p-4 rounded-xl flex items-center justify-between font-bold transition-all border border-white/10">
                                            EMI Calculator <ArrowRight size={18} />
                                        </Link>
                                        <Link to="/calculator/income-tax-calculator" className="bg-white/10 hover:bg-white text-white hover:text-blue-700 p-4 rounded-xl flex items-center justify-between font-bold transition-all border border-white/10">
                                            Tax Tool <ArrowRight size={18} />
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link to="/calculator/sip-calculator" className="bg-white/10 hover:bg-white text-white hover:text-blue-700 p-4 rounded-xl flex items-center justify-between font-bold transition-all border border-white/10">
                                            SIP Calculator <ArrowRight size={18} />
                                        </Link>
                                        <Link to="/tools" className="bg-white/10 hover:bg-white text-white hover:text-blue-700 p-4 rounded-xl flex items-center justify-between font-bold transition-all border border-white/10">
                                            Browse Tools <ArrowRight size={18} />
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className="space-y-8">
                        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 sticky top-24">
                            <h3 className="text-lg font-bold text-slate-900 mb-6 uppercase tracking-wider text-xs">Highlights</h3>
                            <div className="space-y-6">
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                                        {product.type === 'credit_card' ? 'Rewards' : 'Rate'}
                                    </p>
                                    <p className="text-3xl font-extrabold text-slate-900">{product.interest || 'Top Tier'}</p>
                                </div>
                                <div className="pt-6 border-t border-slate-100">
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Fees</p>
                                    <p className="text-3xl font-extrabold text-green-600">{product.fees || '₹0'}</p>
                                </div>
                                <a
                                    href={product.applyLink}
                                    className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 mt-8 hover:bg-blue-600 transition-all"
                                >
                                    Apply Now <Shield size={18} />
                                </a>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
