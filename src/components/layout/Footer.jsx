import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-12 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <p className="text-sm text-gray-500 font-medium">
            PrintCalc A1 &copy; {new Date().getFullYear()} - Calculadora para Bambu Lab A1
          </p>
        </div>
        <div className="flex space-x-4">
          <span className="text-xs text-gray-400">Feito com React + Tailwind</span>
        </div>
      </div>
    </footer>
  );
}
