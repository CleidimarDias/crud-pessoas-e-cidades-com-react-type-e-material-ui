import { Avatar, Box, Divider, Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from "@mui/material"
import { useDrawerContext } from "../../contexts/Drawercontext";
import { useMatch, useNavigate, useResolvedPath } from "react-router-dom";
import { useAppThemeContext } from "../../contexts";

interface IMenulateralProps {
    children: React.ReactNode
}

export const MenuLateral: React.FC<IMenulateralProps> = ({ children }) => {

    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'))
    const { isDrawerOpen, toggleDrawerOpen, drawerOptions } = useDrawerContext()
    const { toggleTheme, themeName } = useAppThemeContext();

    console.log({ themeName })

    interface IListItemLink {
        icon: string;
        label: string;
        to: string;
        onclick: (() => void) | undefined;
    }

    const ListItemLink: React.FC<IListItemLink> = ({ icon, label, onclick, to }) => {

        const navigate = useNavigate()
        const resolvedPath = useResolvedPath(to);
        const match = useMatch({ path: resolvedPath.pathname, end: true })


        const handleClick = () => {
            return (
                onclick?.(),
                navigate(to)
            )
        }

        return (
            <ListItemButton selected={!!match} onClick={handleClick} >
                <ListItemIcon>
                    <Icon>
                        {icon}
                    </Icon>
                </ListItemIcon>
                <ListItemText primary={label} />
            </ListItemButton>
        )
    }

    return (
        <>
            <Drawer open={isDrawerOpen} variant={smDown ? 'temporary' : 'permanent'} onClose={toggleDrawerOpen} >
                <Box width={theme.spacing(28)}
                    display='flex'
                    flexDirection='column'
                    height='100%'
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
                            alt="foto" src="./assets/image/eu.jpg"

                            sx={{ height: theme.spacing(12), width: theme.spacing(12) }}
                        />
                    </Box>

                    <Divider />

                    <Box flex={1}>
                        <List component='nav'>
                            {drawerOptions.map(drawerOptions => (
                                <ListItemLink
                                    key={drawerOptions.path}
                                    icon={drawerOptions.icon}
                                    label={drawerOptions.label}
                                    onclick={smDown ? toggleDrawerOpen : undefined}
                                    to={drawerOptions.path}
                                />
                            ))}
                        </List>
                    </Box>

                    <Box>
                        <List component='nav'>
                            <ListItemButton onClick={toggleTheme}>
                                <ListItemIcon>
                                    <Icon>
                                        {themeName === 'dark' ? 'light_mode' : 'dark_mode'}
                                    </Icon>
                                </ListItemIcon>
                                <ListItemText primary={themeName === 'dark' ? 'Light' : 'Dark'} />
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