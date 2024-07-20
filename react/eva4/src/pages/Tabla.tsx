import { obtenerUsuarios } from '@/Firebase/promesas'
import { Usuario } from '@/interfaces/iUsuarios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { GrUpdate } from "react-icons/gr";
import { MdDelete } from "react-icons/md";



export const Tabla = () => {
  const [usuarios, setusuario] = useState<Usuario[]>([])
  useEffect(()=>{
      //traer listado de personas desde las promesas
      obtenerUsuarios().then((usuarios)=>{
          setusuario(usuarios)
      }).catch((e)=>{
          console.log(e),
          alert('algo ocurrioadasdsa')
      })

  }, [])

return (
  <>
  <div id='div-main'>
    <div id='main-tabla'>
        <Table striped bordered hover variant="dark" id='tabla'>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Usuario</th>
                    <th>Equipo Fav</th>
                    <th>Accion</th>
                </tr>
            </thead>
            <tbody>
                {
                    usuarios.map((p)=>{
                        return(
                            <tr>
                                <td>{p.nombre}</td>
                                <td>{p.apellido}</td>
                                <td>{p.usuario}</td>
                                <td>{p.equipofav}</td>
                                <td><Button className='boton-tabla' variant="primary"> <GrUpdate /> Editar</Button>
                                <Button className='boton-tabla' variant="danger"> <MdDelete /> Eliminar</Button></td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
        </div>
      </div>
  </>
)
}
export default Tabla
