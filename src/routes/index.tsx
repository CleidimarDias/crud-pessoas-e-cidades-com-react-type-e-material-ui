import { Button } from '@mui/material'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useDrawerContext } from '../shared/contexts/Drawercontext'
import { useEffect } from 'react'

export const AppRouts = () => {

    const {toggleDrawerOpen, setDrawerOptions} = useDrawerContext()

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
             element={<Button
             variant='contained'
              color='primary'
              onClick={toggleDrawerOpen}
              >toggleDrawer</Button>}
            /> 

            <Route path='*' element={<Navigate to="/pagina-inicial" />} />
        </Routes>

        
    )

}