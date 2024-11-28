var colors = require('colors');
const inquirer = require('inquirer');
const { validate } = require('uuid');

const questions = {
    type: 'list',
    name: 'options',
    message: 'Escoge la opción de tu preferencia.',
    choices: [
        {
            value: '1',
            name: '1. Crear tarea'.green
        },
        {
            value: '2',
            name: '2. Editar tarea'.yellow
        },
        {
            value: '3',
            name: '3. Eliminar tarea'.red
        },
        {
            value: '4',
            name: '4. Listar todas las tareas'.blue
        },
        {
            value: '5',
            name: '5. Listar tareas completadas'.cyan
        },
        {
            value: '6',
            name: '6. Listar tareas pendientes'.magenta
        },
        {
            value: '7',
            name: '7. Completar tarea'.green
        },
        {
            value: '0',
            name: '0. Salir'.bold
        }
    ]
}

const menu = async () => {
    console.clear();  // Limpia la consola 
    console.log(`${'°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°'.blue}`);
    console.log(`${'°                                   °'.blue}`);
    console.log(`${'°         Bienvenido al menú        °'.yellow}`);
    console.log(`${'°                                   °'.blue}`);
    console.log(`${'°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°'.blue}`);

    const { options } = await inquirer.default.prompt(questions);
    return options; // Retorna la opción que el usuario selecciona
}

const leerInput = async (message) => {

    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.default.prompt(question);
    return desc;
}

const pausa = async () => {
    const question = {
        type: 'input',
        name: 'enter',
        message: `Presione la tecla ${'enter'.green} para continuar...`
    };
    await inquirer.default.prompt(question); // Para que no se mande antes 
}

module.exports = {
    menu,
    pausa,
    leerInput
};
