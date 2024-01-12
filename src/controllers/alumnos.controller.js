const Alumnos = require('../models/alumnos.model');

// GET 
const getAlumnos = async (req, res) => {
    const { page, limit: pageSize } = req.query;
    const limit = parseInt(pageSize) || 10;
    const offset = (parseInt(page) - 1) * limit || 0;

    try {
        const { count, rows: alumnos } = await Alumnos.findAndCountAll({ 
            limit, 
            offset,
            order: [['createdAt', 'DESC']] 
        });
        const totalPages = Math.ceil(count / limit);
        const currentPage = parseInt(page) || 1;

        res.status(200).json({ 
            message: 'Alumnos obtenidos exitosamente',
            data: alumnos,
            total: count,
            totalPages,
            currentPage,
        });
    } catch (error) {
        console.error('Error al obtener los alumnos:', error);
        res.status(500).json({ error: 'Error al obtener los alumnos' });
    }
};

// GET - ID
const getAlumnoById = async (req, res) => {
    const { id } = req.params;
    try {
        const alumno = await Alumnos.findByPk(id);
        if (alumno) {
            res.json({
                id: alumno.id,
                nombre: alumno.nombre,
                apellidoPaterno: alumno.apellidoPaterno,
                apellidoMaterno: alumno.apellidoMaterno,
                matricula: alumno.matricula,
                deleted: alumno.deleted,
                createdAt: alumno.createdAt,
                updatedAt: alumno.updatedAt,
                deletedAt: alumno.deletedAt
            });
        } else {
            res.status(404).json({ message: 'alumno no encontrado' });
        }
    } catch (error) {
        console.error('error al obtener el alumno:', error);
        res.status(500).json({ error: 'error al obtener el alumno' });
    }
};

// POST 
const createAlumno = async (req, res) => {
    const { nombre, apellidoPaterno, apellidoMaterno, matricula } = req.body;
    try {
        const alumno = await Alumnos.create({
            nombre,
            apellidoPaterno,
            apellidoMaterno,
            matricula,
        });
        res.status(201).json({ message: 'alumno creado exitosamente' });
    } catch (error) {
        console.error('error al crear el alumno:', error);
        res.status(500).json({ error: 'error al crear el alumno' });
    }
};

// PATCH 
const updateAlumno = async (req, res) => {
    const { id } = req.params;
    const { nombre, apellidoPaterno, apellidoMaterno, matricula } = req.body;
    try {
        const alumno = await Alumnos.findByPk(id);
        if (alumno) {
            await alumno.update({
                nombre,
                apellidoPaterno,
                apellidoMaterno,
                matricula,
            });

            res.status(200).json({ message: 'alumno actualizado exitosamente' });
        } else {
            res.status(404).json({ error: 'alumno no encontrado' });
        }
    } catch (error) {
        console.error('error al actualizar el alumno:', error);
        res.status(500).json({ error: 'error al actualizar el alumno' });
    }
};


// DELETE 
const deleteAlumno = async (req, res) => {
    const { id } = req.params;
    try {
        const alumno = await Alumnos.findByPk(id);
        if (alumno) {
            await alumno.destroy();
            res.json({ message: 'alumno eliminado exitosamente' });
        } else {
            res.status(404).json({ error: 'alumno no encontrado' });
        }
    } catch (error) {
        console.error('error al eliminar el alumno:', error);
        res.status(500).json({ error: 'error al eliminar el alumno' });
    }
};

module.exports = {
    getAlumnos,
    getAlumnoById,
    createAlumno,
    updateAlumno,
    deleteAlumno,
}
