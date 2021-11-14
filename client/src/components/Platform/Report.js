import React, { useState, useEffect, useRef } from 'react';
import { Form, Button, Modal, Alert } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux'
import { reportPlatform } from '../../actions/platformActions'

// custom hook for getting reference to previous values/props
function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

function Report({ platformId, show, handleClose }) {
    //   const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch()
    const auth = useSelector((state) => state.auth)

    const platformErrors = useSelector((state) => state.platforms.errors)
    const isReportLoading = useSelector((state) => state.platforms.isReportLoading)
    const prev_isReportLoading = usePrevious(isReportLoading);

    const [values, setValues] = useState({
        reason: "",
    });

    // reset state values when the modal is opened/closed
    useEffect(() => {
        setValues({ reason: "" });
        setErrors({});
    }, [show])

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    // waits for CREATE_PLATFORM request to update redux store with the new platform id so that we can use it here to redirect user 
    useEffect(() => {
        if (!prev_isReportLoading) {
            return;
        }
        console.log("REPORT_PLATFORM.loading: " + isReportLoading)
        // check if there were errors
        if (platformErrors) {
            setErrors({ ...platformErrors });
            return;
        }

        console.log("Report submitted");

        // close the modal and redirect user to the platform page
        handleClose();
    }, [isReportLoading, handleClose]);

    const handleSubmit = ((e) => {
        e.preventDefault();

        dispatch(reportPlatform({
            platformId: platformId,
            userId: auth.user.id,
            text: values.reason
        }))
    })

    return (
        <Modal style={{ color: "black" }} show={show} onHide={handleClose} >
            <Modal.Header closeButton>
                <Modal.Title>Report Platform</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="formReportReason">
                        <Form.Label>Reason</Form.Label>
                        <Form.Control as="textarea" rows={3} type="text" placeholder="Reason" name="reason" onChange={onChange} />
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
                <Modal.Footer className="justify-content-end">
                    <Button variant="primary" type="submit">
                        Report
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );

}

export default Report;


