import React, { useState } from 'react';
import CalculatorLayout from '../../components/CalculatorLayout';
import { getCalculatorContent } from '../../data/content';

const SimpleInterestCalculator = () => {
  const [principal, setPrincipal] = useState(10000);
  const [rate, setRate] = useState(5);
  const [time, setTime] = useState(1);

  const interest = (principal * rate * time) / 100;
  const total = principal + interest;

  const formatCurrency = (val: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  return (
    <CalculatorLayout 
      title="Simple Interest Calculator" 
      description="Calculate simple interest on your principal."
      seoContent={getCalculatorContent('simple-interest-calculator')}
    >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
                <div>
                    <label className="font-semibold text-gray-700 block mb-2">Principal Amount</label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                        <input type="number" value={principal} onChange={e => setPrincipal(Number(e.target.value))} className="w-full pl-7 p-3 border rounded-lg font-bold" />
                    </div>
                </div>
                <div>
                    <label className="font-semibold text-gray-700 block mb-2">Rate of Interest (% p.a)</label>
                    <input type="number" value={rate} step="0.1" onChange={e => setRate(Number(e.target.value))} className="w-full p-3 border rounded-lg font-bold" />
                </div>
                <div>
                    <label className="font-semibold text-gray-700 block mb-2">Time Period (Years)</label>
                    <input type="number" value={time} onChange={e => setTime(Number(e.target.value))} className="w-full p-3 border rounded-lg font-bold" />
                </div>
            </div>

            <div className="bg-slate-100 p-8 rounded-2xl flex flex-col justify-center text-center space-y-6">
                <div>
                    <p className="text-gray-500 font-bold uppercase text-xs">Interest Earned</p>
                    <p className="text-3xl font-bold text-green-600">{formatCurrency(interest)}</p>
                </div>
                <div className="border-t border-gray-300 pt-6">
                    <p className="text-gray-500 font-bold uppercase text-xs">Total Amount</p>
                    <p className="text-4xl font-extrabold text-slate-800">{formatCurrency(total)}</p>
                </div>
            </div>
        </div>
    </CalculatorLayout>
  );
};

export default SimpleInterestCalculator;