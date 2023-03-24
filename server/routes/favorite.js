const express = require('express');
const router = express.Router();
const { Favorite } = require('../models/Favorite');

router.get('/favoriteNumber', (req, res) => {

    // DB에서 특정영화의 favorite 숫자 가져오기
    Favorite.find({ "movieId" : req.query.movieId }).exec()
    .then((info) => {
        return res.status(200).json({ success: true, favoriteNumber: info.length });
    })
    .catch(err => res.status(400).send(err))
});

router.get('/favorited', (req, res) => {

    // 사용자가 이 영화를 favorite list에 넣었는지 정보를 DB에서 가져오기
    Favorite.find({ "movieId" : req.query.movieId, "userFrom": req.query.userFrom }).exec()
    .then((info) => {
        let result = false
        if(info.length !== 0) {
            result = true
        }
        return res.status(200).json({ success: true, favorited: result });
    })
    .catch(err => res.status(400).send(err))
});

router.post('/addToFavorite', (req, res) => {
    
    // favorite list에 추가
    const favorite = new Favorite(req.body)
    favorite.save()
    .then(() => {
        return res.status(200).json({ success: true })
    })
    .catch(err => res.status(400).send(err))
});

router.post('/removeFromFavorite', (req, res) => {

    // favorite list에서 삭제
    Favorite.findOneAndDelete({ "movieId" : req.body.movieId, "userFrom": req.body.userFrom }).exec()
    .then(() => {
        return res.status(200).json({ success: true });
    })
    .catch(err => res.status(400).send(err))
});


router.get('/getFavoriteMovie', (req, res) => {

    // DB에서 favorite 영화 정보 가져오기
    Favorite.find({ "userFrom" : req.query.userFrom }).exec()
    .then((favorites) => {
        return res.status(200).json({ success: true, favorites });
    })
    .catch(err => res.status(400).send(err))
});


module.exports = router;