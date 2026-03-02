import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import CalculatorLayout from '../../components/CalculatorLayout';
import { getCalculatorContent } from '../../data/content';

const FDCalculator = () => {
    const [investment, setInvestment] = useState(100000);
    const [rate, setRate] = useState(7.5);
    const [years, setYears] = useState(5);

    const { totalInterest, maturityAmount } = useMemo(() => {
        // Formula for FD (Quarterly compounding usually)
        // A = P * (1 + r/400)^(4*n)
        const n = 4; // Quarterly
        const r = rate;
        const t = years;

        const amount = investment * Math.pow((1 + r / (100 * n)), (n * t));

        return {
            maturityAmount: Math.round(amount),
            totalInterest: Math.round(amount - investment)
        };
    }, [investment, rate, years]);

    const chartData = [
        { name: 'Invested', value: investment },
        { name: 'Interest', value: totalInterest },
        { name: 'Total', value: maturityAmount }
    ];

    const formatCurrency = (val: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

    return (
        <CalculatorLayout
            title="Fixed Deposit Calculator"
            description="Calculate returns on your Fixed Deposits with quarterly compounding."
            seoContent={getCalculatorContent('fd-calculator')}
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
                        <input type="range" min="10000" max="10000000" step="10000" value={investment} onChange={e => setInvestment(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                    </div>
                    <div>
                        <div className="flex justify-between mb-2 items-center">
                            <label className="font-semibold text-gray-700">Interest Rate (% p.a)</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    value={rate}
                                    step="0.1"
                                    onChange={(e) => setRate(Number(e.target.value))}
                                    className="w-24 pl-3 pr-8 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-right font-bold text-gray-700 bg-gray-50 transition-all"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                            </div>
                        </div>
                        <input type="range" min="4" max="15" step="0.1" value={rate} onChange={e => setRate(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                    </div>
                    <div>
                        <div className="flex justify-between mb-2 items-center">
                            <label className="font-semibold text-gray-700">Duration</label>
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
                        <input type="range" min="1" max="25" step="1" value={years} onChange={e => setYears(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                    </div>
                </div>

                <div className="flex flex-col justify-center">
                    <div className="h-48 md:h-56 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData} layout="vertical">
                                <XAxis type="number" hide />
                                <YAxis dataKey="name" type="category" width={80} />
                                <Tooltip formatter={(value: number) => formatCurrency(value)} cursor={{ fill: 'transparent' }} />
                                <Bar dataKey="value" barSize={30} radius={[0, 4, 4, 0]}>
                                    <Cell fill="#94a3b8" />
                                    <Cell fill="#10b981" />
                                    <Cell fill="#3b82f6" />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-3">
                        <div className="bg-gray-50 p-3 rounded-lg text-center">
                            <p className="text-gray-500 text-[10px] uppercase font-bold">Total Interest</p>
                            <p className="text-lg font-bold text-green-600">{formatCurrency(totalInterest)}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg text-center">
                            <p className="text-gray-500 text-[10px] uppercase font-bold">Maturity Value</p>
                            <p className="text-lg font-bold text-blue-600">{formatCurrency(maturityAmount)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </CalculatorLayout>
    );
};

export default FDCalculator;