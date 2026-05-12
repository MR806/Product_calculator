import React from 'react';
import { Calculator } from 'lucide-react';

export default function Navbar({ currentView, setCurrentView }) {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Calculator className="h-8 w-8 text-blue-600 mr-2" />
            <span className="font-bold text-xl text-gray-900 tracking-tight">PrintCalc A1</span>
          </div>
          <div className="flex space-x-4 items-center">
            <button
              onClick={() => setCurrentView('calculator')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentView === 'calculator'
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              Calculadora
            </button>
            <button
              onClick={() => setCurrentView('history')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentView === 'history'
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              Histórico
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
