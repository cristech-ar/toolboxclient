import React from 'react';
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

function CustomNavbar() {
return (
<Navbar bg="danger" variant="dark" expand="lg" >
<Container>
<Navbar.Brand color="primary">
<>
<img
src={require('../logo.png')}
height="30"
className="d-inline-block align-top"
alt="Toolbox"
/>
{' '}
<span className='m-5'> Technical Choice - FULL STACK </span>
</>
</Navbar.Brand>
</Container>
</Navbar>
);
}

export default CustomNavbar;