import Header from "../components/common/Header";
import ConectarConta from "../components/settings/ConectarConta";
import ExcluirConta from "../components/settings/ExcluirConta";
import Notificacoes from "../components/settings/Notificacoes";
import Profile from "../components/settings/Profile";
import Seguranca from "../components/settings/Seguranca";


const SettingsPage = () => {
	return (
		<div className='flex-1 overflow-auto relative z-10 bg-gray-900'>
			<Header title='Configurações' />
			<main className='max-w-4xl mx-auto py-6 px-4 lg:px-8'>
				<Profile />
				<Notificacoes />
				<Seguranca />
				<ConectarConta />
				<ExcluirConta />
			</main>
		</div>
	);
};
export default SettingsPage;
