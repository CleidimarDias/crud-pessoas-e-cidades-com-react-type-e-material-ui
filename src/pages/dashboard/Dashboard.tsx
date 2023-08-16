

import { Box, Card, CardContent, Grid, Typography } from "@mui/material"

import { LayoutBaseDePagina } from "../../shared/layouts"
import { FerrametasDaListagem } from "../../shared/components/ferramentas-da-listagem/FerramentasDaListagem"
import { useEffect, useState } from "react"
import { CidadesService } from "../../shared/services/api/cidades/CidadesService"
import { PessoasService } from "../../shared/services/api/pessoas/PessoasService"

export const Dashboard: React.FC = () => {

    const [totalCountCidades, SetTotalCountCidades] = useState(0);
    const [isLoadingCidades, setIsLoadingCidades] = useState(false)

    const [totalCountPessoas, setTotalCountPessoas] = useState(0);
    const [isLoadingPessoas, setIsLoadingPessoas] = useState(false)


    useEffect(() => {
        setIsLoadingCidades(true)
        CidadesService.getAll(1).then((result) => {
            setIsLoadingCidades(false)
            if (result instanceof Error) {
                alert(result.message);

            } else (
                SetTotalCountCidades(result.totalCount)
            )
        })
    }, []);

    useEffect(() => {
        setIsLoadingPessoas(true)
        PessoasService.getAll(1).then((result) => {
            setIsLoadingPessoas(false)
            if (result instanceof Error) {
                alert(result.message)

            } else {
                setTotalCountPessoas(result.totalCount)
            }
        })
    }, [])

    return (
        <LayoutBaseDePagina titulo="Página Inicial"
            barraDeFerramentas={<FerrametasDaListagem />}
        >
            <Box width="100%" display="flex">
                <Grid container margin={1} >

                    <Grid item container spacing={2}  >

                        <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" align="center">
                                        Total de Pessoas
                                    </Typography>
                                    <Box padding={6} display='flex' justifyContent='center' alignItems='center'>
                                        {!isLoadingPessoas && (<Typography variant="h1" align="center">
                                            {totalCountPessoas}
                                        </Typography>)}

                                        {isLoadingPessoas && (<Typography variant="h6" align="center">
                                            Carregando...
                                        </Typography>)}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4} xl={2} >
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" align="center">
                                        Total de Cidades
                                    </Typography>
                                    <Box padding={6} display='flex' justifyContent='center' alignItems='center'>
                                        {!isLoadingCidades && (<Typography variant="h1" align="center">
                                            {totalCountCidades}
                                        </Typography>)}
                                        {isLoadingCidades && (<Typography variant="h6" align="center">
                                            Carregando...
                                        </Typography>)}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>

        </LayoutBaseDePagina>


    )
}