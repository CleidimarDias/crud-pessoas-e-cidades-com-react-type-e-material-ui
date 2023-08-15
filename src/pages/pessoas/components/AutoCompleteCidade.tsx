import { Autocomplete, CircularProgress, TextField } from "@mui/material"
import { useDebounce } from "../../../shared/hooks";
import { useEffect, useMemo, useState } from "react";
import { CidadesService } from "../../../shared/services/api/cidades/CidadesService";
import { useField } from "@unform/core";

type TAutoCompleteOption = {
    id: number;
    label: string;
}

interface IAutoCompleteCidadeProps {
    isExternalLoadin?: boolean;
}

export const AutoCompleteCidade: React.FC<IAutoCompleteCidadeProps> = ({isExternalLoadin=false}) => {

    const {fieldName, registerField, defaultValue, error, clearError} = useField('cidadeId')
    const {debounce} = useDebounce();

    const [selectedId, setSelectedId] = useState<number | undefined>(defaultValue)
    
    const [opcoes, setOpcoes] = useState<TAutoCompleteOption[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [busca, setBusca] = useState('');

    useEffect(()=>{
        registerField({
            name: fieldName,
            getValue: () => selectedId,
            setValue: (_, newselectedId) => setSelectedId(newselectedId)
        })
    },[registerField, fieldName, selectedId])

    useEffect(()=>{
        setIsLoading(true);
        debounce(()=>{
            CidadesService.getAll(1, busca).then((result)=>{
                setIsLoading(false);

                if(result instanceof Error) {
                    alert(result.message);
                    
                }else{
                    setOpcoes(result.data.map(cidade => ({id: cidade.id, label: cidade.nome})))
                }
            })
        })
    },[busca])

    const autoCompleteSelectedOptions = useMemo(()=>{
        if(!selectedId) return null;

        const selectedOptions = opcoes.find(opcao => opcao.id === selectedId);
        if(!selectedOptions) return null;

        return selectedOptions;

    },[selectedId, opcoes])

    return (
        <Autocomplete
            openText="Abrir"
            closeText="Fechar"
            noOptionsText="Sem Opções"
            loadingText="Carregando..."

            disablePortal
            
            options={opcoes}
            disabled={isExternalLoadin}
            value={autoCompleteSelectedOptions  }
            loading={isLoading}
            popupIcon={(isExternalLoadin || isLoading) ? <CircularProgress size={28}/> : undefined}
            onInputChange={(_, newValue)=>setBusca(newValue)}
            onChange={(_, newValue)=>{setSelectedId(newValue?.id); setBusca(''); clearError}}
            renderInput={(params) => (
                <TextField
                    {...params}

                    label="Cidade"
                    error={!!error}
                    helperText={error}
                />
            )}
        />
    )

}