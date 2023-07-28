import { useNavigate, useParams } from "react-router-dom"
import { FerramentasDeDetalhe } from "../../shared/components"
import { LayoutBaseDePagina } from "../../shared/layouts"

export const DetalhePessoas: React.FC = () => {

    const {id = 'nova'} = useParams<'id'>();
    const navigate = useNavigate();

    return (
        <LayoutBaseDePagina titulo="Detalhe de Pessoas"
         barraDeFerramentas={<FerramentasDeDetalhe 
            mostrarBotaoSalvarEFechar
            mostrarBotaoApagar = {id !== 'nova'}
            mostrarBotaoNovo = {id !== 'nova'}
            textoBotaoNovo="Nova"
            aoClicarEmVoltar={()=>navigate('/pessoas')}
            aoClicarEmNovo={()=>navigate('/pessoas/detalhe/nova')}
         />}>
            {id}
        </LayoutBaseDePagina>
    )
}