import React, { useState, useEffect, useRef } from 'react'
import { Form, Button, Modal, Alert } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux'
import { editPlatform } from '../../actions/platformActions'
import { useHistory, useParams } from 'react-router-dom';

// custom hook for getting reference to previous values/props
function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

function EditSetting({ type, show, handleClose }) {
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch()
    const auth = useSelector((state) => state.auth)
    const history = useHistory()

    const platformErrors = useSelector((state) => state.platforms.errors);
    const isEditLoading = useSelector((state) => state.platforms.isEditLoading)
    const prev_isEditLoading = usePrevious(isEditLoading)

    let { id } = useParams();  // get the platform ID from the url

    const [values, setValues] = useState({
        field: "",
        currentPassword: "" // used if password confirmation needed
    });

    // reset state values when the modal is opened/closed
    useEffect(() => {
        setValues({
            field: "",
            currentPassword: "" // used if password confirmation needed
        });
        setErrors({});
    }, [show])


    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    // waits for EDIT PLATFORM request to update redux store 
    useEffect(() => {
        if (!prev_isEditLoading) {
            return;
        }

        console.log("EDIT PLATFORM loading: " + isEditLoading)
        // check if there were errors
        if (platformErrors) {
            console.log(platformErrors);
            setErrors({ ...platformErrors });
            return;
        }

        // close the modal 
        handleClose();
    }, [isEditLoading, history, handleClose]);


    const handleSubmit = ((e) => {
        e.preventDefault();

        if (type === "Name") {
            dispatch(editPlatform(
                {
                    newValue: {
                        name: values.field 
                    },
                    userId: auth.user.id,
                    platformId: id,
                    confirmPassword: ""
                }
            ));

        }
        else if (type === "Description") {
            dispatch(editPlatform(
                {
                    newValue: {
                        description: values.field 
                    },
                    userId: auth.user.id,
                    platformId: id,
                    confirmPassword: ""
                }
            ));
        }
        else {
            console.log("Error")
        }

    })

    return (
        <Modal style={{ color: "black" }} show={show} onHide={handleClose} >
            <Modal.Header closeButton>
                <Modal.Title>Edit Platform {type}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="formBasicField">
                        <Form.Label>New Platform {type} </Form.Label>
                        <Form.Control type={type === "Password" ? "password" : "field"} defaultValue="" placeholder={"New " + type} name="field" onChange={onChange} />
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
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );

}


export default EditSetting;