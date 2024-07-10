require('dotenv').config(); // Cargar variables de entorno al inicio

const app = require('./app');
const config = require('./config/config'); // Asegúrate de que esta ruta es correcta

app.listen(config.app.port, () => {
    console.log(`Server running on port ${config.app.port}`);
});
