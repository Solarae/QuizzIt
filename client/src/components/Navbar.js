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
  const { isGetInboxLoading, inbox, inboxPage, inboxPages, inboxTotalUnreadCount, inboxTotalCount } = useSelector((state) => state.auth)
  const { isGetFriendRequestsLoading, friendRequests, friendRequestsPage, friendRequestsPages, friendRequestsTotalCount } = useSelector((state) => state.auth)
  const history = useHistory()

  const [query, setQuery] = useState("");
  useEffect(() => {
    socket?.on('getInbox', (notifications) => {
      dispatch(getInbox(
        auth.user.id,
        {
          offset: 0,
          limit: 5 * inboxPage
        }
      ))
    })
    socket?.on('receiveFriendRequest', (friendRequest) => {
      dispatch(getFriendRequests(
        auth.user.id,
        {
          offset: 0,
          limit: 5 * friendRequestsPage
        }
      ))
    })
  
  }, [socket])

  useEffect(() => {
    if (auth.user) {
      dispatch(getInbox(
        auth.user.id,
        {
          offset: 0,
          limit: 5 * inboxPage
        }
      ))
      dispatch(getFriendRequests(
        auth.user.id,
        {
          offset: 0,
          limit: 5 * friendRequestsPage
        }
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
    console.log("SCROLLING")
    if (e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight) {
      if (type === 'notification' && inboxPage < inboxPages) {
        console.log("CALL DISPATCH")
        dispatch(getInbox(
          auth.user.id,
          {
            offset: 0,
            limit: 5 * (inboxPage + 1)
          }
        )) 
      } else if (type === 'friendRequests' && friendRequestsPage < friendRequestsPages) {
        console.log("CALLING DISPATCH")
        dispatch(getFriendRequests(
          auth.user.id,
          {
            offset: 0,
            limit: 5 * (friendRequestsPage + 1)
          }
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

        {auth.user && !isGetInboxLoading && (
          <NavbarCollapse class='ml-auto'>
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
                  <div style={{maxHeight: '200px', overflowY: 'scroll'}} onScroll={(e) => handleScroll(e, 'notification')}>
                  {inbox.map(i => <NavDropdown.Item style={ {color: i.read ? 'black': 'red'}} key={i._id} onClick={() => dispatch(readNotification(auth.user.id, i._id))}>{i.message}</NavDropdown.Item>)}
                  </div>

              </NavDropdown>
            </Nav>
          </NavbarCollapse>)}

          {auth.user && !isGetFriendRequestsLoading && (
          <NavbarCollapse class='ml-auto'>
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
                  console.log(event.source)
                  if (event.source !== 'select')
                    setShowFriendRequests(isOpen)
                }}
                >
                  <div style={{maxHeight: '150px', overflowY: 'scroll'}} onScroll={(e) => handleScroll(e, 'friendRequests')}>
                  {friendRequests.map(u => <NavDropdown.Item key={u._id}>
                    <div onClick={() => history.push(`/profile/${u._id}`)}>
                      <Image
                          className="bg-dark"
                          src={u.icon !== "" ? u.icon : "/quizzit_logo.png"}
                          style={{ height: "50px", width: "50px", border: 'solid', borderColor: "white", padding: '0', marginRight: '5px' }}
                          roundedCircle
                          fluid
                      />
                      {u.username}
                      <i className="bi bi-x-circle" style={{float: 'right', marginLeft: '10px'}} onClick={() => dispatch(declineFriendRequest(auth.user.id, u._id))}></i>
                      <i className="bi bi-check2-circle" style={{float: 'right'}} onClick={() => dispatch(acceptFriendRequest(auth.user.id, u._id))}></i>
                    </div>
                    </NavDropdown.Item>)}
                  </div>

              </NavDropdown>
            </Nav>
          </NavbarCollapse>)}

        <Navbar.Collapse id="responsive-navbar-nav" class='ml-auto' style={{ marginRight: "8%" }}>
          {auth.isAuthenticated ?
            (

              <Nav justify>
                <NavDropdown
                  id="nav-dropdown"
                  title={
                    <div>
                      <Image 
                        className="bg-dark"
                        src={auth.user.icon && auth.user.icon !== "" ? auth.user.icon : "/quizzit_logo.png"}
                        style={{ height: "40px", width: "40px", border:'solid', borderColor: "white", padding:'0', marginRight:'5px' }}
                        roundedCircle 
                        fluid 
                      />
                      {auth.user.username}
                    </div>

                  }
                  menuVariant="dark"
                >
                  <NavDropdown.Item href="#"><LinkContainer to={`/profile/${auth.user.id}`}><Nav.Link className="text-white">My Profile</Nav.Link></LinkContainer></NavDropdown.Item>
                  <NavDropdown.Item href="#"><LinkContainer to='/friends'><Nav.Link className="text-white">Friends</Nav.Link></LinkContainer></NavDropdown.Item>
                  <NavDropdown.Item href="#"><Nav.Link onClick={handleShowCreatePlatform} className="text-white">Create Platform</Nav.Link></NavDropdown.Item>
                  <NavDropdown.Item href="#"><LinkContainer to='/viewSubmission'><Nav.Link className="text-white">View Submissions</Nav.Link></LinkContainer></NavDropdown.Item>
                  <NavDropdown.Item href="#"><LinkContainer to='/myQuizzes'><Nav.Link className="text-white">View My Quizzes</Nav.Link></LinkContainer></NavDropdown.Item>
                  {
                    auth.user.role == "Admin" ? <NavDropdown.Item href="#"><LinkContainer to='/viewPlatformReport'><Nav.Link className="text-white">View Platform Reports</Nav.Link></LinkContainer></NavDropdown.Item> : <></>

                  }
                  <NavDropdown.Divider />
                  <NavDropdown.Item className="text-light" onClick={() => {
                    dispatch(logout(history))
                    socket?.emit("logout", auth.user.id);
                  }} href="#">Logout</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            ) : (<Nav.Link onClick={handleShowSignIn} href="" style={{color:'white'}}>Sign In</Nav.Link>)}
        </Navbar.Collapse>

        
        

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