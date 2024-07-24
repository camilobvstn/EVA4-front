import Link from "next/link";
import { useState } from "react";
import { Button, Col, Container, FloatingLabel, Form, Image, Row } from "react-bootstrap";
import { SlSocialInstagram } from "react-icons/sl";
import { SlSocialFacebook } from "react-icons/sl";
import { SlSocialTwitter } from "react-icons/sl";

const Home = () => {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [errorUsuario, setErrorUsuario] = useState("");
  const [errorContrasena, setErrorContrasena] = useState("");
  const [errorGeneral, setErrorGeneral] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const validar = () => {
    let valid = true;

    if (!usuario) {
      setErrorUsuario("Por favor, ingresa tu usuario.");
      valid = false;
    } else {
      setErrorUsuario("");
    }

    if (!contrasena) {
      setErrorContrasena("Por favor, ingresa tu contraseña.");
      valid = false;
    } else {
      setErrorContrasena("");
    }

    if (valid && (usuario !== "admin" || contrasena !== "admin")) {
      setErrorGeneral("Usuario o contraseña incorrectos.");
      valid = false;
    } else {
      setErrorGeneral("");
    }

    return valid;
  };

  const iniciarSesion = () => {
    if (validar()) {
      setIsAuthenticated(true);
      window.location.href = "./Login";
    }
  };

  const cerrarSesion = () => {
    setIsAuthenticated(false);
    window.location.href = "./"; 
  };

  return (
    <>
    
      <header id='headerlogin'>
        <h1 id='titulo-header'>PAGINAFUT</h1>
        <SlSocialInstagram className="img-social" id="ig-img" size={"2em"} />
        <SlSocialFacebook className="img-social" id="fb-img" size={"2em"} />
        <SlSocialTwitter className="img-social" id="tw-img" size={"2em"} />
        {isAuthenticated && (
          <Button variant="link" onClick={cerrarSesion} style={{ color: "white" }}>
            Salir
          </Button>
        )}
      </header>


      <div id="main-index">
        <div id="imagen-index">
      </div>
        <div id="main1">
      
        <h1 id="titulo">Iniciar Sesión</h1>
        <p id="bienvenido">
          Bienvenido a OpinionesFUT!
          <br />Rellena el formulario para iniciar sesión
        </p>
        <FloatingLabel
          controlId="floatingInput"
          label="Usuario"
          className="inputs"
        >
          <Form.Control 
            type="text" 
            placeholder="name@example.com" 
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            isInvalid={!!errorUsuario}
          />
          <Form.Control.Feedback type="invalid">
            {errorUsuario}
          </Form.Control.Feedback>
        </FloatingLabel>
        
        <FloatingLabel 
          controlId="floatingPassword" 
          label="Password" 
          className="inputs"
        >
          <Form.Control 
            type="password" 
            placeholder="Password" 
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            isInvalid={!!errorContrasena}
          />
          <Form.Control.Feedback type="invalid">
            {errorContrasena}
          </Form.Control.Feedback>
        </FloatingLabel>

        {errorGeneral && (
          <div style={{ color: "red", marginBottom: "10px" }}>
            {errorGeneral}
          </div>
        )}

        <Button 
          id="iniciar" 
          variant="dark" 
          onClick={iniciarSesion}
        >
          Iniciar Sesión
        </Button>
 
      </div>

      <Image src="/images/ligas.png" alt="backgorund-image" className="fondo-index" style={{ borderRadius:"10px", backgroundColor:"rgba(0, 0, 0, 0.4)"}}></Image>

      </div>
  
    </>
  );
};

export default Home;

