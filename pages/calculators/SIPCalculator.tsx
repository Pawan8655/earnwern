import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import CalculatorLayout from '../../components/CalculatorLayout';
import { getCalculatorContent } from '../../data/content';

interface SIPCalculatorProps {
    variant?: 'normal' | 'step-up';
}

const SIPCalculator: React.FC<SIPCalculatorProps> = ({ variant = 'normal' }) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [monthlyInvest, setMonthlyInvest] = useState(Number(searchParams.get('monthly')) || 5000);
    const [returnRate, setReturnRate] = useState(Number(searchParams.get('rate')) || 12);
    const [years, setYears] = useState(Number(searchParams.get('years')) || 10);
    const [stepUp, setStepUp] = useState(Number(searchParams.get('stepup')) || 10); // Percentage increase annually

    // Sync state to URL
    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        if (monthlyInvest !== 5000) params.set('monthly', monthlyInvest.toString());
        else params.delete('monthly');

        if (returnRate !== 12) params.set('rate', returnRate.toString());
        else params.delete('rate');

        if (years !== 10) params.set('years', years.toString());
        else params.delete('years');

        if (variant === 'step-up' && stepUp !== 10) params.set('stepup', stepUp.toString());
        else params.delete('stepup');

        setSearchParams(params, { replace: true });
    }, [monthlyInvest, returnRate, years, stepUp, variant]);

    const isStepUp = variant === 'step-up';
    const contentKey = isStepUp ? 'step-up-sip-calculator' : 'sip-calculator';

    const { totalInvested, estimatedReturns, totalValue, graphData } = useMemo(() => {
        let currentInvest = monthlyInvest;
        let currentCorpus = 0;
        let totalInv = 0;

        const monthlyRate = returnRate / 100 / 12;
        const data = [];

        for (let y = 1; y <= years; y++) {
            // For each year
            for (let m = 1; m <= 12; m++) {
                currentCorpus = (currentCorpus + currentInvest) * (1 + monthlyRate);
                totalInv += currentInvest;
            }

            data.push({
                year: `Yr ${y}`,
                invested: Math.round(totalInv),
                value: Math.round(currentCorpus)
            });

            // Increase investment for next year if step-up
            if (isStepUp) {
                currentInvest = currentInvest + (currentInvest * stepUp / 100);
            }
        }

        return {
            totalInvested: Math.round(totalInv),
            totalValue: Math.round(currentCorpus),
            estimatedReturns: Math.round(currentCorpus - totalInv),
            graphData: data
        };
    }, [monthlyInvest, returnRate, years, stepUp, isStepUp]);

    const formatCurrency = (val: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

    return (
        <CalculatorLayout
            title={isStepUp ? "Step-up SIP Calculator" : "SIP Calculator"}
            description={isStepUp ? "Calculate returns with an annually increasing investment amount." : "Estimate the future value of your Systematic Investment Plan."}
            seoContent={getCalculatorContent(contentKey)}
        >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-4">
                    <div>
                        <div className="flex justify-between mb-2 items-center">
                            <label className="font-semibold text-gray-700">Monthly Investment</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                                <input
                                    type="number"
                                    value={monthlyInvest}
                                    onChange={(e) => setMonthlyInvest(Number(e.target.value))}
                                    className="w-32 pl-7 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-right font-bold text-gray-700 bg-gray-50 transition-all"
                                />
                            </div>
                        </div>
                        <input
                            type="range" min="500" max="100000" step="500"
                            value={monthlyInvest} onChange={(e) => setMonthlyInvest(Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                    </div>
                    <div>
                        <div className="flex justify-between mb-2 items-center">
                            <label className="font-semibold text-gray-700">Expected Return (p.a)</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    value={returnRate}
                                    step="0.5"
                                    onChange={(e) => setReturnRate(Number(e.target.value))}
                                    className="w-24 pl-3 pr-8 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-right font-bold text-gray-700 bg-gray-50 transition-all"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                            </div>
                        </div>
                        <input
                            type="range" min="1" max="30" step="0.5"
                            value={returnRate} onChange={(e) => setReturnRate(Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                    </div>

                    {isStepUp && (
                        <div>
                            <div className="flex justify-between mb-2 items-center">
                                <label className="font-semibold text-gray-700">Annual Step-up</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        value={stepUp}
                                        onChange={(e) => setStepUp(Number(e.target.value))}
                                        className="w-24 pl-3 pr-8 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-right font-bold text-gray-700 bg-gray-50 transition-all"
                                    />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                                </div>
                            </div>
                            <input
                                type="range" min="1" max="50" step="1"
                                value={stepUp} onChange={(e) => setStepUp(Number(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                            />
                        </div>
                    )}

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
                        <input
                            type="range" min="1" max="40" step="1"
                            value={years} onChange={(e) => setYears(Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                    </div>

                    <div className="bg-gray-50 p-3 rounded-xl space-y-2">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Invested Amount</span>
                            <span className="font-semibold">{formatCurrency(totalInvested)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Est. Returns</span>
                            <span className="font-semibold text-green-600">{formatCurrency(estimatedReturns)}</span>
                        </div>
                        <div className="flex justify-between text-base font-bold border-t pt-2 border-gray-200">
                            <span className="text-blue-800">Total Value</span>
                            <span className="text-blue-800">{formatCurrency(totalValue)}</span>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2 min-h-[250px]">
                    <ResponsiveContainer width="100%" height={250}>
                        <AreaChart data={graphData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#cbd5e1" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#cbd5e1" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="year" />
                            <YAxis tickFormatter={(val) => `₹${val / 1000}k`} />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip formatter={(value: number) => formatCurrency(value)} />
                            <Area type="monotone" dataKey="value" stroke="#3b82f6" fillOpacity={1} fill="url(#colorValue)" name="Total Value" />
                            <Area type="monotone" dataKey="invested" stroke="#94a3b8" fillOpacity={1} fill="url(#colorInvested)" name="Invested Amount" />
                        </AreaChart>
                    </ResponsiveContainer>
                    <p className="text-center text-xs text-gray-500 mt-2">Projection based on constant annual return rate.</p>
                </div>
            </div>
        </CalculatorLayout>
    );
};

export default SIPCalculator;