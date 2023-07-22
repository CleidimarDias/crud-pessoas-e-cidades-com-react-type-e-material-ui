
import { Routes, Route, Navigate } from 'react-router-dom'
import { useDrawerContext } from '../shared/contexts/Drawercontext'
import { useEffect } from 'react'
import { Dashboard } from '../pages/dashboard/Dashboard'

export const AppRouts = () => {

    const { setDrawerOptions} = useDrawerContext()

    useEffect(()=>{
        setDrawerOptions([
            {
                icon : 'home',
                label: 'Página Inicial',
                path: '/pagina-inicial'
            },
            
        ])
    },[]);
    
    return (
        <Routes>
            <Route path='/pagina-inicial'
             element={<Dashboard />}
            /> 

            <Route path='*' element={<Navigate to="/pagina-inicial" />} />
        </Routes>

        
    )

}