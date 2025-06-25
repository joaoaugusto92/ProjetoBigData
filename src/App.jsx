import { Route, Routes, useLocation } from "react-router-dom";

import Sidebar from "./components/common/Sidebar"; 
import DashBoardPage from "./pages/DashBoardPage";
import ProdutosPage from "./pages/ProdutosPage";
import FuncionarioPage from "./pages/FuncionarioPage";
import HistoricoPage from "./pages/HistoricoPage";
import EstatisticasPage from "./pages/EstatisticasPage";
import SettingsPage from "./pages/SettingsPage";
import LoginPage from "./components/login/login";
import Funcionari from "./components/funcionari/funcionari";
import Set from "./components/Set/Set";

function App() {
    const location = useLocation();
    const isLoginPage = location.pathname === '/login';
    const isFuncionariPage = location.pathname === '/funcionari';
    const isSetPage = location.pathname === '/Set';

    const shouldHideSidebar = isLoginPage || isFuncionariPage || isSetPage;

    return (
        <div className='flex h-screen bg-gray-900 text-gray-100 relative'>
            <div className='fixed inset-0 z-0'>
                <div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80' />
                <div className='absolute inset-0 backdrop-blur-sm' />
            </div>

            {shouldHideSidebar ? null : <Sidebar />} 

            <div className="flex-1 relative z-10 bg-gray-900 overflow-y-auto">
                <Routes>
                    <Route path='/' element={<DashBoardPage />} />
                    <Route path='/produtos' element={<ProdutosPage />} />
                    <Route path='/funcionario' element={<FuncionarioPage />} />
                    <Route path='/historico' element={<HistoricoPage />} />
                    <Route path='/estatisticas' element={<EstatisticasPage />} />
                    <Route path='/settings' element={<SettingsPage />} />
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/funcionari' element={<Funcionari />} />
                    <Route path='/Set' element={<Set />} />
                    <Route path='*' element={<DashBoardPage />} /> 
                </Routes>
            </div>
        </div>
    );
}

export default App;