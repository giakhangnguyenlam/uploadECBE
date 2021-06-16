var express = require('express');
var router = express.Router();

const {createPackage, updatePackage, deletePackage, findPackageById, listPackages} = require("../services/PackageService")

router.post("/", createPackage);
router.put("/:id", updatePackage);
router.get("/", listPackages);
router.get("/:id", findPackageById);
router.delete("/:id", deletePackage);

module.exports = router;