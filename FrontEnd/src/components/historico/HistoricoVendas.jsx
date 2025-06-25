import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, PlusCircle, X, Edit2, Trash2 } from "lucide-react";

// Função auxiliar para obter estilos de status
const getStatusStyles = (status) => {
    switch (status) {
        case "Pago":
            return "bg-green-100 text-green-800";
        case "Cancelado":
            return "bg-red-100 text-red-800";
        default:
            return "bg-gray-100 text-gray-800";
    }
};

const initialOrderData = [
    { id: "00001", customer: "joao", phoneNumber: "11987654321", product: "Hambúrguer Clássico", total: 32.00, status: "Cancelado", date: "2023-07-01" },
    { id: "00003", customer: "Guilherme", phoneNumber: "31976543210", product: "Refrigerante Cola", total: 12.00, status: "Pago", date: "2023-07-03" },
    { id: "00005", customer: "Charlie", phoneNumber: "51954321098", product: "Milkshake Chocolate", total: 25.75, status: "Pago", date: "2023-07-05" },
    { id: "00007", customer: "David", phoneNumber: "71932109876", product: "Hambúrguer Vegetariano", total: 38.00, status: "Cancelado", date: "2023-07-07" },
    { id: "00008", customer: "ribeiro", phoneNumber: "81921098765", product: "Molho Extra", total: 5.00, status: "Pago", date: "2023-07-08" },
    { id: "00009", customer: "silva", phoneNumber: "91909876543", product: "Batata Frita Grande", total: 18.50, status: "Pago", date: "2023-07-09" },
    { id: "00010", customer: "silva", phoneNumber: "01987654321", product: "Hambúrguer Duplo", total: 45.00, status: "Cancelado", date: "2023-07-10" },
    { id: "00011", customer: "Hannah", phoneNumber: "11976543210", product: "Refrigerante Diet", total: 14.00, status: "Cancelado", date: "2023-07-11" },
    { id: "00012", customer: "Ian", phoneNumber: "21954321098", product: "Salada Caesar", total: 22.00, status: "Pago", date: "2023-07-12" },
    { id: "00013", customer: "Jack", phoneNumber: "31932109876", product: "Hambúrguer de Frango", total: 30.00, status: "Pago", date: "2023-07-13" },
];

