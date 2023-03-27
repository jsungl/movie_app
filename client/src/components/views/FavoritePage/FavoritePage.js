import Auth from '../../../hoc/auth';
import './favorite.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from "react-redux";
import { Button, Empty, Image } from 'antd';
import { IMAGE_BASE_URL } from '../../Config';
import NotFoundImage from '../../../assets/images/error.jpg';


function FavoritePage() {
    const user = useSelector(state => state.user);
    // console.log(user);
    let userFrom = user.userData._id;
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        axios.get('/api/favorite/getFavoriteMovie', { 
            params: {
                userFrom
            }
        })
        .then(res => {
            if(res.data.success) {
                setFavorites([...res.data.favorites]);
            }else {
                alert('favorite 영화 정보 가져오기 실패');
            }
        })
    },[userFrom])


    const onClickDelete = (movieId, userFrom) => {

        axios.post('/api/favorite/removeFromFavorite', { movieId, userFrom })
        .then(res => {
            if(res.data.success) {
                const result = favorites.filter((favorite,idx) => favorite.movieId !== movieId)
                setFavorites([...result]);
            }else {
                alert('favorite list에서 삭제 실패');
            }
        })
    }

    const renderCards = favorites.map((favorite, index) => {
        const content = (
            <div style={{ display: 'flex' }}>
                <div style={{ width: '30%' }}>
                    <Image src={`${IMAGE_BASE_URL}w500${favorite.moviePost}`} fallback={NotFoundImage} width={125} height={125}/>
                    {/* favorite.moviePost ? <img src={`${IMAGE_BASE_URL}w500${favorite.moviePost}`} width="125" height="125" alt="MoviePost"/> : "no image" */}
                </div>
                <div style={{ flexGrow: '1', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {favorite.movieTitle}
                </div>
            </div>
        )
        return (
            <tr key={index}>
                <td>
                    {content}
                </td>
                <td>{favorite.movieRunTime}</td>
                <td><Button type="primary" onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)} danger>Remove</Button></td>
            </tr>
        );
    })

    const emptyCards = <Empty />;
    // <tr>
    //     <td colSpan="3" style={{ textAlign: 'center' }}>empty</td>
    // </tr>
        

    return (
        <div>
            <h2> Favorite Movies </h2>
            <hr/>
            {
                favorites.length === 0 ? emptyCards : 
                <table className='favoriteTable'>
                    <thead>
                        <tr>
                            <th>Movie Title</th>
                            <th>Movie Runtime</th>
                            <th>Remove from favorite</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderCards}
                    </tbody>
                </table>
            }
        </div>

    );
}

export default Auth(FavoritePage, true)