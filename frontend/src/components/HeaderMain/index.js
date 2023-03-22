import './styles.css';
import LogoImage from '../../assets/logo.svg';
import UserIcon from '../../assets/user.svg';
import LogoutIcon from '../../assets/logout.svg';

function HeaderMain() {
  return (
    <header className='header'>
      <img src={LogoImage} alt='Logo' />
      <div className='header-icons'>
        <div className='container-user-data'>
          <span>Dados da conta</span>
          <img src={UserIcon} alt='Dados do Usuário' />
        </div>
        <div className='container-logout'>
          <span>Sair</span>
          <img src={LogoutIcon} alt='Sair' />
        </div>
      </div>
    </header>
  );
}

export default HeaderMain;