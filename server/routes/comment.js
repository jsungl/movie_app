const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const { Comment } = require('../models/Comment');
const { Notification } = require('../models/Notification');


router.post('/saveComment', (req, res) => {

    const comment = new Comment(req.body);

    comment.save().then((comment) => {
        Comment.find({ '_id': comment._id })
        .populate('writer')
        .exec()
        .then((result) => {
            return res.status(200).json({ success: true, result });
        })
        .catch(err => res.json({ success: false, err}))
    })
    .catch(err => res.json({ success: false, err }));

});


router.get('/getComments', (req, res) => {

    Comment.find({ 'movieId': req.query.movieId })
    .populate('writer')
    .exec().then((comments) => {
        return res.status(200).json({ success: true, comments })
    })
    .catch(err => res.status(400).send(err))

});

router.post('/replyComment', async(req, res) => {
    
    try {
        let { writer, responseTo } = req.body;

        const comment = new Comment(req.body);
        
        const responseFrom = await Comment.findOne({ '_id': new ObjectId(responseTo) })
    

        const notification = new Notification({ 
            action: 'reply', 
            responseTo: responseFrom.writer, 
            responseFrom: writer,
            commentId: responseTo
        });

        const saveComment = await comment.save() // 답글 저장
        const saveNotification = await notification.save() //알림 저장
        
        const result = await Comment.find({ '_id': saveComment._id }).populate('writer').exec()
        return res.status(200).json({ success: true, result });

    }catch(err) {
        console.log(err);
        res.json({ success: false, err })
    }

});

router.post('/deleteComment', async(req, res) => {

    // 답글이 달려있으면 삭제된 댓글입니다 처리
    
    try {
        let commentId = req.body.commentId;
        
        const responseTo = await Comment.findOne({ 'responseTo': new ObjectId(commentId) }) // 답글이 달려있는지 확인
        
        // 답글이 없으면 null
        if(responseTo) {
            let result = await Comment.findOneAndUpdate({ "_id" : commentId }, { "content" : "[삭제된 댓글입니다.]", "deleted" : true }).exec()
            return res.status(200).json({ success: true });

        }else {
            let result = await Comment.findOneAndDelete({ "_id" : commentId }).exec()
            return res.status(200).json({ success: true });
        }
        
    }catch(err) {
        console.log(err);
        res.status(400).json({ success: false, err })
    }

});


module.exports = router;