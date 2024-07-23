import { registrarUsuario } from '@/Firebase/promesas';
import { Usuario } from '@/interfaces/iUsuarios';
import Link from 'next/link';
import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { FaUserCheck } from 'react-icons/fa';
import { SlSocialFacebook, SlSocialInstagram, SlSocialTwitter } from 'react-icons/sl';

const initialState: Usuario = {
  nombre: "",
  apellido: "",
  usuario: "",
  equipofav: "",
}

export const Registrar = () => {
  const [usuario, setUsuario] = useState<Usuario>(initialState);
  const [error, setError] = useState<{ [key: string]: string }>({});
  const [show, setShow] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para deshabilitar el botón

  const handleUsuario = (name: string, value: string) => {
    setUsuario({ ...usuario, [name]: value });
  }

  const validar = () => {
    let valid = true;
    let errors: { [key: string]: string } = {};

    if (!usuario.nombre) {
      errors.nombre = "El nombre es obligatorio";
      valid = false;
    }

    if (!usuario.apellido) {
      errors.apellido = "El apellido es obligatorio";
      valid = false;
    }

    if (!usuario.usuario) {
      errors.usuario = "El nombre de usuario es obligatorio";
      valid = false;
    }

    if (!usuario.equipofav) {
      errors.equipofav = "Elige un equipo como favorito.";
      valid = false;
    }

    setError(errors);
    return valid;
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const registrar = () => {
    if (validar()) {
      setIsSubmitting(true); // Deshabilitar el botón
      registrarUsuario(usuario).then(() => {
        handleShow()
      }).catch((e) => {
        console.log(e);
        alert('Ocurrió un error al registrar');
        setIsSubmitting(false); // Volver a habilitar el botón si ocurre un error
      });
    }
  }

  const salir = () => {
    window.location.href = "./Login"
  }
  const aregistrar = () => {
    window.location.href = "./Registrar"
  }

  return (
    <>
      <div id='body-main-form'>
        <header id='headerlogin'>
          <h1 id='titulo-header'><Link href={"./Login"} className='titulo-home'>PAGINAFUT</Link></h1>
          <SlSocialInstagram className="img-social" id="ig-img" size={"2em"} />
          <SlSocialFacebook className="img-social" id="fb-img" size={"2em"} />
          <SlSocialTwitter className="img-social" id="tw-img" size={"2em"} />
        </header>
        <div id='div-big-form'>
          <Form id='form-main'>
            <Form.Group className='inputs-form'>
              <h1 id='titulo-form'>REGISTRAR</h1>
              <p id='desc-form'>Utiliza este formulario para añadir usuarios manualmente</p>
              <Form.Label className='label-form'>Nombre: </Form.Label>
              <Form.Control
                type='text'
                placeholder='Ingrese su nombre'
                name='nombre'
                value={usuario.nombre}
                onChange={(e) => { handleUsuario(e.currentTarget.name, e.currentTarget.value) }}
                isInvalid={!!error.nombre}
              />
              <Form.Control.Feedback type="invalid">
                {error.nombre}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='inputs-form'>
              <Form.Label className='label-form'>Apellido: </Form.Label>
              <Form.Control
                type='text'
                placeholder='Ingrese su apellido'
                name='apellido'
                value={usuario.apellido}
                onChange={(e) => { handleUsuario(e.currentTarget.name, e.currentTarget.value) }}
                isInvalid={!!error.apellido}
              />
              <Form.Control.Feedback type="invalid">
                {error.apellido}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='inputs-form'>
              <Form.Label className='label-form'>Nombre de Usuario: </Form.Label>
              <Form.Control
                type='text'
                placeholder='Ingrese nombre de usuario'
                name='usuario'
                value={usuario.usuario}
                onChange={(e) => { handleUsuario(e.currentTarget.name, e.currentTarget.value) }}
                isInvalid={!!error.usuario}
              />
              <Form.Control.Feedback type="invalid">
                {error.usuario}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='inputs-form'>
              <Form.Label className='label-form'>Equipo Favorito: </Form.Label>
              <Form.Select
                className='inputs-form'
                id='select-form'
                aria-label="Default select example"
                name='equipofav'
                value={usuario.equipofav}
                onChange={(e) => { handleUsuario(e.currentTarget.name, e.currentTarget.value) }}
                isInvalid={!!error.equipofav}
              >
                <option value="">Elige un equipo</option>
                <option value="Real Madrid">Real Madrid</option>
                <option value="Barcelona">Barcelona</option>
                <option value="AC Milan">AC Milan</option>
                <option value="Juventus">Juventus</option>
                <option value="Chelsea">Chelsea</option>
                <option value="Man United">Man United</option>
                <option value="Man City">Man City</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {error.equipofav}
              </Form.Control.Feedback>
            </Form.Group>
            <Button id='btn-registrar' type='button' variant='success' onClick={registrar} disabled={isSubmitting}>Registrar</Button>
            <Button id='btn-registrar' variant="danger" onClick={salir} style={{ display: "inline", marginLeft: "10px" }}>Atras</Button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>SE REGISTRO CON EXITO!</Modal.Title>
              </Modal.Header>
              <Modal.Body> <FaUserCheck size={"5em"} display={"block"} style={{margin:"auto"}} />Todos los datos se registraron con exito en la base de datos.</Modal.Body>
              <Modal.Footer>
                <Button variant="success" onClick={aregistrar}>
                  Volver a registrar
                </Button>
                <Button variant="primary" onClick={salir}>
                  Continuar
                </Button>
              </Modal.Footer>
            </Modal>
          </Form>
        </div>
      </div>
    </>
  )
}

export default Registrar;

