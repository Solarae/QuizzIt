import axios from 'axios';
import { React, useCallback, useState} from 'react'
import { Col, Card, Button } from 'react-bootstrap';
import { deletePlatform } from '../../actions/platformActions';
import { URL } from '../../config';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router';
import { deletePlatformReport } from '../../actions/reportActions';
import DeletePlatform from './DeletePlatform';

function ReportCard({ user, report }) {


    const [showDelete, setShowDelete] = useState(false);
    const handleCloseDelete = useCallback(() => { setShowDelete(false) }, []);
    const handleShowDelete = () => { setShowDelete(true) };



    const dispatch = useDispatch()
    const handleDeleteReport = async (e) =>{
        dispatch(deletePlatformReport({
            id:report._id
        }))
    }




    return (
        <Card style={{ width: "70vw" }} >
            <Card.Header>Platform Reported : {report.platformId.name}  </Card.Header>
            <Card.Body>
                <h6 className="ml-5">Description : </h6>
                <Card.Title style={{fontSize: "16pt"}}>{report.description}</Card.Title>

                
                <Button variant="warning" onClick={handleDeleteReport}> Delete Report </Button> {' '}  
                <Button variant="danger" onClick={handleShowDelete}> Delete Platform </Button>  
                <DeletePlatform id={report.platformId._id} show={showDelete} handleClose={handleCloseDelete}></DeletePlatform>
                
                

            </Card.Body>
            <h6> Reported by : {report.submittedBy.username} </h6>
        </Card>
    )
}
export default ReportCard;