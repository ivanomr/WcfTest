import './Header.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { useState, useEffect } from 'react';

export function Header(){
    const [usuName,setUsuName]=useState("");

    useEffect(()=>{   
        const strTokeUsu=localStorage.getItem("tkn_info");
        if(strTokeUsu!==null){
            const tokenUsu=JSON.parse(strTokeUsu);
            setUsuName(tokenUsu.usr);
        }

    },[]);

    return (
        <Navbar bg="light" data-bs-theme="light">
            <Container>
            <Navbar.Brand href="#home">✅ WcfTest</Navbar.Brand>
            <Nav className='usuNav d-flex flex-row me-1'>
                <Nav.Link className='logoutItem' href="#logout"><span>🚪</span><span>🏃‍♀️</span>Salir</Nav.Link>
                <Nav.Link href="#usu">🧑🏻‍💻 {usuName}</Nav.Link>                
            </Nav>
            </Container>
        </Navbar>
    );
}