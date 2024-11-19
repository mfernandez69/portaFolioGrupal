const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function recuperarDatos() {
    try {
      const colaboradores = await prisma.colaborador.findMany();
      const proyectoIndividuales = await prisma.proyectoIndividual.findMany();
      const proyectoGrupales = await prisma.proyectoGrupal.findMany();
      console.log(colaboradores);
      console.log("----------------------------------------------");
      console.log(proyectoIndividuales);
      console.log("----------------------------------------------");
      console.log(proyectoGrupales);
    } catch (error) {
      console.error('Error al recuperar datos:', error);
    } finally {
      await prisma.$disconnect();
    }
  }
  
  recuperarDatos();