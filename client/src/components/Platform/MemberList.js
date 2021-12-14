import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Table, Dropdown, Row, Col, Container } from 'react-bootstrap';
import RoleButton from './RoleButton.js'
import Pagination from './OriginalPagination.js';
import { getMemberList } from '../../actions/platformActions.js';
import Loading from '../Loading'

function MemberList({ platform }) {
    const dispatch = useDispatch()
    const auth = useSelector((state) => state.auth)
    const isGetMemberlistLoading = useSelector((state) => state.platforms.isGetMemberlistLoading);
    const memberList = useSelector((state) => state.platforms.memberList)
    const pages = useSelector((state) => state.platforms.memberListPages)
    const [page, setPage] = useState(1)

    useEffect(() => {
        console.log("CALLING API")
        dispatch(getMemberList(
            platform._id,
            page
        ))
    }, [page, dispatch]);

    if (isGetMemberlistLoading) {
        return (
            <Loading />
        )
    }

    const compareMember = (a, b) => {
        if (a.role === "Creator") {
            return -2
        }
        if (a.role === "Moderator") {
            return -1
        }
        return 0;
    }

    return (
        <Container className="justify-content-center" style={{ marginTop: "13px" }}>
            <Row>
                <Table hover>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Username</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {memberList.sort(compareMember).map((m, index) =>
                            <tr key={m._id}>
                                <td>{(page - 1) * 10 + index + 1}</td>
                                <td>
                                    {m.userId.username}
                                </td>
                                <td>
                                    {auth.user && auth.user.id === platform.owner ? <RoleButton platform={platform} member={m} ></RoleButton> : (m.role === "Consumer" ? "Member" : m.role)}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Row>

            <Row style={{ marginTop: "20px", marginBottom: "20px" }}>
                <Col>
                    <Pagination page={page} pages={pages} changePage={setPage} />
                </Col>
            </Row>
        </Container>
    )
}
export default MemberList;
