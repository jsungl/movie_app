import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from '../Header/Header';
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom';

const theme = createTheme();

export default function Layout() {

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="lg">
                <Header />
                <Box component='main' sx={{ width: '100%', mt:"50px", mb:"50px" }}>
                    <Outlet/>
                </Box>
                {/* <Box component='main' sx={{ width: '100%', height: '100vh', mt:"50px", mb:"50px" }}>
                    <Outlet/>
                </Box> */}
            </Container>
            <Footer
                title="Footer"
                description="Something here to give the footer a purpose!"
            />
        </ThemeProvider>
    );
}