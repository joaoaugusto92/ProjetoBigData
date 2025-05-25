import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';  

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const BACKGROUND_IMAGE_URL = 'https://i.pinimg.com/736x/92/ec/b5/92ecb58ab7d477786d0e8aee9c5febdd.jpg';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (email === 'admin@admin.com' && password === 'admin123') {
      localStorage.setItem('isAuthenticated', 'true');
      console.log('Login simulado bem-sucedido!');
      navigate('/');
    } else {
      setError('Credenciais inválidas. Tente novamente.');
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-sm"
        style={{ backgroundImage: `url(${BACKGROUND_IMAGE_URL})` }}
        onError={(e) => { e.target.style.backgroundImage = 'url(https://placehold.co/1920x1080/6366f1/ffffff?text=Erro+ao+carregar+imagem)'; }}
      ></div>

      <div className="absolute inset-0 bg-black opacity-40"></div>

      <div className="relative bg-white bg-opacity-10 backdrop-blur-md p-10 rounded-xl shadow-2xl w-full max-w-md border border-white border-opacity-20 text-gray-100 flex flex-col items-center">
        <h2 className="text-4xl font-bold text-white mb-8">Login</h2>

        <form onSubmit={handleSubmit} className="w-full">

          <div className="mb-6 relative">
            <input
              type="email"
              id="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-5 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-white placeholder-gray-200 transition-colors duration-200"
            />

            <svg className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300" fill="currentColor" viewBox="0 0 20 20" width="20" height="20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>


          <div className="mb-4 relative">
            <input
              type="password"
              id="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-5 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-white placeholder-gray-200 transition-colors duration-200"
            />

            <svg className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300" fill="currentColor" viewBox="0 0 20 20" width="20" height="20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
          </div>


          <div className="flex items-center justify-between text-sm mb-6">
            <label className="flex items-center text-gray-200 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="form-checkbox h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
              />
              <span className="ml-2">Lembrar da senha</span>
            </label>
            <Link to="/forgot-password" className="text-blue-300 hover:text-blue-100 transition-colors duration-200">
              Esqueceu sua senha?
            </Link>
          </div>


          {error && <p className="text-red-300 text-sm mb-4 text-center">{error}</p>}


          <button
            type="submit"
            className="w-full bg-white text-gray-800 font-bold py-3 px-4 rounded-lg hover:bg-gray-200 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800 text-lg shadow-md"
          >
            Login
          </button>
        </form>

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

export default LoginPage;
