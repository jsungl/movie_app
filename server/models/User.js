const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    //role 0 -> 일반유저, 0이 아니면 관리자
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: String,
    tokenExp: Number
})

userSchema.pre('save', function(next) {
    let user = this;

    if(user.isModified('password')) {
        // 비밀번호 암호화
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if(err) return next(err)
    
            bcrypt.hash(user.password, salt, (err, hash) => {
                if(err) return next(err)
                user.password = hash
                next()
            });
        });

    }else {
        next()
    }
});

//메소드 만들기
userSchema.methods.comparePassword = function(plainPassword, cb){
    let user = this;
    bcrypt.compare(plainPassword, user.password, (err, isMatch) => {
        if(err) return cb(err)
        cb(null, isMatch) // 일치하면 true
    })
}

userSchema.methods.generateToken = function(cb){
    /**
     * 모델을 통해서 생성된 인스턴스에 정의되는 메서드
     * methods를 사용할 때의 this는 method를 호출한 객체 자체가 this가 된다
     * {
            name: {
                type: String,
                maxlength: 50
            },
            email: {
                type: String,
                trim: true,
                unique: 1
            },
            password: {
                type: String,
                minlength: 5
            },
            role: {
                type: Number,
                default: 0
            },
            ...
        }
     */
    let user = this; 

    //jwt를 이용하여 토큰생성
    let token = jwt.sign(user._id.toString(), 'secretKey');
    user.token = token;
    user.save().then(()=>{
        cb(null, user);
    })
    .catch(err => {
        return cb(err);
    })

}

userSchema.statics.findByToken = function(token, cb){   
    /**
     * static method는 모델에 정의되는 메서드
     * statics를 사용할 때의 this는 모델 자체이다
     * Model{ User }
     */
    let user = this;

    //토큰 복호화
    jwt.verify(token, 'secretKey', (err, decoded) => {
        // 유저아이디를 이용해서 유저를 찾은 다음에
        // 클라이언트에서 가져온 token과 DB에 저장된 token이 일치하는지 비교
        user.findOne({ "_id": decoded, "token": token })
        .then(user => {
            cb(null,user)
        })
        .catch(err => {
            return cb(err)
        })

    })
}



const User = mongoose.model('User', userSchema);

module.exports = { User }