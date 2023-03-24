import { useEffect, useState } from 'react';
import Auth from '../../../hoc/auth';
import { useSelector } from "react-redux";
import { API_URL, IMAGE_BASE_URL } from '../../Config';
import { API_KEY } from '../../Key';
import MainImage from './Sections/MainImage';
import GridCard from '../Common/GridCard';
import { Row, Button } from 'antd';

function LandingPage() {
    const [movies, setMovies] = useState([]);
    const [mainImage, setMainImage] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const user = useSelector(state => state.user);
    console.log(user);

    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

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
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage + 1}`;
        
        fetch(endpoint)
        .then(res => res.json())
        .then(res => {
            setMovies([...movies, ...res.results]);
            setCurrentPage(res.page);
        });
    }

    if(user.userData) {
        return (
            <div>
                {/* <div>
                    {user.userData.isAuth ? <span>반갑습니다. {user.userData.name}</span> : <span>시작페이지</span>}
                </div> */}

                {
                    mainImage.length > 0 && <MainImage images={mainImage} />
                }
                
                <div style={{ width: '100%' }}>
                    <h2>Movies by latest</h2>
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
}

export default Auth(LandingPage, null)