import React, { useState, useMemo } from 'react';
import CalculatorLayout from '../../components/CalculatorLayout';
import { getCalculatorContent } from '../../data/content';

const GSTCalculator = () => {
    const [amount, setAmount] = useState(10000);
    const [gstRate, setGstRate] = useState(18);
    const [type, setType] = useState<'exclusive' | 'inclusive'>('exclusive');

    const { netAmount, gstAmount, totalAmount } = useMemo(() => {
        let gst = 0;
        let total = 0;
        let net = amount;

        if (type === 'exclusive') {
            gst = (amount * gstRate) / 100;
            total = amount + gst;
        } else {
            // Inclusive: Amount = Net + GST => Amount = Net + (Net * R/100) => Amount = Net(1 + R/100)
            // Net = Amount / (1 + R/100)
            net = amount / (1 + (gstRate / 100));
            gst = amount - net;
            total = amount;
        }

        return {
            netAmount: net,
            gstAmount: gst,
            totalAmount: total
        };
    }, [amount, gstRate, type]);

    const formatCurrency = (val: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(val);

    return (
        <CalculatorLayout
            title="GST Calculator"
            description="Calculate Goods & Services Tax (GST) inclusive and exclusive amounts instantly."
            seoContent={getCalculatorContent('gst-calculator')}
        >
            <div className="max-w-2xl mx-auto space-y-4">

                {/* Type Switcher */}
                <div className="flex bg-gray-100 p-1 rounded-lg">
                    <button
                        onClick={() => setType('exclusive')}
                        className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${type === 'exclusive' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        GST Exclusive (Add GST)
                    </button>
                    <button
                        onClick={() => setType('inclusive')}
                        className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${type === 'inclusive' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        GST Inclusive (Remove GST)
                    </button>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Total Amount</label>
                        <div className="relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="text-gray-500 sm:text-sm">₹</span>
                            </div>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(Number(e.target.value))}
                                className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-lg border-gray-300 rounded-md py-3 border font-bold text-gray-900"
                                placeholder="0.00"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">GST Rate</label>
                        <div className="flex flex-col sm:flex-row gap-4 items-center">
                            <div className="grid grid-cols-5 gap-2 flex-1 w-full">
                                {[5, 12, 18, 28, 0].map((rate) => (
                                    <button
                                        key={rate}
                                        onClick={() => setGstRate(rate)}
                                        className={`py-2 px-1 border rounded-md font-medium text-sm transition-colors ${gstRate === rate ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                                    >
                                        {rate}%
                                    </button>
                                ))}
                            </div>
                            <div className="w-full sm:w-32 relative">
                                <input
                                    type="number"
                                    value={gstRate}
                                    onChange={(e) => setGstRate(Number(e.target.value))}
                                    className="w-full pl-3 pr-8 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none font-bold text-center"
                                    placeholder="Custom"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-3">
                    <div className="flex justify-between items-center text-gray-600">
                        <span>Net Amount</span>
                        <span className="font-medium">{formatCurrency(netAmount)}</span>
                    </div>
                    <div className="flex justify-between items-center text-gray-600">
                        <span>GST Amount ({gstRate}%)</span>
                        <span className="font-medium text-red-500">{formatCurrency(gstAmount)}</span>
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                        <span className="text-lg font-bold text-gray-900">Total Amount</span>
                        <span className="text-2xl font-bold text-blue-600">{formatCurrency(totalAmount)}</span>
                    </div>
                </div>

            </div>
        </CalculatorLayout>
    );
};

export default GSTCalculator;