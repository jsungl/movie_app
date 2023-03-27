const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const { Comment } = require('../models/Comment');
const { Notification } = require('../models/Notification');


router.get('/getNotifications', (req, res) => {

    Notification.find({ 'responseTo': new ObjectId(req.query.userId) })
    .populate('commentId')
    .populate('responseFrom').exec()
    .then((result) => {
        // console.log(result);
        return res.status(200).json({ success: true, result })
    })
    .catch(err => res.status(400).json({ success: false, err }))
});

router.post('/deleteNotification', (req, res) => {

    Notification.findOneAndDelete({ "_id" : req.body.id }).exec()
    .then(() => {
        return res.status(200).json({ success: true });
    })
    .catch(err => res.status(400).json({ success: false, err }))
});

router.get('/connectEventSource/:userId', (req, res) => {

    // console.log(req.params.userId);

    res
    .setHeader("Connection", "keep-alive")
    .setHeader("Content-Type", "text/event-stream")
    .setHeader("Cache-Control", "no-cache")

    // res.writeHead(200, {
    //     "Connection": "keep-alive",
    //     "Content-Type": "text/event-stream",
    //     "Cache-Control": "no-cache",
    // });

    const pipeline = [
        { 
            $match: {
                'operationType' : 'insert',
                'fullDocument.responseTo' : new ObjectId(req.params.userId)
            } 
        } //collection안의 원하는 document만 감시하고 싶다면
    ];

    const changeStream = Notification.watch(pipeline);
    changeStream.on('change', (result) => {

        // 알림DB에 데이터가 추가되는 경우만
        if(result.fullDocument !== undefined) {
            // console.log(result.fullDocument);
            // console.log('--------------------------------');
            // res.write(
            //     `event: notification\n
            //     data: ${JSON.stringify(result.fullDocument)}\n\n`
            // );
            res.write(`data: ${JSON.stringify(result.fullDocument)}\n\n`);
        }
    })

});

module.exports = router;