import { Route, Routes, useLocation } from "react-router-dom";

import Sidebar from "./components/common/Sidebar";
import FuncionariosSidebar from "./components/common/Sidebar";

import OverviewPage from "./pages/OverviewPage";
import ProductsPage from "./pages/ProductsPage";
import UsersPage from "./pages/UsersPage";
import SalesPage from "./pages/SalesPage";
import OrdersPage from "./pages/OrdersPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import SettingsPage from "./pages/SettingsPage";
import LoginPage from "./components/login/login";
import Funcionari from "./components/funcionari/funcionari";
import Set from "./components/Set/Set";
function App() {


    const location = useLocation();
    const isFuncionariosPage = location.pathname === '/funcionarios';
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

            {shouldHideSidebar ? null : (isFuncionariosPage ? <FuncionariosSidebar /> : <Sidebar />)}


            <div className="flex-1 relative z-10 bg-gray-900 overflow-y-auto">
                <Routes>
                    
                    <Route path='/' element={<OverviewPage />} />
                    <Route path='/products' element={<ProductsPage />} />
                    <Route path='/users' element={<UsersPage />} />
                    <Route path='/sales' element={<SalesPage />} />
                    <Route path='/orders' element={<OrdersPage />} />
                    <Route path='/analytics' element={<AnalyticsPage />} />
                    <Route path='/settings' element={<SettingsPage />} />
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/funcionari' element={<Funcionari />} /> 
                    <Route path='*' element={<OverviewPage />} />
                    <Route path='/Set' element={<Set />} />

                </Routes>
            </div>
        </div>
    );
}

export default App;