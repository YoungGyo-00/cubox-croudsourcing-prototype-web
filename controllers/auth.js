const passport = require('passport');
const bcrypt = require('bcrypt');

const User = require('../models/user');

exports.signup = async(req, res, next) => {
    const {email, name, password} = req.body;
    console.log(email, ' ', password);
    try {
        const exId = await User.findOne({ where : { email }});
        // const exCellphone = await User.findOne({ where : { cellphone }});

        if (exId) {
            console.log('아이디 중복 오류');
            return res.status(400).send('이미 회원인 상태입니다');
        } 
        /* else if (exCellphone){
            console.log('전화번호 중복');
            return res.status(400).send('이미 같은 전화번호가 등록되어 있습니다');
        } */

        const hash = await bcrypt.hash(password, 10); // 2^12번 해싱 라운드(salt round - 2번째 인자) => Cost
        await User.create({
            email,
            name,
            password: hash,
        });
        console.log('회원가입 완료');
        return res.status(201).send('회원가입 성공');
    } catch (err) {
        console.log('join error');
        console.error(err);
        return next(error);
    }
};

exports.login = async (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        if(authError) {
            console.error(authError);
            return next(authError);
        }
        if(!user){
            return res.status(400).send('아이디 혹은 비밀번호가 존재하지 않습니다');
        }
        return req.login(user, (loginError) => {
            if (loginError){
                console.error(loginError);
                return next(loginError);
            }
            console.log(`${user.name}님 로그인 성공`);
            return res.status(201).send(`${user.name}님 로그인 성공`);
        })
    })(req, res, next)
};

exports.logout = async (req, res, next) => {
    req.logout();
    req.session.destroy();
    console.log('로그아웃 성공');
    return res.status(200).send('로그아웃 성공');
};