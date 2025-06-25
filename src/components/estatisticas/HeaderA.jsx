import { motion } from "framer-motion";
import { DollarSign, Users, ShoppingBag, Eye, ArrowDownRight, ArrowUpRight } from "lucide-react";

// Dados para os cartões de visão geral
const OVERVIEW_DATA = [
    { name: "Receita", value: "R$1,234,56", change: 12.5, icon: DollarSign },
    { name: "Clientes", value: "44", change: 8.3, icon: Users },
    { name: "Pedidos", value: "41", change: -3.2, icon: ShoppingBag },
    { name: "Novos Clientes", value: "22%", change: 15.7, icon: Eye },
];

// Componente individual do cartão para melhor reusabilidade e clareza
const OverviewCard = ({ name, value, change, icon: Icon, index }) => {
    const isPositiveChange = change >= 0;
    const ChangeIcon = isPositiveChange ? ArrowUpRight : ArrowDownRight;
    const textColorClass = isPositiveChange ? "text-green-500" : "text-red-500";
    const bgColorClass = isPositiveChange ? "bg-green-500" : "bg-red-500";

    return (
        <motion.div
            className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-6 border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
        >
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-sm font-medium text-gray-400">{name}</h3>
                    <p className="mt-1 text-xl font-semibold text-gray-100">{value}</p>
                </div>

                <div className={`p-3 rounded-full bg-opacity-20 ${bgColorClass}`}>
                    <Icon className={`size-6 ${textColorClass}`} />
                </div>
            </div>
            <div className={`mt-4 flex items-center ${textColorClass}`}>
                <ChangeIcon size="20" />
                <span className="ml-1 text-sm font-medium">{Math.abs(change)}%</span>
                <span className="ml-2 text-sm text-gray-400">Com base ao dia anterior</span>
            </div>
        </motion.div>
    );
};

const HeaderA = () => {
    return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            {OVERVIEW_DATA.map((item, index) => (
                <OverviewCard key={item.name} {...item} index={index} />
            ))}
        </div>
    );
};

export default HeaderA;