import { Routes, Route } from 'react-router-dom';
import Layout from './views/Layout/Layout';
import LandingPage from './views/LandingPage/LandingPage';
import LoginPage from './views/LoginPage/LoginPage';
import RegisterPage from './views/RegisterPage/RegisterPage';
import MovieDetail from './views/MovieDetail/MovieDetail';

function App() {

  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<LandingPage/>}/>
        <Route path='movie/:movieId' element={<MovieDetail/>}/>
      </Route>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/register' element={<RegisterPage/>}/>
    </Routes>
  );
}

export default App;
