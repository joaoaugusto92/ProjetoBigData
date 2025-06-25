import { motion } from "framer-motion";
import { useState, useEffect } from "react";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import StockNotificacao from "../components/produtos/StockNotificacao";

import { AlertTriangle, DollarSign, Package, TrendingUp } from "lucide-react";
import Produtosdash from "../components/produtos/Produtosdash";

const ProdutosPage = () => {
  const [showStockNotificacao, setShowStockNotificacao] = useState(false);
  const [lowStockCount, setLowStockCount] = useState(0);

  useEffect(() => {
    const fetchInitialCount = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      const count = 8;
      setLowStockCount(count);
    };

    fetchInitialCount();
  }, []);

  const handleLoadStockCount = (count) => {
    setLowStockCount(count);
  };

  const handleStockNotificacaoClick = () => {
    setShowStockNotificacao(true);
  };

  const handleCloseStockNotificacao = () => {
    setShowStockNotificacao(false);
  };

  return (
    <div className='flex-1 overflow-auto relative z-10'>
      <Header title='Produtos' />

      <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
        <motion.div
          className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard name='Produtos' icon={Package} value={1234} color='#6366F1' />

          <StatCard name='Mais Vendidos' icon={TrendingUp} value={89} color='#10B981' />

          <motion.div
            className='cursor-pointer'
            onClick={handleStockNotificacaoClick}
            whileTap={{ scale: 0.98 }}
          >
            <StatCard
              name='Stock Baixo'
              icon={AlertTriangle}
              value={lowStockCount}
              color='#F59E0B'
            />
          </motion.div>

          <StatCard name='Receita Diaria' icon={DollarSign} value={"$543,210"} color='#EF4444' />
        </motion.div>

        <Produtosdash />

        <div className='grid grid-col-1 lg:grid-cols-2 gap-8'></div>
      </main>

      {showStockNotificacao && (
        <StockNotificacao
          onClose={handleCloseStockNotificacao}
          onLoadCount={handleLoadStockCount}
        />
      )}
    </div>
  );
};
export default ProdutosPage;