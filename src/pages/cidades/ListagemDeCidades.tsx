import { useNavigate, useSearchParams } from "react-router-dom"
import { FerrametasDaListagem } from "../../shared/components/ferramentas-da-listagem/FerramentasDaListagem"
import { LayoutBaseDePagina } from "../../shared/layouts"
import { useEffect, useMemo, useState } from "react"
import { IListagemCidade, CidadesService } from "../../shared/services/api/cidades/CidadesService"
import { useDebounce } from "../../shared/hooks"
import { Icon, IconButton, LinearProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from "@mui/material"
import { Environment } from "../../shared/environment"

export const ListagemDeCidades: React.FC = () => {

    const [searchParams, setSearchParams] = useSearchParams()
    const { debounce } = useDebounce();
    const navigate = useNavigate();

    const [rows, setRows] = useState<IListagemCidade[]>([])
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsloading] = useState(true)

    const busca = useMemo(() => {
        return searchParams.get('busca') || '';
    }, [searchParams])
    console.log(`busca: ${busca}`);

    const pagina = useMemo(()=>{
        return Number(searchParams.get('pagina') || '1');
    },[searchParams])
    console.log(`Página: ${pagina}`)


    useEffect(() => {
        setIsloading(true)
        debounce(() => {
            CidadesService.getAll(pagina, busca).then((result) => {
                setIsloading(false)
                if (result instanceof Error) {
                    alert(result.message);

                } else {
                    console.log(result);

                    setTotalCount(result.totalCount);
                    setRows(result.data)
                }
            })
        })

    }, [busca, pagina])

    const handleDelete =   (id: number)=>{
        if(confirm("Deseja realmente apagar?")){
            CidadesService.deleteById(id).then(result =>{
                if(result instanceof Error){
                    alert(result.message);
                }else{
                        setRows(oldRows => [
                        ...oldRows.filter(oldRow => oldRow.id !== id)
                    ])
                    alert("Registro apagado com sucesso!")
                }
            });
        }
    }

    return (
        <LayoutBaseDePagina
            titulo="Listagem de Cidades"
            barraDeFerramentas={<FerrametasDaListagem
                mostrarBotaoNovo
                mostrarInputBusca
                textoBotaoNovo="Nova"
                textoDaBusca={busca ?? ''}
                aoClicarBotaoNovo={()=>navigate('/cidades/detalhe/nova')}
                aoMudarTextoDaBusca={texto => setSearchParams({ busca: texto, pagina: '1' }, { replace: true })}
            />}>
            <TableContainer component={Paper} variant="outlined" sx={{margin: 1, width: 'auto'}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Ações</TableCell>
                            <TableCell>Cidade</TableCell>                            
                            <TableCell>ID</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row=>(
                            <TableRow key={row.id}>
                                <TableCell>
                                    <IconButton size="small" onClick={()=>handleDelete(row.id)}>
                                        <Icon>
                                            delete
                                        </Icon>
                                    </IconButton>
                                    <IconButton size="small" onClick={()=>navigate(`/cidades/detalhe/${row.id}`)}>
                                        <Icon>
                                            edit
                                        </Icon>
                                    </IconButton>
                                </TableCell>
                                <TableCell>{row.nome}</TableCell>
                                <TableCell>{row.id}</TableCell>                               
                            </TableRow>

                        ))}
                    </TableBody>
                    {totalCount === 0 && !isLoading &&(
                        <caption>{Environment.LISTAGEM_VAZIA}</caption>
                    )}
                    <TableFooter>
                        {isLoading &&<TableRow>
                            <TableCell colSpan={4}>
                                <LinearProgress/>
                            </TableCell>
                        </TableRow>}

                        {totalCount > 0 && totalCount > Environment.LIMITE_DE_LINHAS &&(<TableRow>
                            <TableCell colSpan={4}>
                                <Pagination
                                page={pagina}
                                 count={Math.ceil(totalCount / Environment.LIMITE_DE_LINHAS)}
                                 onChange={(_, newPage)=>setSearchParams({ busca, pagina: newPage.toString() }, { replace: true })}
                                  />
                            </TableCell>
                        </TableRow>)}
                    </TableFooter>
                </Table>
            </TableContainer>
        </LayoutBaseDePagina>
    )
}