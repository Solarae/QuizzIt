// import TodoList from './components/TodoList';
import React, { useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AppNavbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";

import './App.css'; // overridden css after all other css

import { io } from 'socket.io-client'

import Home from './pages/Home';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import Friends from './pages/Friends'
import Platform from './pages/Platform';
import PlatformLeaderboard from './pages/PlatformLeaderboard';
import GlobalLeaderboard from './pages/GlobalLeaderboard';
import EditPlatform from './pages/EditPlatform';
import Search from './pages/Search';

import Quiz from './pages/Quiz'
import EditQuiz from './pages/EditQuiz'
import TakeQuiz from './pages/TakeQuiz'
import QuizLeaderboard from './pages/QuizLeaderboard'
import Upload from './pages/Upload'
import CountDownTimer from './components/Quiz/CountDownTimer'

import { useSelector, useDispatch } from 'react-redux'
import { getSignedIn, connectSocket } from './actions/authActions'
import ViewSubmission from './pages/ViewSubmission';
import ReviewSubmission from './pages/ReviewSubmission';
import ViewPlatformReport from './pages/ViewPlatformReport.js';
import ViewQuizReport from './pages/ViewQuizReport.js'
import { URL } from './config'
import MyQuizzes from './pages/MyQuizzes';

function App() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)
  const socket = useSelector((state) => state.auth.socket)
  
  // Try logging in wth token and setup socket
  useEffect(() => {
    dispatch(getSignedIn())
    dispatch(connectSocket(io(URL)))
  }, []);

  useEffect(() => {
    if (socket && user) {
      socket.emit('newUser', user.id)
      socket.on("Hello", (data) => {
        console.log("RECEIVED MESSAGE FROM SERVER")
      });
    }
      
  }, [socket, user]);

  return (
    <BrowserRouter>
      <AppNavbar />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/search' exact component={Search} />
        <Route path='/profile/:id' exact component={Profile} />
        <Route path='/profile/:id/edit' exact component={EditProfile} />
        <Route path='/friends' exact component={Friends} />
        <Route path='/platform/:id' exact component={Platform} />
        <Route path='/platform/:id/leaderboard' exact component={PlatformLeaderboard} />
        <Route path='/platform/:id/edit' exact component={EditPlatform} />
        <Route path='/platform/:id/quiz/:qid' exact component={Quiz} />
        <Route path='/platform/:id/quiz/:qid/edit' exact component={EditQuiz} />
        <Route path='/platform/:id/quiz/:qid/take' exact component={TakeQuiz} />
        <Route path='/upload' exact component={Upload} />
        <Route path='/countdown' exact component={CountDownTimer} />
        <Route path='/viewSubmission' exact component={ViewSubmission} />
        <Route path='/submission/reviewSubmission/:id' exact component={ReviewSubmission} />
        <Route path='/platform/:id/quiz/:qid/leaderboard' exact component={QuizLeaderboard} />
        <Route path='/viewPlatformReport' exact component={ViewPlatformReport} />
        <Route path='/viewQuizReport/:id' exact component={ViewQuizReport} />
        <Route path='/leaderboard' exact component={GlobalLeaderboard} />
        <Route path='/myQuizzes' exact component={MyQuizzes} />
        {/* <Route path='/todos' exact component={TodoList}/> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
