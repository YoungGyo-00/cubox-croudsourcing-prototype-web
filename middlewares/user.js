const User = require('../models/user');

exports.checkPermission = async(req, res, next) => {
    try{
        const exUser = await User.findOne({
            where : {nickName: req.params.nickName},
        });
        console.log("삭제 원하는 유저 닉네임 : " + exUser.nickName, "\n현재 로그인 중인 유저 닉네임 : " + req.user.nickName);
        if (exUser.nickName != req.user.nickName) return res.status(403).send("권한이 없습니다");
        next();
    } catch (err) {
        console.log("User permission error \n");
        next(err)
    }
};