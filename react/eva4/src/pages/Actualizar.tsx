import { actualizarUsuario, obtenerUsuario } from '@/Firebase/promesas';
import { Usuario } from '@/interfaces/iUsuarios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { FaUserCheck } from 'react-icons/fa';
import { GrDocumentUpdate } from 'react-icons/gr';
import { SlSocialFacebook, SlSocialInstagram, SlSocialTwitter } from 'react-icons/sl';

const initialState: Usuario = {
    nombre: "",
    apellido: "",
    usuario: "",
    equipofav: "",
}

const Actualizar = () => {
    const [error, setError] = useState<{ [key: string]: string }>({});
    const router = useRouter();
    const [usuario, setUsuario] = useState<Usuario>(initialState);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const atabla = () => {
        window.location.href = "./Tabla"
      }
    const salir = () => {
        window.location.href = "./Login"
        }
    const handleUsuarios = (name: string, value: string) => {
        setUsuario({ ...usuario, [name]: value });
    }

    useEffect(() => {
        const key = router.query.key;
        if (key !== undefined && typeof key === "string") {
            obtenerUsuario(key).then((p) => {
                if (p !== undefined) {
                    setUsuario(p);
                    
                } else {
                    router.push("/Tabla");
                }
            }).catch((e) => {
                console.error(e);
                alert('Error al obtener el usuario.');
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
            actualizarUsuario(key, usuario).then(() => {
                handleShow()
            }).catch((e) => {
                console.error(e);
                alert('Error al actualizar el usuario.');
            });
        }
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
          errors.equipofav = "El equipo favorito es obligatorio";
          valid = false;
        }
    
        setError(errors);
        return valid;
      }

    
    
      
      
    return (
        <>
        <header id='headerlogin'>
        <h1 id='titulo-header'><Link href={"./Login"} className='titulo-home'>PAGINAFUT</Link></h1>
        <SlSocialInstagram className="img-social" id="ig-img" size={"2em"} />
        <SlSocialFacebook className="img-social" id="fb-img" size={"2em"} />
        <SlSocialTwitter className="img-social" id="tw-img" size={"2em"} />
      </header>
      <Form id='form-main'>
        <Form.Group className='inputs-form'>
          <h1 id='titulo-form'>REGISTRAR</h1>
          <p id='desc-form'>Utiliza este formulario para añadir usuarios manualmente</p>
          <Form.Label className='label-form'>Nombre: </Form.Label>
          <Form.Control
            type='text'
            placeholder='Ingrese su nombre:'
            name='nombre'
            value={usuario.nombre}
            onChange={(e) => { handleUsuarios(e.currentTarget.name, e.currentTarget.value) }}
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
            placeholder='Ingrese su apellido:'
            name='apellido'
            value={usuario.apellido}
            onChange={(e) => { handleUsuarios(e.currentTarget.name, e.currentTarget.value) }}
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
            placeholder='Ingrese nombre de usuario:'
            name='usuario'
            value={usuario.usuario}
            onChange={(e) => { handleUsuarios(e.currentTarget.name, e.currentTarget.value) }}
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
            onChange={(e) => { handleUsuarios(e.currentTarget.name, e.currentTarget.value) }}
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
        <Button id='btn-registrar' type='button' variant='success' onClick={modificar}>Actualizar</Button>
        <Button id='btn-registrar' variant="danger" onClick={salir} style={{ display: "inline", marginLeft: "10px" }}>Salir</Button>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>SE ACTUALIZO CON EXITO!</Modal.Title>
        </Modal.Header>
        <Modal.Body> <GrDocumentUpdate size={"5em"} display={"block"} style={{margin:"auto"}} />El usuario se actualizo con exito, verifica la tabla para ver los cambios.</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={atabla}>
            Ver tabla
          </Button>
        </Modal.Footer>
      </Modal>
      </Form>
        </>
    )
}

export default Actualizar;
