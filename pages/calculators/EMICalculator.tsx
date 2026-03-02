import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import CalculatorLayout from '../../components/CalculatorLayout';
import { getCalculatorContent } from '../../data/content';

interface EMICalculatorProps {
  type?: 'home' | 'car' | 'personal' | 'education' | 'default';
}

const EMICalculator: React.FC<EMICalculatorProps> = ({ type = 'default' }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Defaults based on type
  const defaults = {
    home: { amount: 5000000, rate: 8.5, tenure: 20, title: "Home Loan EMI Calculator" },
    car: { amount: 1000000, rate: 9.5, tenure: 5, title: "Car Loan EMI Calculator" },
    personal: { amount: 500000, rate: 11, tenure: 3, title: "Personal Loan EMI Calculator" },
    education: { amount: 2000000, rate: 10, tenure: 7, title: "Education Loan EMI Calculator" },
    default: { amount: 1000000, rate: 9, tenure: 5, title: "EMI Calculator" }
  };

  const config = defaults[type];
  const contentKey = type === 'default' ? 'emi-calculator' : `${type}-loan-calculator`;

  // Initialize from URL or defaults
  const [amount, setAmount] = useState(Number(searchParams.get('amount')) || config.amount);
  const [rate, setRate] = useState(Number(searchParams.get('rate')) || config.rate);
  const [tenure, setTenure] = useState(Number(searchParams.get('years')) || config.tenure);

  // Sync state to URL
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (amount !== config.amount) params.set('amount', amount.toString());
    else params.delete('amount');

    if (rate !== config.rate) params.set('rate', rate.toString());
    else params.delete('rate');

    if (tenure !== config.tenure) params.set('years', tenure.toString());
    else params.delete('years');

    setSearchParams(params, { replace: true });
  }, [amount, rate, tenure]);

  // Reset when type changes manually
  useEffect(() => {
    if (!searchParams.get('amount')) setAmount(config.amount);
    if (!searchParams.get('rate')) setRate(config.rate);
    if (!searchParams.get('years')) setTenure(config.tenure);
  }, [type]);

  const { emi, totalInterest, totalAmount } = useMemo(() => {
    const r = rate / 12 / 100;
    const n = tenure * 12;
    const emiValue = (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayable = emiValue * n;
    const interest = totalPayable - amount;

    return {
      emi: Math.round(emiValue),
      totalInterest: Math.round(interest),
      totalAmount: Math.round(totalPayable)
    };
  }, [amount, rate, tenure]);

  const chartData = [
    { name: 'Principal Amount', value: amount },
    { name: 'Total Interest', value: totalInterest }
  ];

  const COLORS = ['#3b82f6', '#10b981'];

  const formatCurrency = (val: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  return (
    <CalculatorLayout
      title={config.title}
      description={`Calculate your monthly EMI and plan your ${type === 'default' ? 'loan' : type + ' loan'} repayment.`}
      seoContent={getCalculatorContent(contentKey)}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="space-y-4">

          <div>
            <div className="flex justify-between mb-2 items-center">
              <label className="font-semibold text-gray-700">Loan Amount</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-36 pl-7 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-right font-bold text-gray-700 bg-gray-50 transition-all"
                />
              </div>
            </div>
            <input
              type="range" min="50000" max={type === 'home' ? "100000000" : "5000000"} step="10000"
              value={amount} onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
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
            <input
              type="range" min="1" max="25" step="0.1"
              value={rate} onChange={(e) => setRate(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2 items-center">
              <label className="font-semibold text-gray-700">Loan Tenure</label>
              <div className="relative">
                <input
                  type="number"
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                  className="w-24 pl-3 pr-8 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-right font-bold text-gray-700 bg-gray-50 transition-all"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">Yr</span>
              </div>
            </div>
            <input
              type="range" min="1" max={type === 'home' ? "30" : "20"} step="1"
              value={tenure} onChange={(e) => setTenure(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

        </div>

        {/* Results */}
        <div className="flex flex-col items-center justify-center">
          <div className="w-full h-48 md:h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="w-full space-y-2 mt-2">
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-100">
              <span className="text-gray-600">Monthly EMI</span>
              <span className="text-2xl font-bold text-blue-600">{formatCurrency(emi)}</span>
            </div>
            <div className="flex justify-between items-center px-4">
              <span className="text-gray-600">Principal Amount</span>
              <span className="font-semibold text-gray-800">{formatCurrency(amount)}</span>
            </div>
            <div className="flex justify-between items-center px-4">
              <span className="text-gray-600">Total Interest</span>
              <span className="font-semibold text-green-600">{formatCurrency(totalInterest)}</span>
            </div>
            <div className="flex justify-between items-center px-4 border-t pt-2 mt-2">
              <span className="text-gray-800 font-bold">Total Payment</span>
              <span className="font-bold text-gray-900">{formatCurrency(totalAmount)}</span>
            </div>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default EMICalculator;