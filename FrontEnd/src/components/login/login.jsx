import React, { useState } from 'react'; // Importa React e o hook useState para gerenciar o estado do componente.
import { useNavigate, Link } from 'react-router-dom'; // Importa hooks e componentes do React Router para navegação.

/**
 * Componente LoginPage: Renderiza a interface de login, gerencia o estado dos campos,
 * simula autenticação e redireciona o usuário.
 */
function LoginPage() {
  // --- Hooks de Estado ---
  // email: armazena o valor do campo de e-mail.
  const [email, setEmail] = useState('');
  // password: armazena o valor do campo de senha.
  const [password, setPassword] = useState('');
  // rememberMe: armazena o estado do checkbox "Lembrar da senha".
  const [rememberMe, setRememberMe] = useState(false);
  // error: armazena mensagens de erro a serem exibidas para o usuário.
  const [error, setError] = useState('');
  // navigate: função para realizar navegação programática (redirecionar para outras rotas).
  const navigate = useNavigate();

// --- URL da Imagem de Fundo ---
  const BACKGROUND_IMAGE_URL = 'https://i.pinimg.com/736x/92/ec/b5/92ecb58ab7d477786d0e8aee9c5febdd.jpg';

  // --- Função de Submissão do Formulário ---
  /**
   * handleSubmit: Lida com a submissão do formulário de login.
   * @param {Event} e - O evento de submissão do formulário.
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário (recarregar a página).
    setError(''); // Limpa qualquer mensagem de erro anterior antes de tentar o login.

    // --- Simulação de Autenticação ---
    // Em uma aplicação real, aqui você faria uma chamada a uma API de backend para autenticar o usuário.
    if (email === 'admin@admin.com' && password === 'admin123') {
      // Se as credenciais simuladas forem válidas:
      localStorage.setItem('isAuthenticated', 'true'); // Armazena uma flag no localStorage para indicar que o usuário está autenticado.
      console.log('Login simulado bem-sucedido!'); // Mensagem de sucesso no console.
      navigate('/'); // Redireciona o usuário para a página inicial (rota raiz).
    } else {
      // Se as credenciais simuladas forem inválidas:
      setError('Credenciais inválidas. Tente novamente.'); // Define a mensagem de erro a ser exibida.
    }
  };

  // --- Renderização do Componente (JSX) ---
  return (
    // Container principal da página de login, centraliza o conteúdo.
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
      {/* Imagem de Fundo */}
      {/* Define a imagem de fundo com efeito de desfoque. */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-sm"
        style={{ backgroundImage: `url(${BACKGROUND_IMAGE_URL})` }} // Aplica a imagem de fundo dinamicamente.
        // Handler para erro no carregamento da imagem de fundo. Se a imagem falhar, carrega um placeholder.
        onError={(e) => { e.target.style.backgroundImage = 'url(https://placehold.co/1920x1080/6366f1/ffffff?text=Erro+ao+carregar+imagem)'; }}
      ></div>

      {/* Overlay Escuro */}
      {/* Adiciona uma camada escura semi-transparente sobre a imagem de fundo para melhorar a legibilidade. */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Caixa de Login Principal */}
      {/* Container do formulário de login com estilo "vidro fosco" (backdrop-blur). */}
      <div className="relative bg-white bg-opacity-10 backdrop-blur-md p-10 rounded-xl shadow-2xl w-full max-w-md border border-white border-opacity-20 text-gray-100 flex flex-col items-center">
        {/* Título da Página de Login */}
        <h2 className="text-4xl font-bold text-white mb-8">Login</h2>

        {/* Formulário de Login */}
        <form onSubmit={handleSubmit} className="w-full">
          {/* Campo de E-mail */}
          <div className="mb-6 relative">
            <input
              type="email"
              id="email"
              placeholder="E-mail"
              value={email} // Conecta o input ao estado 'email'.
              onChange={(e) => setEmail(e.target.value)} // Atualiza o estado 'email' ao digitar.
              required // Campo obrigatório.
              className="w-full px-5 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-white placeholder-gray-200 transition-colors duration-200"
            />
            {/* Ícone de usuário para o campo de e-mail */}
            <svg className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300" fill="currentColor" viewBox="0 0 20 20" width="20" height="20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>

          {/* Campo de Senha */}
          <div className="mb-4 relative">
            <input
              type="password"
              id="password"
              placeholder="Senha"
              value={password} // Conecta o input ao estado 'password'.
              onChange={(e) => setPassword(e.target.value)} // Atualiza o estado 'password' ao digitar.
              required // Campo obrigatório.
              className="w-full px-5 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-white placeholder-gray-200 transition-colors duration-200"
            />
            {/* Ícone de cadeado para o campo de senha */}
            <svg className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300" fill="currentColor" viewBox="0 0 20 20" width="20" height="20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
          </div>

          {/* Opções: Lembrar da Senha e Esqueceu sua Senha? */}
          <div className="flex items-center justify-between text-sm mb-6">
            {/* Checkbox "Lembrar da senha" */}
            <label className="flex items-center text-gray-200 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe} // Conecta o checkbox ao estado 'rememberMe'.
                onChange={(e) => setRememberMe(e.target.checked)} // Atualiza o estado 'rememberMe'.
                className="form-checkbox h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
              />
              <span className="ml-2">Lembrar da senha</span>
            </label>
            {/* Link para a página "Esqueceu sua senha?" */}
            <Link to="/forgot-password" className="text-blue-300 hover:text-blue-100 transition-colors duration-200">
              Esqueceu sua senha?
            </Link>
          </div>

          {/* Mensagem de Erro (renderizada apenas se 'error' não estiver vazio) */}
          {error && <p className="text-red-300 text-sm mb-4 text-center">{error}</p>}

          {/* Botão de Login */}
          <button
            type="submit" // Define o botão como tipo submit para acionar a função handleSubmit.
            className="w-full bg-white text-gray-800 font-bold py-3 px-4 rounded-lg hover:bg-gray-200 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800 text-lg shadow-md"
          >
            Login
          </button>
        </form>

        {/* Link para Registrar */}
        <p className="mt-6 text-center text-gray-300">
          Não tem uma conta?{' '}
          <Link to="/register" className="text-blue-300 hover:text-blue-100 transition-colors duration-200 font-semibold">
            Registrar
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage; // Exporta o componente para que possa ser usado em outras partes da aplicação.