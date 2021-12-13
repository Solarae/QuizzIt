import React from 'react'
import { Spinner, Container, Row } from 'react-bootstrap'



function Loading() {

    return (
        <Container className="my-auto vertical-center" align='center' style={{ height: '30vw' }}>
            <Row classname=" justify-content-center align-self-center" align="center" style={{ height:"100%"  }}>

                <Spinner className="mx-auto my-auto" animation="border" />
            </Row>
        </Container>
    )
}
export default Loading 
