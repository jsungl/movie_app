const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = mongoose.Schema({
    
    // 액션 종료 - like, dislike, reply 
    action: {
        type: String
    },
    // 액션을 당한 사용자 id
    responseTo: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    // 액션을 한 사용자 id
    responseFrom: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    // 좋아요나 답글을 단 댓글 id
    commentId: {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }

}, { timestamps: true })


const Notification = mongoose.model('Notification', notificationSchema);

module.exports = { Notification }