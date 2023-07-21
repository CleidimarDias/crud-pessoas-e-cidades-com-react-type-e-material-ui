import { Button } from '@mui/material'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useDrawerContext } from '../shared/contexts/Drawercontext'

export const AppRouts = () => {

    const {toggleDrawerOpen, isDrawerOpen} = useDrawerContext()

    console.log(`is Drawer open ${isDrawerOpen}`);
    return (
        <Routes>
            <Route path='/pagina-inicial'
             element={<Button
             variant='contained'
              color='primary'
              onClick={toggleDrawerOpen}
              >toggleDrawer</Button>}
            />             
            <Route path='/gostosas' element={<h1>gostosas</h1>} />

            <Route path='*' element={<Navigate to="/pagina-inicial" />} />
        </Routes>

        
    )

}