import SingleComment from "./SingleComment";
import { useEffect, useState } from 'react';

export default function ReplyComment({ commentList, movieId, refreshComment, parentCommentId }) {

    const [childCommentNumber, setChildCommentNumber] = useState(0);
    const [openReplyComments, setOpenReplyComments] = useState(false);

    useEffect(() => {
        let commentNumber = 0;

        commentList.forEach((comment) => {
            if (comment.responseTo === parentCommentId) {
                commentNumber++
            }
        })

        setChildCommentNumber(commentNumber);
    
    },[commentList, parentCommentId])


    let renderReplyComment = (parentCommentId) => {
        return commentList.map((comment, index) => (
                <div key={index}>
                    {
                        comment.responseTo === parentCommentId &&
                        <div style={{ width: '80%', marginLeft: '40px' }}>
                            <SingleComment key={index} movieId={movieId} comment={comment} refreshComment={refreshComment}/>
                            <ReplyComment commentList={commentList} movieId={movieId} refreshComment={refreshComment} parentCommentId={comment._id}/>
                        </div>

                    }
                </div>
        ))
    }

    const onClickReplyHandler = () => {
        setOpenReplyComments(!openReplyComments);
    }

    return(
        <div>
            {
                childCommentNumber > 0 && 
                <p style={{ fontSize: '14px', margin: 0, color: 'gray', cursor: 'pointer' }} onClick={onClickReplyHandler}>
                    View {childCommentNumber} more comment(s)  
                </p>
            }
            {
                openReplyComments &&
                renderReplyComment(parentCommentId)
            }
        </div>
    );
}