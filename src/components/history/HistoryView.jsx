import React from 'react';
import { Trash2, TrendingUp, Cpu } from 'lucide-react';

export default function HistoryView({ history, deleteBudget }) {
  const formatMZN = (value) => 
    new Intl.NumberFormat('pt-MZ', { style: 'currency', currency: 'MZN' }).format(value);

  if (!history || history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl shadow-sm border border-gray-100 mt-8">
        <div className="bg-gray-50 p-4 rounded-full mb-4">
          <Cpu className="h-12 w-12 text-gray-400" />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Nenhum orçamento salvo</h3>
        <p className="text-gray-500 text-center max-w-sm">
          Seus orçamentos salvos aparecerão aqui. Use a calculadora para criar o seu primeiro orçamento!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 mt-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Seus Orçamentos</h2>
        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
          {history.length} salvos
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {history.map((budget) => (
          <div key={budget.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={() => deleteBudget(budget.id)}
                className="text-gray-400 hover:text-red-500 transition-colors p-2 bg-white rounded-full shadow-sm"
                title="Excluir Orçamento"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-bold text-gray-900 pr-10 truncate">{budget.name}</h3>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(budget.date).toLocaleDateString('pt-MZ', {
                  day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                })}
              </p>
            </div>

            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Material ({budget.weight}g)</span>
                <span>{formatMZN(budget.materialCost)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Energia ({budget.time}h)</span>
                <span>{formatMZN(budget.energyCost)}</span>
              </div>
              <div className="border-t border-gray-100 pt-2 mt-2"></div>
              <div className="flex justify-between text-sm text-gray-800 font-medium">
                <span>Custo Ref.</span>
                <span>{formatMZN(budget.manufacturingCost)}</span>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-4 flex justify-between items-center">
              <div>
                <div className="text-xs text-blue-600 font-semibold mb-1 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Preço Final
                </div>
                <div className="text-xl font-bold text-blue-900 tracking-tight">
                  {formatMZN(budget.sellPrice)}
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Lucro</div>
                <div className="text-sm font-semibold text-green-600">
                  +{formatMZN(budget.profit)}
                </div>
              </div>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}
