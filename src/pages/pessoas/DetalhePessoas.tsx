import { useNavigate, useParams } from "react-router-dom"
import { FerramentasDeDetalhe } from "../../shared/components"
import { LayoutBaseDePagina } from "../../shared/layouts"
import { useEffect, useState } from "react";
import { PessoasService } from "../../shared/services/api/pessoas/PessoasService";
import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";
import { VTextField, VForm, useVForm, IVFormErrors } from "../../shared/forms";
import * as yup from 'yup';


interface IFormData {
    nomeCompleto: string;
    email: string;
    cidadeId: number;
}

const formValidationSchema: yup.Schema<IFormData> = yup.object().shape({
    nomeCompleto: yup.string().required('O campo Nome é obrigatório').min(3, 'No Mínimo 3 caracteres '),
    email: yup.string().required('O Email é obrigatório').email(),
    cidadeId: yup.number().required("Campo Obrigatório"),
})




export const DetalhePessoas: React.FC = () => {

    const { id = 'nova' } = useParams<'id'>();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)
    const [name, setName] = useState('');
    const { formRef, save, saveAndClose, IsSaveAndClose } = useVForm()



    useEffect(() => {
        if (id !== 'nova') {
            setIsLoading(true);
            PessoasService.getById(Number(id)).then((result)=>{
                setIsLoading(false);
                if (result instanceof Error) {
                    alert(result.message);
                    navigate('/pessoas');
                } else {
                    setName(result.nomeCompleto);
                    formRef.current?.setData(result);
                }
            }) 
        } else {
            formRef.current?.setData({
                email: '',
                cidadeId: '',
                nomeCompleto: ''
            })
        }
    }, [id]);

    const handleSave = (dados: IFormData) => {

        formValidationSchema.
            validate(dados, { abortEarly: false })

            .then((dadosValidados) => {
                setIsLoading(true);
                
        if (id === "nova") {
            PessoasService.create(dadosValidados).then((result) => {
                setIsLoading(false)
                if (result instanceof Error) {
                    alert(result.message);
                } else {
                    if (IsSaveAndClose()) {
                        navigate('/pessoas')
                    }
                    else {
                        navigate(`/pessoas/detalhe/${result}`)
                    }

                }
            })
        } else {
            PessoasService.updateById(Number(id), { id: Number(id), ...dadosValidados })
                .then((result) => {
                    setIsLoading(false);
                    if (result instanceof Error) {
                        alert(result.message);

                    } else {
                        if (IsSaveAndClose()) {
                            navigate('/pessoas')
                        }
                    }
                })
        }
            })
            .catch((errors: yup.ValidationError) => {
                const validationErrors: IVFormErrors = {};

                errors.inner.forEach(error=>{
                    if(!error.path) return;

                    validationErrors[error.path] = error.message;
                })
                formRef.current?.setErrors(validationErrors);
            })

        
    }

    const handleDelete = (id: number) => {
        if (confirm("Deseja realmente apagar")) {
            PessoasService.deleteById(id).then(result => {
                if (result instanceof Error) {
                    result.message;
                } else {
                    alert(`Registro apagado com sucesso`);
                    navigate("/pessoas");
                }
            })
        }
    }

    return (
        <LayoutBaseDePagina titulo={id === 'nova' ? "Nova Cidade" : name}
            barraDeFerramentas={<FerramentasDeDetalhe
                mostrarBotaoSalvarEFechar
                mostrarBotaoApagar={id !== 'nova'}
                mostrarBotaoNovo={id !== 'nova'}
                textoBotaoNovo="Nova"
                aoClicarEmVoltar={() => navigate('/pessoas')}
                aoClicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
                aoClicarEmApagar={() => handleDelete(Number(id))}
                aoClicarEmSalvar={save}
                aoClicarEmSalvarEFechar={saveAndClose}
            />}>
            <>
                <VForm ref={formRef} onSubmit={handleSave}>
                    <Box component={Paper} margin={1} display='flex' flexDirection='column'>
                        <Grid container spacing={2} padding={2} direction="column">

                            {isLoading && (<Grid item >
                                <LinearProgress variant="indeterminate" />
                            </Grid>)}

                            <Grid item>
                                <Typography variant="h6">
                                    Geral
                                </Typography>
                            </Grid>

                            <Grid item container direction='row' spacing={2} >
                                <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                                    <VTextField
                                        fullWidth label="Nome Completo"
                                        name="nomeCompleto"
                                        disabled={isLoading}
                                        onChange={e => setName(e.target.value)}
                                    />
                                </Grid>
                            </Grid>

                            <Grid item container direction='row' spacing={2}>
                                <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                                    <VTextField
                                        fullWidth
                                        label="Email"
                                        name="email"
                                        disabled={isLoading}
                                    />
                                </Grid>
                            </Grid>

                            <Grid item container direction='row' spacing={2}>
                                <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                                    <VTextField
                                        fullWidth label="Cidade"
                                        name="cidadeId"
                                        disabled={isLoading}
                                    />
                                </Grid>
                            </Grid>

                        </Grid>




                    </Box>


                </VForm>
            </>

        </LayoutBaseDePagina>
    )
}