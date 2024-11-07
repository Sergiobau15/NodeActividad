const { menu, pausa, leerInput } = require('./helpers/menu');
const Tareas = require('./models/tareas');

const principal = async () => {

    let opt = '';
    const tareas = new Tareas();

    do {
        opt = await menu();

        switch (opt) {
            case '1':
                // crear opcion
                const desc = await leerInput('Descripcion: ');
                tareas.crearTarea(desc);
                
                break;

            case '2':
                console.log(tareas.listadoArr);

                break;
            default:
                break;
        }

        await pausa();
    } while (opt !== '0');

}

principal();