import { useNavigate, useParams } from "react-router-dom"
import { FerramentasDeDetalhe } from "../../shared/components"
import { LayoutBaseDePagina } from "../../shared/layouts"
import { useEffect, useRef, useState } from "react";
import { PessoasService } from "../../shared/services/api/pessoas/PessoasService";
import { LinearProgress } from "@mui/material";
import { Form } from "@unform/web";
import { UnTextField } from "../../shared/forms";
import { FormHandles } from "@unform/core";

interface IFormData{
    nomeCompleto: string;
    email: string;
    cidadeId: number;
}

export const DetalhePessoas: React.FC = () => {

    const { id = 'nova' } = useParams<'id'>();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)
    const [name, setName] = useState('');

    const formRef = useRef<FormHandles>(null);

    useEffect(() => {
        if (id !== 'nova') {
            setIsLoading(true);
            PessoasService.getById(Number(id)).then((result) => {
                setIsLoading(false);
                if (result instanceof Error) {
                    alert(result.message);
                    navigate('/pessoas');
                } else {
                    setName(result.nomeCompleto);
                    formRef.current?.setData(result);
                }
            })
        }
    }, [id]);

    const handleSave = (dados:IFormData) =>{
        setIsLoading(true);
        if(id ==="nova"){
            PessoasService.create(dados).then((result)=>{
                setIsLoading(false)
                if(result instanceof Error){
                    alert(result.message);                    
                }else{
                    navigate(`/pessoas/detalhe/${result}`)
                }
            })
        }else{
            PessoasService.updateById(Number(id), {id: Number(id), ...dados})
            .then((result)=>{
                setIsLoading(false);
                if(result instanceof Error){
                    alert(result.message);
                }
            })
        }
    }

    const handleDelete = (id: number) => {
        if (confirm("Deseja realmente apagar")) {
            PessoasService.deleteById(id).then(result => {
                if (result instanceof Error) {
                    result.message;
                } else {
                    alert(`${name} apagado com sucesso`)
                    navigate("/pessoas")
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
                aoClicarEmVoltar={() => navigate('/pessoas')}
                aoClicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
                aoClicarEmApagar={() => handleDelete(Number(id))}
                aoClicarEmSalvar={() => formRef.current?.submitForm()}
                aoClicarEmSalvarEFechar={() => formRef.current?.submitForm()}
            />}>
            <>
                {isLoading && (
                    <LinearProgress variant="indeterminate" />
                )}
                {id}

                <Form ref={formRef}  onSubmit={handleSave}>

                    <UnTextField placeholder="Nome Completo" name="nomeCompleto" />
                    <UnTextField placeholder="Email" name="email" />
                    <UnTextField placeholder="Cidade id" name="cidadeId" />                    
                    
                    
                </Form>
            </>

        </LayoutBaseDePagina>
    )
}