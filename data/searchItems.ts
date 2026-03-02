import { products } from './products';

export interface SearchItem {
    id: string;
    name: string;
    path: string;
    type: 'Tool' | 'Product';
    category?: string;
    provider?: string;
    description?: string;
}

const rawTools = [
    // Loan Calculators
    { name: "EMI Calculator", path: "/calculator/emi-calculator", category: "Loans" },
    { name: "Home Loan Calculator", path: "/calculator/home-loan-calculator", category: "Loans" },
    { name: "Car Loan Calculator", path: "/calculator/car-loan-calculator", category: "Loans" },
    { name: "Personal Loan Calculator", path: "/calculator/personal-loan-calculator", category: "Loans" },
    { name: "Education Loan Calculator", path: "/calculator/education-loan-calculator", category: "Loans" },

    // Investment
    { name: "SIP Calculator", path: "/calculator/sip-calculator", category: "Investments" },
    { name: "Step-up SIP Calculator", path: "/calculator/step-up-sip-calculator", category: "Investments" },
    { name: "Lumpsum Calculator", path: "/calculator/lumpsum-calculator", category: "Investments" },
    { name: "Mutual Fund Returns", path: "/calculator/sip-calculator", category: "Investments" },

    // Banking
    { name: "FD Calculator", path: "/calculator/fd-calculator", category: "Banking" },
    { name: "RD Calculator", path: "/calculator/rd-calculator", category: "Banking" },
    { name: "PPF Calculator", path: "/calculator/ppf-calculator", category: "Banking" },
    { name: "SSY (Sukanya Samriddhi) Calculator", path: "/calculator/ssy-calculator", category: "Banking" },

    // Tax
    { name: "Income Tax Calculator India", path: "/calculator/income-tax-calculator", category: "Tax" },
    { name: "GST Calculator", path: "/calculator/gst-calculator", category: "Tax" },

    // Personal
    { name: "Retirement Planner", path: "/calculator/retirement-calculator", category: "Personal" },
    { name: "Inflation Calculator", path: "/calculator/inflation-calculator", category: "Personal" },
    { name: "Net Worth Calculator", path: "/calculator/net-worth-calculator", category: "Personal" },
    { name: "Emergency Fund Calculator", path: "/calculator/emergency-fund-calculator", category: "Personal" },

    // Business
    { name: "Math Scientific Calculator", path: "/calculator/math-calculator", category: "Business" },
    { name: "ROI Calculator", path: "/calculator/roi-calculator", category: "Business" },
    { name: "Margin Calculator", path: "/calculator/margin-calculator", category: "Business" },
    { name: "Break-even Point Calculator", path: "/calculator/break-even-calculator", category: "Business" },
];

export const searchItems: SearchItem[] = [
    ...rawTools.map((t, i) => ({
        id: `tool-${i}`,
        name: t.name,
        path: t.path,
        type: 'Tool' as const,
        category: t.category,
        description: `Professional financial calculator for ${t.name.toLowerCase()}.`
    })),
    ...products.map(p => ({
        id: p.id,
        name: p.name,
        path: `/product/${p.slug}`,
        type: 'Product' as const,
        category: p.type.replace('_', ' '),
        provider: p.provider,
        description: `Top rated ${p.type.replace('_', ' ')} from ${p.provider}.`
    }))
];
