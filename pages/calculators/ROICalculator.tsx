import React, { useState } from 'react';
import CalculatorLayout from '../../components/CalculatorLayout';
import { getCalculatorContent } from '../../data/content';
import { ArrowUpRight } from 'lucide-react';

const ROICalculator = () => {
  const [invested, setInvested] = useState(50000);
  const [returned, setReturned] = useState(75000);
  const [period, setPeriod] = useState(1);

  const gain = returned - invested;
  const roi = (gain / invested) * 100;
  const annualizedRoi = (Math.pow((returned / invested), (1 / period)) - 1) * 100;

  const formatCurrency = (val: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  return (
    <CalculatorLayout 
      title="ROI Calculator" 
      description="Calculate Return on Investment (ROI) and annualized gains."
      seoContent={getCalculatorContent('roi-calculator')}
    >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
                <div>
                    <label className="font-semibold text-gray-700 mb-2 block">Amount Invested</label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                        <input 
                            type="number" 
                            value={invested} 
                            onChange={(e) => setInvested(Number(e.target.value))}
                            className="w-full pl-7 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 font-bold text-gray-700 bg-gray-50"
                        />
                    </div>
                </div>

                <div>
                    <label className="font-semibold text-gray-700 mb-2 block">Amount Returned</label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                        <input 
                            type="number" 
                            value={returned} 
                            onChange={(e) => setReturned(Number(e.target.value))}
                            className="w-full pl-7 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 font-bold text-gray-700 bg-gray-50"
                        />
                    </div>
                </div>

                <div>
                    <label className="font-semibold text-gray-700 mb-2 block">Investment Period (Years)</label>
                    <input 
                        type="number" 
                        value={period} 
                        onChange={(e) => setPeriod(Number(e.target.value))}
                        className="w-full px-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 font-bold text-gray-700 bg-gray-50"
                    />
                </div>
            </div>

            <div className="flex flex-col justify-center space-y-6">
                <div className="bg-indigo-50 p-8 rounded-2xl border border-indigo-100 text-center">
                    <p className="text-indigo-900 font-medium mb-1">Total ROI</p>
                    <div className="text-5xl font-extrabold text-indigo-600 flex items-center justify-center gap-2">
                        {roi.toFixed(2)}% <ArrowUpRight size={32} />
                    </div>
                    <p className="text-indigo-400 text-sm mt-2">Net Profit: {formatCurrency(gain)}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-200 text-center shadow-sm">
                    <p className="text-gray-500 font-medium mb-1">Annualized Return</p>
                    <p className="text-3xl font-bold text-gray-800">{annualizedRoi.toFixed(2)}%</p>
                </div>
            </div>
        </div>
    </CalculatorLayout>
  );
};

export default ROICalculator;