import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser, preRegisterUser } from '../../../_actions/user_action';
import Auth from '../../../hoc/auth';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import GroupsIcon from '@mui/icons-material/Groups';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import styled from 'styled-components';

const InfoBox = styled.div`
    color: #777;
`;

function RegisterPage() {
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [rePasswordError, setRePasswordError] = useState('');
    const [nameError, setNameError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmitHandler = async(e) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);


        const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        if (!emailRegex.test(data.get('email'))) return setEmailError('올바른 이메일 형식이 아닙니다.');
        else setEmailError('');
        
        const passwordRegex = /^[a-zA-Z0-9]{5,10}$/;
        if(!passwordRegex.test(data.get('password'))) return setPasswordError('올바른 비밀번호 형식이 아닙니다');
        else setPasswordError('');

        if(data.get('password') !== data.get('confirmPassword')) {
            return setRePasswordError('비밀번호가 일치하지 않습니다');
        }else {
            setRePasswordError('');
        }

        const nameRegex = /^[가-힣a-zA-Z0-9]{3,10}$/;
        if(!nameRegex.test(data.get('name'))) return setNameError('올바른 닉네임 형식이 아닙니다');
        else setNameError('');

        let body = {
            email: data.get('email'),
            name: data.get('nickname'),
            password: data.get('password')
        }
        let chk = false;

        await dispatch(preRegisterUser(body))
        .then(res => {
            // console.log(res);
            if(res.payload.success) {
                chk = true;
            }else {
                if(res.payload.emailErr) return setEmailError('중복된 이메일입니다');
                if(res.payload.nameErr) return setNameError('중복된 닉네임입니다');
            }
        });

        if(chk) {
            dispatch(registerUser(body)) // loginUser라는 action을 실행
            .then(res => {
                console.log(res);
                if(res.payload.success) {
                    navigate('/login');
                }else {
                    alert('회원가입 실패');
                }
            }); 
        }
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
                    <GroupsIcon />
                </Avatar>
                <Typography component="h1" variant="h5" sx={{ mb: 4 }}>
                    Sign up
                </Typography>
                <Box component="form" onSubmit={onSubmitHandler}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell 
                                        align="center" 
                                        colSpan={2} 
                                        sx={{
                                            borderTop:"2px solid #444",
                                            borderBottom:"1px solid #888",
                                            fontWeight:"700"
                                        }}
                                    >
                                        기본 정보
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                <TableRow>
                                    <TableCell sx={{ background:"#f9f9f9" }}>
                                        <Typography noWrap>이메일 주소</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField name="email" size="small" error={emailError !== "" || false} required/>
                                        <FormHelperText error>{emailError}</FormHelperText>
                                    </TableCell>
                                </TableRow>


                                <TableRow>
                                    <TableCell sx={{ background:"#f9f9f9" }}>
                                        <Typography>비밀번호</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField name="password" type="password" size="small" error={passwordError !== "" || false} required/>
                                        <FormHelperText error>{passwordError}</FormHelperText>
                                        <InfoBox>
                                            <span>비밀번호는 5자 이상 10자 이내이어야 합니다.</span>
                                        </InfoBox>
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell component="th" scope="row" sx={{ background:"#f9f9f9" }}>
                                        <Typography noWrap>비밀번호 확인</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField name="confirmPassword" type="password" size="small" error={rePasswordError !== "" || false} required/>
                                        <FormHelperText error>{rePasswordError}</FormHelperText>
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell sx={{ background:"#f9f9f9" }}>
                                        <Typography>닉네임</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField name="nickname" size="small" error={nameError !== "" || false} required/>
                                        <FormHelperText error>{nameError}</FormHelperText>
                                        <InfoBox>
                                            <span>닉네임은 3자 이상 10자 이내여야 합니다. (한글가능)</span>
                                        </InfoBox>
                                    </TableCell>
                                </TableRow>

                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link>Already have an account? Sign in</Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}

export default Auth(RegisterPage, false)