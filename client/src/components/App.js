import { Routes, Route } from 'react-router-dom';
import Layout from './views/Layout/Layout';
import LandingPage from './views/LandingPage/LandingPage';
import LoginPage from './views/LoginPage/LoginPage';
import RegisterPage from './views/RegisterPage/RegisterPage';
import MovieDetail from './views/MovieDetail/MovieDetail';
import FavoritePage from './views/FavoritePage/FavoritePage';
import NotFoundPage from './views/NotFoundPage/NotFoundPage';

function App() {

  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<LandingPage/>}/>
        <Route path='movie/:movieId' element={<MovieDetail/>}/>
        <Route path='favorite' element={<FavoritePage/>} />
      </Route>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/register' element={<RegisterPage/>}/>
      <Route path='*' element={<NotFoundPage/>}/>
    </Routes>
  );
}

export default App;
