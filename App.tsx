import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';

// Core Pages
const Home = lazy(() => import('./pages/Home'));
const ToolsHub = lazy(() => import('./pages/ToolsHub'));
const Products = lazy(() => import('./pages/Products'));
const StaticPage = lazy(() => import('./pages/StaticPage'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));

// Calculators
const EMICalculator = lazy(() => import('./pages/calculators/EMICalculator'));
const SIPCalculator = lazy(() => import('./pages/calculators/SIPCalculator'));
const GSTCalculator = lazy(() => import('./pages/calculators/GSTCalculator'));
const FDCalculator = lazy(() => import('./pages/calculators/FDCalculator'));
const RDCalculator = lazy(() => import('./pages/calculators/RDCalculator'));
const LumpsumCalculator = lazy(() => import('./pages/calculators/LumpsumCalculator'));
const InflationCalculator = lazy(() => import('./pages/calculators/InflationCalculator'));
const IncomeTaxCalculator = lazy(() => import('./pages/calculators/IncomeTaxCalculator'));
const RetirementCalculator = lazy(() => import('./pages/calculators/RetirementCalculator'));
const ROICalculator = lazy(() => import('./pages/calculators/ROICalculator'));
const GovernmentSchemeCalculator = lazy(() => import('./pages/calculators/GovernmentSchemeCalculator'));
const BusinessCalculator = lazy(() => import('./pages/calculators/BusinessCalculator'));
const PersonalPlanningCalculator = lazy(() => import('./pages/calculators/PersonalPlanningCalculator'));
const SimpleInterestCalculator = lazy(() => import('./pages/calculators/SimpleInterestCalculator'));
const MathCalculator = lazy(() => import('./pages/calculators/MathCalculator'));

const PageLoader = () => (
  <div className="container mx-auto px-4 py-12">
    <div className="h-64 w-full bg-slate-200 animate-pulse rounded-3xl"></div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
      <div className="h-96 bg-slate-100 animate-pulse rounded-3xl"></div>
      <div className="h-96 bg-slate-100 animate-pulse rounded-3xl"></div>
    </div>
  </div>
);

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/tools" element={<ToolsHub />} />

            {/* Product Routes for SEO */}
            <Route path="/products" element={<Products />} />
            <Route path="/products/:categorySlug" element={<Products />} />
            <Route path="/product/:productSlug" element={<ProductDetail />} />

            {/* Blog Routes */}
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />

            {/* Calculators Routes */}
            <Route path="/calculator/emi-calculator" element={<EMICalculator type="default" />} />
            <Route path="/calculator/home-loan-calculator" element={<EMICalculator type="home" />} />
            <Route path="/calculator/car-loan-calculator" element={<EMICalculator type="car" />} />
            <Route path="/calculator/personal-loan-calculator" element={<EMICalculator type="personal" />} />
            <Route path="/calculator/education-loan-calculator" element={<EMICalculator type="education" />} />

            <Route path="/calculator/sip-calculator" element={<SIPCalculator variant="normal" />} />
            <Route path="/calculator/step-up-sip-calculator" element={<SIPCalculator variant="step-up" />} />

            <Route path="/calculator/gst-calculator" element={<GSTCalculator />} />
            <Route path="/calculator/fd-calculator" element={<FDCalculator />} />
            <Route path="/calculator/rd-calculator" element={<RDCalculator />} />
            <Route path="/calculator/lumpsum-calculator" element={<LumpsumCalculator />} />
            <Route path="/calculator/inflation-calculator" element={<InflationCalculator />} />
            <Route path="/calculator/income-tax-calculator" element={<IncomeTaxCalculator />} />
            <Route path="/calculator/retirement-calculator" element={<RetirementCalculator />} />
            <Route path="/calculator/roi-calculator" element={<ROICalculator />} />

            <Route path="/calculator/ppf-calculator" element={<GovernmentSchemeCalculator type="ppf" />} />
            <Route path="/calculator/ssy-calculator" element={<GovernmentSchemeCalculator type="ssy" />} />

            <Route path="/calculator/margin-calculator" element={<BusinessCalculator type="margin" />} />
            <Route path="/calculator/break-even-calculator" element={<BusinessCalculator type="break-even" />} />

            <Route path="/calculator/net-worth-calculator" element={<PersonalPlanningCalculator type="net-worth" />} />
            <Route path="/calculator/emergency-fund-calculator" element={<PersonalPlanningCalculator type="emergency-fund" />} />

            <Route path="/calculator/simple-interest-calculator" element={<SimpleInterestCalculator />} />

            <Route path="/calculator/math-calculator" element={<MathCalculator />} />

            {/* Static Pages */}
            <Route path="/about" element={<StaticPage type="about" />} />
            <Route path="/contact" element={<StaticPage type="contact" />} />
            <Route path="/privacy" element={<StaticPage type="privacy" />} />
            <Route path="/disclaimer" element={<StaticPage type="disclaimer" />} />
            <Route path="/terms" element={<StaticPage type="disclaimer" />} />

            {/* Fallbacks */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
};

export default App;