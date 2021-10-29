// import TodoList from './components/TodoList';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AppNavbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";

import './App.css'; // overridden css after all other css

import Home from './pages/Home';
import Profile from './pages/Profile';
import Platform from './pages/Platform';

function App() {
  return (
    <BrowserRouter>
      <AppNavbar />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/profile' exact component={Profile} />
        <Route path='/platform/:id' exact component={Platform} />
        <Route path='/platform/:id/quiz/:id' exact component={Quiz} />
        <Route path='/platform/:id/quiz/:id/edit' exact component={EditQuiz} />
        {/* <Route path='/todos' exact component={TodoList}/> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
