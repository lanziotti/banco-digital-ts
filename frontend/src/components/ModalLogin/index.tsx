import './styles.css';
import BtnClose from '../../assets/btn-close.svg';
import CircleIcon from '../../assets/circle.svg';
import EyeIcon from '../../assets/eye.svg';
import LoginImage from '../../assets/login.svg';

function ModalLogin() {
  return (
    <div className='container-modal'>
      <div className='content-modal'>
        <img className='close-icon' src={BtnClose} alt='Fechar' />
        <div className='content-form-login'>
          <h2>Entre no APP</h2>
          <form className='form-login'>
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
                />
              </div>
              <div className='container-input'>
                <label htmlFor='password_app'>Senha do APP</label>
                <input
                  type='password'
                  name='password_app'
                />
                <img src={EyeIcon} alt="Senha protegida" />
              </div>
            </div>
            <button className='btn-black btn-black-login'>Entrar</button>
          </form>
        </div>
        <div className='content-image-login'>
          <img src={LoginImage} alt='Imagem Login' />
        </div>
      </div>
    </div>
  );
}

export default ModalLogin;