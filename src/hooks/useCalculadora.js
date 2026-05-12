import { useState, useEffect } from 'react';

const MATERIAL_COST_PER_GRAM = 1.65;
const ENERGY_CONSUMPTION_KW = 0.12;

export function useCalculadora() {
  const [formData, setFormData] = useState({
    name: '',
    weight: 0,
    time: 0,
    packaging: 0,
    energyTariff: 10,
    margin: 100,
    precoConcorrente: '',
  });

  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('bambulab_history');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('bambulab_history', JSON.stringify(history));
  }, [history]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' || type === 'range' ? Number(value) : value,
    }));
  };

  const materialCost = formData.weight * MATERIAL_COST_PER_GRAM;
  const energyCost = formData.time * ENERGY_CONSUMPTION_KW * formData.energyTariff;
  const manufacturingCost = materialCost + energyCost + formData.packaging;
  const profit = manufacturingCost * (formData.margin / 100);
  const sellPrice = manufacturingCost + profit;

  const results = {
    materialCost,
    energyCost,
    manufacturingCost,
    profit,
    sellPrice
  };

  const resetForm = () => {
    setFormData({
      name: '',
      weight: 0,
      time: 0,
      packaging: 0,
      energyTariff: 10,
      margin: 100,
      precoConcorrente: '',
    });
  };

  const saveBudget = () => {
    if (!formData.name) return;
    
    const newBudget = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      ...formData,
      ...results
    };
    
    setHistory([newBudget, ...history]);
  };

  const deleteBudget = (id) => {
    setHistory(history.filter(b => b.id !== id));
  };

  return {
    formData,
    handleChange,
    results,
    saveBudget,
    history,
    deleteBudget,
    resetForm
  };
}
