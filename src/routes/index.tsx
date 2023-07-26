
import { Routes, Route, Navigate } from 'react-router-dom'
import { useDrawerContext } from '../shared/contexts/Drawercontext'
import { useEffect } from 'react'
import { Dashboard } from '../pages/dashboard/Dashboard'
import { ListagemDeCidade } from '../pages'

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
                label: 'Cidades',
                path: '/cidades'
            }
            
        ])
    },[]);
    
    return (
        <Routes>
            <Route path='/pagina-inicial'
             element={<Dashboard />}
            /> 
            <Route path='/cidades' element={<ListagemDeCidade/>} />

            <Route path='*' element={<Navigate to="/pagina-inicial" />} />
        </Routes>

        
    )

}