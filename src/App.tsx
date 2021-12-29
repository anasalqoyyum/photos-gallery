import { Switch, Route } from "react-router-dom";
import Album from "./pages/Album";
import Favorite from "./pages/Favorites";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Photo from "./pages/Photo";
import User from "./pages/User";
import "./styles/app.css";

const App = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/albums" component={Home} />
        <Route exact path="/albums/:id" component={Album} />
        <Route exact path="/users/:id" component={User} />
        <Route exact path="/albums/:albumid/:id" component={Photo} />
        <Route exact path="/favorites" component={Favorite} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
};

export default App;
