import { Col } from 'antd';
import Link from '@mui/material/Link';
// import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import { useNavigate } from 'react-router-dom';

export default function GridCard({ image, movieId, movieName, actorName }) {

    if(actorName) {

        return (
            <Col lg={6} md={8} xs={24}>
                <div style={{ position: 'relative' }}>
                    <img src={image} alt={actorName} style={{ width: '100%', height: '320px' }}/>
                </div>
            </Col>
        );

    }else {
        
        return (
            <Col lg={6} md={8} xs={24}>
                <div style={{ position: 'relative' }}>
                    <Link href={`/movie/${movieId}`} underline="none" color="#fff" sx={{ "&:hover": { textDecoration: "none" } }}>
                            <img src={image} alt={movieName} style={{ width: '100%', height: '320px' }}/>
                    </Link>
                </div>
            </Col>

        )
    }
}