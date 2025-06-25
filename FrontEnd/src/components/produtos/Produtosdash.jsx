import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Edit, Search, Trash2, Plus, X } from "lucide-react";

// Dados iniciais dos produtos.
const PRODUCT_DATA = [
    { id: 1, name: "X-Burgues Duplo", category: "Comida", price: 59.99, stock: 143, sales: 1200 },
    { id: 2, name: "X-Bacon", category: "Comida", price: 39.99, stock: 89, sales: 800 },
    { id: 3, name: "Smash-Triplo", category: "Comida", price: 199.99, stock: 56, sales: 650 },
    { id: 4, name: "X-tudo", category: "Comida", price: 29.99, stock: 210, sales: 950 },
    { id: 5, name: "Coca-Cola", category: "Bebida", price: 79.99, stock: 78, sales: 720 },
];

const Produtosdash = () => {
    // Estados para gerenciar a lista de produtos e a busca.
    const [allProducts, setAllProducts] = useState(PRODUCT_DATA); // Armazena todos os produtos.
    const [filteredProducts, setFilteredProducts] = useState(PRODUCT_DATA); // Armazena produtos filtrados pela busca.
    const [searchTerm, setSearchTerm] = useState(""); // Termo de busca atual.

    // Estados para controlar a visibilidade dos modais de adicionar e editar produtos.
    const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false); // Abre/fecha modal de adição.
    const [isEditProductModalOpen, setIsEditProductModalOpen] = useState(false); // Abre/fecha modal de edição.
    const [editingProduct, setEditingProduct] = useState(null); // Armazena o produto que está sendo editado.

    // Estados para os campos do formulário de adição de novo produto.
    const [newProductName, setNewProductName] = useState(""); // Nome do novo produto.
    const [newProductCategory, setNewProductCategory] = useState("Comida"); // Categoria do novo produto (valor padrão).
    const [newProductPrice, setNewProductPrice] = useState(""); // Preço do novo produto.
    const [newProductStock, setNewProductStock] = useState(""); // Estoque do novo produto.

    // Estados para os campos do formulário de edição de produto.
    const [editProductName, setEditProductName] = useState(""); // Nome do produto em edição.
    const [editProductCategory, setEditProductCategory] = useState(""); // Categoria do produto em edição.
    const [editProductPrice, setEditProductPrice] = useState(""); // Preço do produto em edição.
    const [editProductStock, setEditProductStock] = useState(""); // Estoque do produto em edição.
    const [editProductSales, setEditProductSales] = useState(""); // Vendas do produto em edição.

    // Hook useEffect para sincronizar a busca com os produtos.
    React.useEffect(() => {
        const term = searchTerm.toLowerCase(); // Converte o termo de busca para minúsculas.
        // Filtra os produtos com base no nome, categoria ou ID.
        const filtered = allProducts.filter(
            (product) =>
                product.name.toLowerCase().includes(term) ||
                product.category.toLowerCase().includes(term) ||
                product.id.toString().includes(term)
        );
        setFilteredProducts(filtered); // Atualiza a lista de produtos filtrados.
    }, [allProducts, searchTerm]); // Dependências: re-executa quando allProducts ou searchTerm mudam.

    // Lida com a mudança no campo de busca.
    const handleSearch = (e) => {
        setSearchTerm(e.target.value); // Atualiza o termo de busca.
    };

    // --- Funções para Adicionar Produto ---
    const handleAddProductClick = () => {
        setIsAddProductModalOpen(true); // Abre o modal de adição de produto.
    };

    // Fecha o modal de adição e limpa os campos do formulário.
    const handleCloseAddProductModal = () => {
        setIsAddProductModalOpen(false); // Fecha o modal.
        setNewProductName(""); // Limpa o nome.
        setNewProductCategory("Comida"); // Reseta a categoria.
        setNewProductPrice(""); // Limpa o preço.
        setNewProductStock(""); // Limpa o estoque.
    };

    // Lida com o envio do formulário de novo produto.
    const handleSubmitNewProduct = (e) => {
        e.preventDefault(); // Previne o comportamento padrão do formulário.

        const newId = Date.now(); // Gera um ID único baseado no timestamp.

        // Cria o novo objeto de produto.
        const newProduct = {
            id: newId,
            name: newProductName,
            category: newProductCategory,
            price: parseFloat(newProductPrice), // Converte o preço para número.
            stock: parseInt(newProductStock), // Converte o estoque para número inteiro.
            sales: 0, // Vendas iniciais.
        };

        setAllProducts((prevProducts) => [...prevProducts, newProduct]); // Adiciona o novo produto à lista.
        handleCloseAddProductModal(); // Fecha o modal.
    };

    // --- Funções para Editar Produto ---
    // Lida com o clique no botão de edição.
    const handleEditClick = (product) => {
        setEditingProduct(product); // Define o produto a ser editado.
        setEditProductName(product.name); // Preenche o nome para edição.
        setEditProductCategory(product.category); // Preenche a categoria para edição.
        setEditProductPrice(product.price.toString()); // Preenche o preço para edição.
        setEditProductStock(product.stock.toString()); // Preenche o estoque para edição.
        setEditProductSales(product.sales.toString()); // Preenche as vendas para edição.
        setIsEditProductModalOpen(true); // Abre o modal de edição.
    };

    // Fecha o modal de edição e limpa os campos.
    const handleCloseEditProductModal = () => {
        setIsEditProductModalOpen(false); // Fecha o modal.
        setEditingProduct(null); // Limpa o produto em edição.
        setEditProductName(""); // Limpa o nome.
        setEditProductCategory(""); // Limpa a categoria.
        setEditProductPrice(""); // Limpa o preço.
        setEditProductStock(""); // Limpa o estoque.
        setEditProductSales(""); // Limpa as vendas.
    };

    // Lida com o envio do formulário de edição de produto.
    const handleSubmitEditProduct = (e) => {
        e.preventDefault(); // Previne o comportamento padrão do formulário.

        // Cria o objeto do produto atualizado.
        const updatedProduct = {
            ...editingProduct, // Mantém as propriedades existentes.
            name: editProductName,
            category: editProductCategory,
            price: parseFloat(editProductPrice),
            stock: parseInt(editProductStock),
            sales: parseInt(editProductSales),
        };

        // Atualiza a lista de todos os produtos.
        setAllProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.id === updatedProduct.id ? updatedProduct : product // Substitui o produto editado.
            )
        );
        handleCloseEditProductModal(); // Fecha o modal.
    };

    // --- Função para Deletar Produto ---
    const handleDeleteClick = (productId) => {
        // Confirmação antes de deletar.
        if (window.confirm("Tem certeza que deseja excluir este produto?")) {
            setAllProducts((prevProducts) =>
                prevProducts.filter((product) => product.id !== productId) // Remove o produto da lista.
            );
        }
    };

    return (
        // Contêiner principal do dashboard com animações.
        <motion.div
            className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8'
            initial={{ opacity: 0, y: 20 }} // Animação inicial.
            animate={{ opacity: 1, y: 0 }} // Animação final.
            transition={{ delay: 0.2 }} // Atraso da animação.
        >
            {/* Cabeçalho da seção de produtos com título e barra de busca/botão de adicionar. */}
            <div className='flex justify-between items-center mb-6'>
                <h2 className='text-xl font-semibold text-gray-100'>Lista de Produtos</h2>
                <div className='flex items-center space-x-4'>
                    {/* Campo de busca de produtos. */}
                    <div className='relative'>
                        <input
                            type='text'
                            placeholder='Listar Produtos...'
                            className='bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            onChange={handleSearch} // Lida com a mudança no input.
                            value={searchTerm} // Valor controlado pelo estado.
                        />
                        <Search className='absolute left-3 top-2.5 text-gray-400' size={18} /> {/* Ícone de busca. */}
                    </div>
                    {/* Botão para adicionar novo produto. */}
                    <button
                        onClick={handleAddProductClick}
                        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200 flex items-center gap-2"
                    >
                        <Plus size={20} /> Adicionar
                    </button>
                </div>
            </div>

            {/* Tabela de produtos. */}
            <div className='overflow-x-auto'>
                <table className='min-w-full divide-y divide-gray-700'>
                    {/* Cabeçalho da tabela. */}
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

                    {/* Corpo da tabela com produtos filtrados. */}
                    <tbody className='divide-y divide-gray-700'>
                        {filteredProducts.map((product) => (
                            // Linha da tabela para cada produto com animação.
                            <motion.tr
                                key={product.id}
                                initial={{ opacity: 0 }} // Animação inicial da linha.
                                animate={{ opacity: 1 }} // Animação final da linha.
                                transition={{ duration: 0.3 }} // Duração da animação.
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
                                {/* Botões de ação (Editar e Deletar). */}
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300 text-center'>
                                    <button
                                        onClick={() => handleEditClick(product)} // Chama a função de edição.
                                        className='text-indigo-400 hover:text-indigo-300 mr-2'
                                    >
                                        <Edit size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteClick(product.id)} // Chama a função de exclusão.
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
                {isAddProductModalOpen && ( // Renderiza o modal se isAddProductModalOpen for true.
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
                    >
                        <motion.div
                            initial={{ y: -50, opacity: 0 }} // Animação inicial do modal.
                            animate={{ y: 0, opacity: 1 }} // Animação final do modal.
                            exit={{ y: -50, opacity: 0 }} // Animação de saída do modal.
                            className="bg-gray-800 p-8 rounded-lg shadow-xl border border-gray-700 w-full max-w-md relative"
                        >
                            <button
                                onClick={handleCloseAddProductModal} // Fecha o modal ao clicar.
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-100"
                            >
                                <X size={24} /> {/* Ícone de fechar. */}
                            </button>
                            <h3 className="text-2xl font-bold text-gray-100 mb-6">Adicionar Novo Produto</h3>
                            <form onSubmit={handleSubmitNewProduct} className="space-y-4"> {/* Formulário de adição. */}
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
                                        onChange={(e) => setNewProductName(e.target.value)} // Atualiza o estado do nome.
                                        required // Campo obrigatório.
                                    />
                                </div>
                                {/* Campo de seleção de Categoria. */}
                                <div>
                                    <label htmlFor="newProductCategory" className="block text-sm font-medium text-gray-300 mb-1">
                                        Categoria
                                    </label>
                                    <select
                                        id="newProductCategory"
                                        className="w-full bg-gray-700 text-white rounded-md border border-gray-600 focus:ring-blue-500 focus:border-blue-500 p-2.5"
                                        value={newProductCategory}
                                        onChange={(e) => setNewProductCategory(e.target.value)} // Atualiza o estado da categoria.
                                        required
                                    >
                                        <option value="Comida">Comida</option>
                                        <option value="Bebida">Bebida</option>
                                    </select>
                                </div>
                                {/* Campo de Preço. */}
                                <div>
                                    <label htmlFor="newProductPrice" className="block text-sm font-medium text-gray-300 mb-1">
                                        Valor (Preço)
                                    </label>
                                    <input
                                        type="number"
                                        step="0.01" // Permite valores decimais.
                                        id="newProductPrice"
                                        className="w-full bg-gray-700 text-white rounded-md border border-gray-600 focus:ring-blue-500 focus:border-blue-500 p-2.5"
                                        placeholder="Ex: 59.99"
                                        value={newProductPrice}
                                        onChange={(e) => setNewProductPrice(e.target.value)} // Atualiza o estado do preço.
                                        required
                                    />
                                </div>
                                {/* Campo de Estoque. */}
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
                                        onChange={(e) => setNewProductStock(e.target.value)} // Atualiza o estado do estoque.
                                        required
                                    />
                                </div>
                                {/* Botões de ação do formulário de adição. */}
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

            {/* Modal para Editar Produto */}
            <AnimatePresence>
                {isEditProductModalOpen && editingProduct && ( // Renderiza o modal se isEditProductModalOpen e editingProduct forem true.
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
                    >
                        <motion.div
                            initial={{ y: -50, opacity: 0 }} // Animação inicial do modal.
                            animate={{ y: 0, opacity: 1 }} // Animação final do modal.
                            exit={{ y: -50, opacity: 0 }} // Animação de saída do modal.
                            className="bg-gray-800 p-8 rounded-lg shadow-xl border border-gray-700 w-full max-w-md relative"
                        >
                            <button
                                onClick={handleCloseEditProductModal} // Fecha o modal ao clicar.
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-100"
                            >
                                <X size={24} /> {/* Ícone de fechar. */}
                            </button>
                            <h3 className="text-2xl font-bold text-gray-100 mb-6">Editar Produto</h3>
                            <form onSubmit={handleSubmitEditProduct} className="space-y-4"> {/* Formulário de edição. */}
                                {/* Campo de Nome do Produto para edição. */}
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
                                        onChange={(e) => setEditProductName(e.target.value)} // Atualiza o estado do nome.
                                        required
                                    />
                                </div>
                                {/* Campo de Categoria para edição. */}
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
                                        onChange={(e) => setEditProductCategory(e.target.value)} // Atualiza o estado da categoria.
                                        required
                                    />
                                </div>
                                {/* Campo de Preço para edição. */}
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
                                        onChange={(e) => setEditProductPrice(e.target.value)} // Atualiza o estado do preço.
                                        required
                                    />
                                </div>
                                {/* Campo de Estoque para edição. */}
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
                                        onChange={(e) => setEditProductStock(e.target.value)} // Atualiza o estado do estoque.
                                        required
                                    />
                                </div>
                                {/* Campo de Vendas para edição. */}
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
                                        onChange={(e) => setEditProductSales(e.target.value)} // Atualiza o estado das vendas.
                                        required
                                    />
                                </div>
                                {/* Botões de ação do formulário de edição. */}
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

export default Produtosdash;