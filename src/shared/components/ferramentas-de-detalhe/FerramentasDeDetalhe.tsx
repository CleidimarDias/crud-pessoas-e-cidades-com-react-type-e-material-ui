
import { Box, Button, Divider, Icon, Paper, Skeleton, Typography, useMediaQuery, useTheme } from "@mui/material"

interface IFerrametasDeDetalheProps {
    textoBotaoNovo?: string,

    mostrarBotaoNovo?: boolean,
    mostrarBotaoSalvar?: boolean,
    mostrarBotaoSalvarEFechar?: boolean,
    mostrarBotaoApagar?: boolean,
    mostrarBotaoVoltar?: boolean,

    mostrarBotaoNovoCarregando?: boolean,
    mostrarBotaoSalvarCarregando?: boolean,
    mostrarBotaoSalvarEFecharCarregando?: boolean,
    mostrarBotaoApagarCarregando?: boolean,
    mostrarBotaoVoltarCarregando?: boolean,

    aoClicarEmNovo?: () => void;
    aoClicarEmSalvar?: () => void;
    aoClicarEmSalvarEFechar?: () => void;
    aoClicarEmApagar?: () => void;
    aoClicarEmVoltar?: () => void;
}

export const FerramentasDeDetalhe: React.FC<IFerrametasDeDetalheProps> = ({
    textoBotaoNovo = 'Novo',
    mostrarBotaoNovo = true,
    mostrarBotaoSalvar = true,
    mostrarBotaoSalvarEFechar = false,
    mostrarBotaoApagar = true,
    mostrarBotaoVoltar = true,

    mostrarBotaoNovoCarregando = false,
    mostrarBotaoSalvarCarregando = false,
    mostrarBotaoSalvarEFecharCarregando = false,
    mostrarBotaoApagarCarregando = false,
    mostrarBotaoVoltarCarregando = false,

    aoClicarEmNovo,
    aoClicarEmSalvar,
    aoClicarEmSalvarEFechar,
    aoClicarEmApagar,
    aoClicarEmVoltar,
}) => {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const mdDown = useMediaQuery(theme.breakpoints.down('md'));

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
            {mostrarBotaoSalvar && !mostrarBotaoSalvarCarregando && (<Button
                variant='contained'
                color='primary'
                disableElevation
                onClick={aoClicarEmSalvar}
                startIcon={<Icon>save</Icon>}
            >
                <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
                    Salvar
                </Typography>

            </Button>)}

            {mostrarBotaoSalvarCarregando && (<Skeleton height={60} width={114} />)}

            {mostrarBotaoSalvarEFechar && !mostrarBotaoSalvarEFecharCarregando && !smDown && !mdDown && (<Button
                variant='outlined'
                color='primary'
                disableElevation
                onClick={aoClicarEmSalvarEFechar}
                startIcon={<Icon>save</Icon>}
            >
                <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
                    Salvar e Fechar
                </Typography>

            </Button>)}

            {mostrarBotaoSalvarEFecharCarregando &&  !smDown && !mdDown && (<Skeleton height={60} width={140} />)}

            {mostrarBotaoApagar && !mostrarBotaoApagarCarregando && (<Button
                variant='outlined'
                color='primary'
                disableElevation
                onClick={aoClicarEmApagar}
                startIcon={<Icon>delete</Icon>}
            >
                <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
                    Apagar
                </Typography>

            </Button>)}

            {mostrarBotaoApagarCarregando && (<Skeleton height={60} width={114} />)}

            {mostrarBotaoNovo && !mostrarBotaoNovoCarregando && !smDown && !mdDown &&(<Button
                variant='outlined'
                color='primary'
                disableElevation
                onClick={aoClicarEmNovo}
                startIcon={<Icon>add</Icon>}
            >
                <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
                    {textoBotaoNovo}
                </Typography>

            </Button>)}

            {mostrarBotaoNovoCarregando &&  !smDown && !mdDown &&  (<Skeleton height={60} width={114} />)}

            {(
                mostrarBotaoVoltar && (mostrarBotaoNovo || mostrarBotaoSalvar || mostrarBotaoApagar || mostrarBotaoSalvarEFechar)
            )&&(<Divider variant="middle" orientation="vertical" />)}

            {mostrarBotaoVoltar && !mostrarBotaoVoltarCarregando && (<Button
                variant='outlined'
                color='primary'
                disableElevation
                onClick={aoClicarEmVoltar}
                startIcon={<Icon>arrow_back</Icon>}
            >
                <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
                    Voltar
                </Typography>

            </Button>)}

            {mostrarBotaoVoltarCarregando && (<Skeleton height={60} width={114} />)}
        </Box>
    )
}