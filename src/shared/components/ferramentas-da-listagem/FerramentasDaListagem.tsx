
import { Box, Button, Icon, Paper, TextField, useTheme } from "@mui/material"

interface IFerramentasDaListagem {
    textoDaBusca?: string,
    mostrarInputBusca?: boolean,
    aoMudarTextoDaBusca?: (novoTexto: string) => void

    textoBotaoNovo?: string;
    mostrarBotaoNovo?: boolean;
    aoClicarBotaoNovo?: ()=>void;
}

export const FerrametasDaListagem: React.FC<IFerramentasDaListagem> = ({
    textoDaBusca = '',
    mostrarInputBusca = false,
    aoMudarTextoDaBusca,

    textoBotaoNovo ='novo',
    mostrarBotaoNovo,
    aoClicarBotaoNovo,

}) => {
    const theme = useTheme();

    return (
        <Box component={Paper}
            height={theme.spacing(5)}
            marginX={1}
            marginY={1}
            padding={1}
            display='flex'
            alignItems='center'
            gap={1}
        >
           {mostrarInputBusca &&( <TextField
             size="small"
              placeholder="Pesquisar..."
              value={textoDaBusca}
              onChange={(e)=>aoMudarTextoDaBusca?.(e.target.value)}
            />)}

            <Box flex={1} display='flex' justifyContent='end'>

                {mostrarBotaoNovo && (<Button
                    variant='contained'
                    color='primary'
                    disableElevation
                    endIcon={<Icon>add</Icon>}
                    onClick={aoClicarBotaoNovo}
                >
                    {textoBotaoNovo}
                </Button>)}
            </Box>

        </Box>
    )
}