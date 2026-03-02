import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Filter, Plus, Check, Scale, ArrowRight, Trophy, Flame, ThumbsUp, Zap, Shield, CreditCard, Landmark, TrendingUp, Search, LineChart, ChevronRight, Calculator } from 'lucide-react';
import ComparisonModal from '../components/ComparisonModal';
import { products } from '../data/products';
import { Product } from '../types';

const Products = () => {
    const { categorySlug } = useParams();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);
    const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    // SEO Friendly Mapping
    const slugToType: Record<string, Product['type']> = {
        'credit-cards': 'credit_card',
        'loans': 'loan',
        'investments': 'investment',
        'insurance': 'insurance',
        'demat-accounts': 'demat',
        'banking': 'banking',
    };

    const activeType = categorySlug && slugToType[categorySlug] ? slugToType[categorySlug] : 'all';

    // Update SEO Meta
    useEffect(() => {
        let title = "Best Financial Products & Offers - EARNWERN.IN Marketplace";
        let desc = "Compare and apply for the best credit cards, loans, insurance, and investment plans in India. Exclusive offers available.";

        if (activeType !== 'all') {
            const readableName = activeType.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
            title = `Best ${readableName}s 2024 - Compare & Apply Online | EARNWERN.IN`;
            desc = `Find the best ${readableName} offers. Compare interest rates, fees, and benefits to choose the right ${readableName} for you.`;
        }

        document.title = title;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute('content', desc);
        }
        window.scrollTo(0, 0);
    }, [activeType]);

    // Click outside to close suggestions
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const getFilteredProducts = (query: string, type: string) => {
        const terms = query.toLowerCase().split(' ').filter(t => t.length > 0);

        return products.filter(p => {
            const matchesCategory = type === 'all' || p.type === type;
            if (!matchesCategory) return false;

            if (terms.length === 0) return true;

            const searchableText = `${p.name} ${p.provider} ${p.tag || ''} ${p.type}`.toLowerCase();
            return terms.every(term => searchableText.includes(term));
        });
    };

    const filteredProducts = getFilteredProducts(searchQuery, activeType);
    const suggestions = searchQuery.length > 0 ? filteredProducts.slice(0, 5) : [];

    // Enhanced Categories with Colors
    const categories = [
        { id: 'all', slug: '/products', label: 'All Offers', icon: Filter, color: 'text-slate-600', bg: 'bg-slate-100', border: 'border-slate-200' },
        { id: 'credit_card', slug: '/products/credit-cards', label: 'Credit Cards', icon: CreditCard, color: 'text-violet-600', bg: 'bg-violet-100', border: 'border-violet-200' },
        { id: 'loan', slug: '/products/loans', label: 'Personal Loans', icon: Landmark, color: 'text-blue-600', bg: 'bg-blue-100', border: 'border-blue-200' },
        { id: 'investment', slug: '/products/investments', label: 'Mutual Funds', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-100', border: 'border-emerald-200' },
        { id: 'insurance', slug: '/products/insurance', label: 'Insurance Plans', icon: Shield, color: 'text-rose-600', bg: 'bg-rose-100', border: 'border-rose-200' },
        { id: 'demat', slug: '/products/demat-accounts', label: 'Demat Accounts', icon: LineChart, color: 'text-amber-600', bg: 'bg-amber-100', border: 'border-amber-200' },
    ];

    const toggleCompare = (id: string) => {
        if (selectedForCompare.includes(id)) {
            setSelectedForCompare(prev => prev.filter(item => item !== id));
        } else {
            if (selectedForCompare.length >= 3) {
                alert("You can compare up to 3 products at a time.");
                return;
            }
            setSelectedForCompare(prev => [...prev, id]);
        }
    };

    const getSelectedProducts = () => {
        return products.filter(p => selectedForCompare.includes(p.id));
    };

    // Premium Tag Styles
    const getTagStyle = (tag: string) => {
        const lowerTag = tag.toLowerCase();
        if (lowerTag.includes('best')) return {
            bg: 'bg-gradient-to-r from-amber-200 to-yellow-400',
            text: 'text-amber-900',
            icon: <Trophy size={14} className="text-amber-800" fill="currentColor" />
        };
        if (lowerTag.includes('popular')) return {
            bg: 'bg-gradient-to-r from-rose-200 to-red-400',
            text: 'text-rose-900',
            icon: <Flame size={14} className="text-rose-800" fill="currentColor" />
        };
        if (lowerTag.includes('free')) return {
            bg: 'bg-gradient-to-r from-emerald-200 to-green-400',
            text: 'text-emerald-900',
            icon: <Zap size={14} className="text-emerald-800" fill="currentColor" />
        };
        return {
            bg: 'bg-gradient-to-r from-blue-200 to-indigo-400',
            text: 'text-blue-900',
            icon: <ThumbsUp size={14} className="text-blue-800" fill="currentColor" />
        };
    };

    const handleSuggestionClick = (name: string) => {
        setSearchQuery(name);
        setShowSuggestions(false);
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] relative font-sans">

            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 right-0 h-[300px] bg-slate-900 z-0">
                <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#F8FAFC] to-transparent"></div>
                <div className="absolute -top-[10%] -right-[10%] w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[100px]"></div>
                <div className="absolute top-[20%] -left-[10%] w-[300px] h-[300px] bg-indigo-600/20 rounded-full blur-[80px]"></div>
            </div>

            <div className="relative z-10">
                {/* Header Section */}
                <div className="pt-8 pb-8">
                    <div className="container mx-auto px-4 text-center">
                        <span className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-white/10 border border-white/20 text-blue-200 text-[10px] font-bold mb-4 backdrop-blur-md">
                            <Star size={10} fill="currentColor" className="text-yellow-400" />
                            Premium Marketplace
                        </span>
                        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight leading-tight">
                            Find Best <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Financial Products</span>
                        </h1>
                        <p className="text-slate-300 text-sm max-w-xl mx-auto mb-6 opacity-80">
                            Compare interest rates, fees, and benefits to choose the right financial product for you.
                        </p>

                        {/* Search Bar with Auto-Suggest */}
                        <div className="max-w-xl mx-auto relative group" ref={searchRef}>
                            <div className="relative z-20">
                                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                    <Search className="text-slate-400" size={18} />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchQuery}
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value);
                                        setShowSuggestions(true);
                                    }}
                                    onFocus={() => setShowSuggestions(true)}
                                    className="w-full pl-12 pr-6 py-3.5 rounded-xl bg-white shadow-xl border-0 text-slate-800 focus:outline-none focus:ring-4 focus:ring-blue-500/30 text-base"
                                />
                            </div>

                            {/* Auto Suggestions Dropdown */}
                            {showSuggestions && searchQuery.length > 0 && (
                                <div className="absolute top-[80%] left-4 right-4 pt-6 bg-white rounded-b-2xl shadow-2xl border-t border-slate-100 overflow-hidden z-10 animate-page">
                                    {suggestions.length > 0 ? (
                                        <ul className="pb-2">
                                            {suggestions.map((product) => (
                                                <li key={product.id}>
                                                    <button
                                                        onClick={() => handleSuggestionClick(product.name)}
                                                        className="w-full text-left px-6 py-3 hover:bg-slate-50 flex items-center gap-4 transition-colors group/item"
                                                    >
                                                        <div className="w-10 h-7 rounded bg-gray-200 overflow-hidden shadow-sm">
                                                            <img src={product.image} alt="" className="w-full h-full object-cover" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <p className="text-sm font-bold text-slate-800 group-hover/item:text-blue-600 transition-colors">{product.name}</p>
                                                            <p className="text-xs text-slate-500">{product.provider}</p>
                                                        </div>
                                                        <ChevronRight size={16} className="text-slate-300 group-hover/item:text-blue-500" />
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <div className="p-6 text-center text-slate-500 text-sm">
                                            No products found matching "{searchQuery}"
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 pb-24">
                    <div className="flex flex-col lg:flex-row gap-8 items-start">

                        {/* Premium Sidebar Filters */}
                        <div className="w-full lg:w-80 flex-shrink-0 order-first">
                            <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6 sticky top-24 overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-transparent rounded-bl-full -mr-10 -mt-10 opacity-50"></div>

                                <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2 text-lg relative z-10">
                                    <span className="bg-blue-100 text-blue-600 p-1.5 rounded-lg"><Filter size={18} /></span>
                                    Browse Categories
                                </h3>

                                <div className="flex flex-row lg:flex-col gap-3 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide snap-x">
                                    {categories.map(cat => {
                                        const isActive = activeType === cat.id;
                                        const Icon = cat.icon;
                                        return (
                                            <Link
                                                key={cat.id}
                                                to={cat.slug}
                                                className={`flex-shrink-0 snap-start w-[85vw] sm:w-auto lg:w-full relative group overflow-hidden rounded-2xl transition-all duration-300 border ${isActive ? 'bg-blue-600 border-blue-600 shadow-lg shadow-blue-600/30' : 'bg-white border-slate-100 hover:border-blue-200 hover:shadow-md'}`}
                                            >
                                                <div className={`p-4 flex items-center gap-4`}>
                                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${isActive ? 'bg-white/20 text-white' : `${cat.bg} ${cat.color} group-hover:scale-110`}`}>
                                                        <Icon size={24} />
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className={`font-bold text-base ${isActive ? 'text-white' : 'text-slate-800'}`}>{cat.label}</p>
                                                        <p className={`text-xs ${isActive ? 'text-blue-100' : 'text-slate-400'}`}>View top offers</p>
                                                    </div>
                                                    {isActive && <div className="absolute right-0 top-0 bottom-0 w-1 bg-white/20"></div>}
                                                    {!isActive && <ChevronRight size={18} className="text-slate-300 group-hover:translate-x-1 transition-transform" />}
                                                </div>
                                            </Link>
                                        )
                                    })}
                                </div>

                                {/* Popular Tools for SEO Ranking */}
                                <div className="mt-8 bg-slate-50 rounded-2xl p-6 border border-slate-100 hidden lg:block">
                                    <h3 className="font-bold text-slate-800 text-sm mb-4 flex items-center gap-2">
                                        <Calculator size={16} className="text-blue-600" /> Useful Planning Tools
                                    </h3>
                                    <div className="space-y-2">
                                        {[
                                            { name: "EMI Calculator", path: "/calculator/emi-calculator" },
                                            { name: "SIP Calculator", path: "/calculator/sip-calculator" },
                                            { name: "Tax Planner", path: "/calculator/income-tax-calculator" }
                                        ].map(tool => (
                                            <Link
                                                key={tool.path}
                                                to={tool.path}
                                                className="flex items-center justify-between p-3 rounded-xl hover:bg-white text-slate-600 font-bold transition-all text-xs border border-transparent hover:border-slate-200 group"
                                            >
                                                {tool.name} <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                {/* Sidebar Ad/Promo */}
                                <div className="mt-8 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white relative overflow-hidden hidden lg:block">
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl -mr-8 -mt-8"></div>
                                    <h4 className="font-bold text-lg mb-2 relative z-10">Confused?</h4>
                                    <p className="text-slate-300 text-sm mb-4 relative z-10">Our experts can help you choose the right product.</p>
                                    <button className="w-full py-2 bg-white/10 hover:bg-white text-white hover:text-slate-900 rounded-lg text-sm font-bold transition-all border border-white/20 relative z-10">
                                        Free Consultation
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Product Grid */}
                        <div className="flex-1 w-full">
                            {/* Results Header */}
                            <div className="flex justify-between items-center mb-6 bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                                <p className="text-slate-600 text-sm font-medium">
                                    <span className="text-slate-900 font-bold">{filteredProducts.length}</span> Products Found
                                </p>
                                {selectedForCompare.length > 0 && (
                                    <button
                                        onClick={() => setIsCompareModalOpen(true)}
                                        className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-700 transition-colors flex items-center gap-1.5 shadow-md"
                                    >
                                        <Scale size={14} /> Compare ({selectedForCompare.length})
                                    </button>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filteredProducts.map(product => {
                                    const isSelected = selectedForCompare.includes(product.id);
                                    const tagStyle = product.tag ? getTagStyle(product.tag) : null;

                                    return (
                                        <div key={product.id} className={`group bg-white rounded-2xl border transition-all duration-300 flex flex-col relative overflow-hidden ${isSelected ? 'border-blue-500 ring-4 ring-blue-500/10' : 'border-slate-100 shadow-md hover:shadow-xl'}`}>

                                            {/* Product Image / Header */}
                                            <Link to={`/product/${product.slug}`} className="h-40 relative bg-slate-100 overflow-hidden block">
                                                <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-95" />

                                                {/* Gradient Overlays */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>

                                                {/* Top badges */}
                                                <div className="absolute top-3 left-3 right-3 flex justify-between items-start z-10">
                                                    {product.tag && tagStyle ? (
                                                        <span className={`backdrop-blur-md ${tagStyle.bg} ${tagStyle.text} text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded shadow-sm flex items-center gap-1`}>
                                                            {product.tag}
                                                        </span>
                                                    ) : <span></span>}

                                                    <button
                                                        onClick={(e) => { e.preventDefault(); toggleCompare(product.id); }}
                                                        className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all shadow-lg border border-white/20 ${isSelected ? 'bg-blue-600 text-white' : 'bg-black/40 text-white hover:bg-white hover:text-blue-600'}`}
                                                    >
                                                        {isSelected ? <Check size={16} strokeWidth={3} /> : <Plus size={18} />}
                                                    </button>
                                                </div>

                                                {/* Provider Info */}
                                                <div className="absolute bottom-3 left-3 z-10">
                                                    <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded px-2 py-0.5 flex items-center gap-2">
                                                        <span className="text-[8px] font-black text-white uppercase">{product.provider}</span>
                                                        <div className="flex items-center gap-0.5 text-amber-400 text-[8px] font-black">
                                                            <Star size={8} fill="currentColor" /> {product.rating}
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>

                                            {/* Content Section */}
                                            <div className="p-4 flex-1 flex flex-col relative bg-white">
                                                <Link to={`/product/${product.slug}`} className="block mb-3">
                                                    <h3 className="text-lg font-bold text-slate-900 leading-tight hover:text-blue-600 line-clamp-1">
                                                        {product.name}
                                                    </h3>
                                                </Link>

                                                {/* Compact Floating Stats Card */}
                                                <div className="flex justify-between mb-4 bg-slate-50 rounded-xl border border-slate-100 p-2.5">
                                                    <div className="text-center flex-1 border-r border-slate-200">
                                                        <p className="text-[8px] text-slate-400 font-black uppercase leading-none mb-1">
                                                            {product.type === 'credit_card' ? 'Rewards' : product.type === 'investment' ? 'Returns' : 'Interest'}
                                                        </p>
                                                        <p className="text-sm font-black text-slate-900 leading-none">{product.interest || 'N/A'}</p>
                                                    </div>
                                                    <div className="text-center flex-1">
                                                        <p className="text-[8px] text-slate-400 font-black uppercase leading-none mb-1">Fee</p>
                                                        <p className="text-sm font-black text-emerald-600 leading-none">{product.fees || '₹0'}</p>
                                                    </div>
                                                </div>

                                                <div className="space-y-4 mb-10 flex-1">
                                                    {product.features.slice(0, 3).map((feature, idx) => (
                                                        <div key={idx} className="flex items-start gap-3 group/feat">
                                                            <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/feat:bg-blue-600 group-hover:text-white transition-all duration-300">
                                                                <Check size={12} strokeWidth={4} />
                                                            </div>
                                                            <span className="text-sm text-slate-600 font-bold leading-tight tracking-tight">{feature}</span>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="flex gap-2">
                                                    <Link
                                                        to={`/product/${product.slug}`}
                                                        className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-black py-2.5 rounded-xl transition-all flex items-center justify-center"
                                                    >
                                                        Details
                                                    </Link>
                                                    <a
                                                        href={product.applyLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex-[1.5] bg-slate-900 text-white text-center text-xs font-black py-2.5 rounded-xl transition-all shadow-lg hover:bg-blue-600 flex items-center justify-center gap-1.5"
                                                    >
                                                        Apply <ArrowRight size={14} />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>

                            {filteredProducts.length === 0 && (
                                <div className="text-center py-20 bg-white rounded-[2rem] border border-dashed border-slate-200 shadow-sm">
                                    <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <Search className="text-blue-400" size={40} />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">No products found</h3>
                                    <p className="text-slate-500 max-w-xs mx-auto mb-6">We couldn't find any matches for "{searchQuery}". Try adjusting your filters.</p>
                                    <button onClick={() => { setSearchQuery(''); window.scrollTo(0, 0) }} className="inline-block text-blue-600 font-bold hover:underline">
                                        Clear Search
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Comparison Bar */}
            {selectedForCompare.length > 0 && (
                <div className="fixed bottom-6 left-0 right-0 px-4 z-40 animate-slide-up">
                    <div className="container mx-auto max-w-3xl">
                        <div className="bg-slate-900/95 backdrop-blur-xl text-white rounded-2xl shadow-2xl p-4 flex items-center justify-between border border-white/10 ring-1 ring-black/10">
                            <div className="flex items-center gap-4">
                                <div className="bg-blue-600 p-3 rounded-xl shadow-lg shadow-blue-500/20">
                                    <Scale size={20} className="text-white" />
                                </div>
                                <div>
                                    <p className="font-bold text-base leading-none mb-1">{selectedForCompare.length} Selected</p>
                                    <p className="text-xs text-slate-400">Compare features side-by-side</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setSelectedForCompare([])}
                                    className="px-4 py-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors text-xs font-bold uppercase tracking-wide"
                                >
                                    Clear
                                </button>
                                <button
                                    onClick={() => setIsCompareModalOpen(true)}
                                    className="bg-white text-slate-900 hover:bg-blue-50 px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg hover:scale-105 active:scale-95 flex items-center gap-2 text-sm"
                                >
                                    Compare <ArrowRight size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Comparison Modal */}
            <ComparisonModal
                isOpen={isCompareModalOpen}
                onClose={() => setIsCompareModalOpen(false)}
                products={getSelectedProducts()}
            />
        </div>
    );
};

export default Products;