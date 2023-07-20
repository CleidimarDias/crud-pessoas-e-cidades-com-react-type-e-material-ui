import {createTheme} from '@mui/material';
import { orange , blue} from '@mui/material/colors';

export const DarkTheme = createTheme({
    palette:{
        primary: {
            main: orange[700],
            dark: orange[800],
            light: orange[500],
            contrastText: '#ffffff'
        },

        secondary: {
            main: blue[500],
            dark: blue[600],
            light: blue[300],
            contrastText: '#ffffff'
        },
        background: {
            paper: '#303134',
            default: '#202124'
        }
    }
})