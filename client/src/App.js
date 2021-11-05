// import TodoList from './components/TodoList';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AppNavbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import "./App.css"; // overridden css after all other css

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Platform from "./pages/Platform";
import EditPlatform from "./pages/EditPlatform";

import Quiz from "./pages/Quiz";
import EditQuiz from "./pages/EditQuiz";
import TakeQuiz from "./pages/TakeQuiz";
import Upload from "./pages/Upload";

function App() {
  return (
    <BrowserRouter>
      <AppNavbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/platform/:id" exact component={Platform} />
        <Route path="/platform/:id/edit" exact component={EditPlatform} />
        <Route path="/platform/:id/quiz/:qid" exact component={Quiz} />
        <Route path="/platform/:id/quiz/:qid/edit" exact component={EditQuiz} />
        <Route path="/platform/:id/quiz/:qid/take" exact component={TakeQuiz} />
        <Route path="/upload" exact component={Upload} />
        {/* <Route path='/todos' exact component={TodoList}/> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
