import Link from "next/link";
import { useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";

const Home = () => {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [errorUsuario, setErrorUsuario] = useState("");
  const [errorContrasena, setErrorContrasena] = useState("");

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

    return valid;
  };

  return (
    <>
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
          controlId="floatingPassword" label="Password"className="inputs"
        >
          <Form.Control type="password"placeholder="Password" 
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            isInvalid={!!errorContrasena}
          />
          <Form.Control.Feedback type="invalid">
            {errorContrasena}
          </Form.Control.Feedback>
        </FloatingLabel>

        <Button id="iniciar" variant="dark" onClick={(e) => {
            if (validar()) {
              window.location.href = "./Login"; //window.location es para cambiar la pestana en la q se encuentra el usuario
            }
          }}
        >
          Iniciar Sesión
        </Button>
      </div>
    </>
  );
};

export default Home;

