import { Box, Drawer, useTheme } from "@mui/material"

interface IMenulateralProps {
    children: React.ReactNode
}

export const MenuLateral: React.FC<IMenulateralProps> = ({ children }) => {
    const theme = useTheme();
    return (
        <>
            <Drawer variant='permanent'  >
                <Box width={theme.spacing(28)}>
                Tema
                </Box>
                
            </Drawer>

            <Box height='100vh' marginLeft={theme.spacing(28)}>
                {children}
            </Box>

        </>

    )
}