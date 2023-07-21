import { createContext, useCallback, useState, useContext } from "react";

interface IDrawerContext {
    isDrawerOpen: boolean;
    toggleDrawerOpen: ()=>void;
}

interface IDrawerProviderProps {
    children: React.ReactNode;
}

const DrawerContext = createContext({} as IDrawerContext);

export const useDrawerContext = () => {
    return useContext(DrawerContext);
}


export const DrawerProvider: React.FC<IDrawerProviderProps> = ({children})=>{

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawerOpen = useCallback(()=>{
        setIsDrawerOpen(oldDrawerOpen => !oldDrawerOpen )
    },[])

    return(
        <DrawerContext.Provider value={{isDrawerOpen, toggleDrawerOpen}}>
            {children}
        </DrawerContext.Provider>
    )
}