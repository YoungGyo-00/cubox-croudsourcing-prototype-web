const { Supervisor, Center } = require('../models');

exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()){
        next();
    } else {
        res.status(403).send('로그인 필요');
        console.log('로그인 필요');
    }
};

exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        next();
    } else {
        res.status(403).send('로그인 상태입니다');
        console.log('로그인 상태입니다');
    }
};

exports.checkPermission = async(req, res, next) => {
    try{
        const exSupervisor = await Supervisor.findOne({
            where : {userId: req.user.userId},
        });
        const exCenter = await Center.findOne({
            where : {id : req.query.centerId },
        });

        if (!exSupervisor){
            console.log(`존재하지 않는 사용자 입니다`);
            return res.status(403).send("존재하지 않는 사용자입니다.\n다시 확인바랍니다.");
        } else if (!exCenter) {
            console.log('존재하지 않는 센터입니다');
            return res.status(403).send("존재하지 않는 센터입니다");
        } else if (exSupervisor.supervisorId != exCenter.supervisorId) {
            console.log("현재 사용자는 권한이 없습니다");
            return res.status(403).send("현재 사용자는 권한이 없습니다");
        }
        next();
    } catch (err) {
        console.log("checkpermission error \n");
        next(err)
    }
};