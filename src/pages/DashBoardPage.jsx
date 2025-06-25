import { BarChart2, ShoppingBag, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import RendimentoDiario from "../components/dashboard/RendimentoDiario";
import CategoriaDistribuicao from "../components/dashboard/CategoriaDistribuicao";
import Introducao from "../components/dashboard/IntroducaoDashboard";

const DashBoardPage = () => {
    return (
        <div className='flex-1 overflow-auto relative z-10'>
            <Header title='Dashboard' />

            <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>

                <motion.div
                    className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <StatCard name='Saldo Total' icon={Zap} value='R$ 2,50' color='#6366F1' />
                    <StatCard name='Funcionarios' icon={Users} value='12' color='#8B5CF6' />
                    <StatCard name='Produtos' icon={ShoppingBag} value='19' color='#EC4899' />
                </motion.div>

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'> 
                    <RendimentoDiario />
                    <CategoriaDistribuicao />
                </div>

                <div className='grid grid-cols-1'>
                    <Introducao />
                </div>

            </main>
        </div>
    );
};
export default DashBoardPage;