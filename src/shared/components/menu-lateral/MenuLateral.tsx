import { Avatar, Box, Divider, Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from "@mui/material"
import { useDrawerContext } from "../../contexts/Drawercontext";

interface IMenulateralProps {
    children: React.ReactNode
}

export const MenuLateral: React.FC<IMenulateralProps> = ({ children }) => {

    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'))
    const {isDrawerOpen, toggleDrawerOpen} = useDrawerContext()

    return (
        <>
            <Drawer open={isDrawerOpen} variant={smDown ? 'temporary' : 'permanent'} onClose={toggleDrawerOpen} >
                <Box width={theme.spacing(28)}
                    display='flex'
                    flexDirection='column'
                    // height='100%' bgcolor='yellowgreen'
                >

                    <Box
                        display='flex'
                        width='100%'
                        height={theme.spacing(20)}
                        justifyContent='center'
                        alignItems='center'
                    // bgcolor='yellow'
                    >
                        <Avatar
                            alt="foto" src="../assets/image/eu.jpg"

                            sx={{ height: theme.spacing(12), width: theme.spacing(12) }}
                        />
                    </Box>

                    <Divider />                  

                    <Box flex={1}>
                        <List component='nav'>
                            <ListItemButton>
                                <ListItemIcon>
                                    <Icon>
                                        home
                                    </Icon>
                                </ListItemIcon>
                                <ListItemText primary='Página Inicial' />                                
                            </ListItemButton>

                            <ListItemButton>
                                <ListItemIcon>
                                    <Icon>
                                        star
                                    </Icon>
                                </ListItemIcon>
                                <ListItemText primary='gostosas' />                                
                            </ListItemButton>
                        </List>
                    </Box>


                </Box>

            </Drawer>

            <Box height='100vh' marginLeft={smDown ? 0 : theme.spacing(28)}>
                {children}
            </Box>

        </>

    )
}