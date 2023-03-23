import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../../_actions/user_action';
import Auth from '../../../hoc/auth';

function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        let body = {
            email: data.get('email'),
            password: data.get('password')
        }
        
        dispatch(loginUser(body)) // loginUser라는 action을 실행
        .then(res => {
            //console.log(res);
            if(res.payload.success) {
                // navigate('/', { state: { login: true } });
                navigate('/');
            }else {
                alert(res.payload.message);
            }
        }); 


    }

    return (
        <Container maxWidth="md">
            <Box
                sx={{
                    mt: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: '#78909c' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5" sx={{ mb: 4 }}>
                    Sign in
                </Typography>
                <Box component="form" onSubmit={onSubmitHandler}>
                    <TextField
                        label="Email Address"
                        required
                        fullWidth
                        name="email"
                        autoComplete="email"
                        autoFocus
                        margin="normal"
                    />
                    <TextField
                        label="Password"
                        type="password"
                        required
                        fullWidth
                        name="password"
                        autoComplete="current-password"
                        margin="normal"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link>Forgot password?</Link>
                        </Grid>
                        <Grid item>
                            <Link href='/register'>Sign Up</Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}

export default Auth(LoginPage, false)