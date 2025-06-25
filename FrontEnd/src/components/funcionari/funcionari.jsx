import React, { useState, useEffect } from "react"; // Essencial para componentes, estados e efeitos.
import { motion, AnimatePresence } from "framer-motion"; // Para animações visuais.
import { Menu, Settings, Users, X } from "lucide-react"; // Ícones para a interface.
import { Link } from "react-router-dom"; // Para navegação entre páginas.

// --- Dados de Exemplo Iniciais ---
const initialUserData = [
    { id: 1, name: "Mateus", phone: "8145746785", value: 150.00, status: "Pago", product: "amendoim" },
    { id: 2, name: "Livia", phone: "8145746785", value: 75.50, status: "Cancelado", product: "Plano Batata frita" },
    { id: 3, name: "Gustavo", phone: "8145746785", value: 200.00, status: "Pago", product: "X-burguer" },
    { id: 4, name: "Fernanda", phone: "8198765432", value: 300.00, status: "Cancelado", product: "Cola" },
];

// --- Itens da Barra Lateral (Sidebar) ---
const SIDEBAR_ITEMS = [
    { name: "Cliente", icon: Users, color: "#EC4899", href: "/funcionari" }, // Ícone e link para clientes.
    { name: "Settings", icon: Settings, color: "#6EE7B7", href: "/Set" },   // Ícone e link para configurações.
];

