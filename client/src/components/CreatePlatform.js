import React, { useState } from 'react'
import { Container, Form, Button, Modal, Alert } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux'
import { editProfile } from '../actions/profileActions'
import { useHistory } from 'react-router-dom';

function CreatePlatform({ show, handleClose }) {
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch()
    const auth = useSelector((state) => state.auth)
    const history = useHistory()

    const [values, setValues] = useState({
        platformName: "",
    });

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    const closeModal = (err) => {
        if (err) {
            setErrors({ ...err });
            return;
        }
        setValues({ ...values, platformName: "" });
        setErrors({});
        handleClose();
    }

    const handleSubmit = ((e) => {
        e.preventDefault();

        console.log(values.platformName)
        //   dispatch(editProfile({
        // id: auth.user.id,
        // username: values.field,
        // history: history,
        //   }))


        closeModal()
    })

    return (
        <Modal style={{ color: "black" }} show={show} onHide={closeModal} >
            <Modal.Header closeButton>
                <Modal.Title>Create Platform</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="formBasicField">
                        <Form.Label>Platform Name</Form.Label>
                        <Form.Control type="platformName" defaultValue="" placeholder="Platform Name" name="platformName" onChange={onChange} />
                    </Form.Group>
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
                        Create
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );

}


export default CreatePlatform;