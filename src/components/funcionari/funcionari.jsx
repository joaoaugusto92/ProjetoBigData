import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Menu, Settings, Users, X } from "lucide-react";
import { Link } from "react-router-dom";

// Seus dados iniciais de usuários
const initialUserData = [
    { id: 1, name: "Mateus", email: "mateus@example.com", phone: "8145746785", cpf: "123.456.789-01", status: "Pago", product: "amendoim" },
    { id: 2, name: "Livia", email: "livia@example.com", phone: "8145746785", cpf: "987.654.321-09", status: "Pago", product: "Plano Batata frita" },
    { id: 3, name: "Gustavo", email: "gustavo@example.com", phone: "8145746785", cpf: "456.789.123-02", status: "Pendente", product: "X-burguer" },
    { id: 4, name: "Alice", email: "alice@example.com", phone: "8145746785", cpf: "321.654.987-03", status: "Pago", product: "Plano Coxinha" },
    { id: 5, name: "Jhonatan", email: "jhonatan@example.com", phone: "8145746785", cpf: "654.987.321-04", status: "Pago", product: "Pastel" },
];

const chartData = [
    { name: "18-24", value: 20 },
    { name: "25-34", value: 30 },
    { name: "35-44", value: 25 },
    { name: "45-54", value: 15 },
    { name: "55+", value: 10 },
];
const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088FE"];

const SIDEBAR_ITEMS = [
    { name: "Cliente", icon: Users, color: "#EC4899", href: "/funcionari" },
    { name: "Settings", icon: Settings, color: "#6EE7B7", href: "/Set" },
];