// --- Componente Principal: Funcionarios ---
const Funcionarios = () => {
    // --- Estados do Componente ---
    // Gerenciam os dados e o comportamento da interface.

    // Dados dos usuários e filtro de busca
    const [allUsers, setAllUsers] = useState(initialUserData);
    const [filteredUsers, setFilteredUsers] = useState(initialUserData);
    const [searchTerm, setSearchTerm] = useState("");

    // Controle de visibilidade de elementos
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
    const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    // Estados para o formulário de NOVO usuário
    const [newUserName, setNewUserName] = useState("");
    const [newUserPhone, setNewUserPhone] = useState("");
    const [newUserValue, setNewUserValue] = useState("");
    const [newUserProduct, setNewUserProduct] = useState("");

    // Estados para o formulário de EDIÇÃO de usuário
    const [editUserName, setEditUserName] = useState("");
    const [editUserPhone, setEditUserPhone] = useState("");
    const [editUserValue, setEditUserValue] = useState("");
    const [editUserProduct, setEditUserProduct] = useState("");
    // Removido: const [editUserStatus, setEditUserStatus] = useState("");


    // --- Efeito: Filtrar Usuários na Busca ---
    // Executa sempre que a lista de usuários ou o termo de busca mudam.
    useEffect(() => {
        const term = searchTerm.toLowerCase();
        const filtered = allUsers.filter(
            (user) =>
                user.name.toLowerCase().includes(term) ||
                user.phone.toLowerCase().includes(term) ||
                user.value.toString().toLowerCase().includes(term) ||
                user.product.toLowerCase().includes(term) ||
                user.status.toLowerCase().includes(term)
        );
        setFilteredUsers(filtered);
    }, [allUsers, searchTerm]);


    // --- Funções de Manipulação ---

    // Abre o modal de adicionar e limpa os campos.
    const handleAddUserClick = () => {
        setIsAddUserModalOpen(true);
        setNewUserName("");
        setNewUserPhone("");
        setNewUserValue("");
        setNewUserProduct("");
    };

    // Fecha o modal de adicionar.
    const handleCloseAddUserModal = () => setIsAddUserModalOpen(false);

    // Adiciona um novo usuário à lista.
    const handleSubmitNewUser = (e) => {
        e.preventDefault();
        const newId = Date.now(); // Gera um ID único.
        const newUser = {
            id: newId,
            name: newUserName,
            phone: newUserPhone,
            value: parseFloat(newUserValue),
            status: "Pendente", // Novo cliente sempre começa como Pendente.
            product: newUserProduct
        };
        setAllUsers((prev) => [...prev, newUser]);
        handleCloseAddUserModal();
    };

    // Abre o modal de edição e preenche com os dados do usuário.
    const handleEditClick = (user) => {
        setEditingUser(user);
        setEditUserName(user.name);
        setEditUserPhone(user.phone);
        setEditUserValue(user.value.toString());
        setEditUserProduct(user.product);
        // Removido: setEditUserStatus(user.status);
        setIsEditUserModalOpen(true);
    };

    // Fecha o modal de edição.
    const handleCloseEditUserModal = () => {
        setIsEditUserModalOpen(false);
        setEditingUser(null);
    };

    // Salva as alterações de um usuário editado.
    const handleSubmitEditUser = (e) => {
        e.preventDefault();
        const updatedUser = {
            ...editingUser,
            name: editUserName,
            phone: editUserPhone,
            value: parseFloat(editUserValue),
            product: editUserProduct,
            // Removido: status: editUserStatus,
        };
        setAllUsers((prev) =>
            prev.map((user) => (user.id === updatedUser.id ? updatedUser : user))
        );
        handleCloseEditUserModal();
    };


    // --- Renderização do Componente ---
    return (
        <div className="flex bg-gray-900 min-h-screen text-gray-100">

            {/* --- Barra Lateral (Sidebar) --- */}
            <motion.div
                className={`transition-all duration-300 ${isSidebarOpen ? "w-64" : "w-20"}`}
                animate={{ width: isSidebarOpen ? 256 : 80 }}
            >
                <div className='h-full bg-gray-800 p-4 flex flex-col border-r border-gray-700'>
                    {/* Botão para abrir/fechar sidebar */}
                    <motion.button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className='p-2 rounded-full hover:bg-gray-700 max-w-fit'
                        whileHover={{ scale: 1.1 }}
                    >
                        <Menu size={24} />
                    </motion.button>

                    {/* Navegação da Sidebar */}
                    <nav className='mt-8 flex-grow'>
                        {SIDEBAR_ITEMS.map((item) => (
                            <Link
                                key={item.href}
                                to={item.href}
                                className='flex items-center p-4 text-sm rounded-lg hover:bg-gray-700 mb-2'
                            >
                                <item.icon size={20} style={{ color: item.color }} />
                                <AnimatePresence>
                                    {isSidebarOpen && (
                                        <motion.span
                                            initial={{ opacity: 0, width: 0 }}
                                            animate={{ opacity: 1, width: "auto" }}
                                            exit={{ opacity: 0, width: 0 }}
                                            transition={{ delay: 0.3 }}
                                            className='ml-4 whitespace-nowrap'
                                        >
                                            {item.name}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </Link>
                        ))}
                    </nav>
                </div>
            </motion.div>


            {/* --- Conteúdo Principal (Tabela de Clientes) --- */}
            <div className="flex-1 p-8 overflow-y-auto">
                <motion.div
                    className='bg-gray-800 p-6 rounded-xl border border-gray-700 mb-8'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className='flex justify-between items-center mb-6'>
                        <h2 className='text-xl font-semibold'>Clientes</h2>
                        <div className='flex space-x-4'>
                            {/* Campo de busca */}
                            <input
                                type='text'
                                placeholder='Buscar...'
                                className='bg-gray-700 text-white rounded-lg pl-4 pr-4 py-2 focus:ring-2 focus:ring-blue-500'
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            {/* Botão Adicionar */}
                            <button
                                onClick={handleAddUserClick}
                                className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md"
                            >
                                Adicionar
                            </button>
                        </div>
                    </div>

                    {/* Tabela de Clientes */}
                    <div className='overflow-x-auto'>
                        <table className='min-w-full divide-y divide-gray-700'>
                            <thead>
                                <tr>
                                    <th className='px-6 py-3 text-left text-xs text-gray-400'>Nome</th>
                                    <th className='px-6 py-3 text-left text-xs text-gray-400'>ID</th>
                                    <th className='px-6 py-3 text-left text-xs text-gray-400'>Produto</th>
                                    <th className='px-6 py-3 text-left text-xs text-gray-400'>Número</th>
                                    <th className='px-6 py-3 text-left text-xs text-gray-400'>Valor</th>
                                    <th className='px-6 py-3 text-left text-xs text-gray-400'>Status</th>
                                    <th className='px-6 py-3 text-center text-xs text-gray-400'>Ação</th>
                                </tr>
                            </thead>
                            <tbody className='divide-y divide-gray-700'>
                                {filteredUsers.map((user) => (
                                    <motion.tr key={user.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                        <td className='px-6 py-4'>
                                            <div className='flex items-center'>
                                                <div className='h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white'>
                                                    {user.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div className='ml-4'>{user.name}</div>
                                            </div>
                                        </td>
                                        <td className='px-6 py-4'>{user.id}</td>
                                        <td className='px-6 py-4'>{user.product || "N/A"}</td>
                                        <td className='px-6 py-4'>
                                            {/* Removido: <span className='px-2 inline-flex text-xs rounded-full bg-blue-800 text-blue-100'> */}
                                            <div className='text-sm text-gray-300'>
                                                {user.phone}
                                            </div>
                                            {/* Removido: </span> */}
                                        </td>
                                        <td className='px-6 py-4'>
                                            {user.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                        </td>
                                        <td className='px-6 py-4'>
                                            <span
                                                className={`px-2 inline-flex text-xs rounded-full ${
                                                    user.status === "Pago"
                                                        ? "bg-green-800 text-green-100"
                                                        : user.status === "Pendente"
                                                        ? "bg-yellow-600 text-yellow-100"
                                                        : "bg-red-800 text-red-100"
                                                }`}
                                            >
                                                {user.status}
                                            </span>
                                        </td>
                                        <td className='px-6 py-4 text-center'>
                                            <button
                                                onClick={() => handleEditClick(user)}
                                                className='px-3 py-1.5 text-indigo-400 hover:text-indigo-300 border border-indigo-400 rounded-md'
                                            >
                                                Edit
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </div>


            {/* --- Modal: Adicionar Cliente --- */}
            <AnimatePresence>
                {isAddUserModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
                    >
                        <motion.div
                            initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -50, opacity: 0 }}
                            className="bg-gray-800 p-8 rounded-lg border border-gray-700 w-full max-w-md relative"
                        >
                            <button onClick={handleCloseAddUserModal} className="absolute top-4 right-4 text-gray-400 hover:text-gray-100">
                                <X size={24} />
                            </button>
                            <h3 className="text-2xl font-bold mb-6">Adicionar Cliente</h3>
                            <form onSubmit={handleSubmitNewUser} className="space-y-4">
                                <label className="block text-sm text-gray-300">
                                    Nome
                                    <input type="text" className="w-full bg-gray-700 rounded-md border border-gray-600 p-2.5" placeholder="Nome" value={newUserName} onChange={(e) => setNewUserName(e.target.value)} required />
                                </label>
                                <label className="block text-sm text-gray-300">
                                    Telefone
                                    <input type="tel" className="w-full bg-gray-700 rounded-md border border-gray-600 p-2.5" placeholder="(XX) XXXXX-XXXX" value={newUserPhone} onChange={(e) => setNewUserPhone(e.target.value)} required />
                                </label>
                                <label className="block text-sm text-gray-300">
                                    Valor
                                    <input type="number" step="0.01" className="w-full bg-gray-700 rounded-md border border-gray-600 p-2.5" placeholder="0.00" value={newUserValue} onChange={(e) => setNewUserValue(e.target.value)} required />
                                </label>
                                <label className="block text-sm text-gray-300">
                                    Produto
                                    <input type="text" className="w-full bg-gray-700 rounded-md border border-gray-600 p-2.5" placeholder="Produto" value={newUserProduct} onChange={(e) => setNewUserProduct(e.target.value)} required />
                                </label>
                                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-md">
                                    Adicionar Cliente
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>


            {/* --- Modal: Editar Cliente --- */}
            <AnimatePresence>
                {isEditUserModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
                    >
                        <motion.div
                            initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -50, opacity: 0 }}
                            className="bg-gray-800 p-8 rounded-lg border border-gray-700 w-full max-w-md relative"
                        >
                            <button onClick={handleCloseEditUserModal} className="absolute top-4 right-4 text-gray-400 hover:text-gray-100">
                                <X size={24} />
                            </button>
                            <h3 className="text-2xl font-bold mb-6">Editar Cliente</h3>
                            <form onSubmit={handleSubmitEditUser} className="space-y-4">
                                <label className="block text-sm text-gray-300">
                                    Nome
                                    <input type="text" className="w-full bg-gray-700 rounded-md border border-gray-600 p-2.5" placeholder="Nome" value={editUserName} onChange={(e) => setEditUserName(e.target.value)} required />
                                </label>
                                <label className="block text-sm text-gray-300">
                                    Telefone
                                    <input type="tel" className="w-full bg-gray-700 rounded-md border border-gray-600 p-2.5" placeholder="(XX) XXXXX-XXXX" value={editUserPhone} onChange={(e) => setEditUserPhone(e.target.value)} required />
                                </label>
                                <label className="block text-sm text-gray-300">
                                    Valor
                                    <input type="number" step="0.01" className="w-full bg-gray-700 rounded-md border border-gray-600 p-2.5" placeholder="0.00" value={editUserValue} onChange={(e) => setEditUserValue(e.target.value)} required />
                                </label>
                                <label className="block text-sm text-gray-300">
                                    Produto
                                    <input type="text" className="w-full bg-gray-700 rounded-md border border-gray-600 p-2.5" placeholder="Produto" value={editUserProduct} onChange={(e) => setEditUserProduct(e.target.value)} required />
                                </label>
                                {/* Removido: Campo para editar o status */}
                                <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-md">
                                    Salvar Alterações
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
};

export default Funcionarios;