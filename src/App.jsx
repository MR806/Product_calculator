import React, { useState } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CalculatorForm from './components/calculator/CalculatorForm';
import ResultsCard from './components/calculator/ResultsCard';
import HistoryView from './components/history/HistoryView';
import { useCalculadora } from './hooks/useCalculadora';

function App() {
  const [currentView, setCurrentView] = useState('calculator'); // 'calculator' | 'history'
  
  const { 
    formData, 
    handleChange, 
    results, 
    saveBudget, 
    history, 
    deleteBudget,
    resetForm,
    loadBudget
  } = useCalculadora();

  const handleEditBudget = (budget) => {
    loadBudget(budget);
    setCurrentView('calculator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-gray-50 selection:bg-blue-200">
      <Navbar currentView={currentView} setCurrentView={setCurrentView} />
      
      <main className="flex-grow flex flex-col px-4 sm:px-6 lg:px-8 max-w-7xl w-full mx-auto py-8">
        {currentView === 'calculator' && (
          <div className="flex-grow animate-in fade-in duration-300">
            <div className="mb-8">
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Calculadora de Impressão 3D</h1>
              <p className="text-gray-500 mt-2 text-lg">Otimizada para Bambu Lab A1 - Calcule seus custos e preço de venda sugerido.</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <CalculatorForm 
                  formData={formData} 
                  handleChange={handleChange} 
                />
              </div>
              <div className="lg:col-span-1">
                <ResultsCard 
                  formData={formData}
                  results={results}
                  saveBudget={saveBudget}
                  resetForm={resetForm}
                />
              </div>
            </div>
          </div>
        )}

        {currentView === 'history' && (
          <div className="flex-grow animate-in fade-in duration-300 slide-in-from-bottom-4">
            <HistoryView 
              history={history} 
              deleteBudget={deleteBudget} 
              onEdit={handleEditBudget}
            />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
