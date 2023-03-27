import { useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from '../Header/Header';
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom';
import { FloatButton } from 'antd';
import { useSelector } from 'react-redux';


const theme = createTheme();

export default function Layout() {
    const [newAlarms, setNewAlarms] = useState(false);
    const user = useSelector(state => state.user);

    useEffect(() => {

        if(user.userData && user.userData.isAuth) {
            let eventSource;
            const fetchSse = () => {
                try {
                    console.log('sse connected state: ', eventSource !== undefined && eventSource);
                    eventSource = new EventSource(`http://localhost:4000/api/notification/connectEventSource/${user.userData._id}`);

                    eventSource.addEventListener('open', function(e) {
                        // Connection was opened.
                        console.log('connected~');
                    });
                
                    eventSource.addEventListener('message', function(e) {
                        let notification = JSON.parse(e.data);
                        console.log(notification);
                        notification && setNewAlarms(true)
                    });
                
                    eventSource.addEventListener('error', function(e) {
                        if (e.readyState === EventSource.CLOSED) {
                            // Connection was closed.
                            eventSource.close();
                        }
                    });

                }catch(err) {
                    console.error(err);
                    eventSource.close();
                }

            }

            fetchSse();
            return () => eventSource.close();
        }

    },[user]);


    
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="lg">
                <Header user={user} newAlarms={newAlarms}/>
                <Box component='main' sx={{ width: '100%', mb:"50px" }}>
                    <Outlet/>
                    <FloatButton.BackTop />
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