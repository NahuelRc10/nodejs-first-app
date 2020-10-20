const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile('data/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar en la base');
    });
}

const cargarDB = () => {
    try {
        listadoPorHacer = require('../data/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }
}

const crear = (descripcion) => {
    let porHacer = {
        descripcion: descripcion,
        completado: false,
    };
    cargarDB();
    listadoPorHacer.push(porHacer);
    guardarDB();
    return porHacer;
}

const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    });
    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {
    cargarDB();
    let nuevoListadoPorHacer = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);
    if (nuevoListadoPorHacer.length === listadoPorHacer.length) {
        return false;
    }
    listadoPorHacer = nuevoListadoPorHacer;
    guardarDB();
    return true;
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}