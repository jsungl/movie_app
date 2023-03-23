const { User } = require('../models/User');

// 인증처리
let auth = (req, res, next) => {

    // 클라이언트 쿠키에서 토큰을 가져온다
    let token = req.cookies.x_auth;

    // 토큰을 복호화한 후 유저를 찾는다
    User.findByToken(token, (err,user) => {
        //console.log('auth.js', user);
        if(err) throw err;

        // 유저가 없으면 인증 실패
        if(!user) return res.json({ isAuth: false, error: true });

        // 유저가 있으면 인증 통과
        req.token = token;
        req.user = user;
        next() //index로
    });
    
}

module.exports = { auth }