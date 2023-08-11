import { useNavigate, useParams } from "react-router-dom"
import { FerramentasDeDetalhe } from "../../shared/components"
import { LayoutBaseDePagina } from "../../shared/layouts"
import { useEffect, useState } from "react";
import { CidadesService } from "../../shared/services/api/cidades/CidadesService";
import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";
import { VTextField, VForm, useVForm, IVFormErrors } from "../../shared/forms";
import * as yup from 'yup';
import React from "react";


interface IFormData {
    nome: string;

}

const formValidationSchema: yup.Schema<IFormData> = yup.object().shape({
    nome: yup.string().required('O campo Nome é obrigatório').min(3, 'No Mínimo 3 caracteres '),

})

export const DetalheCidades: React.FC = () => {

    const { id = 'nova' } = useParams<'id'>();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)
    const [name, setName] = useState('');
    const { formRef, save, saveAndClose, IsSaveAndClose } = useVForm()

    console.log(id)

    useEffect(() => {
        if (id !== 'nova') {
            setIsLoading(true);
            CidadesService.getById(Number(id)).then((result) => {
                setIsLoading(false);
                if (result instanceof Error) {
                    alert(result.message);
                    navigate('/cidades');
                } else {
                    setName(result.nome);
                    formRef.current?.setData(result);
                }
            })
        } else {
            formRef.current?.setData({
                Nome: ''
            })
        }
    }, [id]);

    const handleSave = (dados: IFormData) => {

        formValidationSchema.
            validate(dados, { abortEarly: false })

            .then((dadosValidados) => {
                setIsLoading(true);

                if (id === "nova") {
                    CidadesService.create(dadosValidados).then((result) => {
                        setIsLoading(false)
                        if (result instanceof Error) {
                            alert(result.message);
                        } else {
                            if (IsSaveAndClose()) {
                                navigate('/cidades')
                            }
                            else {
                                navigate(`/cidades/detalhe/${result}`)
                            }

                        }
                    })
                } else {
                    CidadesService.updateById(Number(id), { id: Number(id), ...dadosValidados })
                        .then((result) => {
                            setIsLoading(false);
                            if (result instanceof Error) {
                                alert(result.message);

                            } else {
                                if (IsSaveAndClose()) {
                                    navigate('/cidades')
                                }
                            }
                        })
                }
            })
            .catch((errors: yup.ValidationError) => {
                const validationErrors: IVFormErrors = {};

                errors.inner.forEach(error => {
                    if (!error.path) return;

                    validationErrors[error.path] = error.message;
                })
                formRef.current?.setErrors(validationErrors);
            })


    }

    const handleDelete = (id: number) => {
        if (confirm("Deseja realmente apagar")) {
            CidadesService.deleteById(id).then(result => {
                if (result instanceof Error) {
                    result.message;
                } else {
                    alert(`${name} apagado com sucesso`)
                    navigate("/cidades")
                }
            })
        }
    }

    return (
        <LayoutBaseDePagina titulo={id !== 'nova' ? name : "Novo Registro"}
            barraDeFerramentas={<FerramentasDeDetalhe
                mostrarBotaoSalvarEFechar
                mostrarBotaoApagar={id !== 'nova'}
                mostrarBotaoNovo={id !== 'nova'}
                textoBotaoNovo="Nova"
                aoClicarEmVoltar={() => navigate('/cidades')}
                aoClicarEmNovo={() => navigate('/cidades/detalhe/nova')}
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
                                        fullWidth 
                                        label="Cidade"
                                        name="nome"
                                        disabled={isLoading}
                                        onChange={e => setName(e.target.value)}
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