import React, { useState, useEffect } from "react";
import { X, AlertTriangle } from "lucide-react";

const StockNotificacao = ({ onClose, onLoadCount }) => {
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLowStockData = async () => {
      setIsLoading(true);
      setError(null);
      try {

        await new Promise(resolve => setTimeout(resolve, 1000));

        const data = [
          { id: 1, name: "Pão de Hambúrguer", stock: 5, minStock: 20 },
          { id: 2, name: "Carne Artesanal (200g)", stock: 8, minStock: 30 },
          { id: 3, name: "Queijo Cheddar Fatiado", stock: 12, minStock: 25 },
          { id: 4, name: "Bacon em Fatias", stock: 7, minStock: 15 },
          { id: 5, name: "Alface Crespa", stock: 3, minStock: 10 },
          { id: 6, name: "Tomate Fresco", stock: 4, minStock: 12 },
          { id: 7, name: "Cebola Roxa", stock: 6, minStock: 10 },
          { id: 8, name: "Molho Especial (litros)", stock: 1, minStock: 5 },
        ];

        setLowStockProducts(data);

        if (onLoadCount) {
          onLoadCount(data.length);
        }
      } catch (err) {
        console.error("Erro ao buscar produtos com estoque baixo:", err);
        setError("Não foi possível carregar os produtos com estoque baixo.");
        if (onLoadCount) { // Em caso de erro, pode passar 0 ou null
            onLoadCount(0);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchLowStockData();
  }, [onLoadCount]); 

  return (
    <div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white p-6 rounded-lg shadow-xl w-full max-w-md mx-4 relative'>
        <button
          onClick={onClose}
          className='absolute top-3 right-3 text-gray-500 hover:text-gray-700'
        >
          <X size={24} />
        </button>
        <h2 className='text-2xl font-bold mb-4 text-orange-600 flex items-center'>
          <AlertTriangle className='mr-2' /> Notificações de Stock Baixo
        </h2>

        {isLoading ? (
          <p className='text-gray-600 text-center'>Carregando notificações...</p>
        ) : error ? (
          <p className='text-red-600 text-center'>{error}</p>
        ) : lowStockProducts.length > 0 ? (
          <ul>
            {lowStockProducts.map((product) => (
              <li key={product.id} className='mb-2 p-2 border-b border-gray-200 last:border-b-0'>
                <p className='font-semibold text-gray-800'>{product.name}</p>
                <p className='text-sm text-gray-600'>Stock: {product.stock} (Mínimo: {product.minStock})</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className='text-gray-600'>Nenhuma notificação de stock baixo no momento!</p>
        )}
      </div>
    </div>
  );
};

export default StockNotificacao;