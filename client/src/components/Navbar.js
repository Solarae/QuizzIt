import React, { useState, useEffect, useCallback } from 'react'
import { Nav, Navbar, Container, Image, NavDropdown, Form, FormControl } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../actions/authActions'
import { getInbox, receiveNotifications, readNotification, 
  getFriendRequests, acceptFriendRequest, declineFriendRequest,
  receiveFriendRequest } from '../actions/profileActions'
import { useHistory } from 'react-router-dom'

import SignUp from './SignUp.js';
import SignIn from './SignIn.js';
import CreatePlatform from './CreatePlatform.js';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse'

function AppNavbar() {
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)
  const socket = useSelector((state) => state.auth.socket)
  const { isGetInboxLoading, inbox, inboxTotalUnreadCount, inboxTotalCount } = useSelector((state) => state.auth)
  const { isGetFriendRequestsLoading, friendRequests, friendRequestsTotalCount } = useSelector((state) => state.auth)
  const history = useHistory()

  const [query, setQuery] = useState("");
  useEffect(() => {
    socket?.on('getInbox', (notifications) => {
      dispatch((
        receiveNotifications(notifications)
        ))
    })
    socket?.on('receiveFriendRequest', (friendRequest) => {
      dispatch((
        receiveFriendRequest(friendRequest)
        ))
    })
  
  }, [socket])

  useEffect(() => {
    if (auth.user) {
      dispatch(getInbox(
        auth.user.id,
        0
      ))
      dispatch(getFriendRequests(
        auth.user.id,
        0
      ))
    }
    
  }, [auth.user, dispatch]);

  const onQueryChange = (e) => {
    setQuery(e.target.value)
  }
  const handleSearch = (e) => {
    e.preventDefault();
    history.push(`/search?query=${query}`)
  }

  const [showSignIn, setShowSignIn] = useState(false);
  const handleCloseSignIn = () => { setShowSignIn(false) };
  const handleShowSignIn = () => { setShowSignIn(true) };

  const [showSignUp, setShowSignUp] = useState(false);
  const handleCloseSignUp = () => { setShowSignUp(false) };
  const handleShowSignUp = () => { setShowSignIn(false); setShowSignUp(true) };

  const [showCreatePlatform, setShowCreatePlatform] = useState(false);
  const handleCloseCreatePlatform = useCallback(() => { setShowCreatePlatform(false) }, []);
  const handleShowCreatePlatform = () => { setShowCreatePlatform(true) };

  const [showFriendRequests, setShowFriendRequests] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  const handleScroll = ((e, type) => {
    if (e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight) {
      if (type === 'notification' && inbox.length < inboxTotalCount) {
        console.log("CALL DISPATCH")
        dispatch(getInbox(
          auth.user.id,
          inbox.length
        )) 
      } else if (type === 'friendRequests' && friendRequests.length < friendRequestsTotalCount) {
        console.log("CALLING DISPATCH")
        dispatch(getFriendRequests(
          auth.user.id,
          friendRequests.length
        )) 
      }
      
    }
  })

  return (
    <Navbar className="navbar-custom" collapseOnSelect expand="lg" bg="dark" variant="dark" style={{ minWidth: "1300px !important;" }}>
      <Container fluid>
        <LinkContainer to='/' style={{ marginLeft: "8%" }}>
          <Navbar.Brand >
            <img
              alt=""
              src="/quizzit_logo.png"
              width="30px"
              height="30px"
              className="d-inline-block align-top"
            />{' '}
            Quizzit
          </Navbar.Brand>
        </LinkContainer>

        <Form className="d-flex me-auto" style={{ marginLeft: "2%", width: "30%" }} onSubmit={handleSearch}>
          <FormControl
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            onChange={onQueryChange}
          />
          <i class="bi bi-search" onClick={handleSearch} style={{ color: "white", fontSize: "1.5rem", marginLeft: "2px", marginTop: "2px", cursor: "pointer" }} ></i>
        </Form>

        <Navbar.Collapse id="responsive-navbar-nav" class='ml-auto' style={{ marginRight: "8%" }}>
          {auth.isAuthenticated ?
            (

              <Nav justify>
                <NavDropdown
                  id="nav-dropdown"
                  title={
                    <div>
                      <Image roundedCircle
                        src="/favicon.ico"
                        alt="user pic"
                        style={{ height: "40px", width: "40px" }}
                      />
                      {auth.user.username}
                    </div>

                  }
                  menuVariant="dark"
                >
                  <NavDropdown.Item href="#"><LinkContainer to='/profile'><Nav.Link className="text-white">View Profile</Nav.Link></LinkContainer></NavDropdown.Item>
                  <NavDropdown.Item href="#"><LinkContainer to='/friends'><Nav.Link className="text-white">Friends</Nav.Link></LinkContainer></NavDropdown.Item>
                  <NavDropdown.Item href="#"><Nav.Link onClick={handleShowCreatePlatform} className="text-white">Create Platform</Nav.Link></NavDropdown.Item>
                  <NavDropdown.Item href="#"><LinkContainer to='/viewSubmission'><Nav.Link className="text-white">View Submissions</Nav.Link></LinkContainer></NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item className="text-light" onClick={() => dispatch(logout(history))} href="#">Logout</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            ) : (<Nav.Link onClick={handleShowSignIn} href="">Sign In</Nav.Link>)}
        </Navbar.Collapse>

        {auth.user && !isGetInboxLoading && (
          <NavbarCollapse>
            <Nav>
              <NavDropdown
                id='notification'
                title= {
                  <div style={{display: "flex", justifyContent: "center"}}>
                    <i style={{color:"white", marginRight: "5px", fontSize: "1.5rem"}} class="bi bi-bell"></i>
                    {
                      inboxTotalUnreadCount > 0 &&
                      <div style={{color:"red"}}>{inboxTotalUnreadCount}</div>
                    }
                  </div>
                }
                show={showNotifications}
                onToggle={(isOpen, event) => {
                  if (event.source !== 'select')
                    setShowNotifications(isOpen)
                }}
                >
                  <div style={{maxHeight: '100px', overflowY: 'scroll'}} onScroll={(e) => handleScroll(e, 'notification')}>
                  {inbox.map(i => <NavDropdown.Item key={i._id} onClick={() => dispatch(readNotification(auth.user.id, i._id))}>{i.message}</NavDropdown.Item>)}
                  </div>

              </NavDropdown>
            </Nav>
          </NavbarCollapse>)}

          {auth.user && !isGetFriendRequestsLoading && (
          <NavbarCollapse>
            <Nav>
              <NavDropdown
                id='friendRequests'
                title= {
                  <div style={{display: "flex", justifyContent: "center"}}>
                    <i style={{color:"white", marginRight: "5px", fontSize: "1.5rem"}} class="bi bi-people"></i>
                    {
                      friendRequestsTotalCount> 0 &&
                      <div style={{color:"red"}}>{friendRequestsTotalCount}</div>
                    }
                  </div>  
                }
                show={showFriendRequests}
                onToggle={(isOpen, event) => {
                  if (event.source !== 'select')
                    setShowFriendRequests(isOpen)
                }}
                >
                  <div style={{maxHeight: '100px', overflowY: 'scroll'}} onScroll={(e) => handleScroll(e, 'friendRequests')}>
                  {friendRequests.map(u => <NavDropdown.Item key={u._id}>
                    {u.username}
                    <i className="bi bi-x-circle" style={{float: 'right', marginLeft: '10px'}} onClick={() => dispatch(declineFriendRequest(auth.user.id, u._id))}></i>
                    <i className="bi bi-check2-circle" style={{float: 'right'}} onClick={() => dispatch(acceptFriendRequest(auth.user.id, u._id))}></i>
                    </NavDropdown.Item>)}
                  </div>

              </NavDropdown>
            </Nav>
          </NavbarCollapse>)}
        

        <SignIn show={showSignIn} handleShowSignUp={handleShowSignUp} handleClose={handleCloseSignIn} />
        <SignUp show={showSignUp} handleClose={handleCloseSignUp} />
        <CreatePlatform show={showCreatePlatform} handleClose={handleCloseCreatePlatform} />

      </Container>
    </Navbar>
  )
}

export default AppNavbar;

// {auth.isAuthenticated ? (<Button onClick={() => dispatch(logout(history))}>Logout</Button>) 
//                     : <NavbarCollapse id='responsive-navbar-nav'>
//                         <LinkContainer to='/signin'><Nav.Link>Sign In</Nav.Link></LinkContainer>
//                       </NavbarCollapse>}