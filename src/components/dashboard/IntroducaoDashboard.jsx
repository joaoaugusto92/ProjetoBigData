import { motion } from "framer-motion";
import { LayoutDashboard, Package, History, BarChart2, UserRound } from "lucide-react"; 
import { use } from "react";

const INSIGHTS = [
    {
        icon: LayoutDashboard,
        color: "text-green-500",
        insight: "Dashboard - Página inicial que fornece uma visão geral do desempenho da empresa.",
    },
    {
        icon: Package,
        color: "text-blue-500",
        insight: "Produtos - Lista de produtos disponíveis, incluindo detalhes e preços.",
    },
    {
        icon: UserRound,
        color: "text-orange-500",
        insight: "Funcionarios - Gerencia informações sobre os funcionários.",
    },
    {
        icon: History,
        color: "text-purple-500",
        insight: 'Histórico - Exibe o histórico de vendas e transações da empresa.',
    },
    {
        icon: BarChart2,
        color: "text-yellow-500",
        insight: "Estatísticas: Fornece análises detalhadas sobre o desempenho da empresa.",
    },
    {
        icon: LayoutDashboard,
        color: "text-red-500",
        insight: "Configurações - Permite personalizar as preferências e configurações da empresa.",
    }
];

const Introducao = () => {
    return (
        <motion.div
            className='bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-6 border border-gray-700'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
        >
            <h2 className='text-xl font-semibold text-gray-100 mb-4'>Introdução</h2>
            <div className='space-y-4'>
                {INSIGHTS.map((item, index) => (
                    <div key={index} className='flex items-center space-x-3'>
                        <item.icon className={`size-6 ${item.color}`} />
                        <p className='text-gray-300'>{item.insight}</p>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};
export default Introducao;