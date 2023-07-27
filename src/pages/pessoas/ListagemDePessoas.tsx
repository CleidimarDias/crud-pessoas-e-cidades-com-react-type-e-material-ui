import { useSearchParams } from "react-router-dom"
import { FerrametasDaListagem } from "../../shared/components/ferramentas-da-listagem/FerramentasDaListagem"
import { LayoutBaseDePagina } from "../../shared/layouts"
import { useEffect, useMemo, useState } from "react"
import { IListagemPessoa, PessoasService } from "../../shared/services/api/pessoas/PessoasService"
import { useDebounce } from "../../shared/hooks"
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"

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


    useEffect(() => {
        setIsloading(true)
        debounce(() => {
            PessoasService.getAll(1, busca).then((result) => {
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

    }, [busca])

    return (
        <LayoutBaseDePagina
            titulo="Listagem de Pessoas"
            barraDeFerramentas={<FerrametasDaListagem
                mostrarBotaoNovo
                mostrarInputBusca
                textoBotaoNovo="Nova"
                textoDaBusca={busca ?? ''}
                aoMudarTextoDaBusca={texto => setSearchParams({ busca: texto }, { replace: true })}
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
                </Table>
            </TableContainer>
        </LayoutBaseDePagina>
    )
}