import axios from 'axios';
import { React, useState } from 'react'
import { Col, Card, Button } from 'react-bootstrap';
import { URL } from '../../config';

function ReportCard({ report,reportState,setReportState,id }) {

    const handleDeleteReport = async (e) =>{
        let newReports = reportState.filter((report)=>{
            return report._id != e.target.id
        })
        setReportState(newReports)

        //make backend call to delete report
        await axios.delete(`${URL}/api/reports/deleteReport/${report._id}`)

    }





    return (
        <Card style={{ width: "70vw" }} >
            <Card.Header>Platform Reported : {report.platformId.name}  </Card.Header>
            <Card.Body>
                <h6 className="ml-5">Description : </h6>
                <Card.Title style={{fontSize: "16pt"}}>{report.description}</Card.Title>

                
                <Button id={id} variant="warning" onClick={handleDeleteReport}> Delete Report </Button> {' '}  
                {/* <Button variant="danger" onClick={handleDeletePlatform}> Delete Platform </Button>   */}
                
                

            </Card.Body>
            <h6> Reported by : {report.submittedBy.username} </h6>
        </Card>
    )
}
export default ReportCard;