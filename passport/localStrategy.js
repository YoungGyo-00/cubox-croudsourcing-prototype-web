const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/user');

module.exports = () => {
	passport.use(new LocalStrategy({
		usernameField: 'id',
		passwordField: 'pwd',
	}, async (id, pwd, done) =>{
		try {
			const exUser = await User.findOne({ where: {id} });
			if (exUser) {
				const result = await bcrypt.compare(pwd, exUser.pwd);
				if (result) {
					done(null, exUser);
				} else {
					done(null, false, { message: '비밀번호가 일치하지 않습니다.'});
                    console.log('비밀번호 일치하지 않음');
				}
			} else {
				done(null, false, { message: '가입되지 않은 회원입니다.'});
                console.log('존재하지 않은 아이디');
			}
		} catch {
			console.error(error, '\nlocalStrategy.js에서 오류');
			done(error);
		}
	}));
};