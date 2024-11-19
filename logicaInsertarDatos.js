const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function insertarVariosDocumentos() {
  try {
    // Crear colaboradores a la vez con Promise.all()
    const colaboradores = await Promise.all([
      prisma.colaborador.create({
        data: {
          idPersonal: 1,
          nombre: 'Marcos Fernández Núñez',
          contacto: {
            email: 'fernandemarcos11@gmail.com',
            usuarioGithub: 'mfernandez69',
            numeroTelefono: '+34 603 40 63 03'
          },
          lenguajesProgramacion: ['JavaScript', 'Python','Java','Kotlin','SQL','BASH','PHP']
        }
      }),
      prisma.colaborador.create({
        data: {
          idPersonal: 2,
          nombre: 'Francisco José Solana',
          contacto: {
            email: 'bios0179@gmail.com',
            usuarioGithub: 'Fsolanaa',
            numeroTelefono: '+34 628 25 89 10'
          },
          lenguajesProgramacion: ['Java', 'JavaScript','Kotlin','SQL']
        }
      }),
      prisma.colaborador.create({
        data: {
          idPersonal: 3,
          nombre: 'Rafael Montes Jiménez',
          contacto: {
            email: 'rafaelmontesjimenez@gmail.com',
            usuarioGithub: 'RMontesJ',
            numeroTelefono: '+34 722 19 89 97'
          },
          lenguajesProgramacion: ['PHP', 'Java','JavaScript','Kotlin','SQL']
        }
      }),
      prisma.colaborador.create({
        data: {
          idPersonal: 4,
          nombre: 'Juan Esteban López',
          contacto: {
            email: 'jestebanl88m@gmail.com',
            usuarioGithub: 'Jestebanl',
            numeroTelefono: '+34 670 10 68 22'
          },
          lenguajesProgramacion: ['PHP', 'Java','JavaScript','Kotlin','SQL']
        }
      })
    ]);

    console.log(`${colaboradores.length} colaboradores creados`);

    // Crear proyectos individuales
    const proyectosIndividuales = await Promise.all([
      prisma.proyectoIndividual.create({
        data: {
          idPersonal: 1,
          nombre: 'Geo-API',
          descripcion: 'Geolocalizador API mediante dirección IP',
          lenguajesUtilizados: ['JavaScript'],
          enlacesGithub: ['https://github.com/mfernandez69/Geo-API'],
          colaboradores: {
            connect: [{ id: colaboradores[0].id }]
          }
        },
        include: {
          colaboradores: true
        }
      }),
      prisma.proyectoIndividual.create({
        data: {
          idPersonal: 2,
          nombre: 'Tienda online',
          descripcion: 'Tienda online basica basada en php',
          lenguajesUtilizados: ['PHP','JavaScript'],
          enlacesGithub: ['https://github.com/RMontesJ/tienda-online'],
          colaboradores: {
            connect: [{ id: colaboradores[1].id }]
          }
        },
        include: {
          colaboradores: true
        }
      })
    ]);

    console.log(`${proyectosIndividuales.length} proyectos individuales creados`);

    // Crear proyectos grupales
    const proyectosGrupales = await Promise.all([
      prisma.proyectoGrupal.create({
        data: {
          idPersonal: 1,
          nombre: 'Unimatch',
          descripcion: 'Red social para universitarios',
          lenguajesUtilizados: ['PHP', 'JavaScript'],
          enlacesGithub: ['https://github.com/IcarusTech/unimatch'],
          colaboradores: {
            connect: [
              { id: colaboradores[0].id },
              { id: colaboradores[1].id },
              { id: colaboradores[2].id },
              { id: colaboradores[3].id }
            ]
          }
        },
        include: {
          colaboradores: true
        }
      }),
      prisma.proyectoGrupal.create({
        data: {
          idPersonal: 2,
          nombre: 'Vaguada 2.0',
          descripcion: 'Replica de la pagina de Centros Unico',
          lenguajesUtilizados: ['PHP', 'JavaScript'],
          enlacesGithub: ['https://github.com/Fsolanaa/Vaguada2.0'],
          colaboradores: {
            connect: [
              { id: colaboradores[0].id },
              { id: colaboradores[1].id },
              { id: colaboradores[2].id },
              { id: colaboradores[3].id }
            ]
          }
        },
        include: {
          colaboradores: true
        }
      }),
      prisma.proyectoGrupal.create({
        data: {
          idPersonal: 3,
          nombre: 'PokeAPI',
          descripcion: 'Página web conectada con la API pokemon con sistema de busqueda',
          lenguajesUtilizados: ['JavaScript','CSS'],
          enlacesGithub: ['https://github.com/Fsolanaa/DataNexus'],
          colaboradores: {
            connect: [
              { id: colaboradores[0].id },
              { id: colaboradores[1].id },
              { id: colaboradores[2].id },
              { id: colaboradores[3].id }
            ]
          }
        },
        include: {
          colaboradores: true
        }
      }),
      prisma.proyectoGrupal.create({
        data: {
          idPersonal: 4,
          nombre: 'DOOM',
          descripcion: 'Videojuego DOOM desarrollado en Unity',
          lenguajesUtilizados: ['C#'],
          enlacesGithub: ['https://github.com/Jestebanl/Doom3D'],
          colaboradores: {
            connect: [
              { id: colaboradores[0].id },
              { id: colaboradores[1].id },
              { id: colaboradores[2].id },
              { id: colaboradores[3].id }
            ]
          }
        },
        include: {
          colaboradores: true
        }
      })
    ]);

    console.log(`${proyectosGrupales.length} proyectos grupales creados`);

  } catch (error) {
    console.error('Error al insertar datos:', error);
  } finally {
    await prisma.$disconnect();
  }
}

insertarVariosDocumentos();