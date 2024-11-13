const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function insertarVariosDocumentos() {
  try {
    // Crear colaboradores a la vez con Promise.all()
    const colaboradores = await Promise.all([
      prisma.colaborador.create({
        data: {
          idPersonal: 1,
          nombre: 'Juan Pérez',
          contacto: {
            email: 'juan@example.com',
            usuarioGithub: 'juanperez',
            numeroTelefono: '123456789'
          },
          lenguajesProgramacion: ['JavaScript', 'Python']
        }
      }),
      prisma.colaborador.create({
        data: {
          idPersonal: 2,
          nombre: 'Ana Gómez',
          contacto: {
            email: 'ana@example.com',
            usuarioGithub: 'anagomez',
            numeroTelefono: '987654321'
          },
          lenguajesProgramacion: ['Java', 'C++']
        }
      }),
      prisma.colaborador.create({
        data: {
          idPersonal: 3,
          nombre: 'Francisco José Solana',
          contacto: {
            email: 'francisco@example.com',
            usuarioGithub: 'franciscosolana',
            numeroTelefono: '456789123'
          },
          lenguajesProgramacion: ['PHP', 'Ruby']
        }
      }),
      prisma.colaborador.create({
        data: {
          idPersonal: 4,
          nombre: 'María Rodríguez',
          contacto: {
            email: 'maria@example.com',
            usuarioGithub: 'mariarodriguez',
            numeroTelefono: '789123456'
          },
          lenguajesProgramacion: ['TypeScript', 'Go']
        }
      })
    ]);

    console.log(`${colaboradores.length} colaboradores creados`);

    // Crear proyectos individuales
    const proyectosIndividuales = await Promise.all([
      prisma.proyectoIndividual.create({
        data: {
          idPersonal: 1,
          nombre: 'App de Tareas',
          descripcion: 'Una aplicación para gestionar tareas diarias',
          lenguajesUtilizados: ['JavaScript', 'React'],
          enlacesGithub: ['https://github.com/juanperez/task-app'],
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
          nombre: 'Analizador de Datos',
          descripcion: 'Herramienta para análisis de datos científicos',
          lenguajesUtilizados: ['Python', 'Pandas'],
          enlacesGithub: ['https://github.com/anagomez/data-analyzer'],
          colaboradores: {
            connect: [{ id: colaboradores[1].id }]
          }
        },
        include: {
          colaboradores: true
        }
      }),
      prisma.proyectoIndividual.create({
        data: {
          idPersonal: 3,
          nombre: 'Geolocalizador',
          descripcion: 'Herramienta para análisis de datos científicos',
          lenguajesUtilizados: ['Python', 'Pandas'],
          enlacesGithub: ['https://github.com/anagomez/data-analyzer'],
          colaboradores: {
            connect: [{ id: colaboradores[2].id }]
          }
        },
        include: {
          colaboradores: true
        }
      }),
      prisma.proyectoIndividual.create({
        data: {
          idPersonal: 4,
          nombre: 'Otro proyecto cualquiero',
          descripcion: 'Herramienta para análisis de datos científicos',
          lenguajesUtilizados: ['Python', 'Pandas'],
          enlacesGithub: ['https://github.com/anagomez/data-analyzer'],
          colaboradores: {
            connect: [{ id: colaboradores[3].id }]
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
          nombre: 'Proyecto Grupal A',
          descripcion: 'Sistema de gestión de inventarios',
          lenguajesUtilizados: ['Python', 'Django'],
          enlacesGithub: ['https://github.com/equipoA/proyectoA'],
          colaboradores: {
            connect: [
              { id: colaboradores[0].id },
              { id: colaboradores[1].id }
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
          nombre: 'Proyecto Grupal B',
          descripcion: 'Plataforma de e-learning',
          lenguajesUtilizados: ['JavaScript', 'Node.js', 'React'],
          enlacesGithub: ['https://github.com/equipoB/proyectoB'],
          colaboradores: {
            connect: [
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