
import React from 'react'
import { Col } from 'react-bootstrap'

function Footer() {
    return (
        <footer class="text-center text-lg-start bg-light text-muted" style={{ paddingTop: "10px", marginTop: "3vw" }}>
            <section class="">
                <div class="container text-center text-md-start mt-5">
                    <div class="row mt-3">
                        <Col xs={4} align='center' />
                        <Col xs={4} align='center' >
                            <div>
                                <h6 class="text-uppercase fw-bold mb-4">
                                    <i class="fas fa-gem me-3"></i>QuizzIt
                                </h6>
                                <p>
                                    QuizzIt is a web application that allows users to test their knowledge on
                                    anything they can think of.
                                    Here, you will be able to create your own quizzes, take quizzes, and compete against your friends!
                                </p>
                            </div>
                        </Col >
                        <Col xs={4} align='center' />



                    </div>
                </div>
            </section>

            <div class="text-center p-4" >
                © 2021 Copyright:
                <a class="text-reset fw-bold" href="https://quizz-it.netlify.app/">QuizzIt</a>
            </div>
        </footer>

    )
}

export default Footer;

// {auth.isAuthenticated ? (<Button onClick={() => dispatch(logout(history))}>Logout</Button>) 
//                     : <NavbarCollapse id='responsive-navbar-nav'>
//                         <LinkContainer to='/signin'><Nav.Link>Sign In</Nav.Link></LinkContainer>
//                       </NavbarCollapse>}