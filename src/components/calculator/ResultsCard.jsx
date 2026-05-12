import React, { useState } from 'react';
import { Save, CheckCircle } from 'lucide-react';

export default function ResultsCard({ results, formData, saveBudget, resetForm }) {
  const [showToast, setShowToast] = useState(false);

  const formatMZN = (value) => {
    return new Intl.NumberFormat('pt-MZ', {
      style: 'currency',
      currency: 'MZN'
    }).format(value);
  };

  const handleSave = () => {
    if (!formData.name) return;
    saveBudget();
    resetForm();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const obterAnaliseConcorrencia = () => {
    if (!formData.precoConcorrente || Number(formData.precoConcorrente) <= 0) return null;

    const precoFinal = results.sellPrice;
    const precoConcorrenteNum = Number(formData.precoConcorrente);
    const diferenca = precoFinal - precoConcorrenteNum;
    const diferencaPercentual = (diferenca / precoConcorrenteNum) * 100;

    if (precoFinal <= precoConcorrenteNum) {
      return {
        titulo: "Altamente Competitivo",
        mensagem: `O seu preço está ${formatMZN(Math.abs(diferenca))} abaixo do mercado. Existe margem para aumentar o seu lucro.`,
        estilo: "bg-green-50 text-green-800 border-green-200"
      };
    } else if (diferencaPercentual <= 15) {
      return {
        titulo: "Ligeiramente Acima do Mercado",
        mensagem: `O seu preço está ${diferencaPercentual.toFixed(1)}% acima do mercado. Tente justificar o valor com a qualidade da impressão.`,
        estilo: "bg-yellow-50 text-yellow-800 border-yellow-200"
      };
    } else {
      return {
        titulo: "Fora de Mercado",
        mensagem: `Atenção: o seu preço está ${diferencaPercentual.toFixed(1)}% acima da concorrência. Recomendamos rever os custos ou margem.`,
        estilo: "bg-red-50 text-red-800 border-red-200"
      };
    }
  };

  const analise = obterAnaliseConcorrencia();

  return (
    <div className="bg-gradient-to-br from-blue-700 to-blue-900 rounded-2xl shadow-xl p-6 text-white h-fit sticky top-24">
      <h2 className="text-xl font-bold mb-6 text-blue-50">Resumo de Custos</h2>
      
      <div className="space-y-4 mb-8">
        <div className="flex justify-between items-center text-blue-100/80">
          <span>Material</span>
          <span className="font-medium">{formatMZN(results.materialCost)}</span>
        </div>
        <div className="flex justify-between items-center text-blue-100/80">
          <span>Energia</span>
          <span className="font-medium">{formatMZN(results.energyCost)}</span>
        </div>
        <div className="flex justify-between items-center text-blue-100/80">
          <span>Embalagem</span>
          <span className="font-medium">{formatMZN(formData.packaging || 0)}</span>
        </div>
        
        <div className="pt-4 border-t border-blue-500/30">
          <div className="flex justify-between items-center text-blue-100 mb-2">
            <span>Custo de Fabricação</span>
            <span className="font-semibold">{formatMZN(results.manufacturingCost)}</span>
          </div>
          <div className="flex justify-between items-center text-blue-200">
            <span>Lucro ({formData.margin}%)</span>
            <span className="font-semibold text-green-400">+{formatMZN(results.profit)}</span>
          </div>
        </div>
      </div>

      <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm mb-6 border border-white/20 shadow-inner">
        <div className="text-sm text-blue-200 mb-1">Preço de Venda Sugerido</div>
        <div className="text-4xl font-extrabold text-white tracking-tight">
          {formatMZN(results.sellPrice)}
        </div>

        {/* Feedback de Competitividade */}
        {analise && (
          <div className={`mt-4 p-4 rounded-xl border-2 ${analise.estilo} shadow-sm animate-in fade-in slide-in-from-top-2 duration-300`}>
            <h3 className="font-bold text-sm uppercase tracking-tight mb-1">{analise.titulo}</h3>
            <p className="text-sm leading-relaxed">{analise.mensagem}</p>
          </div>
        )}
      </div>

      <button
        onClick={handleSave}
        disabled={!formData.name}
        className={`w-full py-3 rounded-xl font-bold flex items-center justify-center transition-all ${
          formData.name 
            ? 'bg-blue-500 hover:bg-blue-400 text-white shadow-lg shadow-blue-500/30' 
            : 'bg-gray-400 text-gray-200 cursor-not-allowed hidden opacity-50'
        }`}
        style={{ display: formData.name ? 'flex' : 'none' }}
      >
        <Save className="mr-2 h-5 w-5" />
        Salvar Orçamento
      </button>
      
      {!formData.name && (
        <div className="text-center text-sm text-blue-300 mt-2">
          Insira um nome para o projeto para salvá-lo.
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center animate-bounce">
          <CheckCircle className="h-5 w-5 mr-2" />
          Orçamento salvo com sucesso!
        </div>
      )}
    </div>
  );
}
