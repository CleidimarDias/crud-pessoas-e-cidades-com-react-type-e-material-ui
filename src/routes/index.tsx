
import { Routes, Route, Navigate } from 'react-router-dom'
import { useDrawerContext } from '../shared/contexts/Drawercontext'
import { useEffect } from 'react'
import { Dashboard } from '../pages/dashboard/Dashboard'
import { ListagemDePessoas } from '../pages'

export const AppRouts = () => {

    const { setDrawerOptions} = useDrawerContext()

    useEffect(()=>{
        setDrawerOptions([
            {
                icon : 'home',
                label: 'Página Inicial',
                path: '/pagina-inicial'
            },
            {
                icon: 'location_city',
                label: 'Pessoas',
                path: '/pessoas'
            }
            
        ])
    },[]);
    
    return (
        <Routes>
            <Route path='/pagina-inicial'
             element={<Dashboard />}
            /> 
            <Route path='/pessoas' element={<ListagemDePessoas/>} />

            <Route path='*' element={<Navigate to="/pagina-inicial" />} />
        </Routes>

        
    )

}