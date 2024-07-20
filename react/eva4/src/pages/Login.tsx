
import Link from 'next/link'
import React from 'react'
import { Button, Card } from 'react-bootstrap'

const Login = () => {
  return (
    <>
        <header id='headerlogin'>
            <h1 id='titulo-header'>PAGINAFUT</h1>
            <Link href={"./Registrar"} className='links-header'>REGISTRAR</Link>
            <Link href={"./Tabla"} className='links-header'>USUARIOS</Link>
            <Link href={"./Componentes/Prueba"} className='links-header'>NOTICIAS</Link>
            <Link href={"./Componentes/Prueba"} className='links-header'>REGISTRAR</Link>
        </header>
        <div id='div-principal'>
            <h1 id='titulo-imagen'>ULTIMAS NOTICIAS</h1>
            <Card id='imagen-main' style={{ width: '40rem', padding:"20px 20px"}}>
                <Card.Img variant="top" src="/images/kylian.jpeg" />
                <Card.Body>
                <Card.Title>Kylian Mbappe al Real Madrid</Card.Title>
                <Card.Text>
                     Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                </Card.Text>
        </Card.Body>
        <Button variant='dark'>Leer Más</Button>
        </Card>
        <h1>hola soy una noticia nueva khjdashjldgahjlsgdlhjasdghjk</h1>
        </div>
    </>
  )
}

export default Login
