import { useSearchParams } from "react-router-dom"
import { FerrametasDaListagem } from "../../shared/components/ferramentas-da-listagem/FerramentasDaListagem"
import { LayoutBaseDePagina } from "../../shared/layouts"
import { useEffect, useMemo, useState } from "react"
import { IListagemPessoa, PessoasService } from "../../shared/services/api/pessoas/PessoasService"
import { useDebounce } from "../../shared/hooks"
import { LinearProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from "@mui/material"
import { Environment } from "../../shared/environment"

export const ListagemDePessoas: React.FC = () => {

    const [searchParams, setSearchParams] = useSearchParams()
    const { debounce } = useDebounce();

    const [rows, setRows] = useState<IListagemPessoa[]>([])
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsloading] = useState(true)

    const busca = useMemo(() => {
        return searchParams.get('busca') || '';
    }, [searchParams])
    // console.log(busca);

    const pagina = useMemo(()=>{
        return Number(searchParams.get('pagina') || '1');
    },[searchParams])
    //console.log(`Página: ${pagina}`)


    useEffect(() => {
        setIsloading(true)
        debounce(() => {
            PessoasService.getAll(pagina, busca).then((result) => {
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

    return (
        <LayoutBaseDePagina
            titulo="Listagem de Pessoas"
            barraDeFerramentas={<FerrametasDaListagem
                mostrarBotaoNovo
                mostrarInputBusca
                textoBotaoNovo="Nova"
                textoDaBusca={busca ?? ''}
                aoMudarTextoDaBusca={texto => setSearchParams({ busca: texto, pagina: '1' }, { replace: true })}
            />}>
            <TableContainer component={Paper} variant="outlined" sx={{margin: 1, width: 'auto'}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Ações</TableCell>
                            <TableCell>Nome Completo</TableCell>
                            <TableCell>E-mail</TableCell>
                            <TableCell>ID</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row=>(
                            <TableRow key={row.id}>
                                <TableCell>Ações</TableCell>
                                <TableCell>{row.nomeCompleto}</TableCell>
                                <TableCell>{row.email}</TableCell>
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