import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const dadosRendimentoDiario = [
    { nome: "01/Mai", rendimento: 120 },
    { nome: "02/Mai", rendimento: 150 },
    { nome: "03/Mai", rendimento: 130 },
    { nome: "04/Mai", rendimento: 180 },
    { nome: "05/Mai", rendimento: 160 },
    { nome: "06/Mai", rendimento: 200 },
    { nome: "07/Mai", rendimento: 190 },
    { nome: "08/Mai", rendimento: 220 },
    { nome: "09/Mai", rendimento: 210 },
    { nome: "10/Mai", rendimento: 250 },
    { nome: "11/Mai", rendimento: 240 },
    { nome: "12/Mai", rendimento: 270 },
];

const RendimentoDiario = () => {
    return (
        <motion.div
            className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
        >
            <h2 className='text-lg font-medium mb-4 text-gray-100'>Rendimento Diário</h2>

            <div className='h-80'>
                <ResponsiveContainer width={"100%"} height={"100%"}>
                    <LineChart data={dadosRendimentoDiario}>
                        <CartesianGrid strokeDasharray='3 3' stroke='#4B5563' />
                        <XAxis dataKey={"nome"} stroke='#9ca3af' /> 
                        <YAxis stroke='#9ca3af' />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "rgba(31, 41, 55, 0.8)",
                                borderColor: "#4B5563",
                            }}
                            itemStyle={{ color: "#E5E7EB" }}
                            formatter={(value) => `R$ ${value.toFixed(2)}`}
                        />
                        <Line
                            type='monotone'
                            dataKey='rendimento'
                            stroke='#6366F1'
                            strokeWidth={3}
                            dot={{ fill: "#6366F1", strokeWidth: 2, r: 6 }}
                            activeDot={{ r: 8, strokeWidth: 2 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
};

export default RendimentoDiario;