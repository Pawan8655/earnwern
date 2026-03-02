import React from 'react';
import { X, Check, Star, ExternalLink } from 'lucide-react';
import { Product } from '../types';

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
}

const ComparisonModal: React.FC<ComparisonModalProps> = ({ isOpen, onClose, products }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col animate-fade-in-up">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Compare Products</h2>
            <p className="text-sm text-gray-500">Comparing {products.length} items</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500">
            <X size={24} />
          </button>
        </div>

        {/* Comparison Table Container */}
        <div className="overflow-x-auto flex-1 p-6 custom-scrollbar">
          <div className="min-w-[800px]">
            <div className="grid gap-6" style={{ gridTemplateColumns: `150px repeat(${products.length}, 1fr)` }}>
              
              {/* Row: Header / Image */}
              <div className="font-bold text-gray-400 text-sm uppercase pt-10">Product</div>
              {products.map(product => (
                <div key={product.id} className="text-center">
                  <div className="h-32 mb-4 rounded-lg overflow-hidden border border-gray-100 shadow-sm relative group">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded text-xs font-bold shadow text-gray-800">{product.type.replace('_', ' ')}</div>
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 leading-tight mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-500">{product.provider}</p>
                </div>
              ))}

              {/* Row: Rating */}
              <div className="font-bold text-gray-900 text-sm py-4 border-t border-gray-100">Rating</div>
              {products.map(product => (
                <div key={product.id} className="py-4 border-t border-gray-100 flex justify-center">
                  <div className="inline-flex items-center bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-sm font-bold border border-yellow-100">
                    {product.rating} <Star size={14} fill="currentColor" className="ml-1" />
                  </div>
                </div>
              ))}

              {/* Row: Features */}
              <div className="font-bold text-gray-900 text-sm py-4 border-t border-gray-100">Key Features</div>
              {products.map(product => (
                <div key={product.id} className="py-4 border-t border-gray-100">
                  <ul className="space-y-3">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-start text-left">
                        <Check size={16} className="text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Row: Action */}
              <div className="pt-6"></div>
              {products.map(product => (
                <div key={product.id} className="pt-6">
                  <a href={product.applyLink} target="_blank" rel="noopener noreferrer" className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-200 hover:shadow-blue-300 flex items-center justify-center gap-2">
                     Apply Now <ExternalLink size={16} />
                  </a>
                </div>
              ))}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonModal;
