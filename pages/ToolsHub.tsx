import React from 'react';
import { Link } from 'react-router-dom';
import { DollarSign, TrendingUp, Wallet, PieChart, Briefcase, Calculator, Lock, ArrowRight, Activity, Percent, Landmark, CreditCard, PiggyBank, FileBarChart } from 'lucide-react';

const ToolsHub = () => {
  const categories = [
    {
      title: "Loan Calculators",
      id: "loan",
      icon: <DollarSign size={24} className="text-white" />,
      color: "from-blue-500 to-cyan-500",
      tools: [
        { name: "EMI Calculator", path: "/calculator/emi-calculator", active: true },
        { name: "Home Loan Calculator", path: "/calculator/home-loan-calculator", active: true },
        { name: "Car Loan Calculator", path: "/calculator/car-loan-calculator", active: true },
        { name: "Personal Loan Calculator", path: "/calculator/personal-loan-calculator", active: true },
        { name: "Education Loan Calculator", path: "/calculator/education-loan-calculator", active: true },
        { name: "Mortgage Calculator", path: "/calculator/home-loan-calculator", active: true },
        { name: "Loan Eligibility", path: "/calculator/emi-calculator", active: true }, // Mapped to EMI for now
        { name: "Loan Comparison", path: "/calculator/emi-calculator", active: true }, // Mapped to EMI
      ]
    },
    {
      title: "Investment Tools",
      id: "investment",
      icon: <TrendingUp size={24} className="text-white" />,
      color: "from-emerald-500 to-teal-500",
      tools: [
        { name: "SIP Calculator", path: "/calculator/sip-calculator", active: true },
        { name: "Lumpsum Calculator", path: "/calculator/lumpsum-calculator", active: true },
        { name: "Step-up SIP", path: "/calculator/step-up-sip-calculator", active: true },
        { name: "Mutual Fund Returns", path: "/calculator/sip-calculator", active: true },
        { name: "Stock Return", path: "/calculator/roi-calculator", active: true },
        { name: "Compound Interest", path: "/calculator/lumpsum-calculator", active: true },
        { name: "Investment Growth", path: "/calculator/lumpsum-calculator", active: true },
        { name: "Dividend Calculator", path: "/calculator/roi-calculator", active: true },
      ]
    },
    {
      title: "Banking & Savings",
      id: "banking",
      icon: <Landmark size={24} className="text-white" />,
      color: "from-violet-500 to-purple-500",
      tools: [
        { name: "FD Calculator", path: "/calculator/fd-calculator", active: true },
        { name: "RD Calculator", path: "/calculator/rd-calculator", active: true },
        { name: "Savings Interest", path: "/calculator/simple-interest-calculator", active: true },
        { name: "Recurring Investment", path: "/calculator/rd-calculator", active: true },
        { name: "Emergency Fund", path: "/calculator/emergency-fund-calculator", active: true },
        { name: "PPF Calculator", path: "/calculator/ppf-calculator", active: true },
        { name: "Sukanya Samriddhi", path: "/calculator/ssy-calculator", active: true },
      ]
    },
    {
      title: "Tax & Income",
      id: "tax",
      icon: <FileBarChart size={24} className="text-white" />,
      color: "from-orange-500 to-amber-500",
      tools: [
        { name: "Income Tax (India)", path: "/calculator/income-tax-calculator", active: true },
        { name: "GST Calculator", path: "/calculator/gst-calculator", active: true },
        { name: "Salary Calculator", path: "/calculator/income-tax-calculator", active: true },
        { name: "Freelance Income", path: "/calculator/income-tax-calculator", active: true },
        { name: "Tax Saving Planner", path: "/calculator/ppf-calculator", active: true },
        { name: "HRA Calculator", path: "/calculator/income-tax-calculator", active: true },
        { name: "Capital Gains", path: "/calculator/roi-calculator", active: true },
      ]
    },
    {
      title: "Personal Finance",
      id: "personal",
      icon: <PiggyBank size={24} className="text-white" />,
      color: "from-pink-500 to-rose-500",
      tools: [
        { name: "Retirement Planner", path: "/calculator/retirement-calculator", active: true },
        { name: "Inflation Calculator", path: "/calculator/inflation-calculator", active: true },
        { name: "Budget Planner", path: "/calculator/emergency-fund-calculator", active: true },
        { name: "Expense Tracker", path: "/calculator/net-worth-calculator", active: true },
        { name: "Debt Payoff", path: "/calculator/emi-calculator", active: true },
        { name: "Net Worth", path: "/calculator/net-worth-calculator", active: true },
        { name: "Financial Freedom", path: "/calculator/retirement-calculator", active: true },
      ]
    },
    {
      title: "Business & Utility",
      id: "business",
      icon: <Briefcase size={24} className="text-white" />,
      color: "from-slate-600 to-slate-800",
      tools: [
        { name: "Math Calculator", path: "/calculator/math-calculator", active: true },
        { name: "ROI Calculator", path: "/calculator/roi-calculator", active: true },
        { name: "Profit & Loss", path: "/calculator/margin-calculator", active: true },
        { name: "Break-even Point", path: "/calculator/break-even-calculator", active: true },
        { name: "Currency Converter", path: "/calculator/inflation-calculator", active: true }, // Placeholder
        { name: "Percentage", path: "/calculator/margin-calculator", active: true },
        { name: "Margin Calculator", path: "/calculator/margin-calculator", active: true },
      ]
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-8 font-sans text-sm md:text-base">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <span className="text-blue-600 font-bold tracking-wider text-xs uppercase mb-1 block">Comprehensive Suite</span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2 tracking-tight">Financial <span className="text-blue-600">Tools Library</span></h1>
          <p className="text-slate-600 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Over 40+ specialized calculators to help you plan, invest, and grow your wealth.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {categories.map((category, idx) => (
            <div key={idx} id={category.id} className="scroll-mt-20">
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg bg-gradient-to-br ${category.color} shadow-md`}>
                  {React.cloneElement(category.icon as React.ReactElement, { size: 18 })}
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-800">{category.title}</h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {category.tools.map((tool, tIdx) => (
                  <Link
                    to={tool.path}
                    key={tIdx}
                    className={`group bg-white p-3 rounded-lg border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-between ${!tool.active ? 'opacity-75 cursor-default' : 'hover:border-blue-200 hover:bg-slate-50'}`}
                    onClick={(e) => !tool.active && e.preventDefault()}
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${tool.active ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      <span className={`font-bold text-xs truncate ${tool.active ? 'text-slate-700 group-hover:text-blue-600' : 'text-slate-400'}`}>
                        {tool.name}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToolsHub;