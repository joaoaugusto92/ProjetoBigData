import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { FiAlertCircle, FiTrendingUp, FiTrendingDown, FiCheckCircle, FiInfo } from 'react-icons/fi';

// Dados de exemplo para notificações
const mockNotifications = [
    {
        id: 1,
        type: "warning",
        message: "Atenção a taxa de vendas diminui de 5% com base a semana passada",
        timestamp: "2025-05-26T18:00:00Z",
        read: false,
    },
    {
        id: 2,
        type: "success",
        message: "Parabéns! Vendas superaram a meta diária em 15%.",
        timestamp: "2025-05-26T17:30:00Z",
        read: false,
    },
    {
        id: 3,
        type: "info",
        message: "Lembrete: Atualizar promoções para a próxima semana.",
        timestamp: "2025-05-26T16:00:00Z",
        read: true,
    },
    {
        id: 4,
        type: "danger",
        message: "ALERTA: Estoque do produto 'X-burguer' está acabando (<10 unidades).",
        timestamp: "2025-05-26T15:00:00Z",
        read: false,
    },
    {
        id: 5,
        type: "warning",
        message: "O tráfego de busca via Facebook diminuiu 5% na última hora.",
        timestamp: "2025-05-26T14:30:00Z",
        read: true,
    },
    {
        id: 6,
        type: "info",
        message: "Nova pesquisa de satisfação do cliente está disponível.",
        timestamp: "2025-05-25T10:00:00Z",
        read: false,
    },
];

// Função para formatar a data/hora
const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMinutes = Math.round(diffMs / (1000 * 60));
    const diffHours = Math.round(diffMs / (1000 * 60 * 60));
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

    if (diffMinutes < 1) return "Agora mesmo";
    if (diffMinutes < 60) return `${diffMinutes} min atrás`;
    if (diffHours < 24) return `${diffHours} h atrás`;
    if (diffDays < 7) return `${diffDays} dia(s) atrás`;
    return date.toLocaleDateString('pt-BR');
};

// Retorna o ícone com base no tipo de notificação
const getIconForNotificationType = (type) => {
    switch (type) {
        case "success": return <FiCheckCircle className="text-green-400" />;
        case "danger": return <FiAlertCircle className="text-red-500" />;
        case "warning": return <FiAlertCircle className="text-yellow-400" />;
        case "info": return <FiInfo className="text-blue-400" />;
        default: return <FiInfo className="text-gray-400" />;
    }
};

const SegmentaçãodeClientes = () => {
    const [notifications, setNotifications] = useState(mockNotifications);

    // Efeito para simular a chegada de novas notificações
    useEffect(() => {

    }, [notifications.length]);

    // Marca uma notificação como lida
    const markAsRead = (id) => {
        setNotifications(prev =>
            prev.map(notif =>
                notif.id === id ? { ...notif, read: true } : notif
            )
        );
    };

    return (
        <motion.div
            className='bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-6 border border-gray-700 h-full flex flex-col'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
        >
            <h2 className='text-xl font-semibold text-gray-100 mb-4'>Notificações e Alertas</h2>
            
            {/* Define altura máxima para mostrar 3 notificações e habilita a rolagem */}
            <div className='flex-grow overflow-y-auto pr-2 custom-scrollbar' style={{ maxHeight: 'calc(3 * (70px + 0.75rem))' }}>
                <AnimatePresence>
                    {notifications.length > 0 ? (
                        notifications.map((notification) => (
                            <motion.div
                                key={notification.id}
                                className={`flex items-start p-3 mb-3 rounded-lg border ${
                                    notification.read ? 'bg-gray-700 border-gray-600 text-gray-400' : 'bg-gray-700 border-purple-500 text-gray-100'
                                }`}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="flex-shrink-0 mr-3 mt-1">
                                    {getIconForNotificationType(notification.type)}
                                </div>
                                <div className="flex-grow">
                                    <p className={`font-medium ${notification.read ? 'line-through opacity-70' : ''}`}>
                                        {notification.message}
                                    </p>
                                    <p className="text-xs mt-1 text-gray-500">
                                        {formatTimestamp(notification.timestamp)}
                                    </p>
                                </div>
                                {!notification.read && (
                                    <button
                                        onClick={() => markAsRead(notification.id)}
                                        className="ml-3 flex-shrink-0 text-blue-400 hover:text-blue-300 transition-colors text-sm"
                                        title="Marcar como lida"
                                    >
                                        <FiCheckCircle size={18} />
                                    </button>
                                )}
                            </motion.div>
                        ))
                    ) : (
                        <p className="text-gray-400 text-center py-8">Nenhuma notificação por enquanto!</p>
                    )}
                </AnimatePresence>
            </div>
            {/* Botão para limpar notificações lidas */}
            {notifications.some(n => n.read) && (
                <div className="mt-4 text-center">
                    <button
                        onClick={() => setNotifications(notifications.filter(n => !n.read))}
                        className="text-sm text-gray-400 hover:text-red-400 transition-colors"
                    >
                        Limpar notificações lidas
                    </button>
                </div>
            )}
        </motion.div>
    );
};

export default SegmentaçãodeClientes;