const express = require('express');
const router = express.Router();

const { Comment } = require('../models/Comment');


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

module.exports = router;