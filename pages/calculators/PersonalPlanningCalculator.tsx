import React, { useState } from 'react';
import CalculatorLayout from '../../components/CalculatorLayout';
import { getCalculatorContent } from '../../data/content';

interface PersonalCalcProps {
    type: 'net-worth' | 'emergency-fund';
}

const PersonalPlanningCalculator: React.FC<PersonalCalcProps> = ({ type }) => {
  // Emergency Fund State
  const [monthlyExpense, setMonthlyExpense] = useState(40000);
  const [months, setMonths] = useState(6);

  // Net Worth State
  const [assets, setAssets] = useState(5000000); // Simple single input for demo complexity limits
  const [liabilities, setLiabilities] = useState(2000000);

  const formatCurrency = (val: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  const isNetWorth = type === 'net-worth';
  const config = {
      'net-worth': { title: "Net Worth Calculator", key: "net-worth-calculator" },
      'emergency-fund': { title: "Emergency Fund Calculator", key: "emergency-fund-calculator" }
  }[type];

  return (
    <CalculatorLayout 
        title={config.title} 
        description={isNetWorth ? "Assess your financial health." : "Calculate safety net required."}
        seoContent={getCalculatorContent(config.key)}
    >
        <div className="max-w-2xl mx-auto space-y-8">
            {isNetWorth ? (
                 <div className="grid grid-cols-2 gap-8">
                    <div>
                        <label className="block font-semibold mb-2 text-green-700">Total Assets</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                            <input type="number" value={assets} onChange={e => setAssets(Number(e.target.value))} className="w-full pl-7 p-3 border-2 border-green-100 rounded-lg font-bold focus:border-green-500 outline-none" />
                        </div>
                        <p className="text-xs text-gray-400 mt-1">Cash, Investments, Property, Gold</p>
                    </div>
                    <div>
                        <label className="block font-semibold mb-2 text-red-700">Total Liabilities</label>
                         <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                            <input type="number" value={liabilities} onChange={e => setLiabilities(Number(e.target.value))} className="w-full pl-7 p-3 border-2 border-red-100 rounded-lg font-bold focus:border-red-500 outline-none" />
                        </div>
                         <p className="text-xs text-gray-400 mt-1">Loans, Credit Card Dues</p>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-8">
                    <div>
                        <label className="block font-semibold mb-2">Monthly Expense</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                            <input type="number" value={monthlyExpense} onChange={e => setMonthlyExpense(Number(e.target.value))} className="w-full pl-7 p-3 border rounded-lg font-bold" />
                        </div>
                    </div>
                    <div>
                        <label className="block font-semibold mb-2">Months of Coverage</label>
                        <input type="number" value={months} onChange={e => setMonths(Number(e.target.value))} className="w-full p-3 border rounded-lg font-bold" />
                        <input type="range" min="3" max="24" value={months} onChange={e => setMonths(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2" />
                    </div>
                </div>
            )}

            <div className={`p-8 rounded-2xl text-center shadow-lg border-2 ${isNetWorth ? (assets >= liabilities ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200') : 'bg-blue-50 border-blue-200'}`}>
                <p className="text-gray-500 font-medium uppercase tracking-widest mb-2">{isNetWorth ? "Your Net Worth" : "Required Emergency Fund"}</p>
                <p className={`text-4xl font-extrabold ${isNetWorth ? (assets >= liabilities ? 'text-green-600' : 'text-red-600') : 'text-blue-600'}`}>
                    {isNetWorth ? formatCurrency(assets - liabilities) : formatCurrency(monthlyExpense * months)}
                </p>
                {isNetWorth && <p className="text-sm mt-2 text-gray-500">{assets >= liabilities ? "Great! You are financially positive." : "Focus on reducing liabilities."}</p>}
            </div>
        </div>
    </CalculatorLayout>
  );
};

export default PersonalPlanningCalculator;