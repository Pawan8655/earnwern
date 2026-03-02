import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import CalculatorLayout from '../../components/CalculatorLayout';
import { getCalculatorContent } from '../../data/content';

interface SchemeProps {
    type: 'ppf' | 'ssy';
}

const GovernmentSchemeCalculator: React.FC<SchemeProps> = ({ type }) => {
  const defaults = {
      ppf: { title: "PPF Calculator", rate: 7.1, years: 15, max: 150000, key: 'ppf-calculator' },
      ssy: { title: "SSY Calculator", rate: 8.2, years: 21, max: 150000, key: 'ssy-calculator' }
  };
  const config = defaults[type];

  const [yearlyInvest, setYearlyInvest] = useState(100000);
  // Rate is fixed/default for these schemes usually, but allow edit for projection
  const [rate, setRate] = useState(config.rate);

  const { invested, interest, total } = useMemo(() => {
    let currentBalance = 0;
    let totalInv = 0;
    const r = rate / 100;
    
    // Logic: PPF/SSY interest is compounded annually (simplified)
    // For SSY, deposit is only for 15 years, matures at 21. 
    // For PPF, deposit 15 years, matures 15.
    
    const depositYears = 15;
    const maturityYears = config.years;

    for (let i = 1; i <= maturityYears; i++) {
        if (i <= depositYears) {
            currentBalance += yearlyInvest;
            totalInv += yearlyInvest;
        }
        currentBalance += currentBalance * r;
    }

    return {
        invested: Math.round(totalInv),
        interest: Math.round(currentBalance - totalInv),
        total: Math.round(currentBalance)
    };
  }, [yearlyInvest, rate, config, type]);

  const chartData = [
    { name: 'Invested', value: invested },
    { name: 'Interest', value: interest },
    { name: 'Total', value: total }
  ];

  const formatCurrency = (val: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  return (
    <CalculatorLayout 
        title={config.title}
        description={`Calculate maturity value for ${type.toUpperCase()} scheme.`}
        seoContent={getCalculatorContent(config.key)}
    >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
                 <div>
                    <div className="flex justify-between mb-2 items-center">
                        <label className="font-semibold text-gray-700">Yearly Investment</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                            <input 
                                type="number" 
                                value={yearlyInvest} 
                                max={config.max}
                                onChange={(e) => setYearlyInvest(Math.min(Number(e.target.value), config.max))}
                                className="w-36 pl-7 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 font-bold text-gray-700 bg-gray-50"
                            />
                        </div>
                    </div>
                    <input type="range" min="500" max={config.max} step="500" value={yearlyInvest} onChange={e => setYearlyInvest(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600" />
                    <p className="text-xs text-gray-400 mt-1">Max limit: {formatCurrency(config.max)}/year</p>
                </div>
                <div>
                    <div className="flex justify-between mb-2 items-center">
                        <label className="font-semibold text-gray-700">Interest Rate (%)</label>
                        <div className="relative">
                            <input 
                                type="number" 
                                value={rate} 
                                step="0.1"
                                onChange={(e) => setRate(Number(e.target.value))}
                                className="w-24 pl-3 pr-8 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 font-bold text-gray-700 bg-gray-50"
                            />
                             <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                        </div>
                    </div>
                     <p className="text-xs text-gray-400 mt-1">Current Govt Rate: {config.rate}%</p>
                </div>
                
                <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                    <div className="flex justify-between mb-2 text-green-800">
                        <span>Maturity Period</span>
                        <span className="font-bold">{config.years} Years</span>
                    </div>
                    <div className="flex justify-between text-green-800">
                        <span>Lock-in Period</span>
                        <span className="font-bold">15 Years</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col justify-center">
                <div className="h-64 w-full">
                     <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData} layout="vertical">
                            <XAxis type="number" hide />
                            <YAxis dataKey="name" type="category" width={80} />
                            <Tooltip formatter={(value:number) => formatCurrency(value)} cursor={{fill: 'transparent'}} />
                            <Bar dataKey="value" barSize={30} radius={[0, 4, 4, 0]}>
                                <Cell fill="#94a3b8" />
                                <Cell fill="#10b981" />
                                <Cell fill="#3b82f6" />
                            </Bar>
                        </BarChart>
                     </ResponsiveContainer>
                </div>
                <div className="mt-6 flex justify-between items-center bg-gray-50 p-4 rounded-lg">
                    <span className="text-gray-600 font-medium">Maturity Value</span>
                    <span className="text-2xl font-bold text-green-600">{formatCurrency(total)}</span>
                </div>
            </div>
        </div>
    </CalculatorLayout>
  );
};

export default GovernmentSchemeCalculator;