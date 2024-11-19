const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

// Creamos servidor de apps
const app = express();

// Configuración de handlebars
app.engine("handlebars", exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts')
}));



app.engine("handlebars", exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials')
}));

app.set("view engine", "handlebars");
app.set('views', path.join(__dirname, 'views'));

// Configuración de archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Importar rutas
const mysiteRoutes = require("./routes/mysite");

// Usar las rutas
app.use("/", mysiteRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));