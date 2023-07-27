import { useSearchParams } from "react-router-dom"
import { FerrametasDaListagem } from "../../shared/components/ferramentas-da-listagem/FerramentasDaListagem"
import { LayoutBaseDePagina } from "../../shared/layouts"
import { useEffect, useMemo } from "react"
import { PessoasService } from "../../shared/services/api/pessoas/PessoasService"
import { useDebounce } from "../../shared/hooks"

export const ListagemDePessoas: React.FC = () => {

    const [searchParams, setSearchParams] = useSearchParams()
    const {debounce} = useDebounce()

    const busca = useMemo(()=>{
        return searchParams.get('busca') || '';
    },[searchParams])
    // console.log(busca);
    

    useEffect(()=>{
        debounce(()=>{
            PessoasService.getAll(1,busca ).then((result)=>{
                if (result instanceof Error) {
                    alert(result.message);
    
                } else{console.log(result)}
            })
        })
        
    },[busca])
    
    return (
        <LayoutBaseDePagina
            titulo="Listagem de Pessoas"
            barraDeFerramentas={<FerrametasDaListagem 
                mostrarBotaoNovo
                mostrarInputBusca
                textoBotaoNovo="Nova"
                textoDaBusca={busca ?? ''}
                aoMudarTextoDaBusca={texto => setSearchParams({busca: texto}, {replace: true})}
            />}>

        </LayoutBaseDePagina>
    )
}