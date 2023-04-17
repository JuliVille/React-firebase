import React, {useState, useEffect} from "react"
import {db} from '../firebase'
import { collection,doc, addDoc, onSnapshot, deleteDoc, updateDoc } from "firebase/firestore";

const Formulario = () =>{

    const [libro, setLibro] = useState('');
    const [autor, setAutor] = useState('');
    const [genero, setGenero] = useState('');
    const [año, setAño] = useState('');
    const [pais, setPais] = useState('');
    const [valoracion, setValoracion] = useState('');
    const [descripcion, setDescripcion] = useState('');
    let   [imagen, setImagen] = useState('');
    const [listaLibros, setListaLibros] = useState([]);

    

    useEffect(()=>{
        const obtenerDatos = async()=>{
            try{
               await onSnapshot(collection(db,'libros'), (query) =>{
                    setListaLibros(query.docs.map((doc) => ({...doc.data(), id:doc.id})))
               }) 
            }catch(error){
               console.log(error)
            }
        }
            obtenerDatos();
    }, [])

    const guardarLibro = async (e)=>{
        e.preventDefault();
        try{
            const data = await addDoc(collection(db,'libros'),{
               libroC: libro,
               autorC:autor, 
               generoC: genero,
               añoC:año,
               paisC: pais,
               valoracionC:valoracion, 
               descripcionC:descripcion ,
               imagenC: imagen=`https://picsum.photos/id/${getRandomInt(100)}/200/300`
            })
            setListaLibros(
                [...listaLibros, {
                    libroC: libro,
                    autorC:autor, 
                    generoC: genero,
                    añoC:año,
                    paisC: pais,
                    valoracionC:valoracion, 
                    descripcionC:descripcion,
                    imagenC:  imagen=`https://picsum.photos/id/${getRandomInt(100)}/200/300`,
                    id: data.id
                }]
            )
            setLibro('')
            setAutor('')
            setGenero('')
            setAño('')
            setPais('')
            setValoracion('')
            setDescripcion('')
        }catch(error){
            console.log(error)
        }
    }

    const eliminar = async id=>{
        try {
            await deleteDoc(doc(db, 'libros', id))
        } catch (error) {
            console.log(error)
        }
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    return (
        <div className="container mt-5" > 
            <h1 className="text-cent">CRUD WEB 2</h1>
            <hr/>
            <div className="row" >
                <div className="col-9" >
                    <table className="table  table-hover table-sm table-bordered table-dark">
                        <thead>
                            <tr>
                            <th scope="col">LIBRO</th>
                            <th scope="col">AUTOR</th>
                            <th scope="col">GENERO</th>
                            <th scope="col">AÑO</th>
                            <th scope="col">PAIS</th>
                            <th scope="col">VALORACION</th>
                            <th scope="col size">DESCRIPCION</th>
                            <th scope="col">IMAGEN</th>
                            <th colSpan="2">Accion</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            listaLibros.map(item => (
                                <tr>
                                <td>{item.libroC}</td>
                                <td>{item.autorC}</td>
                                <td>{item.generoC}</td>
                                <td>{item.añoC}</td>
                                <td>{item.paisC}</td>
                                <td>{item.valoracionC}</td>
                                <td>{item.descripcionC}</td>
                                <td><img src={item.imagenC} alt="" /></td>
                                <td><button className="btn btn-danger btn-md fload-end" onClick={()=>eliminar(item.id)}>Eliminar</button></td>
                                <td><button className="btn btn-success btn-md fload-end">Editar</button></td>
                                </tr>
                            ))
                        }  
                        </tbody>
                    </table>
                </div>
                <div className="registroF col-3">
                    <form onSubmit={guardarLibro} className="row g-2">
                    <h4 className="text-center">Agregar Libro</h4>
                        <div className="input-group"><input  type="text" className="form-control" placeholder="Ingrese libro" value={libro} onChange={(e)=>setLibro(e.target.value)} required/></div>
                        <div className="input-group"><input  type="text" className="form-control" placeholder="Ingrese autor" value={autor} onChange={(e)=>setAutor(e.target.value)} required/></div>                      
                        <div className="input-group "><input type="text" className="form-control" placeholder="Ingrese genero" value={genero} onChange={(e)=>setGenero(e.target.value)} required/></div>
                        <div className="input-group "><input type="number" className="form-control" placeholder="Ingrese año" value={año} onChange={(e)=>setAño(e.target.value)} required/></div>
                        <div className="input-group"><input  type="text" className="form-control" placeholder="Ingrese pais origen" value={pais} onChange={(e)=>setPais(e.target.value)} required/></div>
                        <div className="input-group"><input  type="text" className="form-control" placeholder="Ingrese valoracion" value={valoracion} onChange={(e)=>setValoracion(e.target.value)} required/></div> 
                        <div className="input-group"><textarea type="text" className="form-control" placeholder="Ingrese descripcion" value={descripcion} onChange={(e)=>setDescripcion(e.target.value)} required></textarea></div>
                        <button className="btn btn-dark btn-block" on="submit">Agregar</button>
                    </form>
                </div>
            </div>
            
        </div>
        
    )
}

export default Formulario
