import { Box, Button, Card, CardActions, CardContent, CircularProgress, TextField, Typography } from "@mui/material"
import { useAuthContext } from "../../contexts";
import { useState } from "react";
import * as yup from 'yup'

const loginShmea = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required().min(5)
})

interface ILoginProps {
    children: React.ReactNode;
}

export const Login: React.FC<ILoginProps> = ({ children }) => {

    const [isLoading, setIsloading] = useState(false)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const { isAuthenticated, login } = useAuthContext();

    const handleSubmit = () => {
        setIsloading(true)

        loginShmea.validate({ email, password }, { abortEarly: false }).then(dadosValidados => {
            login(dadosValidados.email, dadosValidados.password).then(() => {
                setIsloading(false)
            })

        }).catch((errors: yup.ValidationError) => {

            setIsloading(false)
            errors.inner.forEach(error => {
                if (error.path === 'email') {
                    setEmailError(error.message)
                } else if (error.path === 'password') {
                    setPasswordError(error.message)
                }
            })
        })
    }

    if (isAuthenticated) return (
        <>{children}</>
    );

    return (
        <Box width='100%' height='100%' display='flex' alignItems='center' justifyContent='center'>
            <Card>
                <CardContent>
                    <Box display='flex' flexDirection='column' gap={2} width={250}>
                        <Typography variant="h6" align="center">
                            Identifique-se
                        </Typography>

                        <TextField
                            fullWidth
                            label='Email'
                            type='email'
                            disabled={isLoading}
                            value={email}
                            error={!!emailError}
                            helperText={emailError}
                            onChange={e => setEmail(e.target.value)}
                            onKeyDown={() => setEmailError('')}
                        />

                        <TextField
                            fullWidth
                            label='Senha'
                            type='password'
                            disabled={isLoading}
                            value={password}
                            error={!!passwordError}
                            helperText={passwordError}
                            onChange={e => setPassword(e.target.value)}
                            onKeyDown={() => setPasswordError('')}
                        />
                    </Box>

                </CardContent>
                <CardActions>
                    <Box width='100%' display='flex' justifyContent='center'>
                        <Button
                            variant="contained"
                            onClick={handleSubmit}
                            disabled={isLoading}
                            endIcon={isLoading ? <CircularProgress variant="indeterminate" size={20} color='inherit' /> : undefined}

                        >
                            Entrar
                        </Button>
                    </Box>
                </CardActions>
            </Card>
        </Box>
    )
}