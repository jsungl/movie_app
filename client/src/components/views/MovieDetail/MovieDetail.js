import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import Auth from '../../../hoc/auth';
import { API_KEY } from '../../Key';
import { API_URL, IMAGE_BASE_URL } from '../../Config';
import DetailMainImage from './Sections/DetailMainImage';
import Comments from './Sections/Comments';
import MovieInfo from './Sections/MovieInfo';
import GridCard from '../Common/GridCard';
import Favorite from './Sections/Favorite';
import { Button, Row } from 'antd';
import axios from 'axios';
// import { receiveSocketMessage } from '../Common/SocketIo';

function MovieDetail() {
    let { movieId } = useParams();
    const user = useSelector(state => state.user);
    const [movie, setMovie] = useState(null);
    const [casts, setCasts] = useState([]);
    const [commentList, setCommentList] = useState([]);
    const [actorToggle, setActorToggle] = useState(false);

    useEffect(() => {

        let endpoint = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=ko-KR`;
        let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;

        // 영화 전체 정보 가져오기
        fetch(endpoint)
            .then(res => res.json())
            .then(res => {
                setMovie(res);

                // 영화 캐스팅 정보 가져오기
                fetch(endpointCrew)
                .then(res => res.json())
                .then(res => {
                    setCasts(res.cast)
                })
            })
            .catch(err => console.error(err))
        
        
        
        // 영화에 대한 모든 댓글 가져오기
        axios.get('/api/comment/getComments', {
            params:{
                movieId
            }
        })
        .then(res=> {
            if (res.data.success) {
                // console.log('comments',res.data.comments);
                setCommentList(res.data.comments)
            }else {
                alert('댓글 가져오기 실패');
            }
        })
        
    },[movieId])


    const toggleActorView = () => {
        setActorToggle(!actorToggle);
    }

    const refreshComment = (newComment, state) => {
        if(state === 'save') {
            setCommentList(commentList.concat(newComment));
        }else {
            setCommentList(newComment);
        }
    }


    if(movie) {

        return (
            <div>
                
                {/* Header */}
                <DetailMainImage 
                    image={`${IMAGE_BASE_URL}w1280${movie.backdrop_path}`} title={movie.title} text={movie.overview}/>
                
    
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

                    {/* Comments */}
                    <Comments movieTitle={movie.title} movieId={movieId} commentList={commentList} refreshComment={refreshComment}/>
    
                </div>
    
    
            </div>
        );
    }

    

}


export default Auth(MovieDetail, null)