const HistoricoVendas = () => {
    const [orders, setOrders] = useState(initialOrderData);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentOrder, setCurrentOrder] = useState(null);
    const [formData, setFormData] = useState({ customer: "", product: "", phoneNumber: "", total: "" });
    const [formErrors, setFormErrors] = useState({});

    const filteredOrders = orders.filter(
        (order) =>
            order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleOpenModal = (order = null) => {
        if (order) {
            setIsEditMode(true);
            setCurrentOrder(order);
            setFormData({
                customer: order.customer,
                product: order.product,
                phoneNumber: order.phoneNumber,
                total: order.total,
            });
        } else {
            setIsEditMode(false);
            setCurrentOrder(null);
            setFormData({ customer: "", product: "", phoneNumber: "", total: "" });
        }
        setIsModalOpen(true);
        setFormErrors({});
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setIsEditMode(false);
        setCurrentOrder(null);
        setFormData({ customer: "", product: "", phoneNumber: "", total: "" });
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.customer.trim()) errors.customer = "Nome do cliente é obrigatório.";
        if (!formData.product.trim()) errors.product = "Nome do produto é obrigatório.";
        if (!formData.phoneNumber.trim()) errors.phoneNumber = "Número de telefone é obrigatório.";
        if (!/^\d+$/.test(formData.phoneNumber.trim())) errors.phoneNumber = "Número de telefone deve conter apenas dígitos.";
        if (!formData.total || isNaN(formData.total) || parseFloat(formData.total) <= 0)
            errors.total = "Total deve ser um número positivo.";
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        if (isEditMode) {
            setOrders((prev) =>
                prev.map((order) =>
                    order.id === currentOrder.id
                        ? {
                            ...order,
                            customer: formData.customer,
                            product: formData.product,
                            phoneNumber: formData.phoneNumber,
                            total: parseFloat(formData.total),
                        }
                        : order
                )
            );
        } else {
            const newId = (parseInt(orders[orders.length - 1].id) + 1).toString().padStart(5, "0");
            const orderToAdd = {
                id: newId,
                customer: formData.customer,
                product: formData.product,
                phoneNumber: formData.phoneNumber,
                total: parseFloat(formData.total),
                status: "Pago", // Status padrão para novas vendas agora é "Pago"
                date: new Date().toISOString().slice(0, 10), // Data atual para novas vendas
            };
            setOrders((prev) => [...prev, orderToAdd]);
        }
        handleModalClose();
    };

    const handleDeleteOrder = (idToDelete) => {
        if (window.confirm("Tem certeza que deseja excluir esta venda?")) {
            setOrders((prev) => prev.filter((order) => order.id !== idToDelete));
        }
    };

    return (
        <motion.div
            className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
        >
            <div className='flex flex-col md:flex-row justify-between items-center mb-6'>
                <h2 className='text-2xl font-bold text-gray-100 mb-4 md:mb-0'>Histórico de Vendas</h2>
                <div className='flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto'>
                    <div className='relative w-full md:w-auto'>
                        <input
                            type='text'
                            placeholder='Consultar ID, Cliente, Produto ou Telefone...'
                            className='bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full'
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                        <Search className='absolute left-3 top-2.5 text-gray-400' size={18} />
                    </div>
                    <button
                        onClick={() => handleOpenModal()}
                        className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center w-full md:w-auto'
                    >
                        <PlusCircle size={20} className='mr-2' /> Adicionar Venda
                    </button>
                </div>
            </div>

            <div className='overflow-x-auto rounded-lg border border-gray-700'>
                <table className='min-w-full divide-y divide-gray-700'>
                    <thead className='bg-gray-700'>
                        <tr>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                                ID
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                                Cliente
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                                Telefone
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                                Produto
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                                Total
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                                Status
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                                Data
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                                Ações
                            </th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-700'>
                        {filteredOrders.length > 0 ? (
                            filteredOrders.map((order) => (
                                <motion.tr
                                    key={order.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                    className='hover:bg-gray-700'
                                >
                                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100'>
                                        {order.id}
                                    </td>
                                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100'>
                                        {order.customer}
                                    </td>
                                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100'>
                                        {order.phoneNumber}
                                    </td>
                                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100'>
                                        {order.product}
                                    </td>
                                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100'>
                                        R$ {order.total.toFixed(2)}
                                    </td>
                                    <td className='px-6 py-4 whitespace-nowrap text-sm'>
                                        <span
                                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusStyles(
                                                order.status
                                            )}`}
                                        >
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                                        {order.date}
                                    </td>
                                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                                        <button
                                            onClick={() => handleOpenModal(order)}
                                            className='text-blue-400 hover:text-blue-300 mr-2 p-1 rounded-full hover:bg-gray-600 transition-colors duration-200'
                                            title="Editar Venda"
                                        >
                                            <Edit2 size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteOrder(order.id)}
                                            className='text-red-400 hover:text-red-300 p-1 rounded-full hover:bg-gray-600 transition-colors duration-200'
                                            title="Excluir Venda"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </motion.tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan='8' className='px-6 py-8 text-center text-gray-400 text-lg'>
                                    Nenhum pedido encontrado.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal de Adicionar/Editar Venda */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        className='fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className='bg-gray-800 rounded-lg p-8 w-full max-w-md border border-gray-700 shadow-xl relative'
                            initial={{ scale: 0.9, y: 50 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 50 }}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        >
                            <button
                                onClick={handleModalClose}
                                className='absolute top-4 right-4 text-gray-400 hover:text-gray-100 transition-colors duration-200'
                            >
                                <X size={24} />
                            </button>
                            <h3 className='text-2xl font-bold text-gray-100 mb-6 text-center'>
                                {isEditMode ? "Editar Venda" : "Adicionar Nova Venda"}
                            </h3>
                            <form onSubmit={handleFormSubmit} className='space-y-5'>
                                <div>
                                    <label htmlFor='customer' className='block text-gray-300 text-sm font-bold mb-2'>
                                        Cliente:
                                    </label>
                                    <input
                                        type='text'
                                        id='customer'
                                        name='customer'
                                        value={formData.customer}
                                        onChange={handleFormChange}
                                        className='bg-gray-700 text-white rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
                                        placeholder='Nome do Cliente'
                                    />
                                    {formErrors.customer && (
                                        <p className='text-red-400 text-xs mt-1'>{formErrors.customer}</p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor='product' className='block text-gray-300 text-sm font-bold mb-2'>
                                        Produto:
                                    </label>
                                    <input
                                        type='text'
                                        id='product'
                                        name='product'
                                        value={formData.product}
                                        onChange={handleFormChange}
                                        className='bg-gray-700 text-white rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
                                        placeholder='Ex: Hambúrguer, Batata Frita, Refrigerante'
                                    />
                                    {formErrors.product && (
                                        <p className='text-red-400 text-xs mt-1'>{formErrors.product}</p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor='phoneNumber' className='block text-gray-300 text-sm font-bold mb-2'>
                                        Telefone:
                                    </label>
                                    <input
                                        type='text'
                                        id='phoneNumber'
                                        name='phoneNumber'
                                        value={formData.phoneNumber}
                                        onChange={handleFormChange}
                                        className='bg-gray-700 text-white rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
                                        placeholder='Ex: 11987654321'
                                    />
                                    {formErrors.phoneNumber && (
                                        <p className='text-red-400 text-xs mt-1'>{formErrors.phoneNumber}</p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor='total' className='block text-gray-300 text-sm font-bold mb-2'>
                                        Total (R$):
                                    </label>
                                    <input
                                        type='number'
                                        id='total'
                                        name='total'
                                        value={formData.total}
                                        onChange={handleFormChange}
                                        className='bg-gray-700 text-white rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
                                        placeholder='Ex: 99.99'
                                        step='0.01'
                                    />
                                    {formErrors.total && (
                                        <p className='text-red-400 text-xs mt-1'>{formErrors.total}</p>
                                    )}
                                </div>
                                <div className='flex justify-end space-x-3 mt-6'>
                                    <button
                                        type='button'
                                        onClick={handleModalClose}
                                        className='bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-5 rounded-lg transition-colors duration-200'
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type='submit'
                                        className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded-lg transition-colors duration-200'
                                    >
                                        {isEditMode ? "Salvar Alterações" : "Adicionar Venda"}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default HistoricoVendas;