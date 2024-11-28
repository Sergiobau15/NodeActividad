const fs = require('fs');

const guardarDB = (data) => {
    const archivo = './db/data.txt';

    let contenido = 'Lista de Tareas\n\n'; // Encabezado del archivo
    data.forEach((tarea, i) => {
        contenido += `Tarea ${i + 1}: ${tarea.desc} - Estado: ${tarea.completadoEn ? 'Completada' : 'Pendiente'}\n`;
    });

    // Guardamos el archivo con la información legible
    fs.writeFileSync(archivo, contenido);
}

module.exports = {
    guardarDB
};
