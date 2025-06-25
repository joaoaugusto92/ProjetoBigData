import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const DiariadeVendasData = [
	{ name: "1", Retenção: 12 },
	{ name: "2", Retenção: 75 },
	{ name: "3", Retenção: 6 },
	{ name: "4", Retenção: 50 },
	{ name: "5", Retenção: 45 },
	{ name: "6", Retenção: 60 },
	{ name: "7", Retenção: 20 },
	{ name: "8", Retenção: 70 },
	{ name: "9", Retenção: 12 },
	{ name: "10", Retenção: 32 },

];

const DiariadeVendas = () => {
	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-6 border border-gray-700'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.5 }}
		>
			<h2 className='text-xl font-semibold text-gray-100 mb-4'>Tendencia Diaria de Vendas</h2>
			<div style={{ width: "100%", height: 300 }}>
				<ResponsiveContainer>
					<LineChart data={DiariadeVendasData}>
						<CartesianGrid strokeDasharray='3 3' stroke='#374151' />
						<XAxis dataKey='name' stroke='#9CA3AF' />
						<YAxis stroke='#9CA3AF' />
						<Tooltip
							contentStyle={{
								backgroundColor: "rgba(31, 41, 55, 0.8)",
								borderColor: "#4B5563",
							}}
							itemStyle={{ color: "#E5E7EB" }}
						/>
						<Legend />
						<Line type='monotone' dataKey='Retenção' stroke='#8B5CF6' strokeWidth={2} />
					</LineChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};
export default DiariadeVendas;
