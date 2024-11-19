const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

router.get('/', async (req, res) => {
    try {
        const proyectoGrupales = await prisma.proyectoGrupal.findMany({
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