
import { Box, Button, Divider, Icon, Paper, useTheme } from "@mui/material"

interface IFerrametasDeDetalheProps {
    textoBotaoNovo?: string,

    mostrarBotaoNovo?: boolean,
    mostrarBotaoSalvar?: boolean,
    mostrarBotaoSalvarEFechar?: boolean,
    mostrarBotaoApagar?: boolean,
    mostrarBotaoVoltar?: boolean,

    aoClicarEmNovo?: ()=>void;
    aoClicarEmSalvar?: ()=>void;
    aoClicarEmSalvarEFechar?: ()=>void;
    aoClicarEmApagar?: ()=>void;
    aoClicarEmVoltar?: ()=>void;
}

export const FerramentasDeDetalhe: React.FC<IFerrametasDeDetalheProps> = ({
    textoBotaoNovo = 'Novo',
    mostrarBotaoNovo = true,
    mostrarBotaoSalvar = true,
    mostrarBotaoSalvarEFechar = true,
    mostrarBotaoApagar = true,
    mostrarBotaoVoltar = true,

    aoClicarEmNovo,
    aoClicarEmSalvar,
    aoClicarEmSalvarEFechar,
    aoClicarEmApagar,
    aoClicarEmVoltar,
}) => {
    const theme = useTheme()

    return (
        <Box
            component={Paper}
            height={theme.spacing(5)}
            marginX={1}
            marginY={1}
            padding={1}
            display='flex'
            alignItems='center'
            gap={1}
        >
            {mostrarBotaoSalvar && (<Button
                variant='contained'
                color='primary'
                disableElevation
                onClick={aoClicarEmSalvar}
                startIcon={<Icon>save</Icon>}
            >
               Salvar
            </Button>)}
            {mostrarBotaoSalvarEFechar && (<Button
                variant='outlined'
                color='primary'
                disableElevation
                onClick={aoClicarEmSalvarEFechar}
                startIcon={<Icon>save</Icon>}
            >
                Salvar e Fechar
            </Button>)}
            {mostrarBotaoApagar && (<Button
                variant='outlined'
                color='primary'
                disableElevation
                onClick={aoClicarEmApagar}
                startIcon={<Icon>delete</Icon>}
            >
                Apagar
            </Button>)}
            {mostrarBotaoNovo && (<Button
                variant='outlined'
                color='primary'
                disableElevation
                onClick={aoClicarEmNovo}
                startIcon={<Icon>add</Icon>}
            >
                {textoBotaoNovo}
            </Button>)}
            <Divider variant="middle" orientation="vertical"/>
            {mostrarBotaoVoltar && (<Button
                variant='outlined'
                color='primary'
                disableElevation
                onClick={aoClicarEmVoltar}
                startIcon={<Icon>arrow_back</Icon>}
            >
               Voltar
            </Button>)}
            ferramentas de detalhe
        </Box>
    )
}