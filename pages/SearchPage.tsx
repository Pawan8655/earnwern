import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search as SearchIcon, Calculator, Zap, ArrowRight, Shield, BadgeCheck, X, TrendingUp, CreditCard } from 'lucide-react';
import { searchItems, SearchItem } from '../data/searchItems';

const SearchPage = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchItem[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Search Tools & Financial Products | EARNWERN.IN";
        inputRef.current?.focus();
    }, []);

    useEffect(() => {
        if (query.length > 1) {
            const searchTerms = query.toLowerCase().split(' ');
            const filtered = searchItems.filter(item => {
                const searchable = `${item.name} ${item.category} ${item.provider || ''}`.toLowerCase();
                return searchTerms.every(term => searchable.includes(term));
            });
            setResults(filtered.slice(0, 10));
        } else {
            setResults([]);
        }
        setSelectedIndex(-1);
    }, [query]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
        } else if (e.key === 'ArrowUp') {
            setSelectedIndex(prev => Math.max(prev - 1, 0));
        } else if (e.key === 'Enter') {
            if (selectedIndex >= 0) {
                navigate(results[selectedIndex].path);
            } else if (results.length > 0) {
                navigate(results[0].path);
            }
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 font-sans pb-20">
            {/* Search Header */}
            <div className="pt-24 pb-16 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter">
                        Smart <span className="text-blue-500">Search</span>
                    </h1>

                    <div className="max-w-3xl mx-auto relative group">
                        <div className="absolute inset-y-0 left-0 pl-7 flex items-center pointer-events-none">
                            <SearchIcon className="text-slate-500" size={28} />
                        </div>
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Search for 'EMI Calculator', 'Regalia Card', 'SIP'..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="w-full pl-16 pr-20 py-7 rounded-[2.5rem] bg-white border-0 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-8 focus:ring-blue-500/20 text-2xl font-bold transition-all shadow-2xl"
                        />
                        {query && (
                            <button
                                onClick={() => setQuery('')}
                                className="absolute inset-y-0 right-6 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                <X size={24} />
                            </button>
                        )}
                    </div>

                    <p className="mt-6 text-slate-400 font-medium">
                        Search across <span className="text-white font-bold">40+ Calculators</span> and <span className="text-white font-bold">EarnWern Marketplace</span>
                    </p>
                </div>
            </div>

            {/* Results Section */}
            <div className="container mx-auto px-4 -mt-4">
                <div className="max-w-3xl mx-auto space-y-4">
                    {results.length > 0 ? (
                        results.map((item, index) => (
                            <Link
                                key={item.id}
                                to={item.path}
                                className={`flex items-center gap-6 p-6 rounded-3xl border transition-all duration-300 ${index === selectedIndex ? 'bg-blue-600 border-blue-500 shadow-xl shadow-blue-500/30 scale-[1.03] text-white' : 'bg-white/5 backdrop-blur-md border-white/10 text-white hover:bg-white/10 hover:border-white/20'}`}
                            >
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${index === selectedIndex ? 'bg-white/20' : 'bg-slate-800 text-blue-400'}`}>
                                    {item.type === 'Tool' ? <Calculator size={30} /> : <Zap size={30} />}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${index === selectedIndex ? 'bg-white/20' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'}`}>
                                            {item.type}
                                        </span>
                                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                                            {item.category}
                                        </span>
                                    </div>
                                    <h3 className="text-2xl font-bold truncate">{item.name}</h3>
                                    <p className={`text-sm mt-1 whitespace-nowrap overflow-hidden text-ellipsis ${index === selectedIndex ? 'text-blue-100' : 'text-slate-400'}`}>
                                        {item.description}
                                    </p>
                                </div>

                                <div className={`transition-transform duration-300 ${index === selectedIndex ? 'translate-x-2' : ''}`}>
                                    <ArrowRight size={24} />
                                </div>
                            </Link>
                        ))
                    ) : query.length > 1 ? (
                        <div className="text-center py-20 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10">
                            <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                                <SearchIcon className="text-slate-500" size={40} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">No results found</h3>
                            <p className="text-slate-400 max-w-xs mx-auto">We couldn't find anything matching your search. Try different keywords.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-8 bg-blue-600 rounded-[2.5rem] text-white shadow-xl shadow-blue-900/40 relative overflow-hidden group hover:scale-[1.02] transition-transform">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                                <TrendingUp className="mb-6 opacity-60" size={40} />
                                <h3 className="text-2xl font-black mb-2">Top Calculators</h3>
                                <p className="text-blue-100 text-sm mb-6">Master your finances with our most popular tools.</p>
                                <div className="space-y-3">
                                    {['EMI Calculator', 'SIP Calculator', 'Income Tax'].map(t => (
                                        <button key={t} onClick={() => setQuery(t)} className="flex items-center justify-between w-full p-3 bg-white/10 rounded-xl font-bold hover:bg-white/20 transition-colors text-sm">
                                            {t} <ArrowRight size={14} />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="p-8 bg-slate-800 rounded-[2.5rem] text-white border border-white/5 relative overflow-hidden group hover:scale-[1.02] transition-transform">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                                <CreditCard className="mb-6 opacity-60" size={40} />
                                <h3 className="text-2xl font-black mb-2">Marketplace</h3>
                                <p className="text-slate-400 text-sm mb-6">Find cards and loans with exclusive rewards.</p>
                                <div className="space-y-3">
                                    {['Credit Cards', 'Personal Loans', 'Fixed Deposits'].map(t => (
                                        <button key={t} onClick={() => setQuery(t)} className="flex items-center justify-between w-full p-3 bg-white/5 rounded-xl font-bold hover:bg-white/10 transition-colors text-sm border border-white/5">
                                            {t} <ArrowRight size={14} />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchPage;
