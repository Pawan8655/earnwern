import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, User, ArrowRight, Tag } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';

const Blog = () => {
    const [filter, setFilter] = useState('All');
    const [search, setSearch] = useState('');

    const categories = ['All', 'Loans', 'Investments', 'Tax', 'Credit Cards', 'General'];

    useEffect(() => {
        document.title = "Financial Blog - Tips, Guides & Market Insights | EARNWERN.IN";
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute('content', "Read the latest financial articles, guides on loans, investments, tax planning, and product reviews to make smart money decisions.");
        }
        window.scrollTo(0, 0);
    }, []);

    const filteredPosts = blogPosts.filter(post => {
        const matchesCategory = filter === 'All' || post.category === filter;
        const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase()) || post.excerpt.toLowerCase().includes(search.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="bg-slate-50 min-h-screen font-sans">
            {/* Header */}
            <div className="bg-slate-900 text-white py-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] -mr-20 -mt-20 pointer-events-none"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight">EARNWERN.IN <span className="text-blue-400">Insights</span></h1>
                    <p className="text-base text-slate-300 max-w-xl mx-auto mb-6">
                        Expert financial advice and smart tips to help you manage your money better.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-md mx-auto relative">
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* Category Filters */}
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${filter === cat ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPosts.length > 0 ? (
                        filteredPosts.map(post => (
                            <Link to={`/blog/${post.slug}`} key={post.id} className="group bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-xl transition-all duration-300 flex flex-col h-full hover:-translate-y-1">
                                <div className="h-48 overflow-hidden relative">
                                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-blue-800 uppercase tracking-wide shadow-sm">
                                        {post.category}
                                    </div>
                                </div>
                                <div className="p-4 flex-1 flex flex-col">
                                    <div className="flex items-center gap-3 text-[10px] text-slate-400 mb-2">
                                        <span>{post.date}</span>
                                        <span>•</span>
                                        <span>{post.author}</span>
                                    </div>
                                    <h2 className="text-lg font-bold text-slate-800 mb-2 leading-tight group-hover:text-blue-600">
                                        {post.title}
                                    </h2>
                                    <p className="text-slate-500 text-xs mb-4 flex-1 line-clamp-2">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center text-blue-600 font-bold text-xs">
                                        Read More <ArrowRight size={14} className="ml-1.5" />
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20">
                            <p className="text-slate-500 text-lg">No articles found matching your criteria.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Blog;