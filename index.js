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

        // Configura el transporter de nodemailer para poder mandar el correo desde un gmail
        let transporter = nodemailer.createTransport({
            service: 'gmail',  // Usa Gmail como servicio
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS //Usa una contraseña de varificacion 2 pasos de la aplicación de Gmail
            }
        });

        
        // Configura el correo
        let info = await transporter.sendMail({
            from: '"Contacto porfolio grupal" <Nombre>',
            to: process.env.GMAIL_USER,
            subject: "Nuevo mensaje de contacto",
            text: `Nombre: ${name}\nEmail: ${email}\nTeléfono: ${phone}\n\nMensaje:\n${message}`,
            html: `<p><strong>Nombre:</strong> ${name}</p>
                   <p><strong>Email:</strong> ${email}</p>
                   <p><strong>Teléfono:</strong> ${phone}</p>
                   <p><strong>Mensaje:</strong></p>
                   <p>${message}</p>`
        });

        console.log("Mensaje enviado: %s", info.messageId);
        // Redirige a la página principal
        res.redirect('/');
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        // Redirige a la página principal con un mensaje de error
        res.redirect('/');
    }
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));