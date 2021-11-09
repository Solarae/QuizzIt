import React from 'react'
import { Container, Image, Button, Row, Col, Table } from 'react-bootstrap';

function MemberList({ platform }) {
    return (
        <div className="position-relative container d-flex justify-content-center" style={{ marginTop: "13px" }}>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Mark</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>Jacob</td>
                        <td>2</td>
                    </tr>
                    <tr>
                        <td>Thornton</td>
                        <td>3</td>
                    </tr>
                </tbody>
            </Table>

        </div>
    )
}
export default MemberList;
