import Header from "../components/common/Header";
import HeaderA from "../components/estatisticas/HeaderA";
import RendimentosMensais from "../components/estatisticas/RendimentosMensais";
import DesempenhodeBuscas from "../components/estatisticas/DesempenhodeBuscas";
import ProdutosMaisVendidos from "../components/estatisticas/ProdutosMaisVendidos";
import DiariadeVendas from "../components/estatisticas/DiariadeVendas";
import SegmentaçãodeClientes from "../components/estatisticas/SegmentaçãodeClientes";
import Introdução from "../components/estatisticas/Introdução";

const EstatisticasPage = () => {

    return (

        <div className='flex-1 overflow-auto relative z-10 bg-gray-900'>
            
            <Header title={"Estatística"} />
            <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
                <HeaderA />
                <RendimentosMensais />

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
                    <DesempenhodeBuscas />
                    <ProdutosMaisVendidos />
                    <DiariadeVendas />
                    <SegmentaçãodeClientes />
                </div>
                <Introdução />
            </main>
        </div>
    );
};
export default EstatisticasPage;