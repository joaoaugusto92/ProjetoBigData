import { CheckCircle, DollarSign, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import ReceitaMensal from "../components/historico/ReceitaMensal";
import Analise from "../components/historico/Analise";
import HistoricoVendas from "../components/historico/HistoricoVendas";

const orderStats = {
    totaldepedidos: "160",
    pedidoscompletados: "123",
    pedidoscancelados: "12",
};

const HistoricoPage = () => {
    return (
        <div className='flex-1 relative z-10 overflow-auto'>
            <Header title={"Histórico"} />

            <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
                <motion.div
                    className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <StatCard name='Total de Pedidos' icon={ShoppingBag} value={orderStats.totaldepedidos} color='#6366F1' />
                    <StatCard
                        name='Completos'
                        icon={CheckCircle}
                        value={orderStats.pedidoscompletados}
                        color='#10B981'
                    />
                    <StatCard name='Cancelados' icon={DollarSign} value={orderStats.pedidoscancelados} color='#EF4444' />
                </motion.div>

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
                    <ReceitaMensal />
                    <Analise />
                </div>

                <HistoricoVendas />
            </main>
        </div>
    );
};
export default HistoricoPage;