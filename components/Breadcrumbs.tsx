import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumbs = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    if (pathnames.length === 0) return null;

    return (
        <nav className="flex mb-6 text-sm font-medium overflow-x-auto whitespace-nowrap scrollbar-hide py-2 container mx-auto px-4">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                    <Link to="/" className="inline-flex items-center text-slate-500 hover:text-blue-600 transition-colors">
                        <Home size={14} className="mr-2" />
                        Home
                    </Link>
                </li>
                {pathnames.map((value, index) => {
                    const last = index === pathnames.length - 1;
                    const to = `/${pathnames.slice(0, index + 1).join('/')}`;

                    // Format path for display
                    const label = value
                        .replace(/-/g, ' ')
                        .replace(/\b\w/g, (l) => l.toUpperCase());

                    return (
                        <li key={to} className="flex items-center">
                            <ChevronRight size={14} className="text-slate-400 mx-1 md:mx-2" />
                            {last ? (
                                <span className="text-slate-900 font-bold">{label}</span>
                            ) : (
                                <Link to={to} className="text-slate-500 hover:text-blue-600 transition-colors capitalize">
                                    {label}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;
