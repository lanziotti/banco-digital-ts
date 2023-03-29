import './styles.css';
import BtnClose from '../../assets/btn-close.svg';
import CircleIcon from '../../assets/circle.svg';
import EyeIcon from '../../assets/eye.svg';
import EyeCloseIcon from '../../assets/eye-close.svg';
import LoginImage from '../../assets/login.svg';
import { useContext, useEffect } from 'react';
import { GlobalContext } from '../../contexts/GlobalContext';
import { useNavigate } from 'react-router-dom';
import { getItem, setItem } from '../../utils/storage';
import { notifyError } from '../../utils/notifications';
import api from '../../services/api';

function ModalLogin() {
  const {
    setOpenModalLogin,
    email,
    setEmail,
    passwordApp,
    setPasswordApp,
    showPasswordLogin,
    setShowPasswordLogin
  } = useContext(GlobalContext);

  const navigate = useNavigate();

  useEffect(() => {
    const token = getItem();

    if (token) {
      navigate('/main');
    }
  }, [navigate]);

  async function handleSubmitLogin(e) {
    e.preventDefault();

    try {
      if (!email || !passwordApp) {
        return notifyError('Todos os campos são obrigatórios.');
      }

      const responseLogin = await api.post('/login', {
        email,
        senha: passwordApp
      });

      const { usuario, token } = responseLogin.data;

      setItem('token', token);
      setItem('userId', usuario.id);
      setItem('userName', usuario.nome);
      setItem('userBalance', usuario.saldo);
      setItem('userCpf', usuario.cpf);
      setItem('userEmail', usuario.email);
      setItem('userDataNascimento', usuario.data_nascimento);
      setItem('userTelefone', usuario.telefone);

      navigate('/main');

    } catch (error) {
      notifyError(error.response.data.mensagem);
    }
  }

  return (
    <div className='container-modal'>
      <div className='content-modal-login'>
        <img
          className='close-icon'
          src={BtnClose}
          alt='Fechar'
          onClick={() => {
            setOpenModalLogin(false)
            setEmail('');
            setPasswordApp('');
            setShowPasswordLogin(false);
          }}
        />
        <div className='content-form-login-new'>
          <h2>Entre no APP</h2>
          <form
            className='form-login'
            autoComplete='off'
            onSubmit={handleSubmitLogin}
          >
            <div className='mini-title mini-title-login'>
              <div className='btn-false btn-false-login'>
                <span>Login</span>
              </div>
              <img src={CircleIcon} alt='Imagem circulo' />
            </div>
            <div className='container-inputs'>
              <div className='container-input'>
                <label htmlFor='email'>E-mail</label>
                <input
                  type='text'
                  name='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className='container-input'>
                <label htmlFor='password_app'>Senha do APP</label>
                <input
                  type={showPasswordLogin ? 'text' : 'password'}
                  name='password_app'
                  value={passwordApp}
                  onChange={(e) => setPasswordApp(e.target.value)}
                />
                <img
                  src={showPasswordLogin ? EyeCloseIcon : EyeIcon}
                  alt="Senha protegida"
                  onClick={() => setShowPasswordLogin(!showPasswordLogin)}
                />
              </div>
            </div>
            <button className='btn-black btn-black-login'>Entrar</button>
          </form>
        </div>
        <div className='content-image-login-new'>
          <img src={LoginImage} alt='Imagem Login' />
        </div>
      </div>
    </div>
  );
}

export default ModalLogin;