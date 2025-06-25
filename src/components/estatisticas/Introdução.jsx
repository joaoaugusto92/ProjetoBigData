import { motion } from "framer-motion";
import { TrendingUp, Users, ShoppingBag, DollarSign } from "lucide-react";

const INSIGHTS = [
	{
		icon: TrendingUp,
		color: "text-green-500",
		insight: "Rendimentos Mensal - Calcula todo o rendimento da empresa",
	},
	{
		icon: DollarSign,
		color: "text-blue-500",
		insight: "Tendencia Diaria de Vendas - Analisa o comportamento de vendas ao longo do dia",
	},
	{
		icon: ShoppingBag,
		color: "text-purple-500",
		insight: 'Desempenho de Buscas - Analisa o desempenho de cada canal de busca',
	},
	{
		icon: Users,
		color: "text-yellow-500",
		insight: "Segmentação de Clientes: Analisa como o comportamento da empresa é moldado pela satisfação dos clientes.",
	},
];

const Introdução = () => {
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
						<div className={`p-2 rounded-full ${item.color} bg-opacity-20`}>
							<item.icon className={`size-6 ${item.color}`} />
						</div>
						<p className='text-gray-300'>{item.insight}</p>
					</div>
				))}
			</div>
		</motion.div>
	);
};
export default Introdução;
