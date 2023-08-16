import { BrowserRouter } from 'react-router-dom'
import { AppRouts } from './routes'
import { AppThemeProvider, AuthProvider } from './shared/contexts'
import { Login, MenuLateral } from './shared/components'
import { DrawerProvider } from './shared/contexts'
import './shared/forms/TraducoesYup';

export const App = () => {

  return (

    <AuthProvider>
      <AppThemeProvider>
        <Login>

          <DrawerProvider>
            <BrowserRouter >
              <MenuLateral>
                <AppRouts />
              </MenuLateral>
            </BrowserRouter>
          </DrawerProvider>

        </Login>
      </AppThemeProvider>
    </AuthProvider>

  )
}


