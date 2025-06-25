import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useState, useEffect } from "react";

const generateRandomRevenue = () => Math.floor(Math.random() * 20) + 5;

const HistoricoDaReceita = () => {
    const [dailyRevenueData, setDailyRevenueData] = useState([]);
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDate(prevDate => {
                const newDate = new Date(prevDate.getTime() + 60 * 1000);
                const formattedTime = newDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

                setDailyRevenueData(prevData => {
                    const maxDataPoints = 15;
                    let newData = [...prevData];

                    const lastEntry = newData[newData.length - 1];
                    if (lastEntry && lastEntry.time === formattedTime) {
                        lastEntry.receita += generateRandomRevenue();
                    } else {
                        newData.push({
                            time: formattedTime,
                            receita: generateRandomRevenue(),
                        });
                        if (newData.length > maxDataPoints) {
                            newData = newData.slice(1);
                        }
                    }
                    return newData;
                });
                return newDate;
            });
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
        >
            <h2 className='text-xl font-semibold text-gray-100 mb-4'>Histórico da Receita (Tempo Real)</h2>

            <div style={{ width: "100%", height: 300 }}>
                <ResponsiveContainer>
                    <BarChart data={dailyRevenueData}>
                        <CartesianGrid strokeDasharray='3 3' stroke='#374151' />
                        <XAxis dataKey='time' stroke='#9CA3AF' />
                        <YAxis stroke='#9CA3AF' />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "rgba(31, 41, 55, 0.8)",
                                borderColor: "#4B5563",
                            }}
                            itemStyle={{ color: "#E5E7EB" }}
                            formatter={(value) => `$${value.toFixed(2)}`}
                        />
                        <Legend />
                        <Bar dataKey='receita' fill='#10B981' name='Receita' />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
};

export default HistoricoDaReceita;