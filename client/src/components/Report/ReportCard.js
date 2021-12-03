import axios from 'axios';
import { React, useState} from 'react'
import { Col, Card, Button } from 'react-bootstrap';
import { deletePlatform } from '../../actions/platformActions';
import { URL } from '../../config';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router';

function ReportCard({ user, report,reportState,setReportState,id }) {
    const dispatch = useDispatch()
    const handleDeleteReport = async (e) =>{
        let newReports = reportState.filter((report)=>{
            return report._id != e.target.id
        })
        setReportState(newReports)

        //make backend call to delete report
        await axios.delete(`${URL}/api/reports/deleteReport/${report._id}`)

    }
    const history = useHistory()

    const handleDeletePlatform = async (e) =>{
        dispatch(deletePlatform({userId: user.id , platformId:report.platformId._id}))
        history.push('/')
    }



    return (
        <Card style={{ width: "70vw" }} >
            <Card.Header>Platform Reported : {report.platformId.name}  </Card.Header>
            <Card.Body>
                <h6 className="ml-5">Description : </h6>
                <Card.Title style={{fontSize: "16pt"}}>{report.description}</Card.Title>

                
                <Button id={id} variant="warning" onClick={handleDeleteReport}> Delete Report </Button> {' '}  
                <Button variant="danger" onClick={handleDeletePlatform}> Delete Platform </Button>  
                
                

            </Card.Body>
            <h6> Reported by : {report.submittedBy.username} </h6>
        </Card>
    )
}
export default ReportCard;