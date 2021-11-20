import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Table, Dropdown } from 'react-bootstrap';
import RoleButton from './RoleButton.js'

function MemberList({ platform, memberList }) {
    const auth = useSelector((state) => state.auth)

    const compareMember= (a, b) => {
        if (a.role==="Creator"){
            return -2
        }
        if (a.role==="Moderator"){
            return -1
        }
        return 0;
    }

    return (
        <div className="position-relative container d-flex justify-content-center" style={{ marginTop: "13px" }}>
            <Table hover>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {memberList.sort(compareMember).map((m) => (
                        <tr>
                            <td>{m.userId.username}</td>
                            <td>
                                { auth.user && auth.user.id===platform.owner ? <RoleButton platform={platform} member={m} ></RoleButton> : (m.role==="Consumer" ? "Member" : m.role)}
                            </td>
                        </tr>
                    )
                    )}
                </tbody>
            </Table>

        </div>
    )
}
export default MemberList;
