const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

//utilizamos router para especificar que al cargar la pagina principal se rendericen
//los proyectos en las seccion de proyectos
router.get('/', async (req, res) => {
    try {
        const proyectoGrupales = await prisma.proyectoGrupal.findMany({
            include: {
                colaboradores: true
            }
        });
        const proyectosIndividuales = await prisma.proyectoIndividual.findMany({
            include: {
                colaboradores: true
            }
        });
        res.render('mysite', { proyectoGrupales });
    } catch (error) {
        console.error('Error al recuperar datos:', error);
        res.status(500).send("Error al cargar la página");
    }
});

module.exports = router;