import React, { useState, useEffect, useRef } from 'react';
import { Form, Button, Modal, Alert } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux'
import { reportQuiz } from '../../actions/quizActions'

// custom hook for getting reference to previous values/props
function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

function Report({ setShowReportToast, quizId, show, handleClose }) {
    //   const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch()
    const auth = useSelector((state) => state.auth)

    const quizErrors = useSelector((state) => state.quiz.errors)
    const isReportLoading = useSelector((state) => state.quiz.isReportLoading)
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

    // waits for CREATE_quiz request to update redux store with the new quiz id so that we can use it here to redirect user 
    useEffect(() => {
        if (!prev_isReportLoading) {
            return;
        }
        console.log("REPORT_quiz.loading: " + isReportLoading)
        // check if there were errors
        if (quizErrors) {
            setErrors({ ...quizErrors });
            return;
        }

        console.log("Report submitted");

        // close the modal and redirect user to the quiz page
        handleClose();
        setShowReportToast(true)
    }, [isReportLoading, handleClose]);

    const handleSubmit = ((e) => {
        e.preventDefault();

        dispatch(reportQuiz({
            id: quizId,
            userId: auth.user.id,
            text: values.reason
        }))
        handleClose();
        setShowReportToast(true)
    })

    return (
        <Modal style={{ color: "black" }} show={show} onHide={handleClose} >
            <Modal.Header closeButton>
                <Modal.Title>Report quiz</Modal.Title>
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