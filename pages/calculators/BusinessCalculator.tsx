import React, { useState } from 'react';
import CalculatorLayout from '../../components/CalculatorLayout';
import { getCalculatorContent } from '../../data/content';

interface BusinessCalcProps {
    type: 'margin' | 'break-even';
}

const BusinessCalculator: React.FC<BusinessCalcProps> = ({ type }) => {
  // Margin State
  const [cost, setCost] = useState(100);
  const [revenue, setRevenue] = useState(150);
  
  // Break Even State
  const [fixedCost, setFixedCost] = useState(50000);
  const [varCost, setVarCost] = useState(20);
  const [price, setPrice] = useState(50);

  const calculateMargin = () => {
    const profit = revenue - cost;
    const margin = (profit / revenue) * 100;
    const markup = (profit / cost) * 100;
    return { profit, margin, markup };
  };

  const calculateBreakEven = () => {
    const contributionMargin = price - varCost;
    const units = contributionMargin > 0 ? fixedCost / contributionMargin : 0;
    const salesValue = units * price;
    return { units: Math.ceil(units), salesValue };
  };

  const marginResults = calculateMargin();
  const beResults = calculateBreakEven();

  const isMargin = type === 'margin';
  const config = {
      margin: { title: "Margin Calculator", key: "margin-calculator" },
      'break-even': { title: "Break-Even Calculator", key: "break-even-calculator" }
  }[type];

  const formatCurrency = (val: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  return (
    <CalculatorLayout 
        title={config.title} 
        description={isMargin ? "Calculate Profit Margin and Markup." : "Calculate Break-Even point in units and revenue."}
        seoContent={getCalculatorContent(config.key)}
    >
        <div className="max-w-2xl mx-auto space-y-8">
            {isMargin ? (
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block font-semibold mb-2">Cost (₹)</label>
                        <input type="number" value={cost} onChange={e => setCost(Number(e.target.value))} className="w-full p-3 border rounded-lg font-bold" />
                    </div>
                    <div>
                        <label className="block font-semibold mb-2">Revenue (₹)</label>
                        <input type="number" value={revenue} onChange={e => setRevenue(Number(e.target.value))} className="w-full p-3 border rounded-lg font-bold" />
                    </div>
                </div>
            ) : (
                <div className="space-y-4">
                     <div>
                        <label className="block font-semibold mb-2">Fixed Costs (₹)</label>
                        <input type="number" value={fixedCost} onChange={e => setFixedCost(Number(e.target.value))} className="w-full p-3 border rounded-lg font-bold" />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block font-semibold mb-2">Price per Unit (₹)</label>
                            <input type="number" value={price} onChange={e => setPrice(Number(e.target.value))} className="w-full p-3 border rounded-lg font-bold" />
                        </div>
                        <div>
                            <label className="block font-semibold mb-2">Variable Cost (₹)</label>
                            <input type="number" value={varCost} onChange={e => setVarCost(Number(e.target.value))} className="w-full p-3 border rounded-lg font-bold" />
                        </div>
                    </div>
                </div>
            )}

            <div className="bg-slate-800 text-white p-8 rounded-2xl shadow-lg">
                {isMargin ? (
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                            <p className="text-gray-400 text-sm">Gross Margin</p>
                            <p className="text-3xl font-bold text-green-400">{marginResults.margin.toFixed(2)}%</p>
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">Markup</p>
                            <p className="text-3xl font-bold text-blue-400">{marginResults.markup.toFixed(2)}%</p>
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">Profit</p>
                            <p className="text-3xl font-bold text-white">{formatCurrency(marginResults.profit)}</p>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                            <p className="text-gray-400 text-sm">Break-Even Units</p>
                            <p className="text-3xl font-bold text-yellow-400">{beResults.units}</p>
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">Sales Value</p>
                            <p className="text-3xl font-bold text-white">{formatCurrency(beResults.salesValue)}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    </CalculatorLayout>
  );
};

export default BusinessCalculator;