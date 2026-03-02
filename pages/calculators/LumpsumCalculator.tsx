import React, { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import CalculatorLayout from '../../components/CalculatorLayout';
import { getCalculatorContent } from '../../data/content';

const LumpsumCalculator = () => {
    const [investment, setInvestment] = useState(100000);
    const [rate, setRate] = useState(12);
    const [years, setYears] = useState(10);

    const { totalValue, wealthGained, graphData } = useMemo(() => {
        const r = rate / 100;
        const val = investment * Math.pow(1 + r, years);
        const gained = val - investment;

        const data = [];
        for (let i = 0; i <= years; i++) {
            const v = investment * Math.pow(1 + r, i);
            data.push({
                year: `Yr ${i}`,
                value: Math.round(v),
                investment: investment
            });
        }

        return {
            totalValue: Math.round(val),
            wealthGained: Math.round(gained),
            graphData: data
        };
    }, [investment, rate, years]);

    const formatCurrency = (val: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

    return (
        <CalculatorLayout
            title="Lumpsum Calculator"
            description="Calculate the future value of your one-time investment."
            seoContent={getCalculatorContent('lumpsum-calculator')}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <div>
                        <div className="flex justify-between mb-2 items-center">
                            <label className="font-semibold text-gray-700">Total Investment</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                                <input
                                    type="number"
                                    value={investment}
                                    onChange={(e) => setInvestment(Number(e.target.value))}
                                    className="w-36 pl-7 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-right font-bold text-gray-700 bg-gray-50 transition-all"
                                />
                            </div>
                        </div>
                        <input type="range" min="5000" max="10000000" step="5000" value={investment} onChange={e => setInvestment(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                    </div>
                    <div>
                        <div className="flex justify-between mb-2 items-center">
                            <label className="font-semibold text-gray-700">Expected Return (% p.a)</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    value={rate}
                                    step="0.5"
                                    onChange={(e) => setRate(Number(e.target.value))}
                                    className="w-24 pl-3 pr-8 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-right font-bold text-gray-700 bg-gray-50 transition-all"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                            </div>
                        </div>
                        <input type="range" min="1" max="30" step="0.5" value={rate} onChange={e => setRate(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                    </div>
                    <div>
                        <div className="flex justify-between mb-2 items-center">
                            <label className="font-semibold text-gray-700">Time Period</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    value={years}
                                    onChange={(e) => setYears(Number(e.target.value))}
                                    className="w-24 pl-3 pr-8 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-right font-bold text-gray-700 bg-gray-50 transition-all"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">Yr</span>
                            </div>
                        </div>
                        <input type="range" min="1" max="50" step="1" value={years} onChange={e => setYears(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                    </div>

                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                        <div className="flex justify-between items-center text-sm mb-1">
                            <span className="text-gray-600">Invested Amount</span>
                            <span className="font-bold">{formatCurrency(investment)}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm mb-1">
                            <span className="text-gray-600">Est. Returns</span>
                            <span className="font-bold text-green-600">{formatCurrency(wealthGained)}</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold mt-2 pt-2 border-t border-blue-200">
                            <span>Total Value</span>
                            <span className="text-blue-700">{formatCurrency(totalValue)}</span>
                        </div>
                    </div>
                </div>

                <div className="h-48 md:h-56">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={graphData}>
                            <defs>
                                <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="year" />
                            <YAxis hide />
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <Tooltip formatter={(value: number) => formatCurrency(value)} />
                            <Area type="monotone" dataKey="value" stroke="#3b82f6" fill="url(#colorVal)" />
                            <Area type="monotone" dataKey="investment" stroke="#94a3b8" fill="transparent" strokeDasharray="5 5" />
                        </AreaChart>
                    </ResponsiveContainer>
                    <p className="text-center text-gray-400 text-xs mt-2">Dashed line represents principal amount</p>
                </div>
            </div>
        </CalculatorLayout>
    );
};

export default LumpsumCalculator;