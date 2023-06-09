import { useEffect, useState } from 'react';
import Auth from '../../../hoc/auth';
import { API_URL, IMAGE_BASE_URL } from '../../Config';
import { API_KEY } from '../../Key';
import MainImage from './Sections/MainImage';
import GridCard from '../Common/GridCard';
import { Row, Button } from 'antd';

function LandingPage() {
    const [movies, setMovies] = useState([]);
    const [mainImage, setMainImage] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=ko-KR&page=1`;

        fetch(endpoint)
        .then(res => res.json())
        .then(res => {
            setMovies([...res.results]);
            const result = res.results.filter((data,idx) => idx < 4);
            setMainImage([...result]);
            setCurrentPage(res.page);
        });

    },[]);

    const loadMoreItems = () => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=ko-KR&page=${currentPage + 1}`;
        
        fetch(endpoint)
        .then(res => res.json())
        .then(res => {
            setMovies([...movies, ...res.results]);
            setCurrentPage(res.page);
        });
    }

   
    return (
        <div>
            {
                mainImage.length > 0 && <MainImage images={mainImage} />
            }
            
            <div style={{ width: '100%' }}>
                <h2>What's Popular</h2>
                <hr/>
                <Row gutter={[16,16]}>
                    {movies && movies.map((movie, index) => (
                        <GridCard
                            key={index} 
                            image={movie.poster_path ? `${IMAGE_BASE_URL}w500${movie.poster_path}` : null}
                            movieId={movie.id}
                            movieName={movie.original_title}
                        />
                    ))}
                </Row>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button size='large' onClick={loadMoreItems}>Load More</Button>
            </div>
            
        </div>
    );
}

export default Auth(LandingPage, null)