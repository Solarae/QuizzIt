import React from 'react'
import { Container, Image, Button, Row, Col, Table } from 'react-bootstrap';

function MemberList({ platform, memberList }) {
    console.log(memberList)
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
                    {memberList.map((m) => (

                        <tr>
                            <td>{m.username}</td>
                            <td>{m._id===platform.owner ? "Owner" : "Member"}</td>
                        </tr>
                    )
                    )}
                </tbody>
            </Table>

        </div>
    )
}
export default MemberList;
