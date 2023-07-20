import { Button } from '@mui/material'
import { Routes, Route, Navigate } from 'react-router-dom'

export const AppRouts = () => {
    return (
        <Routes>
            <Route path='/pagina-inicial' element={<Button variant='contained' color='primary'>testando</Button>} />
            <Route path='/gostosas' element={<h1>gostosas</h1>} />

            <Route path='*' element={<Navigate to="/pagina-inicial" />} />
        </Routes>
    )

}