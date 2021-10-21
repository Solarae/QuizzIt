import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
// import TodoList from './components/TodoList';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AppNavbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <AppNavbar />
      <Switch>
        <Route path='/' exact component={Home} />
        {/* <Route path='/todos' exact component={TodoList}/> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
