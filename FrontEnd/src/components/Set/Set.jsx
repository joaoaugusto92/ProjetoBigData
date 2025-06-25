// Importa React e o hook useState
import React, { useState } from "react";
// Importa animações do Framer Motion
import { motion, AnimatePresence } from "framer-motion";
// Importa ícones da biblioteca lucide-react
import {
    HelpCircle, Plus, Bell, User, Lock, Menu, Settings, Users, BarChart2,
} from "lucide-react";
// Importa Link do React Router para navegação
import { Link } from "react-router-dom";

// Componente reutilizável para uma seção de configurações com título, ícone e conteúdo animado
const SettingSection = ({ icon: Icon, title, children }) => {
    return (
        <motion.div
            className='bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-6 border border-gray-700 mb-8'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className='flex items-center mb-4'>
                <Icon className='text-indigo-400 mr-4' size='24' />
                <h2 className='text-xl font-semibold text-gray-100'>{title}</h2>
            </div>
            {children}
        </motion.div>
    );
};

// Componente de switch (botão liga/desliga) usado para opções booleanas
const ToggleSwitch = ({ label, isOn, onToggle }) => {
    return (
        <div className='flex items-center justify-between py-3'>
            <span className='text-gray-300'>{label}</span>
            <button
                role="switch"
                aria-checked={isOn}
                aria-labelledby={`toggle-${label.replace(/\s/g, '-')}`}
                className={`
                    relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none
                    ${isOn ? "bg-indigo-600" : "bg-gray-600"}
                `}
                onClick={onToggle}
            >
                <span id={`toggle-${label.replace(/\s/g, '-')}`} className="sr-only">{label}</span>
                <span
                    className={`inline-block size-4 transform transition-transform bg-white rounded-full
                        ${isOn ? "translate-x-6" : "translate-x-1"}
                    `}
                />
            </button>
        </div>
    );
};

// Seção de contas conectadas (exemplo: Google, Facebook etc.)
const ConnectedAccounts = () => {
    const [connectedAccounts, setConnectedAccounts] = useState([
        { id: 1, name: "Google", connected: true, icon: "/google.png" },
        { id: 2, name: "Instagram", connected: false, icon: "/instagram.svg" },
        { id: 3, name: "Facebook", connected: true, icon: "/facebook.svg" },
    ]);

    return (
        <SettingSection icon={HelpCircle} title={"Contas conectadas"}>
            {connectedAccounts.map((account) => (
                <div key={account.id} className='flex items-center justify-between py-3'>
                    <div className='flex gap-1'>
                        <img src={account.icon} alt={`${account.name} logo`} className='size-6 object-cover rounded-full mr-2' />
                        <span className='text-gray-300'>{account.name}</span>
                    </div>
                    <button
                        className={`px-3 py-1 rounded ${
                            account.connected ? "bg-green-600 hover:bg-green-700" : "bg-gray-600 hover:bg-gray-700"
                        } transition duration-200`}
                        onClick={() => {
                            // Alterna o status de conexão da conta
                            setConnectedAccounts(
                                connectedAccounts.map((acc) =>
                                    acc.id === account.id ? { ...acc, connected: !acc.connected } : acc
                                )
                            );
                        }}
                    >
                        {account.connected ? "Connected" : "Connect"}
                    </button>
                </div>
            ))}
            <button className='mt-4 flex items-center text-indigo-400 hover:text-indigo-300 transition duration-200'>
                <Plus size={18} className='mr-2' /> Adicionar Conta
            </button>
        </SettingSection>
    );
};

// Seção de configurações de notificações com switches para Push, Email e SMS
const Notifications = () => {
    const [notifications, setNotifications] = useState({
        push: true,
        email: false,
        sms: true,
    });

    return (
        <SettingSection icon={Bell} title={"Notificações"}>
            <ToggleSwitch
                label={"Notificações Push"}
                isOn={notifications.push}
                onToggle={() => setNotifications({ ...notifications, push: !notifications.push })}
            />
            <ToggleSwitch
                label={"Notificações Email"}
                isOn={notifications.email}
                onToggle={() => setNotifications({ ...notifications, email: !notifications.email })}
            />
            <ToggleSwitch
                label={"Notificações SMS"}
                isOn={notifications.sms}
                onToggle={() => setNotifications({ ...notifications, sms: !notifications.sms })}
            />
        </SettingSection>
    );
};

// Seção do perfil do usuário (nome, email e botão para editar)
const Profile = () => {
    return (
        <SettingSection icon={User} title={"Perfil"}>
            <div className='flex flex-col sm:flex-row items-center mb-6'>
                <img
                    src='https://i.pinimg.com/236x/f5/76/cc/f576ccdca7bf7cd29424f0e67d5ec9a2.jpg'
                    alt='Profile'
                    className='rounded-full w-20 h-20 object-cover mr-4'
                />
                <div>
                    <h3 className='text-lg font-semibold text-gray-100'>Gato Árabe</h3>
                    <p className='text-gray-400'>gatoarabe@gmail.com</p>
                </div>
            </div>
            <button className='bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-200 w-full sm:w-auto'>
                Editar Perfil
            </button>
        </SettingSection>
    );
};

// Seção de segurança (autenticação 2FA e troca de senha)
const Security = () => {
    const [twoFactor, setTwoFactor] = useState(false);

    return (
        <SettingSection icon={Lock} title={"Segurança"}>
            <ToggleSwitch
                label={"Autenticação de dois fatores"}
                isOn={twoFactor}
                onToggle={() => setTwoFactor(!twoFactor)}
            />
            <div className='mt-4'>
                <button className='bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-200'>
                    Trocar senha
                </button>
            </div>
        </SettingSection>
    );
};

// Lista de itens que aparecem na barra lateral
const SIDEBAR_ITEMS = [
    { name: "Clientes", icon: Users, color: "#EC4899", href: "/funcionari" },
    { name: "Settings", icon: Settings, color: "#6EE7B7", href: "/Set" },
];

// Componente da barra lateral com animação de abertura/fechamento
const Sidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <motion.div
            className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
                isSidebarOpen ? "w-64" : "w-20"
            }`}
            animate={{ width: isSidebarOpen ? 256 : 80 }}
        >
            <div className='h-full bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-gray-700'>
                {/* Botão para expandir ou recolher a sidebar */}
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className='p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit'
                >
                    <Menu size={24} />
                </motion.button>

                <nav className='mt-8 flex-grow'>
                    {SIDEBAR_ITEMS.map((item) => (
                        <Link key={item.href} to={item.href}>
                            <motion.div className='flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2'>
                                <item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
                                {/* Exibe o nome apenas se a sidebar estiver aberta */}
                                <AnimatePresence>
                                    {isSidebarOpen && (
                                        <motion.span
                                            className='ml-4 whitespace-nowrap'
                                            initial={{ opacity: 0, width: 0 }}
                                            animate={{ opacity: 1, width: "auto" }}
                                            exit={{ opacity: 0, width: 0 }}
                                            transition={{ duration: 0.2, delay: 0.3 }}
                                        >
                                            {item.name}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </Link>
                    ))}
                </nav>
            </div>
        </motion.div>
    );
};

// Página principal que reúne todos os componentes de configuração
const SettingsPage = () => {
    return (
        <div className="flex min-h-screen bg-gray-900 text-white">
            <Sidebar />
            <div className="flex-1 p-6 md:p-10 lg:p-12 max-w-4xl mx-auto">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-50 mb-8 text-center">Configurações</h1>
                <Profile />
                <Security />
                <Notifications />
                <ConnectedAccounts />
            </div>
        </div>
    );
};

export default SettingsPage;
