import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import { ToastContainer } from 'react-toastify';

function AppRoutes() {
    return (
        <>
            <ToastContainer />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/register' element={<Register />} />
            </Routes>
        </>
    );
}

export default AppRoutes;