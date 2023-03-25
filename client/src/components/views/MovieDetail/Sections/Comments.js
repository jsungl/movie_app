import { useState } from 'react';
import { Button, Input, Typography, } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';
const { TextArea } = Input;
const { Title } = Typography;

export default function Comments({ movieTitle, movieId, commentList, refreshComment }) {
    const [comment, setComment] = useState("");
    const user = useSelector(state => state.user)

    const handleChange = (e) => {
        setComment(e.currentTarget.value);
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();

        if(user.userData && !user.userData.isAuth) {
            setComment("");
            return alert('로그인을 먼저 해주세요');
        }

        let body = {
            content: comment,
            writer: user.userData._id,
            movieId: movieId
        }
        // console.log(body);

        axios.post('/api/comment/saveComment', body)
        .then(res => {
            if(res.data.success) {
                // console.log(res.data.result);
                setComment("");
                refreshComment(res.data.result);
            }else {
                alert('댓글을 저장하는데 실패하였습니다');
            }
        })

    }

    return (
        <div style={{ marginTop: '50px'}}>
            <Title level={3} > Share your opinions about {movieTitle} </Title>
            <hr />
            {/* Comment List */}
            { commentList && commentList.map((comment,index) => (
                !comment.responseTo && 
                <div key={index}>
                    <SingleComment movieId={movieId} comment={comment} refreshComment={refreshComment}/>
                    <ReplyComment commentList={commentList} movieId={movieId} refreshComment={refreshComment} parentCommentId={comment._id}/>
                </div>
            ))}

            {commentList && commentList.length === 0 &&
                <div style={{ display: 'flex', justifyContent:'center', alignItems:'center', height:'200px' }} >
                    Be the first one who shares your thought about this movie
                </div>
            }
            

            {/* Root Comment Form */}
            <form style={{ display: 'flex', marginTop: '20px' }} onSubmit={onSubmitHandler}>
                <TextArea
                    style={{ width: '100%', borderRadius: '5px' }}
                    onChange={handleChange}
                    value={comment}
                    placeholder="write some comments"
                />
                <br />
                <Button style={{ width: '20%', height: '52px' }} onClick={onSubmitHandler}>Submit</Button>
            </form>


        </div>
    );
}