import { SEOContentData } from '../types';

export const getCalculatorContent = (type: string): SEOContentData => {
  const defaults: SEOContentData = {
    title: "Financial Calculator - EARNWERN.IN",
    metaDescription: "Use our free financial calculator to plan your finances better.",
    content: {
      heading: "Understanding Your Finances",
      body: "<p>Financial planning is crucial for long-term stability. This calculator helps you make informed decisions by providing instant, accurate estimations based on your inputs.</p>",
      keyTakeaways: ["Easy to use", "Instant results", "Helps in planning"],
      faq: [
        { question: "Is this calculator accurate?", answer: "Yes, it uses standard financial formulas. However, actual bank figures may vary slightly due to fees." }
      ]
    }
  };

  const contentMap: Record<string, SEOContentData> = {
    // Existing Tools
    'emi-calculator': {
      title: "EMI Calculator - Calculate Loan EMIs",
      metaDescription: "Calculate your Equated Monthly Installment (EMI) for any loan with our easy-to-use EMI calculator.",
      content: {
        heading: "What is an EMI Calculator?",
        body: `<p>An EMI Calculator helps you estimate your monthly loan repayments. It takes into account the principal amount, interest rate, and tenure.</p>`,
        keyTakeaways: ["Plan monthly budgets", "Compare loan scenarios"],
        faq: [{ question: "How is EMI calculated?", answer: "EMI = P x R x (1+R)^N / [(1+R)^N-1]" }]
      }
    },
    'home-loan-calculator': {
      title: "Home Loan EMI Calculator",
      metaDescription: "Calculate your Home Loan EMI instantly. Plan your housing finance with accurate monthly repayment estimates.",
      content: {
        heading: "Planning Your Dream Home",
        body: `<p>A Home Loan is a long-term commitment. Use this calculator to understand how much your dream home will cost you monthly. Adjust the tenure to see how it affects your EMI and total interest payable.</p>`,
        keyTakeaways: ["Check affordability", "Optimize tenure for lower interest", "Plan prepayments"],
        faq: [
          { question: "What is a good tenure for a home loan?", answer: "A shorter tenure saves interest, while a longer tenure reduces monthly EMI. 15-20 years is common." },
          { question: "Are home loan rates fixed?", answer: "Most are floating rates linked to the repo rate." }
        ]
      }
    },
    'car-loan-calculator': {
      title: "Car Loan EMI Calculator",
      metaDescription: "Calculate Car Loan EMI. Check affordability for your new car purchase with our auto loan calculator.",
      content: {
        heading: "Drive Your Dream Car",
        body: `<p>Financing a car requires smart planning. Cars are depreciating assets, so minimizing interest outgo is key. Use this tool to find the sweet spot between a comfortable EMI and low total interest.</p>`,
        keyTakeaways: ["Keep tenure short (3-5 years)", "Check down payment impact"],
        faq: [{ question: "Do car loans have prepayment charges?", answer: "Yes, many banks charge a penalty for foreclosing car loans early." }]
      }
    },
    'education-loan-calculator': {
      title: "Education Loan EMI Calculator",
      metaDescription: "Calculate Education Loan EMI. Plan your repayment schedule for higher studies.",
      content: {
        heading: "Invest in Your Future",
        body: `<p>Education loans help bridge the gap between the cost of higher education and your savings. Use this calculator to estimate the EMI burden after the moratorium period.</p>`,
        keyTakeaways: ["Moratorium period benefit", "Tax deduction under Section 80E"],
        faq: [{ question: "When does repayment start?", answer: "Usually 6 months to 1 year after course completion." }]
      }
    },
    'sip-calculator': {
      title: "SIP Calculator - Mutual Fund Returns",
      metaDescription: "Estimate returns on your Systematic Investment Plan (SIP) investments.",
      content: {
        heading: "Power of Compounding with SIP",
        body: `<p>A <strong>Systematic Investment Plan (SIP)</strong> allows you to invest small amounts periodically. It averages out market volatility and builds wealth over time.</p>`,
        keyTakeaways: ["Rupee Cost Averaging", "Disciplined investing", "Power of compounding"],
        faq: [{ question: "Can I stop SIP anytime?", answer: "Yes, SIPs are flexible and can be paused or stopped without penalty." }]
      }
    },
    'step-up-sip-calculator': {
      title: "Step-up SIP Calculator",
      metaDescription: "Calculate returns with an annual increase in your SIP investment amount.",
      content: {
        heading: "Supercharge Wealth with Step-up SIP",
        body: `<p>A Step-up SIP allows you to increase your monthly investment amount periodically (usually annually) in line with your income growth. This small change can lead to a massive difference in your final corpus.</p>`,
        keyTakeaways: ["Beat inflation effectively", "Match investment with salary hikes", "Reach goals faster"],
        faq: [{ question: "What is a good step-up percentage?", answer: "A 10% annual increase is a good standard to follow." }]
      }
    },
    'lumpsum-calculator': {
      title: "Lumpsum Investment Calculator",
      metaDescription: "Calculate returns on your one-time mutual fund investment.",
      content: {
        heading: "Grow Your Lumpsum Investment",
        body: `<p>If you have a surplus amount, investing it as a lumpsum can generate significant returns over time. This calculator helps you project the future value of your one-time investment.</p>`,
        keyTakeaways: ["Ideal for bonus/windfall money", "Long-term growth potential"],
        faq: [{ question: "Is Lumpsum better than SIP?", answer: "In a rising market, Lumpsum often outperforms. In volatile markets, SIP reduces risk." }]
      }
    },
    'fd-calculator': {
      title: "Fixed Deposit (FD) Calculator",
      metaDescription: "Calculate maturity amount and interest earned on Fixed Deposits.",
      content: {
        heading: "Secure Returns with Fixed Deposits",
        body: `<p>Fixed Deposits are one of the safest investment options. They offer guaranteed returns. This calculator computes the maturity value based on quarterly or annual compounding.</p>`,
        keyTakeaways: ["Guaranteed returns", "Safe investment", "High liquidity options available"],
        faq: [{ question: "Is FD interest taxable?", answer: "Yes, interest exceeding specific limits is subject to TDS and is added to your taxable income." }]
      }
    },
    'rd-calculator': {
      title: "Recurring Deposit (RD) Calculator",
      metaDescription: "Calculate maturity value of your Recurring Deposit accounts.",
      content: {
        heading: "Build Savings with RD",
        body: `<p>Recurring Deposits help you save a fixed amount every month with the safety of a bank deposit. It's like an SIP but for risk-averse investors.</p>`,
        keyTakeaways: ["Forceful savings habit", "Fixed interest rates", "Safe capital"],
        faq: [{ question: "How is RD interest calculated?", answer: "It is usually compounded quarterly on the deposited balance." }]
      }
    },
    'ppf-calculator': {
      title: "PPF Calculator - Public Provident Fund",
      metaDescription: "Calculate your PPF maturity amount and interest earned over 15 years.",
      content: {
        heading: "Public Provident Fund (PPF)",
        body: `<p>PPF is a government-backed long-term savings scheme. It offers tax-free returns and is one of the most popular retirement tools in India. The lock-in period is 15 years.</p>`,
        keyTakeaways: ["EEE Tax Benefit (Exempt-Exempt-Exempt)", "Risk-free returns", "15-year lock-in"],
        faq: [{ question: "What is the max investment?", answer: "You can invest up to ₹1.5 Lakh per financial year." }]
      }
    },
    'ssy-calculator': {
      title: "Sukanya Samriddhi Yojana (SSY) Calculator",
      metaDescription: "Calculate returns for Sukanya Samriddhi Yojana scheme for a girl child.",
      content: {
        heading: "Secure Her Future with SSY",
        body: `<p>Sukanya Samriddhi Yojana is a government savings scheme for the girl child. It offers a higher interest rate than PPF and tax benefits under 80C.</p>`,
        keyTakeaways: ["Highest government interest rate", "Tax-free maturity", "Dedicated to girl child education/marriage"],
        faq: [{ question: "Who can open an SSY account?", answer: "Parents of a girl child below 10 years of age." }]
      }
    },
    'simple-interest-calculator': {
      title: "Simple Interest Calculator",
      metaDescription: "Calculate simple interest on loans or savings.",
      content: {
        heading: "Simple Interest Calculation",
        body: `<p>The most basic way to calculate interest. It is calculated only on the principal amount, unlike compound interest which earns interest on interest.</p>`,
        keyTakeaways: ["Formula: P * R * T / 100", "Used for short term loans"],
        faq: []
      }
    },
    'inflation-calculator': {
      title: "Inflation Calculator - Future Value of Money",
      metaDescription: "Calculate what your money will be worth in the future adjusted for inflation.",
      content: {
        heading: "Beat Inflation",
        body: `<p>Inflation erodes the purchasing power of money. ₹100 today will not buy the same amount of goods 10 years from now. Use this tool to plan your retirement and long-term goals effectively.</p>`,
        keyTakeaways: ["Understand real returns", "Plan for rising costs"],
        faq: [{ question: "What is the average inflation rate?", answer: "In developing economies like India, it typically hovers around 5-7%." }]
      }
    },
    'gst-calculator': {
      title: "GST Calculator",
      metaDescription: "Calculate GST inclusive and exclusive amounts.",
      content: {
        heading: "GST Calculation Made Easy",
        body: `<p>Calculate Goods and Services Tax instantly. Useful for billing, invoicing, and checking MRP breakup.</p>`,
        keyTakeaways: ["Inclusive & Exclusive calculations", "Standard tax slabs"],
        faq: [{ question: "What is GST?", answer: "It is a destination-based tax on consumption of goods and services." }]
      }
    },
    'income-tax-calculator': {
      title: "Income Tax Calculator India FY 2024-25",
      metaDescription: "Calculate your income tax liability under Old vs New Regime for FY 2024-25. Plan your taxes efficiently.",
      content: {
        heading: "Income Tax Calculator: Old vs New Regime",
        body: `<p>Choosing between the Old and New Tax Regime can be confusing. The <strong>New Regime</strong> offers lower tax rates but fewer deductions. The <strong>Old Regime</strong> allows exemptions.</p>`,
        keyTakeaways: ["Compare Old vs New Regime", "Check tax breakdown", "Plan tax saving investments"],
        faq: [
          { question: "Is standard deduction available in New Regime?", answer: "Yes, a standard deduction of ₹50,000 is now available in the New Regime as well." }
        ]
      }
    },
    'retirement-calculator': {
      title: "Retirement Planner - Plan Your Golden Years",
      metaDescription: "How much do you need to retire? Use our Retirement Planner to calculate your corpus requirement.",
      content: {
        heading: "Plan Your Retirement Early",
        body: `<p>Retirement planning is about ensuring you have enough money to maintain your lifestyle when you stop working.</p>`,
        keyTakeaways: ["Factor in inflation", "Start early", "Estimate monthly pension"],
        faq: []
      }
    },
    'net-worth-calculator': {
      title: "Net Worth Calculator",
      metaDescription: "Calculate your personal net worth by assessing assets and liabilities.",
      content: {
        heading: "Know Your Financial Health",
        body: `<p>Your net worth is the single most important number in personal finance. It is the difference between what you own (Assets) and what you owe (Liabilities).</p>`,
        keyTakeaways: ["Track financial progress", "Assets - Liabilities = Net Worth"],
        faq: []
      }
    },
    'emergency-fund-calculator': {
      title: "Emergency Fund Calculator",
      metaDescription: "Calculate how much you need to save for financial emergencies.",
      content: {
        heading: "Build a Safety Net",
        body: `<p>An emergency fund covers your expenses during unforeseen events like job loss or medical emergencies. Experts recommend saving 6-12 months of living expenses.</p>`,
        keyTakeaways: ["High liquidity savings", "Safety first", "Stress-free life"],
        faq: []
      }
    },
    'roi-calculator': {
      title: "ROI Calculator - Return on Investment",
      metaDescription: "Calculate the Return on Investment (ROI) and annualized returns for your business or personal investments.",
      content: {
        heading: "Calculate Your Profitability",
        body: `<p><strong>Return on Investment (ROI)</strong> is a performance measure used to evaluate the efficiency of an investment.</p>`,
        keyTakeaways: ["Simple ROI Formula", "Annualized Return Calculation"],
        faq: []
      }
    },
    'margin-calculator': {
      title: "Margin Calculator",
      metaDescription: "Calculate profit margin, markup, revenue and cost.",
      content: {
        heading: "Profit Margin Calculator",
        body: `<p>Understand the profitability of your products. Calculate gross margin and markup percentage to set the right pricing strategy.</p>`,
        keyTakeaways: ["Margin vs Markup", "Set profitable prices"],
        faq: []
      }
    },
    'break-even-calculator': {
      title: "Break-Even Point Calculator",
      metaDescription: "Calculate the break-even point for your business to determine when you will start making a profit.",
      content: {
        heading: "Find Your Break-Even Point",
        body: `<p>The break-even point is where total costs equal total revenue. Knowing this helps you determine the minimum sales required to avoid a loss.</p>`,
        keyTakeaways: ["Fixed vs Variable Costs", "Sales targets"],
        faq: []
      }
    },
    'math-calculator': {
      title: "Scientific Math Calculator - Basic & Advanced",
      metaDescription: "Free online scientific calculator for basic arithmetic, trigonometry, logarithms, and more. Solve complex math problems instantly.",
      content: {
        heading: "Advanced Scientific Calculator",
        body: `<p>Perform comprehensive mathematical calculations directly in your browser. Whether you need simple arithmetic (add, subtract, multiply, divide) or complex scientific functions like Trigonometry (Sin, Cos, Tan), Logarithms, or Exponents, this tool handles it all.</p>
        <p>This calculator supports standard PEMDAS order of operations and includes features like calculation history to track your work.</p>`,
        keyTakeaways: ["Trigonometry (RAD/DEG)", "Logarithmic functions", "Calculation History", "Responsive design"],
        faq: [
          { question: "Does it follow order of operations?", answer: "Yes, it follows the standard mathematical order (BODMAS/PEMDAS)." },
          { question: "How do I switch between Degrees and Radians?", answer: "Use the toggle button 'DEG/RAD' on the calculator screen." }
        ]
      }
    },

    // STATIC PAGES
    'about': {
      title: "About EARNWERN.IN - Your Trusted Financial Companion",
      metaDescription: "EARNWERN.IN offers free, professional-grade financial calculators and product comparisons. Learn about our mission to simplify personal finance for everyone.",
      content: {
        heading: "Empowering Your Financial Journey",
        body: `
          <p class="lead text-xl text-slate-600 mb-6">At <strong>EARNWERN.IN</strong>, we believe that financial freedom starts with the right numbers. We are a premier digital platform dedicated to demystifying complex financial concepts through intuitive tools, accurate calculators, and unbiased product insights.</p>
          
          <h2 class="text-2xl font-bold text-slate-800 mt-8 mb-4">Who We Are</h2>
          <p>Founded with a vision to make financial planning accessible to every Indian household, EARNWERN.IN bridges the gap between complex banking formulas and everyday decision-making. Whether you are a student planning an education loan, a professional calculating tax liabilities, or a retiree managing a pension corpus, our tools are designed for you.</p>

          <h2 class="text-2xl font-bold text-slate-800 mt-8 mb-4">What We Offer</h2>
          <ul class="list-disc pl-5 space-y-2 text-slate-700">
            <li><strong>Advanced Financial Calculators:</strong> From <a href="#/calculator/emi-calculator" class="text-blue-600 hover:underline">EMI</a> and <a href="#/calculator/sip-calculator" class="text-blue-600 hover:underline">SIP calculators</a> to complex Income Tax and GST computations, our algorithms are rigorously tested for accuracy.</li>
            <li><strong>Product Marketplace:</strong> We curate and compare the best credit cards, loans, and insurance policies, helping you find products that truly match your needs.</li>
            <li><strong>Financial Education:</strong> Our goal isn't just to give you a number, but to help you understand what it means for your future wealth.</li>
          </ul>

          <h2 class="text-2xl font-bold text-slate-800 mt-8 mb-4">Our Commitment to Accuracy</h2>
          <p>In the world of finance, precision is paramount. Our team of financial analysts and developers works tirelessly to ensure that every tool on EARNWERN.IN is up-to-date with the latest RBI guidelines, tax regimes (Old vs New), and market trends.</p>
        `,
        keyTakeaways: ["100% Free & Easy to Use", "Updated for FY 2024-25", "Privacy-Focused Architecture"],
        faq: []
      }
    },
    'contact': {
      title: "Contact EARNWERN.IN - Support & Partnerships",
      metaDescription: "Have questions or suggestions? Contact the EARNWERN.IN team. We are here to help you with our financial tools and services.",
      content: {
        heading: "Get in Touch",
        body: `
          <p class="mb-6">We value your feedback and are always eager to assist you. Whether you have a query about a specific calculation, found a bug, or want to explore partnership opportunities, our team is ready to listen.</p>

          <div class="grid md:grid-cols-2 gap-8 mt-8">
            <div class="bg-blue-50 p-6 rounded-xl border border-blue-100">
              <h3 class="font-bold text-lg text-blue-900 mb-2">General Inquiries</h3>
              <p class="text-slate-700 mb-4">For support, feedback, or general questions about our tools.</p>
              <a href="mailto:pawandigitalcenter@gmail.com" class="flex items-center gap-2 text-blue-600 font-bold hover:underline">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                pawandigitalcenter@gmail.com
              </a>
            </div>

            <div class="bg-green-50 p-6 rounded-xl border border-green-100">
              <h3 class="font-bold text-lg text-green-900 mb-2">Business & Advertising</h3>
              <p class="text-slate-700 mb-4">For advertising placements, affiliate partnerships, and media queries.</p>
              <a href="mailto:pawandigitalcenter@gmail.com" class="flex items-center gap-2 text-green-600 font-bold hover:underline">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                Partner with Us
              </a>
            </div>
          </div>

          <h3 class="text-xl font-bold text-slate-800 mt-10 mb-4">Response Time</h3>
          <p>We aim to respond to all legitimate inquiries within 24-48 business hours. Please note that we do not provide personalized financial advice via email.</p>
        `,
        keyTakeaways: [],
        faq: []
      }
    },
    'privacy': {
      title: "Privacy Policy - EARNWERN.IN",
      metaDescription: "EARNWERN.IN is committed to protecting your privacy. Read our policy to understand how we handle data and cookies.",
      content: {
        heading: "Privacy Policy",
        body: `
          <p class="text-slate-500 italic mb-6">Last Updated: October 2023</p>
          <p>At <strong>EARNWERN.IN</strong>, accessible from our website, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by EARNWERN.IN and how we use it.</p>

          <h3 class="text-xl font-bold text-slate-800 mt-8 mb-3">1. Data Handling & Security</h3>
          <p><strong>We do not store your financial data.</strong> All inputs provided in our calculators (such as loan amounts, salary details, or investment figures) are processed locally within your browser or temporarily for calculation purposes only. We do not save, share, or transmit this sensitive personal financial information to any server or database.</p>

          <h3 class="text-xl font-bold text-slate-800 mt-8 mb-3">2. Log Files</h3>
          <p>EARNWERN.IN follows a standard procedure of using log files. These files log visitors when they visit websites. The information collected includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date/time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable.</p>

          <h3 class="text-xl font-bold text-slate-800 mt-8 mb-3">3. Cookies and Web Beacons</h3>
          <p>Like any other website, EARNWERN.IN uses "cookies". These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.</p>

          <h3 class="text-xl font-bold text-slate-800 mt-8 mb-3">4. Google AdSense & DoubleClick DART Cookie</h3>
          <p>Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to www.website.com and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy.</p>

          <h3 class="text-xl font-bold text-slate-800 mt-8 mb-3">5. Affiliate Disclosure</h3>
          <p>Some links on this website are affiliate links. This means if you click on the link and purchase the item or sign up for a service, we may receive an affiliate commission at no extra cost to you. This helps support the maintenance of our free tools.</p>

          <h3 class="text-xl font-bold text-slate-800 mt-8 mb-3">6. Consent</h3>
          <p>By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions.</p>
        `,
        keyTakeaways: ["No Storage of Personal Financial Data", "Transparent Cookie Usage", "AdSense & Affiliate Compliance"],
        faq: []
      }
    },
    'disclaimer': {
      title: "Disclaimer & Terms of Use - EARNWERN.IN",
      metaDescription: "Read the disclaimer for EARNWERN.IN. Our tools are for informational purposes only and do not constitute financial advice.",
      content: {
        heading: "Disclaimer",
        body: `
          <div class="bg-amber-50 border-l-4 border-amber-500 p-4 mb-8">
            <p class="font-bold text-amber-800">Important: Not Financial Advice</p>
            <p class="text-amber-700">The content and tools provided on EARNWERN.IN are for educational and informational purposes only.</p>
          </div>

          <h3 class="text-xl font-bold text-slate-800 mt-6 mb-3">1. Accuracy of Calculators</h3>
          <p>While we strive to ensure that all our calculators (EMI, SIP, Income Tax, etc.) are accurate and up-to-date, we cannot guarantee the absolute precision of the results. Financial figures can vary based on bank policies, changing government regulations, dates of calculation, and minor rounding differences. Users are advised to verify the results with their respective banks or financial institutions before making any commitments.</p>

          <h3 class="text-xl font-bold text-slate-800 mt-8 mb-3">2. No Professional Advice</h3>
          <p>EARNWERN.IN is not a registered investment advisor, broker, or tax consultant. The information on this website should not be construed as professional financial, legal, or tax advice. You should consult with a qualified professional (CA, Certified Financial Planner) before making significant financial decisions.</p>

          <h3 class="text-xl font-bold text-slate-800 mt-8 mb-3">3. Affiliate Links & Advertising</h3>
          <p>This website may contain links to third-party websites or services (such as credit card applications or loan providers). EARNWERN.IN may earn a commission if you apply for products through these links. However, this does not influence our unbiased comparisons. We do not endorse or guarantee the services of any third-party provider.</p>

          <h3 class="text-xl font-bold text-slate-800 mt-8 mb-3">4. Limitation of Liability</h3>
          <p>In no event shall EARNWERN.IN or its owners be liable for any special, direct, indirect, consequential, or incidental damages or any damages whatsoever, whether in an action of contract, negligence or other tort, arising out of or in connection with the use of the Service or the contents of the Service.</p>
        `,
        keyTakeaways: ["Educational Purpose Only", "Verify with Banks", "Consult Professionals"],
        faq: []
      }
    }
  };

  return contentMap[type] || defaults;
};