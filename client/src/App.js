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
import Upload from './pages/Upload'
import CountDownTimer from './components/Quiz/CountDownTimer'
import QuizLeaderboard from './pages/QuizLeaderboard'

import { useSelector, useDispatch } from 'react-redux'
import { tokenLogin } from './actions/authActions'
import ViewSubmission from './pages/ViewSubmission';

function App() {
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)

  // try logging in wth token  
  useEffect(() => {
    dispatch(tokenLogin({
      token: auth.token
    }))
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
        <Route path='/platform/:id/quiz/:qid/leaderboard' exact component={QuizLeaderboard} />
        {/* <Route path='/todos' exact component={TodoList}/> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
