import React, { useRef } from 'react';
import { Box, Clock, Zap, Target, Package, Image as ImageIcon, UploadCloud, X } from 'lucide-react';

export default function CalculatorForm({ formData, handleChange, handlePhotoChange }) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Optional: Check file size if needed, e.g., if (file.size > 5 * 1024 * 1024) return alert('File too large');
      const reader = new FileReader();
      reader.onloadend = () => {
        if (handlePhotoChange) {
          handlePhotoChange(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const removePhoto = () => {
    if (handlePhotoChange) {
      handlePhotoChange('');
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
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

      {/* Imagem do Produto Section */}
      <section>
        <div className="flex items-center mb-4">
          <ImageIcon className="h-5 w-5 text-blue-600 mr-2" />
          <h2 className="text-lg font-semibold text-gray-800">Imagem do Produto (Opcional)</h2>
        </div>
        
        <div className="space-y-4">
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          
          {formData.photo ? (
            <div className="relative inline-block border border-gray-200 rounded-xl overflow-hidden group">
              <img 
                src={formData.photo} 
                alt="Preview" 
                className="h-40 w-auto object-cover max-w-full"
              />
              <button
                type="button"
                onClick={removePhoto}
                className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-red-600"
                title="Remover foto"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div 
              onClick={triggerFileInput}
              className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors flex flex-col items-center justify-center space-y-2"
            >
              <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                <UploadCloud className="h-6 w-6" />
              </div>
              <div className="text-sm font-medium text-gray-700">Clique para adicionar uma foto</div>
              <div className="text-xs text-gray-400">PNG, JPG ou WEBP (máx. 5MB)</div>
            </div>
          )}
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
