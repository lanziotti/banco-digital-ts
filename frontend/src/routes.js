import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home';
import Main from './pages/Main';
import Extract from './pages/Extract';
import Register from './pages/Register';
import { getItem } from './utils/storage';

function ProtectedRoutes({ redirectTo }) {
    const token = getItem('token');

    return token ? <Outlet /> : <Navigate to={redirectTo} />;
}

function AppRoutes() {
    return (
        <>
            <ToastContainer />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/register' element={<Register />} />

                <Route element={<ProtectedRoutes redirectTo='/' />}>
                    <Route path='/main' element={<Main />} />
                    <Route path='/extract' element={<Extract />} />
                </Route>
            </Routes>
        </>
    );
}

export default AppRoutes;