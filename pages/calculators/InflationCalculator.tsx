import React, { useState, useMemo } from 'react';
import CalculatorLayout from '../../components/CalculatorLayout';
import { getCalculatorContent } from '../../data/content';
import { TrendingUp, ArrowRight } from 'lucide-react';

const InflationCalculator = () => {
  const [amount, setAmount] = useState(100000);
  const [inflation, setInflation] = useState(6);
  const [years, setYears] = useState(10);

  const futureValue = useMemo(() => {
    return Math.round(amount * Math.pow((1 + inflation / 100), years));
  }, [amount, inflation, years]);

  const formatCurrency = (val: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  return (
    <CalculatorLayout 
        title="Inflation Calculator" 
        description="Calculate the future cost of your current expenses."
        seoContent={getCalculatorContent('inflation-calculator')}
    >
        <div className="max-w-3xl mx-auto">
            <div className="bg-orange-50 p-6 rounded-xl border border-orange-200 mb-8 flex items-start gap-4">
                <TrendingUp className="text-orange-500 mt-1 flex-shrink-0" />
                <div>
                    <h3 className="font-bold text-orange-900 mb-2">Why this matters?</h3>
                    <p className="text-orange-800 text-sm">
                        If your monthly expense is <strong>{formatCurrency(amount)}</strong> today, you will need <strong>{formatCurrency(futureValue)}</strong> after {years} years to maintain the same lifestyle, assuming {inflation}% inflation.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                     <div>
                        <div className="flex justify-between mb-2 items-center">
                            <label className="font-semibold text-gray-700">Current Cost</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                                <input 
                                    type="number" 
                                    value={amount} 
                                    onChange={(e) => setAmount(Number(e.target.value))}
                                    className="w-36 pl-7 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-right font-bold text-gray-700 bg-orange-50 transition-all"
                                />
                            </div>
                        </div>
                        <input type="range" min="10000" max="1000000" step="5000" value={amount} onChange={e => setAmount(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500" />
                    </div>
                    <div>
                        <div className="flex justify-between mb-2 items-center">
                            <label className="font-semibold text-gray-700">Inflation Rate (%)</label>
                            <div className="relative">
                                <input 
                                    type="number" 
                                    value={inflation} 
                                    step="0.5"
                                    onChange={(e) => setInflation(Number(e.target.value))}
                                    className="w-24 pl-3 pr-8 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-right font-bold text-gray-700 bg-orange-50 transition-all"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                            </div>
                        </div>
                        <input type="range" min="1" max="15" step="0.5" value={inflation} onChange={e => setInflation(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500" />
                    </div>
                    <div>
                        <div className="flex justify-between mb-2 items-center">
                            <label className="font-semibold text-gray-700">Time Period</label>
                            <div className="relative">
                                <input 
                                    type="number" 
                                    value={years} 
                                    onChange={(e) => setYears(Number(e.target.value))}
                                    className="w-24 pl-3 pr-8 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-right font-bold text-gray-700 bg-orange-50 transition-all"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">Yr</span>
                            </div>
                        </div>
                        <input type="range" min="1" max="50" step="1" value={years} onChange={e => setYears(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500" />
                    </div>
                </div>

                <div className="text-center space-y-4">
                    <div className="text-gray-500 font-medium">Future Value will be</div>
                    <div className="text-4xl font-extrabold text-gray-900">{formatCurrency(futureValue)}</div>
                    <div className="inline-flex items-center gap-2 text-sm text-red-500 font-medium bg-red-50 px-3 py-1 rounded-full">
                        <TrendingUp size={14} /> Increase of {Math.round(((futureValue - amount)/amount)*100)}%
                    </div>
                </div>
            </div>
        </div>
    </CalculatorLayout>
  );
};

export default InflationCalculator;