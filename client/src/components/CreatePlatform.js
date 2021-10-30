import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Container, Form, Button, Modal, Alert } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux'
import { createPlatform } from '../actions/platformActions'
import { useHistory } from 'react-router-dom';

// custom hook for getting reference to previous values/props
function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

function CreatePlatform({ show, handleClose }) {
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch()
    const auth = useSelector((state) => state.auth)

    const platform = useSelector((state) => state.platforms.platform)
    const platformErrors = useSelector((state) => state.platforms.errors);
    const isCreateLoading = useSelector((state) => state.platforms.isCreateLoading)
    const prev_isCreateLoading = usePrevious(isCreateLoading)

    const history = useHistory()

    const [values, setValues] = useState({
        platformName: "",
        platformDescription: ""
    });

    // reset state values when the modal is opened/closed
    useEffect(() => {
        setValues({ platformName: "", platformDescription: "" });
        setErrors({});
    }, [show])

    // updates state values when user types into text fields
    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    // waits for CREATE_PLATFORM request to update redux store with the new platform id so that we can use it here to redirect user 
    useEffect(() => {
        if (!prev_isCreateLoading) {
            return;
        }

        console.log("CREATE_PLATFORM.loading: " + isCreateLoading)
        // check if there were errors
        if (platformErrors) {
            setErrors({ ...platformErrors });
            return;
        }

        console.log(platform._id);

        // close the modal and redirect user to the platform page
        handleClose();
        history.push(`/platform/${platform._id}`);
    }, [isCreateLoading, history, handleClose]);

    const handleSubmit = ((e) => {
        e.preventDefault();

        dispatch(createPlatform({
            userId: auth.user.id,
            name: values.platformName,
            description: values.platformDescription,
            history: history
        }))
    })

    return (
        <Modal style={{ color: "black" }} show={show} onHide={handleClose} >
            <Modal.Header closeButton>
                <Modal.Title>Create Platform</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Platform Name</Form.Label>
                        <Form.Control type="platformName" defaultValue="" placeholder="Platform Name" name="platformName" onChange={onChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formDesc">
                        <Form.Label>Platform Description</Form.Label>
                        <Form.Control as="textarea" rows={3} type="platformDesc" defaultValue="" placeholder="Platform Description" name="platformDescription" onChange={onChange} />
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