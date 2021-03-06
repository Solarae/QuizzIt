import React, { useState, useRef, useEffect } from 'react';
import { Form, Button, Modal, Alert } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom';
import { deletePlatform } from '../../actions/platformActions';
import { deleteManyPlatformReport } from '../../actions/reportActions';

// custom hook for getting reference to previous values/props
function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

function DeletePlatform({ show, handleClose,id,page }) {
    //   const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch()
    const auth = useSelector((state) => state.auth)
    const history = useHistory()

    const platformErrors = useSelector((state) => state.platforms.errors);
    const isDeleteLoading = useSelector((state) => state.platforms.isDeleteLoading)
    const prev_isDeleteLoading = usePrevious(isDeleteLoading)
    const user = useSelector((state) => state.auth.user)
    const [values, setValues] = useState({
        password: "",
    });

    // reset state values when the modal is opened/closed
    useEffect(() => {
        setValues({ password: "" });
        setErrors({});
    }, [show])

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    // waits for DELETE PLATFORM request to update redux store 
    useEffect(() => {
        if (!prev_isDeleteLoading) {
            return;
        }

        console.log("DELETE_PLATFORM.loading: " + isDeleteLoading)
        // check if there were errors
        if (platformErrors) {
            setErrors({ ...platformErrors });
            return;
        }

        // close the modal and redirect user to the home page
        handleClose();
    }, [isDeleteLoading, history, handleClose]);
    
    const handleSubmit = ((e) => {
        e.preventDefault();

        //delete all the reports associated with the platform
        dispatch(deleteManyPlatformReport(
            {
                userId: auth.user.id,
                platformId: id,
                confirmPassword: values.password,
                query:{
                    userId: user.id,
                    expand: 'platformId(select=name),quizId(select=name),submittedBy(select=username)',
                    sort: 'timeSubmitted desc',
                    offset: 10 * (page - 1),
                    limit: 10
                }
            }
        ))


        //delete the platform
        dispatch(deletePlatform(
            {
                userId: auth.user.id,
                platformId: id,
                confirmPassword: values.password,
            }
        ));
    })

    return (
        <Modal style={{ color: "black" }} show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Platform</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Enter Password to Confirm</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" onChange={onChange} />
                    </Form.Group>
                    <p className="text-danger">Warning: This action cannot be undone</p>
                    <p className="text-danger">Note: All the reports associated with the this platform will also be deleted</p>
                    

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

export default DeletePlatform;