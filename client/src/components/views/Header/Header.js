import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
// import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../../../assets/images/MovieAPP_logo.png';
import NotificationDrawer from './Sections/NotificationDrawer';
import { useEffect, useState } from 'react';

export default function Header({ user, newAlarms }) {
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {

        // 로그인 상태라면 페이지 이동중에 계속 호출된다
        if(user.userData && user.userData.isAuth) {

            console.log('알림정보 요청~');

            axios.get('/api/notification/getNotifications', {
                params: { 
                    userId : user.userData._id
                }
            }).then(res => {
                if(res.data.success) {
                    console.log('알림 :', res.data.result);
                    setNotifications([...res.data.result]);
                }else {
                    alert('알림 정보를 가져오는데 실패');
                }
            })
        }


    },[user, newAlarms])



    const logoutHandler = () => {
        axios.get('/api/users/logout')
        .then(res => {
            if(res.data.success) {
                navigate('/login');
            }else {
                alert('로그아웃에 실패하였습니다.');
            }
        })
    }


    if (user.userData && user.userData.isAuth) {
        // 로그인

        return (
            <>
                <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    {/* <Link href="/" underline="none" color="#fff" sx={{ height: "40px", px: "8px", "&:hover": { textDecoration: "none" } }}>
                        <img src={logo} alt="Logo" style={{ width: "120px", height: "100%" }}/>
                    </Link> */}
                    <Link to='/'>
                        <img src={logo} alt="Logo" style={{ width: "120px", height: "100%" }}/>
                    </Link>
                    <Button variant="text" size="large" onClick={()=> navigate('/favorite')}>Favorite</Button>
                    <Box sx={{ flex: 1 }}/>
                    <IconButton size="large">
                        <SearchIcon />
                    </IconButton>
                    {/* <IconButton size="large" onClick={() => toggleDrawer(true)}>
                        <Badge color="error" variant="dot">
                            <NotificationsNoneIcon/>
                        </Badge>
                    </IconButton> */}
                    <NotificationDrawer notifications={notifications} setNotifications={setNotifications}/>
                    <Typography variant="h6">
                        {user.userData && user.userData.name} 님
                    </Typography>
                    <Button variant="text" size="large" onClick={logoutHandler}>Logout</Button>
                </Toolbar>
            </>
        )

    }else {
        // 비로그인
        
        return(
            <>
                <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    {/* <Link href="/" underline="none" color="#fff" sx={{ height: "40px", px: "8px", "&:hover": { textDecoration: "none" } }}>
                        <img src={logo} alt="Logo" style={{ width: "120px", height: "100%" }}/>
                    </Link> */}
                    <Link to='/'>
                        <img src={logo} alt="Logo" style={{ width: "120px", height: "100%" }}/>
                    </Link>
                    {/* <Typography variant="h6" component="div">
                        <Link href="/" underline="none" color="#000" sx={{ px: "8px", "&:hover": { textDecoration: "none" } }}>
                            Logo
                        </Link>
                    </Typography> */}
                    <Box sx={{ flex: 1 }}/>
                    <IconButton size="large">
                        <SearchIcon />
                    </IconButton>
                    <Button variant="text" size="large" onClick={() => navigate('/login')}>Signin</Button>
                    <Button variant="text" size="large" onClick={() => navigate('/register')}>Signup</Button>
                </Toolbar>
            </>
        )
    }
}