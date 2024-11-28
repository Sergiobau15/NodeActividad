const { guardarDB } = require('./helpers/guardarArchivo');
const { menu, pausa, leerInput } = require('./helpers/menu');
const Tareas = require('./models/tareas');

const principal = async () => {

    let opt = '';
    const tareas = new Tareas();

    do {
        opt = await menu();

        switch (opt) {
            case '1':
                // Crear tarea
                const desc = await leerInput('Descripcion: ');
                tareas.crearTarea(desc);
                console.log(`Tarea creada: ${desc}`);
                break;

            case '2':
                // Editar tarea
                const listadoTareas = tareas.listadoArr;
                if (listadoTareas.length === 0) {
                    console.log('No hay tareas para editar.');
                    break;
                }

                console.log('Seleccione la tarea a editar:');
                listadoTareas.forEach((tarea, i) => {
                    console.log(`${i + 1}. ${tarea.desc}`);
                });

                const tareaId = await leerInput('Ingrese el número de la tarea a editar: ');

                const tareaEditar = listadoTareas[tareaId - 1];
                if (tareaEditar) {
                    const nuevaDescripcion = await leerInput('Nueva descripción: ');
                    tareaEditar.desc = nuevaDescripcion;
                    console.log(`Tarea editada: ${tareaEditar.desc}`);
                } else {
                    console.log('Tarea no válida.');
                }
                break;

            case '3':
                // Eliminar tarea
                const tareasParaEliminar = tareas.listadoArr;
                if (tareasParaEliminar.length === 0) {
                    console.log('No hay tareas para eliminar.');
                    break;
                }

                console.log('Seleccione la tarea a eliminar:');
                tareasParaEliminar.forEach((tarea, i) => {
                    console.log(`${i + 1}. ${tarea.desc}`);
                });

                const tareaIdEliminar = await leerInput('Ingrese el número de la tarea a eliminar: ');

                const tareaEliminar = tareasParaEliminar[tareaIdEliminar - 1];
                if (tareaEliminar) {
                    // Se hace eliminación de la tarea
                    delete tareas._listado[tareaEliminar.id];
                    console.log(`Tarea eliminada: ${tareaEliminar.desc}`);
                } else {
                    console.log('Tarea no válida.');
                }
                break;

            case '4':
                // Listar todas las tareas
                const tareasListadas = tareas.listadoArr;
                if (tareasListadas.length === 0) {
                    console.log('No hay tareas disponibles.');
                } else {
                    tareasListadas.forEach((tarea, i) => {
                        console.log(`${i + 1}. ${tarea.desc} - Estado: ${tarea.completadoEn ? 'Completada' : 'Pendiente'}`);
                    });
                }
                break;

            case '5':
                // Listar tareas completadas
                const tareasCompletadas = tareas.listadoArr.filter(tarea => tarea.completadoEn !== null);
                if (tareasCompletadas.length === 0) {
                    console.log('No hay tareas completadas.');
                } else {
                    console.log('Tareas completadas:');
                    tareasCompletadas.forEach((tarea, i) => {
                        console.log(`${i + 1}. ${tarea.desc}`);
                    });
                }
                break;

            case '6':
                // Listar tareas pendientes
                const tareasPendientes = tareas.listadoArr.filter(tarea => tarea.completadoEn === null);
                if (tareasPendientes.length === 0) {
                    console.log('No hay tareas pendientes.');
                } else {
                    console.log('Tareas pendientes:');
                    tareasPendientes.forEach((tarea, i) => {
                        console.log(`${i + 1}. ${tarea.desc}`);
                    });
                }
                break;

            case '7':
                
                // Completar tarea
                const tareasParaCompletar = tareas.listadoArr.filter(tarea => tarea.completadoEn === null);
                if (tareasParaCompletar.length === 0) {
                    console.log('No hay tareas pendientes para completar.');
                    break;
                }

                console.log('Seleccione la tarea a completar:');
                tareasParaCompletar.forEach((tarea, i) => {
                    console.log(`${i + 1}. ${tarea.desc}`);
                });

                const tareaIdCompletar = await leerInput('Ingrese el número de la tarea a completar: ');

                const tareaCompletar = tareasParaCompletar[tareaIdCompletar - 1];
                if (tareaCompletar) {
                    tareaCompletar.completadoEn = new Date().toISOString();  // Marcar la tarea como completada con la fecha actual
                    console.log(`Tarea completada: ${tareaCompletar.desc}`);
                } else {
                    console.log('Tarea no válida.');
                }
                break;

            case '0':
                // Salir
                console.log('Saliendo...');
                break;

            default:
                console.log('Opción no válida');
                break;
        }

        await pausa();

        guardarDB(tareas.listadoArr);
    } while (opt !== '0');
}

principal();
