const express = require('express');

const { checkUserId } = require('../middlewares/center');

const Controller = require('../controllers/center');
const router = express.Router();

router.get('/', checkUserId, Controller.companylist); // 관리자 메인 페이지
router.get('/workers', Controller.workerinfo); // 센터에 배정된 워커 정보
router.get('/jobs', Controller.GetJobs);
router.post('/', Controller.assignment);

module.exports = router; 