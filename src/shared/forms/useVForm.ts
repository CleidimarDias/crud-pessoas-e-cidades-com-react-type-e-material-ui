import { FormHandles } from "@unform/core"
import { useCallback, useRef } from "react"

export const useVForm = () => {
    const formRef = useRef<FormHandles>(null);

    const isSavadAndNew = useRef(false)
    const isSavadAndClose = useRef(false)

    const handleSave = useCallback(()=>{
        isSavadAndClose.current = false;
        isSavadAndNew.current = false;
        formRef.current?.submitForm();
    },[]);

    const handleSaveAndNew = useCallback(()=>{       
        isSavadAndClose.current = false;
        isSavadAndNew.current = true;
        formRef.current?.submitForm();
    },[])

    const handleSaveAndClose = useCallback(()=>{
        isSavadAndClose.current = true;
        isSavadAndNew.current = false;
        formRef.current?.submitForm();
    },[])

    const handleIsSaveAndNew = useCallback(()=>{
        return isSavadAndNew.current
    },[])

    const handleIsSaveAndeClose = useCallback(()=>{
        return isSavadAndClose.current
    },[])

    return {
        formRef,
        
        save: handleSave,
        saveAndeNew: handleSaveAndNew,
        saveAndClose: handleSaveAndClose,
        IsSaveAndNew: handleIsSaveAndNew,
        IsSaveAndClose: handleIsSaveAndeClose
    }
}