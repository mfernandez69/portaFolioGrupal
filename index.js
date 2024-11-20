const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');

// Creamos servidor de apps
const app = express();

// Configuración de handlebars
app.engine("handlebars", exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials')
}));

app.set("view engine", "handlebars");
app.set('views', path.join(__dirname, 'views'));

// Configuración de archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para parsear el cuerpo de las solicitudes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Importar rutas
const mysiteRoutes = require("./routes/mysite");

// Usar las rutas
app.use("/", mysiteRoutes);

// Ruta para manejar el envío del formulario
app.post('/enviar-correo', async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        // Configura el transporter de nodemailer
        let transporter = nodemailer.createTransport({
            service: 'gmail',  // Usa Gmail como servicio
            auth: {
                user: 'fernandemarcos11@gmail.com',
                pass: 'uake nhus vzkp iduc'  // Usa una contraseña de aplicación de Gmail
            }
        });

        // Configura el correo
        let info = await transporter.sendMail({
            from: '"Tu Nombre" <Marcos>',
            to: "megatarzan280@gmail.com",
            subject: "Nuevo mensaje de contacto",
            text: `Nombre: ${name}\nEmail: ${email}\nTeléfono: ${phone}\n\nMensaje:\n${message}`,
            html: `<p><strong>Nombre:</strong> ${name}</p>
                   <p><strong>Email:</strong> ${email}</p>
                   <p><strong>Teléfono:</strong> ${phone}</p>
                   <p><strong>Mensaje:</strong></p>
                   <p>${message}</p>`
        });

        console.log("Mensaje enviado: %s", info.messageId);
        res.status(200).send('Mensaje enviado correctamente');
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        res.status(500).send('Error al enviar el mensaje');
    }
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));