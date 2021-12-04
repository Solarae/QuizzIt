import React, { useState, useEffect } from 'react'
import { Image, Row, Col, Table, Nav, Card } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux'
import { getFriends, unfriend } from '../actions/profileActions';
import Pagination from '../components/Pagination'
import { useParams } from 'react-router-dom'

function Friends() {
    const dispatch = useDispatch()
    const { user, isGetFriendsLoading, friends, friendsPages} = useSelector((state) => state.auth)
    const [page, setPage] = useState(1)

    useEffect(() => {
        dispatch(getFriends(
            user.id,
            page
        ))
    }, [page, dispatch]);
    
    if (isGetFriendsLoading && friends.length === 0) {
        return (<div>Loading...</div>)
    }
    
    return (
        <div className="position-relative container justify-content-center" style={{ marginTop: "13px", marginRight: "100px" }}>
            <Row style={{ marginTop: "10px" }}>
                <Table hover>
                    <tbody>
                        {friends.map((f) =>
                            <tr>
                                <td>
                                    {f.username}
                                </td>
                                <td>
                                <i className="bi bi-x-circle" style={{float: 'right'}} onClick={() => {
                                    dispatch(unfriend(user.id, f._id))
                                    dispatch(getFriends(user.id, page))
                                    }
                                }></i>
                                </td>
                                
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Row>

            <Row style={{ marginTop: "20px", marginBottom: "20px" }}>
                <Col>
                    <Pagination page={page} pages={friendsPages} changePage={setPage} />
                </Col>
            </Row>

        </div>
    )
}
export default Friends
