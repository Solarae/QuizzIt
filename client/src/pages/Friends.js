import React, { useEffect } from 'react'
import { Image, Row, Col, Table } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux'
import { getFriends, unfriend } from '../actions/profileActions';
import Pagination from '../components/Pagination'
import { useParams, useHistory, useLocation } from 'react-router-dom'
import Loading from '../components/Loading'

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
                    offset: 10 * (page - 1),
                    limit: 10
                }
            }))
    }, [user, search, dispatch]);
    

    if (isGetFriendsLoading && friends.length === 0) {
        return (<Loading />)
    }
    
    return (
        <div className="position-relative container justify-content-center" style={{ marginTop: "13px", marginRight: "100px" }}>
            <Row style={{ marginTop: "10px" }}>
            <Table striped bordered hover className='mt-5'>
                    <thead thead style={{textAlign: 'center'}}>
                        <tr>
                            <th>User</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody style={{ verticalAlign: 'middle' }} >
                        {friends.map((f) =>
                            <tr>
                                <td>
                                    <div onClick={() => history.push(`/profile/${f._id}`)}>
                                        <Image
                                            className="bg-dark"
                                            src={f.icon !== "" ? f.icon : "/quizzit_logo.png"}
                                            style={{ height: "50px", width: "50px", border: 'solid', borderColor: "white", padding: '0', marginRight: '5px' }}
                                            roundedCircle
                                            fluid
                                        />
                                        {f.username}
                                    </div>
                                </td>
                                <td>
                                    {f.email}
                                </td>
                                <td>
                                <i className="bi bi-x-circle" style={{float: 'right'}} onClick={() => {
                                    dispatch(unfriend({id: user.id, 
                                        userId: f._id }))
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
