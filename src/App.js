import BookGrid from './Components/BookGrid'
import Navigation from './Components/Navigation'
import Login from './Views/Login'
import BookInfo from './Views/BookInfo'
import MyBooks from './Views/MyBooks'
import OwnedBookView from './Views/OwnedBookView'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './custom-css.css'

const App = () => {
  const user = useSelector(state => state.login.user)

  if (user === null) {
    return (
      <Login />
    )
  }

  return (
    <Router>
      <Switch>
        <Route path="/search/:etag">
          <Navigation showSort={false} />
          <BookInfo />
        </Route>
        <Route path="/search">
          <Navigation showSort={false}/>
          <BookGrid />
        </Route>
        <Route path="/:title">
          <Navigation showSort={false}/>
          <OwnedBookView />
        </Route>
        <Route path="/">
          <MyBooks />
        </Route>
      </Switch>       
    </Router>
  );
}

export default App;
