import { BrowserRouter } from 'react-router-dom'
import { AppRouts } from './routes'
import { ThemeProvider } from '@mui/material'
import { LightTheme } from './shared/themes'



export const App = () => {

  return (

    <ThemeProvider theme={LightTheme}>
      <BrowserRouter >
        <AppRouts />
      </BrowserRouter>
    </ThemeProvider>


  )
}


