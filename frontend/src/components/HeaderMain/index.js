import './styles.css';
import LogoImage from '../../assets/logo.svg';
import UserIcon from '../../assets/user.svg';
import LogoutIcon from '../../assets/logout.svg';
import { useNavigate } from 'react-router-dom';
import { clear } from '../../utils/storage';
import { useContext } from 'react';
import { GlobalContext } from '../../contexts/GlobalContext';

function HeaderMain() {
  const {
    setOpenModalLogin,
    setEmail,
    setPasswordApp,
    setShowPasswordLogin,
    setFormRegister,
    defaultFormRegister,
    setShowPasswordApp,
    setShowPasswordTransaction,
    setOpenModalAccountData,
    setName,
    setCpf,
    setEmailData,
    setDateOfBirth,
    setTelephone,
    setId,
    setBalance
  } = useContext(GlobalContext);
  
  const navigate = useNavigate();

  function handleLogout() {
    clear();
    setEmail('');
    setPasswordApp('');
    setOpenModalLogin(false);
    setShowPasswordLogin(false);
    setFormRegister({ ...defaultFormRegister });
    setShowPasswordApp(false);
    setShowPasswordTransaction(false);

    setId(0);
    setName('');
    setCpf('');
    setEmailData('');
    setDateOfBirth('');
    setTelephone('');
    setBalance('');

    navigate('/');
  }

  return (
    <header className='header'>
      <img src={LogoImage} alt='Logo' />
      <div className='header-icons'>
        <div
          className='container-user-data'
          onClick={() => setOpenModalAccountData(true)}
        >
          <span>Dados da conta</span>
          <img src={UserIcon} alt='Dados do Usuário' />
        </div>
        <div
          className='container-logout'
          onClick={handleLogout}
        >
          <span>Sair</span>
          <img src={LogoutIcon} alt='Sair' />
        </div>
      </div>
    </header>
  );
}

export default HeaderMain;