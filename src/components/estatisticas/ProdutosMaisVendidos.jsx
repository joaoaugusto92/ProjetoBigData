import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { motion } from "framer-motion";

const ProdutosMaisVendidosData = [
    { nome: "X-burguer", Quantidade: 4000, Lucro: 2400 },
    { nome: "X-Bacon", Quantidade: 3000, Lucro: 2210 },
    { nome: "Batatafrita", Quantidade: 9800, Lucro: 2290 },
    { nome: "Pudim", Quantidade: 2780, Lucro: 2000 },
    { nome: "Coca-Cola", Quantidade: 1890, Lucro: 2181 },
];

const ProdutosMaisVendidos = () => {
    return (
        <motion.div
            className='bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-6 border border-gray-700'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
        >
            <h2 className='text-xl font-semibold text-gray-100 mb-4'>Top 5 Produtos Mais Vendidos</h2>
            <div style={{ width: "100%", height: 300 }}>
                <ResponsiveContainer>
                    <BarChart data={ProdutosMaisVendidosData}>
                        <CartesianGrid strokeDasharray='3 3' stroke='#374151' />
                        <XAxis dataKey='nome' stroke='#9CA3AF' />
                        <YAxis stroke='#9CA3AF' />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "rgba(31, 41, 55, 0.8)",
                                borderColor: "#4B5563",
                            }}
                            itemStyle={{ color: "#E5E7EB" }}
                            formatter={(valor, nomeChave, props) => {
                                if (nomeChave === 'Quantidade') {
                                    return [valor, 'Quantidade Vendida'];
                                }
                                return valor;
                            }}
                            content={({ payload, label, active }) => {
                                if (active && payload && payload.length) {
                                    const dados = payload[0].payload;
                                    return (
                                        <div className="bg-gray-700 bg-opacity-80 p-3 rounded-md border border-gray-600">
                                            <p className="text-gray-200 font-bold mb-1">{label}</p>
                                            <p className="text-gray-300">Quantidade: <span className="text-[#8B5CF6] font-semibold">{dados.Quantidade.toLocaleString()}</span></p>
                                            <p className="text-gray-300">Lucro: <span className="text-[#F59E0B] font-semibold">R$ {dados.Lucro.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span></p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Legend wrapperStyle={{ paddingTop: '10px' }} />
                        <Bar dataKey='Quantidade' fill='#8B5CF6' name='Quantidade Vendida' />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
};
export default ProdutosMaisVendidos;