const Funcionarios = () => {
    const [allUsers, setAllUsers] = useState(initialUserData);
    const [filteredUsers, setFilteredUsers] = useState(initialUserData);
    const [searchTerm, setSearchTerm] = useState("");

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
    const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    // Estados para o formulário de novo usuário
    const [newUserName, setNewUserName] = useState("");
    const [newUserEmail, setNewUserEmail] = useState("");
    const [newUserPhone, setNewUserPhone] = useState("");
    const [newUserCpf, setNewUserCpf] = useState("");
    const [newUserProduct, setNewUserProduct] = useState("");

    // Estados para o formulário de edição (pré-preenchidos)
    const [editUserName, setEditUserName] = useState("");
    const [editUserEmail, setEditUserEmail] = useState("");
    const [editUserPhone, setEditUserPhone] = useState("");
    const [editUserCpf, setEditUserCpf] = useState("");
    const [editUserProduct, setEditUserProduct] = useState("");

    // Função para aplicar o filtro sempre que `allUsers` ou `searchTerm` mudar
    useEffect(() => {
        const term = searchTerm.toLowerCase();
        const filtered = allUsers.filter(
            (user) =>
                user.name.toLowerCase().includes(term) ||
                user.id.toString().includes(term) || // Adicionado ID à busca
                user.email.toLowerCase().includes(term) ||
                user.phone.toLowerCase().includes(term) ||
                user.cpf.toLowerCase().includes(term) ||
                user.status.toLowerCase().includes(term) ||
                user.product.toLowerCase().includes(term)
        );
        setFilteredUsers(filtered);
    }, [allUsers, searchTerm]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleAddUserClick = () => {
        setIsAddUserModalOpen(true);
    };

    const handleCloseAddUserModal = () => {
        setIsAddUserModalOpen(false);
        setNewUserName("");
        setNewUserEmail("");
        setNewUserPhone("");
        setNewUserCpf("");
        setNewUserProduct("");
    };

    const handleSubmitNewUser = (e) => {
        e.preventDefault();

        const newId = Date.now(); // Gera um ID único baseado no timestamp

        const newUser = {
            id: newId,
            name: newUserName,
            email: newUserEmail,
            phone: newUserPhone,
            cpf: newUserCpf,
            status: "Pendente", // Status inicial para novos clientes
            product: newUserProduct
        };

        setAllUsers((prevUsers) => [...prevUsers, newUser]);
        handleCloseAddUserModal();
    };

    // FUNÇÕES PARA EDIÇÃO
    const handleEditClick = (user) => {
        setEditingUser(user); // Define qual usuário está sendo editado
        // Pré-preenche os estados do formulário de edição com os dados do usuário
        setEditUserName(user.name);
        setEditUserEmail(user.email);
        setEditUserPhone(user.phone);
        setEditUserCpf(user.cpf);
        setEditUserProduct(user.product);
        setIsEditUserModalOpen(true); // Abre o modal de edição
    };

    const handleCloseEditUserModal = () => {
        setIsEditUserModalOpen(false);
        setEditingUser(null); // Limpa o usuário que estava sendo editado
        // Limpar campos de edição (opcional, pois seriam sobrescritos na próxima edição)
        setEditUserName("");
        setEditUserEmail("");
        setEditUserPhone("");
        setEditUserCpf("");
        setEditUserProduct("");
    };

    const handleSubmitEditUser = (e) => {
        e.preventDefault();

        // Cria um objeto com os dados atualizados
        const updatedUser = {
            ...editingUser, // Mantém o ID, status e outras propriedades que não estão sendo editadas
            name: editUserName,
            email: editUserEmail,
            phone: editUserPhone,
            cpf: editUserCpf,
            product: editUserProduct,
        };

        // Atualiza a lista allUsers, substituindo o usuário antigo pelo atualizado
        setAllUsers((prevUsers) =>
            prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
        );

        handleCloseEditUserModal(); // Fecha o modal
    };

    return (
        <div className="flex bg-gray-900 min-h-screen font-sans text-gray-100">
            <motion.div
                className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
                    isSidebarOpen ? "w-64" : "w-20"
                }`}
                animate={{ width: isSidebarOpen ? 256 : 80 }}
            >
                <div className='h-full bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-gray-700'>
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

            <div className="flex-1 p-8 overflow-y-auto">
                <motion.div
                    className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className='flex justify-between items-center mb-6'>
                        <h2 className='text-xl font-semibold text-gray-100'>Funcionários</h2>
                        <div className='flex items-center space-x-4'>
                            <div className="relative">
                                <input
                                    type='text'
                                    placeholder='Buscar...'
                                    className='bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-4 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                    value={searchTerm}
                                    onChange={handleSearch}
                                />
                            </div>
                            <button
                                onClick={handleAddUserClick}
                                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200"
                            >
                                Adicionar
                            </button>
                        </div>
                    </div>

                    <div className='overflow-x-auto'>
                        <table className='min-w-full divide-y divide-gray-700'>
                            <thead>
                                <tr>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                                        Nome
                                    </th>
                                    {/* Nova coluna para o ID */}
                                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                                        ID
                                    </th>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                                        Email
                                    </th>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                                        Produto
                                    </th>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                                        Número
                                    </th>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                                        Status
                                    </th>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider text-center'>
                                        Atividade
                                    </th>
                                </tr>
                            </thead>

                            <tbody className='divide-y divide-gray-700'>
                                {filteredUsers.map((user) => (
                                    <motion.tr
                                        key={user.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <td className='px-6 py-4 whitespace-nowrap'>
                                            <div className='flex items-center'>
                                                <div className='flex-shrink-0 h-10 w-10'>
                                                    <div className='h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold'>
                                                        {user.name.charAt(0).toUpperCase()}
                                                    </div>
                                                </div>
                                                <div className='ml-4'>
                                                    <div className='text-sm font-medium text-gray-100'>{user.name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        {/* Nova célula para o ID */}
                                        <td className='px-6 py-4 whitespace-nowrap'>
                                            <div className='text-sm text-gray-300'>{user.id}</div>
                                        </td>

                                        <td className='px-6 py-4 whitespace-nowrap'>
                                            <div className='text-sm text-gray-300'>{user.email}</div>
                                            {user.cpf && (
                                                <div className='text-xs text-gray-500 mt-0.5'>CPF: {user.cpf}</div>
                                            )}
                                        </td>

                                        <td className='px-6 py-4 whitespace-nowrap'>
                                            <div className='text-sm text-gray-300'>
                                                {user.product || "N/A"}
                                            </div>
                                        </td>

                                        <td className='px-6 py-4 whitespace-nowrap'>
                                            <div className='text-sm text-gray-300'>
                                                <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-800 text-blue-100'>
                                                    {user.phone}
                                                </span>
                                            </div>
                                        </td>

                                        <td className='px-6 py-4 whitespace-nowrap'>
                                            <span
                                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    user.status === "Pago"
                                                        ? "bg-green-800 text-green-100"
                                                        : "bg-yellow-600 text-yellow-100"
                                                }`}
                                            >
                                                {user.status}
                                            </span>
                                        </td>

                                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300 text-center'>
                                            <button
                                                onClick={() => handleEditClick(user)}
                                                className='px-3 py-1.5 text-indigo-400 hover:text-indigo-300 border border-indigo-400 rounded-md transition-colors'
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

                <motion.div
                    className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mt-8'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <h2 className='text-xl font-semibold text-gray-100 mb-4'>Gráficos</h2>
                    <div style={{ width: "100%", height: 300 }}>
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie
                                    data={chartData}
                                    cx='50%'
                                    cy='50%'
                                    outerRadius={100}
                                    fill='#8884d8'
                                    dataKey='value'
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "rgba(31, 41, 55, 0.8)",
                                        borderColor: "#4B5563",
                                    }}
                                    itemStyle={{ color: "#E5E7EB" }}
                                />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
            </div>

            {/* Modal para Adicionar Novo Usuário */}
            <AnimatePresence>
                {isAddUserModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
                    >
                        <motion.div
                            initial={{ y: -50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -50, opacity: 0 }}
                            className="bg-gray-800 p-8 rounded-lg shadow-xl border border-gray-700 w-full max-w-md relative"
                        >
                            <button
                                onClick={handleCloseAddUserModal}
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-100"
                            >
                                <X size={24} />
                            </button>
                            <h3 className="text-2xl font-bold text-gray-100 mb-6">Adicionar Novo Cliente</h3>
                            <form onSubmit={handleSubmitNewUser} className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                                        Nome
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="w-full bg-gray-700 text-white rounded-md border border-gray-600 focus:ring-blue-500 focus:border-blue-500 p-2.5"
                                        placeholder="Nome do Cliente"
                                        value={newUserName}
                                        onChange={(e) => setNewUserName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="w-full bg-gray-700 text-white rounded-md border border-gray-600 focus:ring-blue-500 focus:border-blue-500 p-2.5"
                                        placeholder="email@example.com"
                                        value={newUserEmail}
                                        onChange={(e) => setNewUserEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                                        Número de Telefone
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        className="w-full bg-gray-700 text-white rounded-md border border-gray-600 focus:ring-blue-500 focus:border-blue-500 p-2.5"
                                        placeholder="(XX) XXXXX-XXXX"
                                        value={newUserPhone}
                                        onChange={(e) => setNewUserPhone(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="cpf" className="block text-sm font-medium text-gray-300 mb-1">
                                        CPF
                                    </label>
                                    <input
                                        type="text"
                                        id="cpf"
                                        className="w-full bg-gray-700 text-white rounded-md border border-gray-600 focus:ring-blue-500 focus:border-blue-500 p-2.5"
                                        placeholder="XXX.XXX.XXX-XX"
                                        value={newUserCpf}
                                        onChange={(e) => setNewUserCpf(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="product" className="block text-sm font-medium text-gray-300 mb-1">
                                        Nome do Produto
                                    </label>
                                    <input
                                        type="text"
                                        id="product"
                                        className="w-full bg-gray-700 text-white rounded-md border border-gray-600 focus:ring-blue-500 focus:border-blue-500 p-2.5"
                                        placeholder="Ex: Assinatura Premium"
                                        value={newUserProduct}
                                        onChange={(e) => setNewUserProduct(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="flex justify-end space-x-3 mt-6">
                                    <button
                                        type="button"
                                        onClick={handleCloseAddUserModal}
                                        className="px-5 py-2 border border-gray-600 rounded-md text-gray-300 hover:bg-gray-700 transition-colors"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors"
                                    >
                                        Adicionar Cliente
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Modal para Editar Usuário */}
            <AnimatePresence>
                {isEditUserModalOpen && editingUser && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
                    >
                        <motion.div
                            initial={{ y: -50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -50, opacity: 0 }}
                            className="bg-gray-800 p-8 rounded-lg shadow-xl border border-gray-700 w-full max-w-md relative"
                        >
                            <button
                                onClick={handleCloseEditUserModal}
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-100"
                            >
                                <X size={24} />
                            </button>
                            <h3 className="text-2xl font-bold text-gray-100 mb-6">Editar Cliente</h3>
                            <form onSubmit={handleSubmitEditUser} className="space-y-4">
                                <div>
                                    <label htmlFor="editName" className="block text-sm font-medium text-gray-300 mb-1">
                                        Nome
                                    </label>
                                    <input
                                        type="text"
                                        id="editName"
                                        className="w-full bg-gray-700 text-white rounded-md border border-gray-600 focus:ring-blue-500 focus:border-blue-500 p-2.5"
                                        placeholder="Nome do Cliente"
                                        value={editUserName}
                                        onChange={(e) => setEditUserName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="editEmail" className="block text-sm font-medium text-gray-300 mb-1">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="editEmail"
                                        className="w-full bg-gray-700 text-white rounded-md border border-gray-600 focus:ring-blue-500 focus:border-blue-500 p-2.5"
                                        placeholder="email@example.com"
                                        value={editUserEmail}
                                        onChange={(e) => setEditUserEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="editPhone" className="block text-sm font-medium text-gray-300 mb-1">
                                        Número de Telefone
                                    </label>
                                    <input
                                        type="tel"
                                        id="editPhone"
                                        className="w-full bg-gray-700 text-white rounded-md border border-gray-600 focus:ring-blue-500 focus:border-blue-500 p-2.5"
                                        placeholder="(XX) XXXXX-XXXX"
                                        value={editUserPhone}
                                        onChange={(e) => setEditUserPhone(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="editCpf" className="block text-sm font-medium text-gray-300 mb-1">
                                        CPF
                                    </label>
                                    <input
                                        type="text"
                                        id="editCpf"
                                        className="w-full bg-gray-700 text-white rounded-md border border-gray-600 focus:ring-blue-500 focus:border-blue-500 p-2.5"
                                        placeholder="XXX.XXX.XXX-XX"
                                        value={editUserCpf}
                                        onChange={(e) => setEditUserCpf(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="editProduct" className="block text-sm font-medium text-gray-300 mb-1">
                                        Nome do Produto
                                    </label>
                                    <input
                                        type="text"
                                        id="editProduct"
                                        className="w-full bg-gray-700 text-white rounded-md border border-gray-600 focus:ring-blue-500 focus:border-blue-500 p-2.5"
                                        placeholder="Ex: Assinatura Premium"
                                        value={editUserProduct}
                                        onChange={(e) => setEditUserProduct(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="flex justify-end space-x-3 mt-6">
                                    <button
                                        type="button"
                                        onClick={handleCloseEditUserModal}
                                        className="px-5 py-2 border border-gray-600 rounded-md text-gray-300 hover:bg-gray-700 transition-colors"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                                    >
                                        Salvar Alterações
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Funcionarios;