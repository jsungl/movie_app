const express = require('express');
const router = express.Router();
const { Like } = require("../models/Like");
const { Dislike } = require("../models/Dislike");
const { Comment } = require('../models/Comment');
const { Notification } = require('../models/Notification');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;


router.get("/getLikes", (req, res) => {
    let variable = { commentId: req.query.commentId }
    
    Like.find(variable)
        .exec().then((likes) => {
            return res.status(200).json({ success: true, likes })
        })
        .catch(err => res.status(400).send(err))

})


router.get("/getDislikes", (req, res) => {

    let variable = { commentId: req.query.commentId }

    Dislike.find(variable)
        .exec().then((dislikes) => {
            return res.status(200).json({ success: true, dislikes })
        })
        .catch(err => res.status(400).send(err))

})

router.post("/upLike", async(req, res) => {

    try {
        let variable = { commentId: req.body.commentId, userId: req.body.userId }

        // Like 컬렉션에 클릭 정보 저장
        const like = new Like(variable);
    
        // Notification 컬렉션에 저장
        const responseFrom = await Comment.findOne({ '_id': new ObjectId(req.body.commentId) })
    
        const notification = new Notification({ 
            action: 'like', 
            responseTo: responseFrom.writer, 
            responseFrom: req.body.userId,
            commentId: req.body.commentId
        });
    
        const saveLike = await like.save()
        const saveNotification = await notification.save()
        
        // 만약 DisLike이 이미 클릭되어 있다면 DisLike을 1 줄여준다
        const result = await Dislike.findOneAndDelete(variable).exec()
        return res.status(200).json({ success: true })
    

    }catch(err) {
        console.log(err);
        res.status(400).json({ success: false, err })
    }

    
    // let variable = { commentId: req.body.commentId, userId: req.body.userId }

    // Like 컬렉션에 클릭 정보 저장
    // const like = new Like(variable);

    // like.save().then(() => {
        
    //     // 만약 DisLike이 이미 클릭되어 있다면 DisLike을 1 줄여준다
    //     Dislike.findOneAndDelete(variable)
    //     .exec().then((result) => {
    //         return res.status(200).json({ success: true })
    //     })
    //     .catch(err => res.status(400).json({ success:false, err }))


    // })
    // .catch(err => res.json({ success: false, err }))

});


router.post("/unlike", async(req, res) => {

    try {
        let variable = { commentId: req.body.commentId, userId: req.body.userId }

        const result = await Like.findOneAndDelete(variable).exec()
        return res.status(200).json({ success: true })

    }catch(err) {
        console.log(err);
        res.status(400).json({ success: false, err })
    }


    // let variable = { commentId: req.body.commentId, userId: req.body.userId }

    // Like.findOneAndDelete(variable)
    // .exec().then(() => {
    //     return res.status(200).json({ success: true })
    // })
    // .catch(err => res.status(400).json({ success: false, err }))

});

router.post("/unDislike", async(req, res) => {

    try {
        let variable = { commentId: req.body.commentId, userId: req.body.userId }

        const result = await Dislike.findOneAndDelete(variable).exec()
        return res.status(200).json({ success: true })

    }catch(err) {
        console.log(err);
        res.status(400).json({ success: false, err })
    }



    // let variable = { commentId: req.body.commentId, userId: req.body.userId }

    // Dislike.findOneAndDelete(variable)
    // .exec().then(() => {
    //     return res.status(200).json({ success: true })
    // })
    // .catch(err => res.status(400).json({ success: false, err }))

});

router.post("/upDislike", async(req, res) => {

    try {
        let variable = { commentId: req.body.commentId, userId: req.body.userId }

        // DisLike 컬렉션에 클릭 정보 저장
        const dislike = new Dislike(variable);
    
        // Notification 컬렉션에 저장
        const responseFrom = await Comment.findOne({ '_id': new ObjectId(req.body.commentId) })
    
        const notification = new Notification({ 
            action: 'dislike', 
            responseTo: responseFrom.writer, 
            responseFrom: req.body.userId,
            commentId: req.body.commentId
        });
    
        const saveDislike = await dislike.save()
        const saveNotification = await notification.save()
        
        // 만약 Like이 이미 클릭되어 있다면 Like을 1 줄여준다
        const result = await Like.findOneAndDelete(variable).exec()
        return res.status(200).json({ success: true })
    

    }catch(err) {
        console.log(err);
        res.status(400).json({ success: false, err })
    }


    // let variable = { commentId: req.body.commentId, userId: req.body.userId }

    // // DisLike 컬렉션에 클릭 정보 저장
    // const dislike = new Dislike(variable);

    // dislike.save().then(() => {
        
    //     // 만약 Like이 이미 클릭되어 있다면 Like을 1 줄여준다
    //     Like.findOneAndDelete(variable)
    //     .exec().then((result) => {
    //         return res.status(200).json({ success: true })
    //     })
    //     .catch(err => res.status(400).json({ success:false, err }))


    // })
    // .catch(err => res.json({ success: false, err }))

});


module.exports = router;