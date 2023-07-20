import { Routes, Route, Navigate } from 'react-router-dom'

export const AppRouts = () => {
    return (
        <Routes>
            <Route path='/pagina-inicial' element={<h1>testando</h1>} />

            <Route path='*' element={<Navigate to="/pagina-inicial" />} />
        </Routes>
    )

}