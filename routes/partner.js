var express = require('express');
var router = express.Router();

const {createPartner, deletePartner, getAllPartner, getPartner, updatePartner, updateSlotShipping}  = require("../services/PartnerService")

router.post("/", createPartner);
router.get("/", getAllPartner);
router.get("/:id", getPartner);
router.put("/:id", updatePartner);
router.put("/slot/:id", updateSlotShipping);
router.delete("/:id", deletePartner);

module.exports = router;