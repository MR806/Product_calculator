import React, { useState } from 'react';
import { Trash2, TrendingUp, Cpu, ChevronDown, ChevronUp, Package, Percent, Target, Edit3 } from 'lucide-react';

export default function HistoryView({ history, deleteBudget, onEdit }) {
  const [expandedId, setExpandedId] = useState(null);

  const formatMZN = (value) => 
    new Intl.NumberFormat('pt-MZ', { style: 'currency', currency: 'MZN' }).format(value);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleEdit = (e, budget) => {
    e.stopPropagation();
    onEdit(budget);
  };

  const obterAnaliseConcorrencia = (budget) => {
    if (!budget.precoConcorrente || Number(budget.precoConcorrente) <= 0) return null;

    const precoFinal = budget.sellPrice;
    const precoConcorrenteNum = Number(budget.precoConcorrente);
    const diferenca = precoFinal - precoConcorrenteNum;
    const diferencaPercentual = (diferenca / precoConcorrenteNum) * 100;

    if (precoFinal <= precoConcorrenteNum) {
      return {
        titulo: "Altamente Competitivo",
        mensagem: `O preço de ${formatMZN(precoFinal)} está ${formatMZN(Math.abs(diferenca))} abaixo do mercado.`,
        estilo: "bg-green-50 text-green-800 border-green-200"
      };
    } else if (diferencaPercentual <= 15) {
      return {
        titulo: "Ligeiramente Acima",
        mensagem: `O preço está ${diferencaPercentual.toFixed(1)}% acima do mercado.`,
        estilo: "bg-yellow-50 text-yellow-800 border-yellow-200"
      };
    } else {
      return {
        titulo: "Fora de Mercado",
        mensagem: `Atenção: o preço está ${diferencaPercentual.toFixed(1)}% acima da concorrência.`,
        estilo: "bg-red-50 text-red-800 border-red-200"
      };
    }
  };

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
        {history.map((budget) => {
          const isExpanded = expandedId === budget.id;
          const analise = obterAnaliseConcorrencia(budget);

          return (
            <div 
              key={budget.id} 
              className={`bg-white rounded-2xl shadow-sm border transition-all duration-300 overflow-hidden group cursor-pointer ${
                isExpanded ? 'ring-2 ring-blue-500 border-transparent shadow-xl' : 'border-gray-100 hover:shadow-md'
              }`}
              onClick={() => toggleExpand(budget.id)}
            >
              <div className="p-6 relative">
                <div className="absolute top-4 right-4 flex items-center space-x-1">
                  <button 
                    onClick={(e) => handleEdit(e, budget)}
                    className="text-gray-400 hover:text-blue-500 transition-colors p-2 hover:bg-blue-50 rounded-full"
                    title="Editar Orçamento"
                  >
                    <Edit3 className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteBudget(budget.id);
                    }}
                    className="text-gray-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-full"
                    title="Excluir Orçamento"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <div className="text-gray-300 p-1">
                    {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="text-lg font-bold text-gray-900 pr-16 truncate">{budget.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(budget.date).toLocaleDateString('pt-MZ', {
                      day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                    })}
                  </p>
                </div>

                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span className="flex items-center"><Package className="h-3 w-3 mr-1 opacity-50" /> Material ({budget.weight}g)</span>
                    <span>{formatMZN(budget.materialCost)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span className="flex items-center"><Cpu className="h-3 w-3 mr-1 opacity-50" /> Energia ({budget.time}h)</span>
                    <span>{formatMZN(budget.energyCost)}</span>
                  </div>
                  
                  {isExpanded && (
                    <div className="space-y-2 pt-2 animate-in fade-in slide-in-from-top-2 duration-300">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span className="flex items-center"><Package className="h-3 w-3 mr-1 opacity-50" /> Embalagem</span>
                        <span>{formatMZN(budget.packaging || 0)}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span className="flex items-center"><Percent className="h-3 w-3 mr-1 opacity-50" /> Margem de Lucro</span>
                        <span>{budget.margin}%</span>
                      </div>
                      {budget.precoConcorrente > 0 && (
                        <div className="flex justify-between text-sm text-gray-600">
                          <span className="flex items-center"><Target className="h-3 w-3 mr-1 opacity-50" /> Ref. Mercado</span>
                          <span>{formatMZN(budget.precoConcorrente)}</span>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="border-t border-gray-100 pt-2 mt-2"></div>
                  <div className="flex justify-between text-sm text-gray-800 font-medium">
                    <span>Custo de Fabricação</span>
                    <span>{formatMZN(budget.manufacturingCost)}</span>
                  </div>
                </div>

                <div className={`${isExpanded ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-900'} rounded-xl p-4 flex justify-between items-center transition-colors duration-300`}>
                  <div>
                    <div className={`text-xs font-semibold mb-1 flex items-center ${isExpanded ? 'text-blue-100' : 'text-blue-600'}`}>
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Preço Final
                    </div>
                    <div className="text-xl font-bold tracking-tight">
                      {formatMZN(budget.sellPrice)}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-[10px] uppercase tracking-wider font-bold ${isExpanded ? 'text-blue-200' : 'text-gray-500'}`}>Lucro</div>
                    <div className={`text-sm font-semibold ${isExpanded ? 'text-green-300' : 'text-green-600'}`}>
                      +{formatMZN(budget.profit)}
                    </div>
                  </div>
                </div>

                {isExpanded && analise && (
                  <div className={`mt-4 p-3 rounded-xl border ${analise.estilo} animate-in fade-in slide-in-from-top-2 duration-500`}>
                    <div className="text-[10px] font-bold uppercase tracking-wider mb-1 opacity-80">{analise.titulo}</div>
                    <p className="text-xs font-medium leading-tight">{analise.mensagem}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
