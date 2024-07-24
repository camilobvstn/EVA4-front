
import Link from 'next/link'
import React from 'react'
import { Button, Card, CardGroup, Col, Row } from 'react-bootstrap'
import { ImExit } from "react-icons/im";


const Login = () => {
  return (
    <>
      <div id='body-main'>
      <header id='headerlogin'>
            <h1 id='titulo-header'>PAGINAFUT</h1>
            <Link href={"./Registrar"} className='links-header'>REGISTRAR USUARIOS</Link>
            <Link href={"./Comentarios"} className='links-header'>COMENTAR</Link>
            <Link href={"./Tabla"} className='links-header'>VER COMENTARIOS</Link>
            <ImExit id='quit-header' size={"30px"}/>
            <Link href={"./index"} className='links-header' id='salir-login'>SALIR</Link>
        </header>
        <div id='div-big'>
        
      
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
          </div>
          <div id='div-main-2'>
          <h1 id='titulo-imagen'>EQUIPOS POPULARES</h1>
          <div className='card-group'>
            
            <Card className='card-login'>
              <Card.Img variant="top" src="/images/realmadrid.jpeg" />
              <Card.Body>
                <Card.Title>REAL MADRID CF</Card.Title>
                <Card.Text>
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </Card.Text>
                <Button variant='dark'>Leer Más</Button>
              </Card.Body>
            </Card>
            <Card className='card-login'>
              <Card.Img variant="top" src="/images/chelsea.jpeg" />
              <Card.Body>
                <Card.Title>CHELSEA CF</Card.Title>
                <Card.Text>
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </Card.Text>
                <Button variant='dark'>Leer Más</Button>
              </Card.Body>
            </Card>
            <Card className='card-login'>
              <Card.Img variant="top" src="/images/milan2.jpg" />
              <Card.Body>
                <Card.Title>AC MILAN</Card.Title>
                <Card.Text>
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </Card.Text>
                <Button variant='dark'>Leer Más</Button>
              </Card.Body>
            </Card>
          </div>
          <h1 id='titulo-imagen'>PROXIMOS PARTIDOS</h1>
          <div className='partidos-prox'>
            <Card className="partido"style={{ width: '750px', margin:"auto", marginBottom:"50px"}} >
          <Card.Img src="/images/final.jpg" alt="Card image" style={{opacity:".9"}}/>
          <Card.ImgOverlay>
            <Card.Title style={{color:"white", textShadow:"0 0 10px black", fontSize:"30px"}}>ESPAÑA VS INGLATERRA</Card.Title>
            <Card.Text  style={{color:"white", textShadow:"0 0 10px black", fontSize:"20px"}}>
              Se jugara la final de la eurocopa entre espana y inglaterra
            </Card.Text>
            <Card.Text style={{color:"white", textShadow:"0 0 10px black", fontSize:"20px"}}>14 de julio del 2024</Card.Text>
          </Card.ImgOverlay>
          </Card>
        </div>
        </div>
        </div>
        </div>
    </>
  )
}

export default Login
