import React, { useState, useEffect } from "react";

const Formulario = () =>{

    const [nombreLibro, setNombreLibro] = useState('')
    const [nombreAutor, setNombreAutor] = useState('')

    return (
        <div className="container mt-5">
            <h1 className="text-center">CRUD DESARROLLO WEB II</h1>
            <hr />
            <div className="row">
                <div className="col-8">
                    <h4 className="text-center">Listado de Libros</h4>
                    <ul className="list-group">
                        <li className="list-group-item">
                            Item temporal
                        </li>
                    </ul>
                </div>
                <div className="col-4">
                    <h4 className="text-center">Agregar Libro</h4>
                    <form>
                        <input type="text"className="form-control mb-2" placeholder="Ingrese nombre del libro" />
                        <input type="text"className="form-control mb-2" placeholder="Ingrese nombre del autor" />
                        <div>
                            <button className="btn btn-primary btn-block">Agregar</button>
                            <button className="btn btn-dark btn-block">Cancelar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Formulario