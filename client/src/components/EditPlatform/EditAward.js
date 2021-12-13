import React, { useState, useRef, useEffect } from 'react';
import { Form, Button, Modal, Alert, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom';
import { editAward, deleteAward } from '../../actions/awardActions.js'

// custom hook for getting reference to previous values/props
function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

function EditAward({ award, show, handleClose }) {
    //   const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch()
    const auth = useSelector((state) => state.auth)
    const history = useHistory()

    const awardErrors = useSelector((state) => state.awards.errors);
    const isEditLoading = useSelector((state) => state.awards.isEditLoading)
    const prev_isEditLoading = usePrevious(isEditLoading)

    const isDeleteLoading = useSelector((state) => state.awards.isDeleteLoading)
    const prev_isDeleteLoading = usePrevious(isDeleteLoading)

    let { id } = useParams();  // get the platform id from the url

    const [values, setValues] = useState({
        title: award.title,
        description: award.description,
        iconImage: null,
        requirementType: award.requirementType,
        requirementCount: award.requirementCount
    });

    // reset state values when the modal is opened/closed
    useEffect(() => {
        setValues({
            title: award.title,
            description: award.description,
            iconImage: null,
            requirementType: award.requirementType,
            requirementCount: award.requirementCount
        });
        setErrors({});
    }, [show])

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    // waits for EDIT AWARD request to update redux store 
    useEffect(() => {
        if (!prev_isEditLoading) {
            return;
        }

        console.log("Edit award loading: " + isEditLoading)
        // check if there were errors
        if (awardErrors) {
            setErrors({ ...awardErrors });
            return;
        }

        // close the modal 
        handleClose();

    }, [isEditLoading, history, handleClose]);

    // waits for DELETE AWARD request to update redux store 
    useEffect(() => {
        if (!prev_isDeleteLoading) {
            return;
        }

        console.log("Delete award loading: " + isDeleteLoading)
        // check if there were errors
        if (awardErrors) {
            setErrors({ ...awardErrors });
            return;
        }
        
        // close the modal
        handleClose();
        
    }, [isDeleteLoading, history, handleClose]);

    const handleSubmit = ((e) => {
        e.preventDefault();

        if (values.title==="" || values.description==="" || values.requirementCount===""){
            setErrors({
                'Empty Fields': "Fields must not be empty"
            })
            return
        }
        
        
        dispatch(editAward(
            {
                awardId: award._id,
                userId: auth.user.id,
                title: values.title,
                description: values.description,
                iconImage: values.iconImage,
                requirementType: values.requirementType,
                requirementCount: Number(values.requirementCount)
            }
        ));
        
    })

    const handleDelete = ((e) => {
        e.preventDefault();
        dispatch(deleteAward(
            {
                userId: auth.user.id,
                awardId: award._id
            }
        ));
    })

    return (
        <Modal style={{ color: "black" }} show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Award</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Award Icon</Form.Label>
                        <Form.Control type="file" onChange={(e) => setValues({ ...values, iconImage: e.target.files[0] })} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formAwardName">
                        <Form.Label>Award Name</Form.Label>
                        <Form.Control type="text" defaultValue={award.title} name="title" onChange={onChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formDescription">
                        <Form.Label>Award Description</Form.Label>
                        <Form.Control as="textarea" rows={3} type="text" defaultValue={award.description} name="description" onChange={onChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPoints">
                        <Form.Label>Requirement</Form.Label>
                        <Col xs={3}>
                            <Form.Select size="sm" defaultValue={award.requirementType} name="requirementType" onChange={onChange}>
                                <option value="Point">Points</option>
                                <option value="Quiz">Quizzes</option>
                            </Form.Select>
                        </Col>
                        <br></br>
                        <Col align='end' xs={6} >
                            <Form.Control type="number" defaultValue={award.requirementCount} name="requirementCount" onChange={onChange} />
                        </Col>
                    </Form.Group>
                    <br />
                    <Button variant="outline-danger" type="" onClick={handleDelete}>
                        Delete Award
                    </Button>

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
                    <Button variant="primary" type="submit">
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );

}

export default EditAward;