import React, { useState, useMemo } from 'react';
import CalculatorLayout from '../../components/CalculatorLayout';
import { getCalculatorContent } from '../../data/content';

const IncomeTaxCalculator = () => {
    const [income, setIncome] = useState(1200000);
    const [deductions, setDeductions] = useState(150000); // For Old Regime (80C, etc.)

    const calculateTax = (amount: number, regime: 'old' | 'new') => {
        let tax = 0;
        const taxableIncome = Math.max(0, amount);

        if (regime === 'new') {
            const effectiveIncome = Math.max(0, taxableIncome - 50000); // Standard Deduction
            if (effectiveIncome <= 700000) return 0; // Rebate u/s 87A
            if (effectiveIncome > 1500000) tax += (effectiveIncome - 1500000) * 0.30;
            if (effectiveIncome > 1200000) tax += Math.min(effectiveIncome - 1200000, 300000) * 0.20;
            if (effectiveIncome > 900000) tax += Math.min(effectiveIncome - 900000, 300000) * 0.15;
            if (effectiveIncome > 600000) tax += Math.min(effectiveIncome - 600000, 300000) * 0.10;
            if (effectiveIncome > 300000) tax += Math.min(effectiveIncome - 300000, 300000) * 0.05;
        } else {
            const netIncome = Math.max(0, taxableIncome - deductions);
            if (netIncome <= 500000) return 0; // Rebate u/s 87A
            if (netIncome > 1000000) tax += (netIncome - 1000000) * 0.30;
            if (netIncome > 500000) tax += Math.min(netIncome - 500000, 500000) * 0.20;
            if (netIncome > 250000) tax += Math.min(netIncome - 250000, 250000) * 0.05;
        }
        return tax * 1.04;
    };

    const taxOld = useMemo(() => calculateTax(income, 'old'), [income, deductions]);
    const taxNew = useMemo(() => calculateTax(income, 'new'), [income]);

    const formatCurrency = (val: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

    return (
        <CalculatorLayout
            title="Income Tax Calculator"
            description="Compare your tax liability under the Old and New Tax Regimes."
            seoContent={getCalculatorContent('income-tax-calculator')}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <div>
                        <label className="font-semibold text-gray-700 mb-1 block">Gross Annual Income</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">₹</span>
                            <input
                                type="number"
                                value={income}
                                onChange={(e) => setIncome(Number(e.target.value))}
                                className="w-full pl-7 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 font-bold text-gray-700 bg-gray-50 text-sm"
                            />
                        </div>
                        <input type="range" min="500000" max="5000000" step="10000" value={income} onChange={e => setIncome(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600 mt-1" />
                    </div>

                    <div>
                        <label className="font-semibold text-gray-700 mb-1 block">Deductions (80C, 80D etc.) <span className="text-[10px] text-gray-400 font-normal ml-1">(Old Regime)</span></label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">₹</span>
                            <input
                                type="number"
                                value={deductions}
                                onChange={(e) => setDeductions(Number(e.target.value))}
                                className="w-full pl-7 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 font-bold text-gray-700 bg-gray-50 text-sm"
                            />
                        </div>
                        <input type="range" min="0" max="500000" step="5000" value={deductions} onChange={e => setDeductions(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600 mt-1" />
                    </div>
                </div>

                <div className="space-y-3">
                    <div className={`p-4 rounded-xl border-2 transition-all ${taxNew < taxOld ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-gray-50'}`}>
                        <div className="flex justify-between items-center mb-1">
                            <h3 className="font-bold text-lg text-gray-800">New Regime</h3>
                            {taxNew < taxOld && <span className="bg-green-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">Recommended</span>}
                        </div>
                        <p className="text-2xl font-bold text-blue-600">{formatCurrency(taxNew)}</p>
                        <p className="text-[10px] text-gray-500 uppercase font-bold">Tax Payable</p>
                    </div>

                    <div className={`p-4 rounded-xl border-2 transition-all ${taxOld < taxNew ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-gray-50'}`}>
                        <div className="flex justify-between items-center mb-1">
                            <h3 className="font-bold text-lg text-gray-800">Old Regime</h3>
                            {taxOld < taxNew && <span className="bg-green-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">Recommended</span>}
                        </div>
                        <p className="text-2xl font-bold text-blue-600">{formatCurrency(taxOld)}</p>
                        <p className="text-[10px] text-gray-500 uppercase font-bold">Tax Payable</p>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg text-xs text-blue-800">
                        <strong>Note:</strong> Comparison includes Standard Deduction of ₹50,000 for New Regime.
                    </div>
                </div>
            </div>
        </CalculatorLayout>
    );
};

export default IncomeTaxCalculator;