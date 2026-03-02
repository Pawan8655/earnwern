import React, { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import CalculatorLayout from '../../components/CalculatorLayout';
import { getCalculatorContent } from '../../data/content';

const RetirementCalculator = () => {
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(60);
  const [currentExpense, setCurrentExpense] = useState(50000);
  const [inflation, setInflation] = useState(6);
  const [currentSavings, setCurrentSavings] = useState(500000);

  const { corpusRequired, monthlyExpenseAtRetirement, data } = useMemo(() => {
    const yearsToRetire = retirementAge - currentAge;
    // FV of monthly expense
    const futureMonthlyExpense = currentExpense * Math.pow(1 + inflation/100, yearsToRetire);
    
    // Corpus needed to sustain this expense for ~20 years post retirement (Simplified)
    // Assuming corpus grows at 8% and inflation is 6% post retirement (Real rate 2%)
    const realRate = 0.02;
    const monthsInRetirement = 20 * 12; // 20 years survival
    const corpus = (futureMonthlyExpense * 12) * ( (1 - Math.pow(1 + realRate, -20)) / realRate );
    
    // Generate Graph Data
    const chartData = [];
    for(let i=0; i<=yearsToRetire; i++) {
        chartData.push({
            age: currentAge + i,
            savings: Math.round(currentSavings * Math.pow(1.10, i)) // Mock growth of current savings
        });
    }

    return {
        monthlyExpenseAtRetirement: Math.round(futureMonthlyExpense),
        corpusRequired: Math.round(corpus),
        data: chartData
    };
  }, [currentAge, retirementAge, currentExpense, inflation, currentSavings]);

  const formatCurrency = (val: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  return (
    <CalculatorLayout 
      title="Retirement Planner" 
      description="Plan your retirement corpus to maintain your lifestyle."
      seoContent={getCalculatorContent('retirement-calculator')}
    >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label className="font-semibold text-gray-700 block mb-2">Current Age</label>
                        <input 
                            type="number" 
                            value={currentAge} 
                            onChange={(e) => setCurrentAge(Number(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 font-bold"
                        />
                    </div>
                     <div>
                        <label className="font-semibold text-gray-700 block mb-2">Retirement Age</label>
                        <input 
                            type="number" 
                            value={retirementAge} 
                            onChange={(e) => setRetirementAge(Number(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 font-bold"
                        />
                    </div>
                </div>

                <div>
                    <label className="font-semibold text-gray-700 mb-2 block">Current Monthly Expense</label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                        <input 
                            type="number" 
                            value={currentExpense} 
                            onChange={(e) => setCurrentExpense(Number(e.target.value))}
                            className="w-full pl-7 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 font-bold text-gray-700"
                        />
                    </div>
                    <input type="range" min="10000" max="500000" step="5000" value={currentExpense} onChange={e => setCurrentExpense(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600 mt-2" />
                </div>

                <div>
                    <label className="font-semibold text-gray-700 mb-2 block">Inflation Rate (%)</label>
                    <input 
                        type="number" 
                        value={inflation} 
                        step="0.5"
                        onChange={(e) => setInflation(Number(e.target.value))}
                        className="w-24 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 font-bold"
                    />
                    <input type="range" min="2" max="12" step="0.5" value={inflation} onChange={e => setInflation(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600 mt-2" />
                </div>

                <div>
                    <label className="font-semibold text-gray-700 mb-2 block">Current Savings</label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                        <input 
                            type="number" 
                            value={currentSavings} 
                            onChange={(e) => setCurrentSavings(Number(e.target.value))}
                            className="w-full pl-7 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 font-bold text-gray-700"
                        />
                    </div>
                </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 flex flex-col justify-center space-y-6">
                <div>
                    <p className="text-gray-500 text-sm font-medium">Monthly Expense at Retirement</p>
                    <p className="text-2xl font-bold text-gray-800">{formatCurrency(monthlyExpenseAtRetirement)}</p>
                </div>
                <div>
                    <p className="text-gray-500 text-sm font-medium">Target Corpus Required</p>
                    <p className="text-4xl font-extrabold text-green-600">{formatCurrency(corpusRequired)}</p>
                    <p className="text-xs text-gray-400 mt-2">Assuming life expectancy of 80 years (20 years post retirement)</p>
                </div>
            </div>
        </div>
    </CalculatorLayout>
  );
};

export default RetirementCalculator;