import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, PlusCircle, Edit, Trash2, Save, XCircle } from "lucide-react";

const FuncionariosTable = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [userData, setUserData] = useState([
        { id: 1, name: "Julio Gomes", email: "gatofofo@gmail.com", role: "147835763758", phone: "(11) 98765-4321", status: "Ativo" },
        { id: 2, name: "Jane Smith", email: "janesmith@example.com", role: "98765432109", phone: "(21) 99876-5432", status: "Ativo" },
        { id: 3, name: "Bob Johnson", email: "bobjohnson@example.com", role: "12345678901", phone: "(31) 97654-3210", status: "Inativo" },
        { id: 4, name: "Alice Brown", email: "alicebrown@example.com", role: "11223344556", phone: "(41) 96543-2109", status: "Ativo" },
        { id: 5, name: "Charlie Wilson", email: "charliewilson@example.com", role: "67890123456", phone: "(51) 95432-1098", status: "Ativo" },
    ]);
    const [filteredUsers, setFilteredUsers] = useState(userData);
    const [newEmployee, setNewEmployee] = useState({
        name: "",
        email: "",
        role: "", // CPF
        phone: "",
        status: "Ativo",
    });
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingId, setEditingId] = useState(null); // Novo estado para controlar qual ID está sendo editado
    const [currentEdit, setCurrentEdit] = useState({}); // Estado para armazenar os dados do funcionário sendo editado

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = userData.filter(
            (user) =>
                user.name.toLowerCase().includes(term) ||
                user.email.toLowerCase().includes(term) ||
                user.role.toLowerCase().includes(term) ||
                user.phone.toLowerCase().includes(term)
        );
        setFilteredUsers(filtered);
    };

    const handleNewEmployeeInputChange = (e) => {
        const { name, value } = e.target;
        setNewEmployee((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddEmployee = () => {
        if (newEmployee.name && newEmployee.email && newEmployee.role && newEmployee.phone) {
            const newId = userData.length > 0 ? Math.max(...userData.map((user) => user.id)) + 1 : 1;
            const employeeToAdd = { ...newEmployee, id: newId };
            setUserData((prev) => [...prev, employeeToAdd]);
            setFilteredUsers((prev) => [...prev, employeeToAdd]);
            setNewEmployee({ name: "", email: "", role: "", phone: "", status: "Ativo" });
            setShowAddForm(false);
        } else {
            alert("Por favor, preencha todos os campos para adicionar um novo funcionário.");
        }
    };

    const handleDeleteEmployee = (id) => {
        if (window.confirm("Tem certeza que deseja excluir este funcionário?")) {
            const updatedUsers = userData.filter(user => user.id !== id);
            setUserData(updatedUsers);
            setFilteredUsers(updatedUsers);
        }
    };

    const handleEditClick = (user) => {
        setEditingId(user.id);
        setCurrentEdit({ ...user }); // Carrega os dados do usuário para edição
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentEdit((prev) => ({ ...prev, [name]: value }));
    };

    const handleSaveEdit = (id) => {
        const updatedUsers = userData.map((user) =>
            user.id === id ? { ...currentEdit } : user
        );
        setUserData(updatedUsers);
        setFilteredUsers(updatedUsers); // Atualiza também os usuários filtrados
        setEditingId(null); // Sai do modo de edição
        setCurrentEdit({}); // Limpa o estado de edição
    };

    const handleCancelEdit = () => {
        setEditingId(null); // Sai do modo de edição
        setCurrentEdit({}); // Limpa o estado de edição
    };

    return (
        <motion.div
            className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
        >
            <div className='flex justify-between items-center mb-6'>
                <h2 className='text-xl font-semibold text-gray-100'>Funcionários</h2>
                <div className='flex items-center space-x-4'>
                    <div className='relative'>
                        <input
                            type='text'
                            placeholder='Pesquisar funcionários...'
                            className='bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                        <Search className='absolute left-3 top-2.5 text-gray-400' size={18} />
                    </div>
                    <button
                        onClick={() => setShowAddForm(!showAddForm)}
                        className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg flex items-center focus:outline-none focus:ring-2 focus:ring-blue-500'
                    >
                        <PlusCircle className='mr-2' size={20} />
                        Adicionar Funcionário
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {showAddForm && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className='mb-6 p-4 border border-gray-700 rounded-lg'
                    >
                        <h3 className='text-lg font-semibold text-gray-100 mb-4'>Adicionar Novo Funcionário</h3>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                            <input
                                type='text'
                                name='name'
                                placeholder='Nome'
                                className='bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                value={newEmployee.name}
                                onChange={handleNewEmployeeInputChange}
                            />
                            <input
                                type='email'
                                name='email'
                                placeholder='Email'
                                className='bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                value={newEmployee.email}
                                onChange={handleNewEmployeeInputChange}
                            />
                            <input
                                type='text'
                                name='role' // Este é o CPF
                                placeholder='CPF'
                                className='bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                value={newEmployee.role}
                                onChange={handleNewEmployeeInputChange}
                            />
                            <input
                                type='text'
                                name='phone'
                                placeholder='Telefone'
                                className='bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                value={newEmployee.phone}
                                onChange={handleNewEmployeeInputChange}
                            />
                            <select
                                name="status"
                                className='bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                value={newEmployee.status}
                                onChange={handleNewEmployeeInputChange}
                            >
                                <option value="Ativo">Ativo</option>
                                <option value="Inativo">Inativo</option>
                            </select>
                        </div>
                        <button
                            onClick={handleAddEmployee}
                            className='mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                        >
                            Adicionar Funcionário
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className='overflow-x-auto'>
                <table className='min-w-full divide-y divide-gray-700'>
                    <thead>
                        <tr>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                                Nome
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                                Email
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                                Cpf
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                                Telefone
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                                Status
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
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
                                                {user.name.charAt(0)}
                                            </div>
                                        </div>
                                        <div className='ml-4'>
                                            {editingId === user.id ? (
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={currentEdit.name}
                                                    onChange={handleEditInputChange}
                                                    className="bg-gray-700 text-white rounded-md p-1 w-32"
                                                />
                                            ) : (
                                                <div className='text-sm font-medium text-gray-100'>{user.name}</div>
                                            )}
                                        </div>
                                    </div>
                                </td>

                                <td className='px-6 py-4 whitespace-nowrap'>
                                    {editingId === user.id ? (
                                        <input
                                            type="email"
                                            name="email"
                                            value={currentEdit.email}
                                            onChange={handleEditInputChange}
                                            className="bg-gray-700 text-white rounded-md p-1 w-48"
                                        />
                                    ) : (
                                        <div className='text-sm text-gray-300'>{user.email}</div>
                                    )}
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap'>
                                    {editingId === user.id ? (
                                        <input
                                            type="text"
                                            name="role"
                                            value={currentEdit.role}
                                            onChange={handleEditInputChange}
                                            className="bg-gray-700 text-white rounded-md p-1 w-32"
                                        />
                                    ) : (
                                        <div className='text-sm text-gray-300'>{user.role}</div>
                                    )}
                                </td>

                                <td className='px-6 py-4 whitespace-nowrap'>
                                    {editingId === user.id ? (
                                        <input
                                            type="text"
                                            name="phone"
                                            value={currentEdit.phone}
                                            onChange={handleEditInputChange}
                                            className="bg-gray-700 text-white rounded-md p-1 w-32"
                                        />
                                    ) : (
                                        <div className='text-sm text-gray-300'>{user.phone}</div>
                                    )}
                                </td>

                                <td className='px-6 py-4 whitespace-nowrap'>
                                    {editingId === user.id ? (
                                        <select
                                            name="status"
                                            value={currentEdit.status}
                                            onChange={handleEditInputChange}
                                            className="bg-gray-700 text-white rounded-md p-1"
                                        >
                                            <option value="Ativo">Ativo</option>
                                            <option value="Inativo">Inativo</option>
                                        </select>
                                    ) : (
                                        <span
                                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                user.status === "Ativo"
                                                    ? "bg-green-800 text-green-100"
                                                    : "bg-red-800 text-red-100"
                                            }`}
                                        >
                                            {user.status}
                                        </span>
                                    )}
                                </td>

                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                                    {editingId === user.id ? (
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => handleSaveEdit(user.id)}
                                                className='text-green-400 hover:text-green-300 flex items-center'
                                                title="Salvar"
                                            >
                                                <Save size={16} className="mr-1"/> Salvar
                                            </button>
                                            <button
                                                onClick={handleCancelEdit}
                                                className='text-red-400 hover:text-red-300 flex items-center'
                                                title="Cancelar"
                                            >
                                                <XCircle size={16} className="mr-1"/> Cancelar
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => handleEditClick(user)}
                                                className='text-indigo-400 hover:text-indigo-300 flex items-center'
                                                title="Editar"
                                            >
                                                <Edit size={16} className="mr-1"/> Editar
                                            </button>
                                            <button
                                                onClick={() => handleDeleteEmployee(user.id)}
                                                className='text-red-400 hover:text-red-300 flex items-center'
                                                title="Excluir"
                                            >
                                                <Trash2 size={16} className="mr-1"/> Excluir
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
};

export default FuncionariosTable;