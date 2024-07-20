import { registrarUsuario } from '@/Firebase/promesas';
import { Usuario } from '@/interfaces/iUsuarios';
import { set } from 'firebase/database';
import React, { useState } from 'react'
import { Form } from "react-bootstrap";
import { Button } from 'react-bootstrap';

const initialState:Usuario = {
    nombre:"",
    apellido:"",
    usuario:"",
    equipofav:""

}
export const Registrar = () => {
    const [usuario, setUsuario] = useState<Usuario>(initialState)

    const handleUsuario = (name:string,value:string)=>{
        setUsuario({...usuario,[name]:value})
    }

    const registrar = ()=>{
        registrarUsuario(usuario).then(()=>{
             alert('se logro registrar')
             }).catch((e)=>{
                 console.log(e);
                alert('algo ocurrioasdasd')
                })
                }
  return (
    <>
    <Form id='form-main'>
        <Form.Group className='inputs-form'>
            <h1 id='titulo-form'>REGISTRAR</h1>
            <p id='desc-form'>Utiliza este formulario para anadir usuarios manualmente</p>
            <Form.Label className='label-form'>Nombre: </Form.Label>
            <Form.Control type='text'placeholder='Ingrese su nombre:' name='nombre'
            onChange={(e)=>{handleUsuario(e.currentTarget.name, e.currentTarget.value)}}/>
            <Form.Text></Form.Text>
        </Form.Group>
        <Form.Group className='inputs-form'>
            <Form.Label className='label-form'>Apellido: </Form.Label>
            <Form.Control type='text'placeholder='Ingrese su apellido:' name='apellido'
            onChange={(e)=>{handleUsuario(e.currentTarget.name, e.currentTarget.value)}}/>
            <Form.Text></Form.Text>
        </Form.Group>
        <Form.Group className='inputs-form'>
            <Form.Label className='label-form'>Nombre de Usuario: </Form.Label>
            <Form.Control type='text'placeholder='Ingrese nombre de usuario:' name='usuario'
            onChange={(e)=>{handleUsuario(e.currentTarget.name, e.currentTarget.value)}}/>
            <Form.Text></Form.Text>
        </Form.Group>
        <Form.Label className='label-form'>Equipo Favorito: </Form.Label>
        <Form.Select className='inputs-form' id='select-form' aria-label="Default select example">
            <option>Elige un equipo</option>
            <option value="1">U. de Chile</option>
            <option value="2">U. Carolica</option>
            <option value="3">Colo - Colo</option>
        </Form.Select>
        <Button id='btn-registrar' type='button' variant='success' onClick={registrar}>Registrar</Button>
    </Form>
    </>
  )
}
export default Registrar
