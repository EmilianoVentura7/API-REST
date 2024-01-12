const express = require('express');
const router = express.Router();
const alumnosController = require('../controllers/alumnos.controller');


router.post('/', alumnosController.createAlumno);
router.delete('/:id', alumnosController.deleteAlumno);
router.get('/', alumnosController.getAlumnos);
router.get('/:id', alumnosController.getAlumnoById);
router.patch('/:id', alumnosController.updateAlumno);

module.exports = router;