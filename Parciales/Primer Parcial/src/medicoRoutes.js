const express = require("express");
const { getMedicos, createMedico, updateMedico, deleteMedico } = require("./medicoController");

const router = express.Router();

router.get("/medico", getMedicos);
router.post("/medico", createMedico);
router.put("/medico/:id", updateMedico);
router.delete("/medico/:id", deleteMedico);

module.exports = router;
