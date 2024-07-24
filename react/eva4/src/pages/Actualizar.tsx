import { actualizarComentario, obtenerComentario } from '@/Firebase/promesas';
import { Comentario } from '@/interfaces/iOpinion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { FaUserCheck } from 'react-icons/fa';
import { RiRefreshFill } from 'react-icons/ri';
import { SlSocialFacebook, SlSocialInstagram, SlSocialTwitter } from 'react-icons/sl';

const initialState: Comentario = {
  usuario: "",
  partido: "",
  pais: "",
  comentario: "",
}

const Actualizar = () => {
  const [error, setError] = useState<{ [key: string]: string }>({});
  const router = useRouter();
  const [comentario, setComentario] = useState<Comentario>(initialState);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const acomentar = () => {
    window.location.href = "./Comentarios";
  }
  
  const atabla = () => {
    window.location.href = "./Tabla";
  }
  
  const salir = () => {
    window.location.href = "./Login";
  }
  
  const handleComentarios = (name: string, value: string) => {
    setComentario({ ...comentario, [name]: value });
  }

  useEffect(() => {
    const key = router.query.key;
    if (key !== undefined && typeof key === "string") {
      obtenerComentario(key).then((p) => {
        if (p !== undefined) {
          setComentario(p);
        } else {
          router.push("/Tabla");
        }
      }).catch((e) => {
        console.error(e);
        alert('Error al obtener el comentario.');
        router.push("/Tabla");
      });
    } else {
      alert("No se proporcionó una clave válida.");
      router.push("/Tabla");
    }
  }, [router.query.key]);

  const modificar = () => {
    const key = router.query.key as string;
    if (key) {
      actualizarComentario(key, comentario).then(() => {
        handleShow();
      }).catch((e) => {
        console.error(e);
        alert('Error al actualizar el comentario.');
      });
    }
  }

  const validar = () => {
    let valid = true;
    let errors: { [key: string]: string } = {};

    if (!comentario.usuario) {
      errors.usuario = "El nombre de usuario es obligatorio";
      valid = false;
    }

    if (!comentario.pais) {
      errors.pais = "El país es obligatorio";
      valid = false;
    }

    if (!comentario.partido) {
      errors.partido = "El partido es obligatorio";
      valid = false;
    }

    if (!comentario.comentario) {
      errors.comentario = "El comentario debe llevar algo...";
      valid = false;
    }

    setError(errors);
    return valid;
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
              <h1 id='titulo-form'>ACTUALIZAR COMENTARIO</h1>
              <p id='desc-form'>Utiliza este formulario para actualizar tu comentario u opinion sobre algun encuentro y que los demas lo vean!</p>
              <Form.Label className='label-form'>Nombre de usuario: </Form.Label>
              <Form.Control
                type='text'
                placeholder='Ingrese su nombre de usuario'
                name='usuario'
                value={comentario.usuario}
                onChange={(e) => { handleComentarios(e.currentTarget.name, e.currentTarget.value) }}
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
                onChange={(e) => { handleComentarios(e.currentTarget.name, e.currentTarget.value) }}
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
              <Form.Label className='label-form'>Partidos disponibles: </Form.Label>
              <Form.Select
                className='inputs-form'
                id='select-form'
                aria-label="Default select example"
                name='partido'
                value={comentario.partido}
                onChange={(e) => { handleComentarios(e.currentTarget.name, e.currentTarget.value) }}
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
                onChange={(e) => { handleComentarios(e.currentTarget.name, e.currentTarget.value) }}
                isInvalid={!!error.comentario}
              />
              <Form.Control.Feedback type="invalid">
                {error.comentario}
              </Form.Control.Feedback>
            </Form.Group>
            <Button id='btn-registrar' type='button' variant='success' onClick={modificar}>Actualizar</Button>
            <Button id='btn-registrar' variant="danger" onClick={atabla} style={{ display: "inline", marginLeft: "10px" }}>Cancelar</Button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>SE ACTUALIZO CON EXITO!</Modal.Title>
              </Modal.Header>
              <Modal.Body> <RiRefreshFill size={"5em"} display={"block"} style={{margin:"auto"}} />Todos los datos se actualizaron con exito en la base de datos.</Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={atabla}>
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

export default Actualizar;
