
import { Routes, Route, Navigate } from 'react-router-dom'
import { useDrawerContext } from '../shared/contexts/Drawercontext'
import { useEffect } from 'react'
import { Dashboard } from '../pages/dashboard/Dashboard'
import { DetalheCidades, DetalhePessoas, ListagemDeCidades, ListagemDePessoas } from '../pages'



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
                icon: 'people',
                label: 'Pessoas',
                path: '/pessoas'
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
            <Route path='/pagina-inicial' element={<Dashboard />}/> 

            <Route path='/pessoas' element={<ListagemDePessoas/>}/>
            <Route path='/pessoas/detalhe/:id' element={<DetalhePessoas/>}/>

            <Route path='/cidades' element={<ListagemDeCidades/>}/>
            <Route path='/cidades/detalhe/:id' element={<DetalheCidades/>}/>


            <Route path='*' element={<Navigate to="/pagina-inicial" />} />
        </Routes>

        
    )

}