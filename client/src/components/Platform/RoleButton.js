import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Table, Dropdown } from 'react-bootstrap'
import { editRole } from '../../actions/platformActions'

function RoleButton({ platform, member }) {
    const auth = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const handleEditRole = (role) => {
        dispatch(editRole(
            { 
                platformId: platform._id, 
                memberId: member.userId._id, 
                senderId: auth.user.id,
                role: role  
            }
        ))
    }

    return (
        <Dropdown>
            <Dropdown.Toggle disabled={member.role === "Creator"} variant="light" id="dropdown-basic">
                {member.role === "Consumer" ? "Member" : member.role} <i class="bi bi-caret-down-fill"></i>
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item onClick={()=>handleEditRole("Moderator")} href="">Moderator {member.role === "Moderator" && <i class="bi bi-check"></i>}</Dropdown.Item>
                <Dropdown.Item onClick={()=>handleEditRole("Consumer")} href="">Member {member.role === "Consumer" && <i class="bi bi-check"></i>}</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}
export default RoleButton;
