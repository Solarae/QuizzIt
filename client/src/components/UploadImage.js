import React, { useState } from 'react'
import { Form, Button, Modal, Alert, Image, Row } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';

// type must be one of ['circle', 'banner']
function UploadImage({ type="circle", handleUpload, show, handleClose, defaultImageUrl='/quizzit_logo.png' }) {
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch()
    const auth = useSelector((state) => state.auth)
    const history = useHistory()

    const reader = new FileReader()
    reader.addEventListener("load", function () {
        // convert image file to base64 string
        setImageUrl(reader.result);
    }, false);

    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState("#")

    const closeModal = (err) => {
        setImage(null)
        setImageUrl("#")
        setErrors({});
        handleClose();
    }


    return (
        <Modal style={{ color: "black" }} show={show} onHide={closeModal} >
            <Modal.Header closeButton>
                <Modal.Title>Upload Image</Modal.Title>
            </Modal.Header>



            <Form
                onSubmit={(e) => {
                    e.preventDefault()
                    if (image) {
                        handleUpload(image)
                    }
                    handleClose()
                }}
            >
                <Modal.Body>
                    <Form.Group controlId="formIconFile" className="mb-3">
                        <Form.Control type="file"
                            onChange={(e) => {
                                e.preventDefault()
                                setImage(e.target.files[0]);
                                reader.readAsDataURL(e.target.files[0]);
                            }}
                        />
                    </Form.Group>
                    <Row >
                        <Form.Label>Preview:</Form.Label>
                    </Row>
                    <Row align='center' className="justify-content-center">
                        {(imageUrl && imageUrl !== "#") &&
                            <Image style={{ width: type==='banner'? '20vw' : "10vw", height: "10vw", border: 'solid', padding: '0' }} className="bg-dark" src={imageUrl} roundedCircle={type==='circle'} fluid />
                        }
                        {(!imageUrl || imageUrl === "#") &&
                            <Image style={{ width: type==='banner'? '20vw' : "10vw", height: "10vw", border: 'solid', padding: '0' }} className="bg-dark" src={defaultImageUrl} roundedCircle={type==='circle'} fluid />
                        }
                    </Row>
                </Modal.Body>
                {Object.keys(errors).length > 0 && (
                    <Form.Text className="text-muted">
                        <Alert variant={'danger'}>
                            <ul className='list'>
                                {Object.values(errors).map(v => (
                                    <li key={v}>{v}</li>
                                ))}
                            </ul>
                        </Alert>
                    </Form.Text>
                )}
                <Modal.Footer>
                    <Button variant="primary" type="submit">
                        Save
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );

}


export default UploadImage;