import React from 'react';
import { Box, Clock, Zap, Target, Package } from 'lucide-react';

export default function CalculatorForm({ formData, handleChange }) {
  return (
    <div className="space-y-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      
      {/* Dados Técnicos Section */}
      <section>
        <div className="flex items-center mb-4">
          <Box className="h-5 w-5 text-blue-600 mr-2" />
          <h2 className="text-lg font-semibold text-gray-800">Dados Técnicos</h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Projeto / Peça</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ex: Suporte de fones"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Peso da Peça (g)</label>
              <input
                type="number"
                name="weight"
                value={formData.weight || ''}
                onChange={handleChange}
                min="0"
                step="any"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tempo de Impressão (horas)</label>
              <div className="relative">
                <input
                  type="number"
                  name="time"
                  value={formData.time || ''}
                  onChange={handleChange}
                  min="0"
                  step="0.1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Clock className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="border-gray-100" />

      {/* Custos Extras & Lucro Section */}
      <section>
        <div className="flex items-center mb-4">
          <Target className="h-5 w-5 text-blue-600 mr-2" />
          <h2 className="text-lg font-semibold text-gray-800">Custos Extras & Lucro</h2>
        </div>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Embalagem (MZN)</label>
              <div className="relative">
                <input
                  type="number"
                  name="packaging"
                  value={formData.packaging || ''}
                  onChange={handleChange}
                  min="0"
                  step="any"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Package className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tarifa Energia (MZN/kWh)</label>
              <div className="relative">
                <input
                  type="number"
                  name="energyTariff"
                  value={formData.energyTariff}
                  onChange={handleChange}
                  min="0"
                  step="any"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Zap className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Concorrência (MZN) <span className="text-gray-400 font-normal">- Opcional</span>
              </label>
              <input
                type="number"
                name="precoConcorrente"
                min="0"
                placeholder="Ex: 1500"
                value={formData.precoConcorrente}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <label className="block text-sm font-medium text-gray-700">Margem de Lucro</label>
              <span className="text-sm font-bold text-blue-600">{formData.margin}%</span>
            </div>
            <input
              type="range"
              name="margin"
              min="0"
              max="500"
              value={formData.margin}
              onChange={handleChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>0%</span>
              <span>100%</span>
              <span>500%</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
