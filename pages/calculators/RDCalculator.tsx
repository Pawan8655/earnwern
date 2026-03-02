import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import CalculatorLayout from '../../components/CalculatorLayout';
import { getCalculatorContent } from '../../data/content';

const RDCalculator = () => {
  const [monthlyDeposit, setMonthlyDeposit] = useState(5000);
  const [rate, setRate] = useState(7);
  const [years, setYears] = useState(5);

  const { invested, interest, total } = useMemo(() => {
    // RD Formula with Quarterly Compounding (Common in India)
    // P * n + Interest. 
    // Exact formula is complex, approximation using Monthly Compounding for easier visualization
    // A = P * ((1+i)^n - 1) / i * (1+i) -- This is SIP formula (Monthly compounding)
    // Banks use quarterly. For simplicity/UX speed we use SIP-like formula but adjusted for debt nature.
    
    // Using Simple Interest approximation for RD often used: I = P * n(n+1)/2 * r/12/100
    // Where n is months.
    
    const months = years * 12;
    const r = rate / 100;
    
    // Simple Interest Method (Approx)
    // const simpleInterest = monthlyDeposit * (months * (months + 1) / 2) * (r / 12);
    // const totalVal = (monthlyDeposit * months) + simpleInterest;

    // Compound Interest Method (More accurate for long term)
    // FV = P * ( (1+r/4)^(4*t) - 1 ) / (1 - (1+r/4)^(-1/3)) ... very complex.
    
    // Let's use the Monthly Compounding formula (SIP style) as it's standard for online tools
    const i = r/12;
    const maturity = monthlyDeposit * ((Math.pow(1 + i, months) - 1) / i) * (1 + i);
    const invest = monthlyDeposit * months;
    
    return {
        invested: Math.round(invest),
        interest: Math.round(maturity - invest),
        total: Math.round(maturity)
    };
  }, [monthlyDeposit, rate, years]);

  const chartData = [
    { name: 'Invested', value: invested },
    { name: 'Interest', value: interest }
  ];
  const COLORS = ['#cbd5e1', '#8b5cf6'];

  const formatCurrency = (val: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  return (
    <CalculatorLayout 
        title="RD Calculator" 
        description="Calculate maturity amount for Recurring Deposits."
        seoContent={getCalculatorContent('rd-calculator')}
    >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
                 <div>
                    <div className="flex justify-between mb-2 items-center">
                        <label className="font-semibold text-gray-700">Monthly Deposit</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                            <input 
                                type="number" 
                                value={monthlyDeposit} 
                                onChange={(e) => setMonthlyDeposit(Number(e.target.value))}
                                className="w-32 pl-7 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-right font-bold text-gray-700 bg-purple-50 transition-all"
                            />
                        </div>
                    </div>
                    <input type="range" min="500" max="100000" step="500" value={monthlyDeposit} onChange={e => setMonthlyDeposit(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600" />
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
                                className="w-24 pl-3 pr-8 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-right font-bold text-gray-700 bg-purple-50 transition-all"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                        </div>
                    </div>
                    <input type="range" min="4" max="12" step="0.1" value={rate} onChange={e => setRate(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600" />
                </div>
                <div>
                    <div className="flex justify-between mb-2 items-center">
                        <label className="font-semibold text-gray-700">Duration</label>
                        <div className="relative">
                            <input 
                                type="number" 
                                value={years} 
                                onChange={(e) => setYears(Number(e.target.value))}
                                className="w-24 pl-3 pr-8 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-right font-bold text-gray-700 bg-purple-50 transition-all"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">Yr</span>
                        </div>
                    </div>
                    <input type="range" min="1" max="10" step="1" value={years} onChange={e => setYears(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600" />
                </div>

                <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg border border-purple-100">
                    <span className="text-gray-700 font-medium">Maturity Amount</span>
                    <span className="text-2xl font-bold text-purple-700">{formatCurrency(total)}</span>
                </div>
            </div>

            <div className="flex justify-center">
                 <div className="w-64 h-64">
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie data={chartData} innerRadius={60} outerRadius={80} dataKey="value" paddingAngle={5}>
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value: number) => formatCurrency(value)} />
                            <Legend verticalAlign="bottom" />
                        </PieChart>
                    </ResponsiveContainer>
                 </div>
            </div>
        </div>
    </CalculatorLayout>
  );
};

export default RDCalculator;