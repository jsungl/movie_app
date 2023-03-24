import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import Auth from '../../../hoc/auth';
import { API_KEY } from '../../Key';
import { API_URL, IMAGE_BASE_URL } from '../../Config';
import DetailMainImage from './Sections/DetailMainImage';
import MovieInfo from './Sections/MovieInfo';
import GridCard from '../Common/GridCard';
import Favorite from './Sections/Favorite';
import { Button, Row } from 'antd';

function MovieDetail() {
    let { movieId } = useParams();
    const user = useSelector(state => state.user);
    const [movie, setMovie] = useState(null);
    const [casts, setCasts] = useState([]);
    const [actorToggle, setActorToggle] = useState(false);
    // console.log(movieId);

    useEffect(() => {

        let endpoint = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;
        let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;


        fetch(endpoint)
            .then(res => res.json())
            .then(res => {
                setMovie(res);
            })
        
        fetch(endpointCrew)
            .then(res => res.json())
            .then(res => {
                // console.log(res);
                setCasts(res.cast)
            })
        
    },[movieId])


    const toggleActorView = () => {
        setActorToggle(!actorToggle);
    }


    if(movie) {

        return (
            <div>
                
                {/* Header */}
                <DetailMainImage 
                    image={`${IMAGE_BASE_URL}w1280${movie.backdrop_path}`} title={movie.original_title} text={movie.overview}/>
                
    
                {/* Body */}
                <div style={{ width: '85%', margin: '1rem auto' }}>
                    {user.userData && 
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Favorite movieInfo={movie} movieId={movieId} userFrom={user.userData.isAuth ? user.userData._id : false}/>
                        </div>
                    }
    
                    {/* Movie Info */}
                    <MovieInfo movie={movie}/>
    


                    <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
                        <Button size='large' onClick={toggleActorView}>Toggle Actor View</Button>
                    </div>


                    {/* Actors Grid */}
                    {
                        actorToggle && 
                        <Row gutter={[16,16]}>
                            {casts && casts.map((cast, index) => (
                                <GridCard
                                    key={index} 
                                    image={cast.profile_path ? `${IMAGE_BASE_URL}w500${cast.profile_path}` : null}
                                    actorName={cast.name}
                                />
                            ))}
                        </Row>
                    }
    
                </div>
    
    
            </div>
        );
    }

    

}


export default Auth(MovieDetail, null)