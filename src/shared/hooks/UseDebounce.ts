import { useCallback, useRef } from "react"


export const useDebounce =(delay = 400, notDalayInFirstTime = true)=>{

    const deboucing = useRef<number>();
    const isFirstTime = useRef(notDalayInFirstTime)

    const debounce = useCallback((func:()=>void)=>{

        if(isFirstTime.current){
            isFirstTime.current = false;
            func();
        }else{
            if(deboucing.current){
                clearTimeout(deboucing.current)
            }
    
            deboucing.current = setTimeout(()=>{
                func();
            },delay)  
        }
        
    },[delay])

    return{debounce}
}