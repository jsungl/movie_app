import { useState } from 'react';
import { Avatar, Button, Input, Tooltip } from 'antd';
import { Comment } from '@ant-design/compatible';
import axios from 'axios';
import moment from 'moment';
import { useSelector } from 'react-redux';
import LikeDislikes from './LikeDislikes';
const { TextArea } = Input;



export default function SingleComment({ movieId, comment, refreshComment }) {
    const user = useSelector(state => state.user);
    const [openReply, setOpenReply] = useState(false);
    const [commentValue, setCommentValue] = useState("");

    const onClickReplyOpen = () => {
        setOpenReply(!openReply);
    }

    const onChangeHandler = (e) => {
        setCommentValue(e.currentTarget.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if(user.userData && !user.userData.isAuth) {
            setCommentValue("");
            setOpenReply(false);
            return alert('로그인을 먼저 해주세요');
        }

        let body = {
            content: commentValue,
            writer: user.userData._id,
            movieId: movieId,
            responseTo: comment._id,
        }
        // console.log(body);

        axios.post('/api/comment/saveComment', body)
        .then(res => {
            if(res.data.success) {
                // console.log(res.data.result);
                setCommentValue("");
                setOpenReply(false);
                refreshComment(res.data.result);
            }else {
                alert('댓글을 저장하는데 실패하였습니다');
            }
        })

    }

    const actions = [
        <LikeDislikes userId={user.userData.isAuth ? user.userData._id : false} commentId={comment._id} />,
        <span key="comment-basic-reply-to" onClick={onClickReplyOpen}>Reply to</span>
    ];

    return (
        <div>
            <Comment
                actions={actions}
                author={comment.writer.name}
                avatar={<Avatar src={comment.writer.image} alt="image"/>}
                content={<p>{comment.content}</p>}
                datetime={
                    <Tooltip title="2016-11-22 11:22:33">
                      <span>{moment(comment.createdAt).fromNow()}</span>
                    </Tooltip>
                }
            />
            {
                openReply && 
                <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                    <TextArea 
                        style={{ width: '100%', borderRadius: '5px' }}
                        onChange={onChangeHandler}
                        value={commentValue}
                        placeholder="write some comments"
                    />
                    <br />
                    <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</Button>
                </form>
            }
        </div>
    );
}