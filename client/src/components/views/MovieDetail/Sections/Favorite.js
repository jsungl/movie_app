import { Button } from 'antd';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Favorite({ userFrom, movieId, movieInfo }) {

    const [favoriteNumber, setFavoriteNumber] = useState(0);
    const [favorited, setFavorited] = useState(false);

    useEffect(() => {
        axios.get('/api/favorite/favoriteNumber', {
            params: {
                movieId
            }
        }).then(res => {
            if(res.data.success) {
                // console.log(res.data.favoriteNumber);
                setFavoriteNumber(res.data.favoriteNumber);
            }else {
                alert('favorite number 정보 가져오기 실패');
            }
        })

        if(userFrom) {
            axios.get('/api/favorite/favorited', {
                params: {
                    movieId,
                    userFrom
                }
            }).then(res => {
                if(res.data.success) {
                    // console.log(res.data.favorited);
                    setFavorited(res.data.favorited);
                }else {
                    alert('favorited 정보 가져오기 실패');
                }
            })
        }

    },[movieId, userFrom])


    const onClickFavorite = () => {

        if(favorited) {
            axios.post('/api/favorite/removeFromFavorite', { userFrom, movieId })
            .then(res => {
                if(res.data.success) {
                    setFavoriteNumber(favoriteNumber - 1);
                    setFavorited(!favorited);
                }else {
                    alert('favorite list에서 삭제 실패');
                }
            })

        }else {
            let movieTitle = movieInfo.title;
            let moviePost = movieInfo.backdrop_path;
            let movieRunTime = movieInfo.runtime;

            if(userFrom) {

                axios.post('/api/favorite/addToFavorite', { userFrom, movieId, movieTitle, moviePost, movieRunTime })
                .then(res => {
                    if(res.data.success) {
                        setFavoriteNumber(favoriteNumber + 1);
                        setFavorited(!favorited);
                    }else {
                        alert('favorite list에 추가 실패');
                    }
                })
            }else {
                return alert('로그인을 먼저 해주세요');    
            }

        }

    }

    return (
        <div>
            {favorited ? 
                <Button size='large' type="primary" onClick={onClickFavorite} danger>
                    Remove from Favorite {favoriteNumber}
                </Button>
            :
            <Button size='large' onClick={onClickFavorite}>
                Add to Favorite {favoriteNumber}
            </Button>
            }
        </div>

    );
}