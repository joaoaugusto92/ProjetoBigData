import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const userRetentionData = [
	{ name: "00:00", retention: 12 },
	{ name: "02:00", retention: 75 },
	{ name: "04:00", retention: 60 },
	{ name: "06:00", retention: 50 },
	{ name: "08:00", retention: 45 },
	{ name: "10:00", retention: 60 },
	{ name: "12:00", retention: 20 },
	{ name: "14:00", retention: 70 },
	{ name: "16:00", retention: 12 },
	{ name: "18:00", retention: 32 },
	{ name: "20:00", retention: 42 },
	{ name: "22:00", retention: 9 },
];

const UserRetention = () => {
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
					<LineChart data={userRetentionData}>
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
						<Line type='monotone' dataKey='retention' stroke='#8B5CF6' strokeWidth={2} />
					</LineChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};
export default UserRetention;
