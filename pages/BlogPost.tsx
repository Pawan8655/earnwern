import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Calendar, User, Clock, ChevronLeft, ArrowRight, Share2, Facebook, Twitter, Linkedin, Calculator } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';

const BlogPost = () => {
    const { slug } = useParams();
    const post = blogPosts.find(p => p.slug === slug);

    useEffect(() => {
        if (post) {
            document.title = `${post.title} - EARNWERN.IN Blog`;
            const metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc) {
                metaDesc.setAttribute('content', post.excerpt);
            }
        }
        window.scrollTo(0, 0);
    }, [post]);

    if (!post) {
        return <Navigate to="/blog" replace />;
    }

    // Find related posts (same category, excluding current)
    const relatedPosts = blogPosts
        .filter(p => p.category === post.category && p.id !== post.id)
        .slice(0, 2);

    return (
        <div className="bg-slate-50 min-h-screen py-12 font-sans">
            <div className="container mx-auto px-4">

                {/* Breadcrumb - Internal SEO Links */}
                <Link to="/blog" className="inline-flex items-center text-slate-500 hover:text-blue-600 mb-8 font-medium transition-colors">
                    <ChevronLeft size={18} className="mr-1" /> Back to Blog
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Main Content */}
                    <article className="lg:col-span-2">
                        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                            <div className="h-64 md:h-96 relative">
                                <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 text-white">
                                    <span className="bg-blue-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 inline-block">
                                        {post.category}
                                    </span>
                                    <h1 className="text-3xl md:text-4xl font-extrabold leading-tight mb-4">
                                        {post.title}
                                    </h1>
                                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-200">
                                        <span className="flex items-center gap-1"><User size={14} /> {post.author}</span>
                                        <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
                                        <span className="flex items-center gap-1"><Clock size={14} /> {post.readTime}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 md:p-12">
                                <div
                                    className="prose prose-lg prose-blue max-w-none text-slate-700 leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: post.content }}
                                />

                                {/* Social Share */}
                                <div className="mt-12 pt-8 border-t border-slate-100 flex items-center gap-4">
                                    <span className="font-bold text-slate-900 flex items-center gap-2"><Share2 size={18} /> Share:</span>
                                    <button className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"><Facebook size={18} /></button>
                                    <button className="p-2 rounded-full bg-sky-50 text-sky-500 hover:bg-sky-500 hover:text-white transition-colors"><Twitter size={18} /></button>
                                    <button className="p-2 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-colors"><Linkedin size={18} /></button>
                                </div>
                            </div>
                        </div>
                    </article>

                    {/* Sidebar */}
                    <aside className="space-y-8">

                        {/* Related Tool/Product Card */}
                        {(post.relatedToolLink || post.relatedProductLink) && (
                            <div className="bg-gradient-to-br from-slate-900 to-blue-900 rounded-2xl p-8 text-white text-center relative overflow-hidden shadow-xl">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>

                                <h3 className="text-xl font-bold mb-3 relative z-10">
                                    {post.category === 'Credit Cards' || post.category === 'Loans' ? 'Find the Best Offers' : 'Plan Your Finances'}
                                </h3>
                                <p className="text-blue-100 text-sm mb-6 relative z-10">
                                    {post.category === 'Credit Cards'
                                        ? "Compare top credit cards and apply instantly for maximum rewards."
                                        : `Use our advanced ${post.relatedToolName} to get accurate estimates instantly.`}
                                </p>

                                <Link
                                    to={post.relatedToolLink || post.relatedProductLink || '/tools'}
                                    className="inline-block w-full bg-white text-blue-900 font-bold py-3 rounded-xl hover:bg-blue-50 transition-colors relative z-10"
                                >
                                    {post.relatedToolName || 'Check Now'}
                                </Link>
                            </div>
                        )}

                        {/* Related Articles */}
                        {relatedPosts.length > 0 && (
                            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                                <h3 className="font-bold text-slate-900 text-lg mb-4">Related Articles</h3>
                                <div className="space-y-4">
                                    {relatedPosts.map(rp => (
                                        <Link to={`/blog/${rp.slug}`} key={rp.id} className="block group">
                                            <div className="flex gap-4">
                                                <img src={rp.image} alt="" className="w-20 h-20 rounded-lg object-cover" />
                                                <div>
                                                    <h4 className="font-bold text-slate-800 text-sm leading-snug group-hover:text-blue-600 transition-colors mb-1">
                                                        {rp.title}
                                                    </h4>
                                                    <span className="text-xs text-slate-400">{rp.date}</span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Popular Tools for SEO Ranking */}
                        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                            <h3 className="font-bold text-slate-900 text-lg mb-4 flex items-center gap-2">
                                <Calculator size={20} className="text-blue-600" /> Useful Tools
                            </h3>
                            <div className="space-y-2">
                                {[
                                    { name: "EMI Calculator", path: "/calculator/emi-calculator" },
                                    { name: "SIP Calculator", path: "/calculator/sip-calculator" },
                                    { name: "Income Tax", path: "/calculator/income-tax-calculator" },
                                    { name: "GST Calculator", path: "/calculator/gst-calculator" }
                                ].map(tool => (
                                    <Link
                                        key={tool.path}
                                        to={tool.path}
                                        className="flex items-center justify-between p-3 rounded-xl hover:bg-blue-50 text-slate-700 font-bold transition-all text-sm group"
                                    >
                                        {tool.name} <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Newsletter */}
                        <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                            <h3 className="font-bold text-blue-900 text-lg mb-2">Subscribe</h3>
                            <p className="text-sm text-blue-700 mb-4">Get the latest financial tips.</p>
                            <input type="email" placeholder="Email" className="w-full px-4 py-2 rounded-lg border border-blue-200 mb-3" />
                            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg">Subscribe</button>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default BlogPost;