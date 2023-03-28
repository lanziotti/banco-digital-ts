import './styles.css';
import LogoImage from '../../assets/logo.svg';
import BtnArrowIcon from '../../assets/btn-arrow.svg';
import { useContext } from 'react';
import { GlobalContext } from '../../contexts/GlobalContext';

function HeaderLogin() {
  const { setOpenModalLogin } = useContext(GlobalContext);

  return (
    <header className='header'>
      <img src={LogoImage} alt='Logo' />
      <div
        className='login-responsive'
        onClick={() => setOpenModalLogin(true)}
      >
        <span>Login</span>
      </div>
      <div
        className='login-targeting'
        onClick={() => setOpenModalLogin(true)}
      >
        <span>Já possui uma conta?</span>
        <img src={BtnArrowIcon} alt='Ir para Login' />
      </div>
    </header>
  );
}

export default HeaderLogin;