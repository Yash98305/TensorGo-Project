const express = require('express');
const { createPlan, getPlans, updatePlan, deletePlan } = require('../controllers/planController');

const router = express.Router();

router.route("/").post(createPlan);
router.route("/").get(getPlans);
router.route("/:id").put( updatePlan);
router.route("/:id").delete( deletePlan);

module.exports = router;