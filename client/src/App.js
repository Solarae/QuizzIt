// import TodoList from './components/TodoList';
import React, { useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AppNavbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";

import './App.css'; // overridden css after all other css

import Home from './pages/Home';
import Profile from './pages/Profile';
import Platform from './pages/Platform';
import PlatformLeaderboard from './pages/PlatformLeaderboard';
import EditPlatform from './pages/EditPlatform';
import Search from './pages/Search';

import Quiz from './pages/Quiz'
import EditQuiz from './pages/EditQuiz'
import TakeQuiz from './pages/TakeQuiz'
import QuizLeaderboard from './pages/QuizLeaderboard'
import Upload from './pages/Upload'
import CountDownTimer from './components/Quiz/CountDownTimer'

import { useDispatch } from 'react-redux'
import { getSignedIn } from './actions/authActions'
import ViewSubmission from './pages/ViewSubmission';
import ReviewSubmission from './pages/ReviewSubmission';
import ViewReport from './pages/ViewReport.js';

function App() {
  const dispatch = useDispatch()
  
  // try logging in wth token  
  useEffect(() => {
    dispatch(getSignedIn())
  }, []);

  return (
    <BrowserRouter>
      <AppNavbar />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/search' exact component={Search} />
        <Route path='/profile' exact component={Profile} />
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
        <Route path='/viewPlatformReport/:id' exact component={ViewReport} />
        {/* <Route path='/todos' exact component={TodoList}/> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
