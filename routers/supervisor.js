const express = require('express');

const { checkCenter } = require('../middlewares/supervisor');

const Controller = require('../controllers/supervisor');
const router = express.Router();

router.get('/', Controller.companylist); // 관리자 메인 페이지
router.get('/workers', Controller.workerinfo); // 센터에 배정된 워커 정보
router.get('/project',checkCenter, Controller.GetProjects);
router.get('/job', Controller.GetJobs);
router.post('/assignment', checkCenter, Controller.assignment);

module.exports = router; 