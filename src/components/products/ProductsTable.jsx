import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Edit, Search, Trash2, Plus, X } from "lucide-react";

const PRODUCT_DATA = [
    { id: 1, name: "X-Burgues Duplo", category: "Comida", price: 59.99, stock: 143, sales: 1200 },
    { id: 2, name: "X-Bacon", category: "Comida", price: 39.99, stock: 89, sales: 800 },
    { id: 3, name: "Smash-Triplo", category: "Comida", price: 199.99, stock: 56, sales: 650 },
    { id: 4, name: "X-tudo", category: "Comida", price: 29.99, stock: 210, sales: 950 },
    { id: 5, name: "Coca-Cola", category: "Bebida", price: 79.99, stock: 78, sales: 720 },
];

const ProductsTable = () => {
    const [allProducts, setAllProducts] = useState(PRODUCT_DATA);
    const [filteredProducts, setFilteredProducts] = useState(PRODUCT_DATA);
    const [searchTerm, setSearchTerm] = useState("");

    const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
    const [isEditProductModalOpen, setIsEditProductModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    // Estados para o formulário de novo produto (agora com categoria)
    const [newProductName, setNewProductName] = useState("");
    const [newProductCategory, setNewProductCategory] = useState("Comida"); // Valor padrão para o select
    const [newProductPrice, setNewProductPrice] = useState("");
    const [newProductStock, setNewProductStock] = useState("");

    // Estados para o formulário de edição de produto
    const [editProductName, setEditProductName] = useState("");
    const [editProductCategory, setEditProductCategory] = useState("");
    const [editProductPrice, setEditProductPrice] = useState("");
    const [editProductStock, setEditProductStock] = useState("");
    const [editProductSales, setEditProductSales] = useState("");

    // Sincroniza a busca com os produtos
    React.useEffect(() => {
        const term = searchTerm.toLowerCase();
        const filtered = allProducts.filter(
            (product) =>
                product.name.toLowerCase().includes(term) ||
                product.category.toLowerCase().includes(term) ||
                product.id.toString().includes(term)
        );
        setFilteredProducts(filtered);
    }, [allProducts, searchTerm]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    // --- Funções para Adicionar Produto ---
    const handleAddProductClick = () => {
        setIsAddProductModalOpen(true);
    };

    const handleCloseAddProductModal = () => {
        setIsAddProductModalOpen(false);
        // Limpa os campos do formulário ao fechar
        setNewProductName("");
        setNewProductCategory("Comida"); // Reseta para o valor padrão
        setNewProductPrice("");
        setNewProductStock("");
    };

    const handleSubmitNewProduct = (e) => {
        e.preventDefault();

        const newId = Date.now(); // Gera um ID único baseado no timestamp

        const newProduct = {
            id: newId,
            name: newProductName,
            category: newProductCategory, // Agora vem do select
            price: parseFloat(newProductPrice),
            stock: parseInt(newProductStock),
            sales: 0, // Default para vendas para novos produtos
        };

        setAllProducts((prevProducts) => [...prevProducts, newProduct]);
        handleCloseAddProductModal();
    };

    // --- Funções para Editar Produto ---
    const handleEditClick = (product) => {
        setEditingProduct(product);
        setEditProductName(product.name);
        setEditProductCategory(product.category);
        setEditProductPrice(product.price.toString());
        setEditProductStock(product.stock.toString());
        setEditProductSales(product.sales.toString());
        setIsEditProductModalOpen(true);
    };

    const handleCloseEditProductModal = () => {
        setIsEditProductModalOpen(false);
        setEditingProduct(null);
        setEditProductName("");
        setEditProductCategory("");
        setEditProductPrice("");
        setEditProductStock("");
        setEditProductSales("");
    };

    const handleSubmitEditProduct = (e) => {
        e.preventDefault();

        const updatedProduct = {
            ...editingProduct,
            name: editProductName,
            category: editProductCategory,
            price: parseFloat(editProductPrice),
            stock: parseInt(editProductStock),
            sales: parseInt(editProductSales),
        };

        setAllProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.id === updatedProduct.id ? updatedProduct : product
            )
        );
        handleCloseEditProductModal();
    };

    // --- Função para Deletar Produto ---
    const handleDeleteClick = (productId) => {
        if (window.confirm("Tem certeza que deseja excluir este produto?")) {
            setAllProducts((prevProducts) =>
                prevProducts.filter((product) => product.id !== productId)
            );
        }
    };

    return (
        <motion.div
            className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
        >
            <div className='flex justify-between items-center mb-6'>
                <h2 className='text-xl font-semibold text-gray-100'>Lista de Produtos</h2>
                <div className='flex items-center space-x-4'>
                    <div className='relative'>
                        <input
                            type='text'
                            placeholder='Listar Produtos...'
                            className='bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            onChange={handleSearch}
                            value={searchTerm}
                        />
                        <Search className='absolute left-3 top-2.5 text-gray-400' size={18} />
                    </div>
                    <button
                        onClick={handleAddProductClick}
                        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200 flex items-center gap-2"
                    >
                        <Plus size={20} /> Adicionar
                    </button>
                </div>
            </div>

            <div className='overflow-x-auto'>
                <table className='min-w-full divide-y divide-gray-700'>
                    <thead>
                        <tr>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                                Nome do Produto
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                                ID
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                                Categoria
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                                Valor
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                                Estoque
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                                Vendidos
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider text-center'>
                                Atividade
                            </th>
                        </tr>
                    </thead>

                    <tbody className='divide-y divide-gray-700'>
                        {filteredProducts.map((product) => (
                            <motion.tr
                                key={product.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100 flex gap-2 items-center'>
                                    <img
                                        src='https://images.unsplash.com/photo-1627989580309-bfaf3e58af6f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2lyZWxlc3MlMjBlYXJidWRzfGVufDB8fDB8fHww'
                                        alt='Product img'
                                        className='size-10 rounded-full object-cover'
                                    />
                                    {product.name}
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>{product.id}</td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                                    {product.category}
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                                    ${product.price.toFixed(2)}
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>{product.stock}</td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>{product.sales}</td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300 text-center'>
                                    <button
                                        onClick={() => handleEditClick(product)}
                                        className='text-indigo-400 hover:text-indigo-300 mr-2'
                                    >
                                        <Edit size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteClick(product.id)}
                                        className='text-red-400 hover:text-red-300'
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal para Adicionar Novo Produto */}
            <AnimatePresence>
                {isAddProductModalOpen && (
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
                                onClick={handleCloseAddProductModal}
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-100"
                            >
                                <X size={24} />
                            </button>
                            <h3 className="text-2xl font-bold text-gray-100 mb-6">Adicionar Novo Produto</h3>
                            <form onSubmit={handleSubmitNewProduct} className="space-y-4">
                                <div>
                                    <label htmlFor="newProductName" className="block text-sm font-medium text-gray-300 mb-1">
                                        Nome do Produto
                                    </label>
                                    <input
                                        type="text"
                                        id="newProductName"
                                        className="w-full bg-gray-700 text-white rounded-md border border-gray-600 focus:ring-blue-500 focus:border-blue-500 p-2.5"
                                        placeholder="Nome do Produto"
                                        value={newProductName}
                                        onChange={(e) => setNewProductName(e.target.value)}
                                        required
                                    />
                                </div>
                                {/* Adicionando Categoria de volta com select */}
                                <div>
                                    <label htmlFor="newProductCategory" className="block text-sm font-medium text-gray-300 mb-1">
                                        Categoria
                                    </label>
                                    <select
                                        id="newProductCategory"
                                        className="w-full bg-gray-700 text-white rounded-md border border-gray-600 focus:ring-blue-500 focus:border-blue-500 p-2.5"
                                        value={newProductCategory}
                                        onChange={(e) => setNewProductCategory(e.target.value)}
                                        required
                                    >
                                        <option value="Comida">Comida</option>
                                        <option value="Bebida">Bebida</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="newProductPrice" className="block text-sm font-medium text-gray-300 mb-1">
                                        Valor (Preço)
                                    </label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        id="newProductPrice"
                                        className="w-full bg-gray-700 text-white rounded-md border border-gray-600 focus:ring-blue-500 focus:border-blue-500 p-2.5"
                                        placeholder="Ex: 59.99"
                                        value={newProductPrice}
                                        onChange={(e) => setNewProductPrice(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="newProductStock" className="block text-sm font-medium text-gray-300 mb-1">
                                        Estoque
                                    </label>
                                    <input
                                        type="number"
                                        id="newProductStock"
                                        className="w-full bg-gray-700 text-white rounded-md border border-gray-600 focus:ring-blue-500 focus:border-blue-500 p-2.5"
                                        placeholder="Ex: 100"
                                        value={newProductStock}
                                        onChange={(e) => setNewProductStock(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="flex justify-end space-x-3 mt-6">
                                    <button
                                        type="button"
                                        onClick={handleCloseAddProductModal}
                                        className="px-5 py-2 border border-gray-600 rounded-md text-gray-300 hover:bg-gray-700 transition-colors"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors"
                                    >
                                        Adicionar Produto
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Modal para Editar Produto (Mantém todos os campos para edição completa) */}
            <AnimatePresence>
                {isEditProductModalOpen && editingProduct && (
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
                                onClick={handleCloseEditProductModal}
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-100"
                            >
                                <X size={24} />
                            </button>
                            <h3 className="text-2xl font-bold text-gray-100 mb-6">Editar Produto</h3>
                            <form onSubmit={handleSubmitEditProduct} className="space-y-4">
                                <div>
                                    <label htmlFor="editProductName" className="block text-sm font-medium text-gray-300 mb-1">
                                        Nome do Produto
                                    </label>
                                    <input
                                        type="text"
                                        id="editProductName"
                                        className="w-full bg-gray-700 text-white rounded-md border border-gray-600 focus:ring-blue-500 focus:border-blue-500 p-2.5"
                                        placeholder="Nome do Produto"
                                        value={editProductName}
                                        onChange={(e) => setEditProductName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="editProductCategory" className="block text-sm font-medium text-gray-300 mb-1">
                                        Categoria
                                    </label>
                                    <input
                                        type="text"
                                        id="editProductCategory"
                                        className="w-full bg-gray-700 text-white rounded-md border border-gray-600 focus:ring-blue-500 focus:border-blue-500 p-2.5"
                                        placeholder="Ex: Comida, Bebida"
                                        value={editProductCategory}
                                        onChange={(e) => setEditProductCategory(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="editProductPrice" className="block text-sm font-medium text-gray-300 mb-1">
                                        Valor (Preço)
                                    </label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        id="editProductPrice"
                                        className="w-full bg-gray-700 text-white rounded-md border border-gray-600 focus:ring-blue-500 focus:border-blue-500 p-2.5"
                                        placeholder="Ex: 59.99"
                                        value={editProductPrice}
                                        onChange={(e) => setEditProductPrice(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="editProductStock" className="block text-sm font-medium text-gray-300 mb-1">
                                        Estoque
                                    </label>
                                    <input
                                        type="number"
                                        id="editProductStock"
                                        className="w-full bg-gray-700 text-white rounded-md border border-gray-600 focus:ring-blue-500 focus:border-blue-500 p-2.5"
                                        placeholder="Ex: 100"
                                        value={editProductStock}
                                        onChange={(e) => setEditProductStock(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="editProductSales" className="block text-sm font-medium text-gray-300 mb-1">
                                        Vendas
                                    </label>
                                    <input
                                        type="number"
                                        id="editProductSales"
                                        className="w-full bg-gray-700 text-white rounded-md border border-gray-600 focus:ring-blue-500 focus:border-blue-500 p-2.5"
                                        placeholder="Ex: 50"
                                        value={editProductSales}
                                        onChange={(e) => setEditProductSales(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="flex justify-end space-x-3 mt-6">
                                    <button
                                        type="button"
                                        onClick={handleCloseEditProductModal}
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
        </motion.div>
    );
};

export default ProductsTable;