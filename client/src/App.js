import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import AppNavbar from './components/AppNavbar'
import Home from './components/Home';
// import SignIn from './components/SignIn';
// import SignUp from './components/SignUp';
// import TodoList from './components/TodoList';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AppNavbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <AppNavbar />
      <Switch>
        <Route path='/' exact component={Home} />
        {/* <Route path='/signin' exact component={SignIn}/> */}
        {/* <Route path='/signup' exact component={SignUp}/> */}
        {/* <Route path='/todos' exact component={TodoList}/> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
