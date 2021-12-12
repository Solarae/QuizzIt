import React, { useState, useEffect } from 'react'
import { Image, Row, Col, Table, Nav, Card } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux'
import { getFriends, unfriend } from '../actions/profileActions';
import Pagination from '../components/Pagination'
import { useParams, useHistory, useLocation } from 'react-router-dom'

function Friends() {
    const dispatch = useDispatch()
    const { user, isGetFriendsLoading, friends, friendsPages} = useSelector((state) => state.auth)

    
    const history = useHistory()
    const { search } = useLocation()
    const searchParams = new URLSearchParams(search)
    const page = parseInt(searchParams.get('page')) || 1
    const url = "/friends"
    

    const setPage = (page) => {
        history.push(`${url}?page=${page}`)}
    

    useEffect(() => {
        if (user)
            dispatch(getFriends({
                id: user.id,
                query: {
                    offset: 2 * (page - 1),
                    limit: 2
                }
            }))
    }, [user, search, dispatch]);
    

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
                                    dispatch(unfriend({id: user.id, 
                                        userId: f._id, }))
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
