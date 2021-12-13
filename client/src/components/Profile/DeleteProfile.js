import React, { useState } from 'react';
import { Form, Button, Modal, Alert } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { deleteProfile } from '../../actions/profileActions';

function DeleteProfile({ show, handleClose }) {
    //   const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch()
    const auth = useSelector((state) => state.auth)
    const history = useHistory()
    const profile = useSelector((state)=>state.profile)
    const [values, setValues] = useState({
        password: "",
    });

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const closeModal = (err) => {
        if (err) {
            setErrors({ ...err })
            return;
        }
        setValues({ ...values, password: "" });
        setErrors({});
        handleClose();
    }

    const handleSubmit = ((e) => {
        e.preventDefault();

        if(profile){
            console.log(profile.subscribedPlatforms)
            dispatch(deleteProfile({ id: auth.user.id, password: values.password, history: history, createdPlatforms:profile.createdPlatforms , subscribedPlatforms:profile.subscribedPlatforms, callback: closeModal }));
            history.push("/")
        }

    })

    return (
        <Modal style={{ color: "black" }} show={show} onHide={closeModal} >
            <Modal.Header closeButton>
                <Modal.Title>Delete Profile</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Enter Password to Confirm</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" onChange={onChange} />
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
                <Modal.Footer >
                    <Button variant="outline-danger" type="submit">
                        Delete
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );

}

export default DeleteProfile;