import { BrowserRouter } from 'react-router-dom'
import { AppRouts } from './routes'
import { AppThemeProvider } from './shared/contexts'
import { MenuLateral } from './shared/components'
import { DrawerProvider } from './shared/contexts'





export const App = () => {

  return (

    <AppThemeProvider>
      <DrawerProvider>
        <BrowserRouter >
          <MenuLateral>
            <AppRouts />
          </MenuLateral>
        </BrowserRouter>
      </DrawerProvider>
    </AppThemeProvider>




  )
}


