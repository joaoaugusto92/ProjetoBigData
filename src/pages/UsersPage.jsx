import { UserCheck, UserPlus, UsersIcon, UserX } from "lucide-react";
import { motion } from "framer-motion";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import UsersTable from "../components/users/UsersTable";

const userStats = {
	funcionarios: 15,
	funcinativo: 9,
	funcionariosativo: 6,
	receita: "2.4%",
};

const UsersPage = () => {
	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='Funcionarios' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				{/* STATS */}
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard
						name='Funcionarios'
						icon={UsersIcon}
						value={userStats.funcionarios.toLocaleString()}
						color='#6366F1'
					/>
					<StatCard name='Funcionarios Inativo' icon={UserPlus} value={userStats.funcinativo} color='#10B981' />
					<StatCard
						name='Funcionarios Ativos'
						icon={UserCheck}
						value={userStats.funcionariosativo.toLocaleString()}
						color='#F59E0B'
					/>
					<StatCard name='Receita' icon={UserX} value={userStats.receita} color='#EF4444' />
				</motion.div>

				<UsersTable />

				{/* USER CHARTS */}
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8'>

				</div>
			</main>
		</div>
	);
};
export default UsersPage;
