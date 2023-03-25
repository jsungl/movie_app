const express = require('express');
const router = express.Router();
const { Like } = require("../models/Like");
const { Dislike } = require("../models/Dislike");


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

router.post("/upLike", (req, res) => {

    let variable = { commentId: req.body.commentId, userId: req.body.userId }

    // Like 컬렉션에 클릭 정보 저장
    const like = new Like(variable);

    like.save().then(() => {
        
        // 만약 DisLike이 이미 클릭되어 있다면 DisLike을 1 줄여준다
        Dislike.findOneAndDelete(variable)
        .exec().then((result) => {
            return res.status(200).json({ success: true })
        })
        .catch(err => res.status(400).json({ success:false, err }))


    })
    .catch(err => res.json({ success: false, err }))

});


router.post("/unlike", (req, res) => {

    let variable = { commentId: req.body.commentId, userId: req.body.userId }

    Like.findOneAndDelete(variable)
    .exec().then(() => {
        return res.status(200).json({ success: true })
    })
    .catch(err => res.status(400).json({ success: false, err }))

});

router.post("/unDislike", (req, res) => {

    let variable = { commentId: req.body.commentId, userId: req.body.userId }

    Dislike.findOneAndDelete(variable)
    .exec().then(() => {
        return res.status(200).json({ success: true })
    })
    .catch(err => res.status(400).json({ success: false, err }))

});

router.post("/upDislike", (req, res) => {

    let variable = { commentId: req.body.commentId, userId: req.body.userId }

    // DisLike 컬렉션에 클릭 정보 저장
    const dislike = new Dislike(variable);

    dislike.save().then(() => {
        
        // 만약 Like이 이미 클릭되어 있다면 Like을 1 줄여준다
        Like.findOneAndDelete(variable)
        .exec().then((result) => {
            return res.status(200).json({ success: true })
        })
        .catch(err => res.status(400).json({ success:false, err }))


    })
    .catch(err => res.json({ success: false, err }))

});


module.exports = router;