import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, TrendingUp, CreditCard, ArrowRight, CheckCircle2, Shield, Percent, BarChart3, Wallet, LineChart, Star, Mail, Bell } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';

const Home = () => {
    return (
        <div>
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-slate-900 text-white py-12 lg:py-20">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=2071&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-900/80 to-slate-900"></div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <div className="flex justify-center mb-6">
                        <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-blue-500/20 text-blue-300 text-sm font-black border border-blue-500/30 backdrop-blur-md animate-pulse">
                            <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                            #1 Financial Tools Platform
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-4 tracking-tighter leading-[0.9] drop-shadow-2xl">
                        Master Your Money <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 drop-shadow-sm">
                            With Absolute Precision.
                        </span>
                    </h1>
                    <p className="text-base md:text-xl text-slate-300 max-w-2xl mx-auto mb-8 font-medium leading-relaxed opacity-90">
                        EARNWERN.IN provides professional-grade financial calculators and premium product comparisons to scale your wealth.
                    </p>

                    <div className="max-w-2xl mx-auto mb-8 relative group px-4 md:px-0">
                        <Link to="/search" className="block w-full text-left">
                            <div className="w-full bg-white rounded-2xl py-3.5 px-8 shadow-2xl shadow-blue-500/20 flex items-center gap-4 cursor-pointer border border-white/20 transition-all duration-500 transform group-hover:scale-[1.01]">
                                <div className="text-blue-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-search"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                                </div>
                                <span className="text-lg font-bold text-slate-400 hidden md:block">Search for EMI, SIP, Credit Cards...</span>
                                <span className="text-lg font-bold text-slate-400 md:hidden">Search Tools...</span>
                                <div className="ml-auto bg-blue-600 p-2 rounded-xl text-white shadow-lg"><ArrowRight size={20} /></div>
                            </div>
                        </Link>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link to="/tools" className="bg-slate-100 hover:bg-white text-slate-900 font-extrabold py-3.5 px-10 rounded-2xl transition-all shadow-xl hover:shadow-white/10 active:scale-95 text-sm">
                            Browse All Tools
                        </Link>
                        <Link to="/products" className="bg-blue-600 hover:bg-blue-500 text-white font-extrabold py-3.5 px-10 rounded-2xl transition-all shadow-2xl shadow-blue-900/60 border border-blue-400/30 active:scale-95 text-sm">
                            Find Products
                        </Link>
                    </div>
                </div>
            </section>

            {/* Featured Tools Grid */}
            <section className="py-12 bg-white relative">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-10">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Popular Financial Tools</h2>
                        <p className="text-slate-500 text-sm">Calculators used by 10,000+ monthly users.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Link to="/calculator/emi-calculator" className="group p-8 bg-slate-50 rounded-3xl hover:bg-blue-600 transition-all duration-300">
                            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-blue-500/30 group-hover:text-white text-blue-600 transition-colors">
                                <Calculator size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-white">EMI Calculator</h3>
                            <p className="text-slate-500 text-sm mb-6 group-hover:text-blue-100">Calculate monthly EMI for loans with amortization schedule.</p>
                            <div className="flex items-center text-blue-600 font-bold text-sm group-hover:text-white">
                                Calculate <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>

                        <Link to="/calculator/sip-calculator" className="group p-8 bg-slate-50 rounded-3xl hover:bg-emerald-600 transition-all duration-300">
                            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-emerald-500/30 group-hover:text-white text-emerald-600 transition-colors">
                                <TrendingUp size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-white">SIP Calculator</h3>
                            <p className="text-slate-500 text-sm mb-6 group-hover:text-emerald-100">Plan mutual fund investments and visualize wealth creation.</p>
                            <div className="flex items-center text-emerald-600 font-bold text-sm group-hover:text-white">
                                Invest <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>

                        <Link to="/calculator/fd-calculator" className="group p-8 bg-slate-50 rounded-3xl hover:bg-indigo-600 transition-all duration-300">
                            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-indigo-500/30 group-hover:text-white text-indigo-600 transition-colors">
                                <Percent size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-white">FD Calculator</h3>
                            <p className="text-slate-500 text-sm mb-6 group-hover:text-indigo-100">Check returns on Fixed Deposits with quarterly compounding.</p>
                            <div className="flex items-center text-indigo-600 font-bold text-sm group-hover:text-white">
                                Check Returns <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>

                        <Link to="/calculator/gst-calculator" className="group p-8 bg-slate-50 rounded-3xl hover:bg-orange-600 transition-all duration-300">
                            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-orange-500/30 group-hover:text-white text-orange-600 transition-colors">
                                <Wallet size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-white">GST Calculator</h3>
                            <p className="text-slate-500 text-sm mb-6 group-hover:text-orange-100">Compute GST tax amounts inclusive and exclusive of rates.</p>
                            <div className="flex items-center text-orange-600 font-bold text-sm group-hover:text-white">
                                Compute <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Product Categories */}
            <section className="bg-slate-50 py-12">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                        <div className="text-center md:text-left">
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Financial Marketplace</h2>
                            <p className="text-slate-500 mt-1 text-sm">Compare and apply for the best financial products.</p>
                        </div>
                        <Link to="/products" className="text-blue-600 font-bold hover:text-blue-700 flex items-center gap-2 bg-blue-50 px-5 py-2.5 rounded-full hover:bg-blue-100 transition-colors text-sm">
                            View All <ArrowRight size={16} />
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {[
                            { title: "Credit Cards", icon: <CreditCard size={24} />, color: "text-purple-600", bg: "bg-purple-100", link: "/products/credit-cards" },
                            { title: "Loans", icon: <Wallet size={24} />, color: "text-blue-600", bg: "bg-blue-100", link: "/products/loans" },
                            { title: "Insurance", icon: <Shield size={24} />, color: "text-red-600", bg: "bg-red-100", link: "/products/insurance" },
                            { title: "Investments", icon: <BarChart3 size={24} />, color: "text-emerald-600", bg: "bg-emerald-100", link: "/products/investments" },
                            { title: "Demat", icon: <LineChart size={24} />, color: "text-amber-600", bg: "bg-amber-100", link: "/products/demat-accounts" },
                        ].map((cat, idx) => (
                            <Link to={cat.link} key={idx} className="bg-white p-6 rounded-xl border border-slate-100 hover:shadow-lg transition-all hover:-translate-y-1 text-center group flex flex-col items-center justify-center">
                                <div className={`w-14 h-14 ${cat.bg} ${cat.color} flex items-center justify-center rounded-full mb-4 group-hover:scale-110 transition-transform`}>
                                    {cat.icon}
                                </div>
                                <h4 className="font-bold text-sm text-slate-800 group-hover:text-blue-600 transition-colors whitespace-nowrap">{cat.title}</h4>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-12 container mx-auto px-4">
                <div className="bg-slate-900 rounded-[2rem] p-8 md:p-12 text-white flex flex-col lg:flex-row items-center gap-12 shadow-2xl">
                    <div className="flex-1 space-y-8">
                        <h2 className="text-4xl font-bold leading-tight">Why Finance Experts <br /> <span className="text-blue-400">Trust EARNWERN.IN?</span></h2>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mt-1"><CheckCircle2 size={14} className="text-white" /></div>
                                <p className="text-lg text-slate-300">Algorithms verified by Chartered Accountants.</p>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mt-1"><CheckCircle2 size={14} className="text-white" /></div>
                                <p className="text-lg text-slate-300">Privacy-focused: We don't store your financial input data.</p>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mt-1"><CheckCircle2 size={14} className="text-white" /></div>
                                <p className="text-lg text-slate-300">Updated with the latest tax regimes and interest rates.</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 w-full">
                        <div className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
                            <div className="flex items-center gap-4 mb-6 relative z-10">
                                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center font-bold text-xl shadow-lg">4.9</div>
                                <div>
                                    <div className="flex text-amber-400 gap-1">
                                        {[1, 2, 3, 4, 5].map(i => <StarIcon key={i} />)}
                                    </div>
                                    <p className="text-sm text-slate-400 mt-1">Average User Rating</p>
                                </div>
                            </div>
                            <p className="italic text-lg text-slate-200 leading-relaxed mb-6">"The SIP calculator is a game changer. It helped me visualize my retirement corpus effectively and plan my investments with confidence."</p>
                            <div>
                                <p className="font-bold text-white">Rajesh Kumar</p>
                                <p className="text-sm text-blue-300">Investment Banker</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Blog Posts */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">Financial Intelligence</h2>
                            <p className="text-slate-500 text-sm max-w-2xl">Insights into wealth creation and smart spending.</p>
                        </div>
                        <Link to="/blog" className="bg-slate-900 text-white px-6 py-2.5 rounded-full font-bold hover:bg-blue-600 transition-all flex items-center gap-2 group text-sm">
                            More Articles <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {blogPosts.slice(0, 3).map((post) => (
                            <Link to={`/blog/${post.slug}`} key={post.id} className="group block h-full">
                                <div className="relative h-64 overflow-hidden rounded-[2rem] mb-6 shadow-lg transition-all group-hover:shadow-2xl">
                                    <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-white/90 backdrop-blur-md text-slate-900 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-sm">
                                            {post.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="px-2">
                                    <div className="flex items-center gap-3 text-sm text-slate-400 mb-3 font-bold">
                                        <span>{post.date}</span>
                                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                                        <span>{post.readTime}</span>
                                    </div>
                                    <h3 className="text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors leading-tight mb-4 line-clamp-2">
                                        {post.title}
                                    </h3>
                                    <p className="text-slate-500 mb-6 line-clamp-2 font-medium">{post.excerpt}</p>
                                    <div className="flex items-center text-slate-900 font-black text-sm group-hover:gap-3 transition-all">
                                        Read Full Story <ArrowRight size={16} className="ml-2" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="py-12 container mx-auto px-4">
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2rem] p-10 md:p-16 relative overflow-hidden text-center text-white shadow-3xl shadow-blue-500/20">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                                    <circle cx="2" cy="2" r="2" fill="white" />
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#dots)" />
                        </svg>
                    </div>

                    <div className="relative z-10 max-w-3xl mx-auto">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-md rounded-3xl mb-8 shadow-xl">
                            <Bell size={40} className="text-white animate-bounce-slow" />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Stay Ahead of the Market.</h2>
                        <p className="text-xl text-blue-100 mb-12 font-medium opacity-90">Get weekly financial insights, tax saving tips, and smart investment tools delivered to your inbox.</p>

                        <form className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto bg-white/10 p-2 rounded-[2.5rem] backdrop-blur-xl border border-white/20 shadow-2xl" onSubmit={(e) => e.preventDefault()}>
                            <div className="relative flex-grow">
                                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-white/60" size={20} />
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    className="w-full bg-transparent pl-14 pr-6 py-5 outline-none font-bold text-white placeholder:text-white/40"
                                />
                            </div>
                            <button className="bg-white text-blue-600 hover:bg-blue-50 font-black px-10 py-5 rounded-[2rem] transition-all shadow-xl active:scale-95 whitespace-nowrap">
                                Subscribe Now
                            </button>
                        </form>
                        <p className="mt-8 text-blue-200 text-sm font-bold opacity-75 flex items-center justify-center gap-2">
                            <Shield size={14} /> Join 10,000+ smart investors today. No spam, ever.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

const StarIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
    </svg>
);

export default Home;