import './styles.css';
import LogoImage from '../../assets/logo.svg';
import BtnArrowIcon from '../../assets/btn-arrow.svg';

function Header() {
  return (
    <header className='header'>
        <img src={LogoImage} alt='Logo' />
        <div className='login-targeting'>
            <span>Já possui uma conta?</span>
            <img src={BtnArrowIcon} alt='Ir para Login' />
        </div>
    </header>
  );
}

export default Header;