var colors = require('colors')  
const inquirer = require('inquirer');
const { validate } = require('uuid');

const questions= {

    type: 'list',
    name: 'options',
    message: 'Escoge la opción de tu preferencia. ',
    choices: [
        {
            value: '1',
            name: '1. Crear tarea'
        },
        {
            value: '2',
            name: '2. Editar tarea'
        },
        {
            value: '3',
            name: '3. Eliminar tarea'
        },
        {
            value: '4',
            name: '4. Listar tareas'
        },
        {
            value: '5',
            name: '5. Salir'
        }
    ]

}

const menu = async () =>{
    console.clear();  //Limpia la consola 
    console.log(`${'°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°'.blue}`);
    console.log(`${'°                                   °'.blue}`);
    console.log(`${'°         Bienvenido al menú        °'.yellow}`);
    console.log(`${'°                                   °'.blue}`);
    console.log(`${'°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°'.blue}`);

    const {options} = await inquirer.default.prompt(questions);
    return  options; //retorna la opción que el usuario selecciona

}

const pausa = async ()=>{
    const question = {
        typer: 'input',
        name: 'enter',
        message: `Presione la tecla ${'enter'.green}`
    }
    await inquirer.default.prompt(question); // para que no se mande antes 
}

const leerInput = async (message)=>{

    const question=[
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value){
                if (value.length === 0){
                    return 'por favor ingrese un valor'
                }
                return true;
            }
        }
    ];

    const {desc}=await inquirer.default.prompt(question);
    return desc;
}

module.exports = {
    menu,
    pausa,
    leerInput

}; 