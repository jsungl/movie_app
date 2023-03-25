import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import axios from 'axios';
import logo from '../../../assets/images/MovieAPP_logo.png';

export default function Header() {
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    // console.log(user);

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


    if (user.userData && !user.userData.isAuth) {
        // 비로그인
        return(
            <>
                <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Link href="/" underline="none" color="#fff" sx={{ height: "40px", px: "8px", "&:hover": { textDecoration: "none" } }}>
                        <img src={logo} alt="Logo" style={{ width: "120px", height: "100%" }}/>
                    </Link>
                    {/* <Typography variant="h6" component="div">
                        <Link href="/" underline="none" color="#000" sx={{ px: "8px", "&:hover": { textDecoration: "none" } }}>
                            Logo
                        </Link>
                    </Typography> */}
                    <Box sx={{ flex: 1 }}/>
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                    <Button variant="text" onClick={() => navigate('/login')}>Signin</Button>
                    <Button variant="text" onClick={() => navigate('/register')}>Signup</Button>
                </Toolbar>
            </>
        )

    }else {
        // 로그인
        return (
            <>
                <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Link href="/" underline="none" color="#fff" sx={{ height: "40px", px: "8px", "&:hover": { textDecoration: "none" } }}>
                        <img src={logo} alt="Logo" style={{ width: "120px", height: "100%" }}/>
                    </Link>
                    <Button variant="text" onClick={()=> navigate('/favorite')}>Favorite</Button>
                    <Box sx={{ flex: 1 }}/>
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                    <Button variant="text" onClick={logoutHandler}>Logout</Button>
                </Toolbar>
            </>
        )

    }
}