import { eliminarUsuario, obtenerUsuarios } from '@/Firebase/promesas';
import { Usuario } from '@/interfaces/iUsuarios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import { GrUpdate } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { SlSocialFacebook, SlSocialInstagram, SlSocialTwitter } from 'react-icons/sl';

export const Tabla = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [selectedUserKey, setSelectedUserKey] = useState<string | null>(null);

  useEffect(() => {
    obtenerUsuarios().then((usuarios) => {
      setUsuarios(usuarios);
    }).catch((e) => {
      console.log(e);
      alert('Ocurrió un error al obtener los usuarios');
    });
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = (key: string) => {
    setSelectedUserKey(key);
    setShow(true);
  };

  const handleClose2 = () => setShow2(false);
  const handleShow2 = (key: string) => {
    setSelectedUserKey(key);
    setShow2(true);
  };

  const eliminar = () => {
    if (selectedUserKey) {
      eliminarUsuario(selectedUserKey).then(() => {
        obtenerUsuarios().then((usuarios) => {
          setUsuarios(usuarios);
        }).catch((e) => {
          console.log(e);
          alert('Ocurrió un error al actualizar la lista de usuarios');
        });
        handleClose2();
      }).catch((e) => {
        console.log(e);
        alert('Ocurrió un error al eliminar el usuario');
      });
    }
  };

  const salir = () => {
    window.location.href = "./Login";
  };
  const aregistrar = () => {
    window.location.href = "./Registrar";
  };
  
  return (
    <>
      <div id='div-main'>
        <header id='headerlogin'>
          <h1 id='titulo-header'>
            <Link href={"./Login"} className='titulo-home'>PAGINAFUT</Link>
          </h1>
          <SlSocialInstagram className="img-social" id="ig-img" size={"2em"} />
          <SlSocialFacebook className="img-social" id="fb-img" size={"2em"} />
          <SlSocialTwitter className="img-social" id="tw-img" size={"2em"} />
        </header>
        <div id='main-tabla'>
          <h1>TABLA DE USUARIOS</h1>
          <p>Aquí se mostrarán todos los usuarios registrados en la página.</p>
          <Table striped bordered hover variant="light" id='tabla'>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Usuario</th>
                <th>Equipo Fav</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {
                usuarios.map((p) => (
                  <tr key={p.key}>
                    <td>{p.nombre}</td>
                    <td>{p.apellido}</td>
                    <td>{p.usuario}</td>
                    <td>{p.equipofav}</td>
                    <td>
                      <Button variant="primary" onClick={() => handleShow(p.key!)}>
                        <GrUpdate /> Actualizar
                      </Button>
                      <Button variant="danger" style={{ marginLeft: "30px" }} onClick={() => handleShow2(p.key!)}>
                        <MdDelete /> Eliminar
                      </Button>

                      <Modal show={show2} onHide={handleClose2}>
                        <Modal.Header closeButton>
                          <Modal.Title>Deseas eliminar este usuario?</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Estás a punto de eliminar un usuario de la base de datos. ¡Esto no tiene vuelta atrás!</Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={handleClose2}>
                            Cancelar
                          </Button>
                          <Button variant="danger" onClick={eliminar}>
                            Eliminar
                          </Button>
                        </Modal.Footer>
                      </Modal>

                      <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                          <Modal.Title>¿Deseas actualizar?</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>¿Estás seguro que deseas actualizar a este usuario?</Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={handleClose}>
                            Cancelar
                          </Button>
                          <Link href={{ pathname: "Actualizar", query: { key: selectedUserKey } }}>
                            <Button variant="primary">
                              Continuar
                            </Button>
                          </Link>
                        </Modal.Footer>
                      </Modal>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </Table>

          <Button className='boton-tabla' variant="success" onClick={aregistrar}>Añadir Usuario</Button>
          <Button className='boton-tabla' variant="danger" onClick={salir}>Atras</Button>
        </div>
      </div>
    </>
  );
}

export default Tabla;
