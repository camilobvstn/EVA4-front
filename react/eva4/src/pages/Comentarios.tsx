import { registrarComentario } from '@/Firebase/promesas';
import { Comentario } from '@/interfaces/iOpinion';
import Link from 'next/link';
import React, { useState } from 'react';
import { Form, Button, Modal, Image } from 'react-bootstrap';
import { FaCheckCircle, FaUserCheck } from 'react-icons/fa';
import { SlSocialFacebook, SlSocialInstagram, SlSocialTwitter } from 'react-icons/sl';

const initialState: Comentario = {
  usuario: "",
  partido: "",
  pais: "",
  comentario: "",
}

export const Comentarios = () => {
  const [comentario, setComentario] = useState<Comentario>(initialState);
  const [error, setError] = useState<{ [key: string]: string }>({});
  const [show, setShow] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleComentario = (name: string, value: string) => {
    setComentario({ ...comentario, [name]: value });
  }

  const validar = () => {
    let valid = true;
    let errors: { [key: string]: string } = {};

    if (!comentario.usuario) {
      errors.usuario = "El nombre de usuario es obligatorio";
      valid = false;
    }

    if (!comentario.partido) {
      errors.partido = "El partido es obligatorio";
      valid = false;
    }

    if (!comentario.pais) {
      errors.pais = "El país es obligatorio";
      valid = false;
    }

    if (!comentario.comentario) {
      errors.comentario = "El comentario es obligatorio";
      valid = false;
    }

    setError(errors);
    return valid;
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const registrarcomentario = () => {
    if (validar()) {
      setIsSubmitting(true);
      registrarComentario(comentario).then(() => {
        handleShow()
      }).catch((e) => {
        console.log(e);
        alert('Ocurrió un error al registrar');
        setIsSubmitting(false);
      });
    }
  }

  const salir = () => {
    window.location.href = "./Login"
  }
  const aregistrar = () => {
    window.location.href = "./Registrar"
  }
  const acomentar = () => {
    window.location.href = "./Comentarios"
  }
  const atabla = () => {
    window.location.href = "./Tabla"
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
          <div className="form-image-container">
            <Image src="/images/finales.jpg" alt="backgorund-image" className="fondo-form" />
            <Form id='form-main'>
              <Form.Group className='inputs-form'>
                <h1 id='titulo-form'>COMENTAR</h1>
                <p id='desc-form'>Utiliza este formulario para añadir un comentario u opinion sobre algun encuentro y que los demas lo vean!</p>
                <Form.Label className='label-form'>Nombre de usuario: </Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Ingrese su nombre de usuario'
                  name='usuario'
                  value={comentario.usuario}
                  onChange={(e) => { handleComentario(e.currentTarget.name, e.currentTarget.value) }}
                  isInvalid={!!error.usuario}
                />
                <Form.Control.Feedback type="invalid">
                  {error.usuario}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className='inputs-form'>
                <Form.Label className='label-form'>Pais: </Form.Label>
                <Form.Select
                  className='inputs-form'
                  id='select-form'
                  aria-label="Default select example"
                  name='pais'
                  value={comentario.pais}
                  onChange={(e) => { handleComentario(e.currentTarget.name, e.currentTarget.value) }}
                  isInvalid={!!error.pais}
                >
                  <option value="">Elige tu pais</option>
                  <option value="Chile">Chile</option>
                  <option value="Argentina">Argentina</option>
                  <option value="Peru">Peru</option>
                  <option value="Espana">Espana</option>
                  <option value="Uruguay">Uruguay</option>
                  <option value="Brazil">Brazil</option>
                  <option value="Colombia">Colombia</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {error.pais}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className='inputs-form'>
                <Form.Label className='label-form'>Partidos diponibles: </Form.Label>
                <Form.Select
                  className='inputs-form'
                  id='select-form'
                  aria-label="Default select example"
                  name='partido'
                  value={comentario.partido}
                  onChange={(e) => { handleComentario(e.currentTarget.name, e.currentTarget.value) }}
                  isInvalid={!!error.partido}
                >
                  <option value="">-</option>
                  <option value="Inglaterra vs Espana">Inglaterra vs Espana</option>
                  <option value="Argentina vs Colombia">Argentina vs Colombia</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {error.partido}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className='inputs-form'>
                <Form.Label className='label-form'>Comentario: </Form.Label>
                <Form.Control
                  as='textarea'
                  rows={3}
                  placeholder='Ingrese su comentario'
                  name='comentario'
                  value={comentario.comentario}
                  onChange={(e) => { handleComentario(e.currentTarget.name, e.currentTarget.value) }}
                  isInvalid={!!error.comentario}
                />
                <Form.Control.Feedback type="invalid">
                  {error.comentario}
                </Form.Control.Feedback>
              </Form.Group>
              <Button id='btn-registrar' type='button' variant='success' onClick={registrarcomentario} disabled={isSubmitting}>Enviar</Button>
              <Button id='btn-registrar' variant="danger" onClick={salir} style={{ display: "inline", marginLeft: "10px" }}>Atras</Button>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>SE REGISTRO CON EXITO!</Modal.Title>
                </Modal.Header>
                <Modal.Body> <FaCheckCircle size={"5em"} display={"block"} style={{margin:"auto",marginBottom:"20px"}} />El comentario se realizo con exito en la pagina.</Modal.Body>
                <Modal.Footer>
                  <Button variant="success" onClick={acomentar}>
                    Volver a comentar
                  </Button>
                  <Button variant="primary" onClick={atabla}>
                    Ver comentario
                  </Button>
                </Modal.Footer>
              </Modal>
            </Form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Comentarios;
