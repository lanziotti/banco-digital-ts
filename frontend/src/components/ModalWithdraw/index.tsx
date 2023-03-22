import './styles.css';
import BtnClose from '../../assets/btn-close.svg';
import CircleIcon from '../../assets/circle.svg';
import EyeIcon from '../../assets/eye.svg';
import WithdrawImage from '../../assets/withdraw-page.svg';

function ModalWithdraw() {
  return (
    <div className='container-modal'>
      <div className='content-modal'>
        <img className='close-icon' src={BtnClose} alt='Fechar' />
        <div className='content-form-deposit'>
          <div className='mini-title mini-title-deposit'>
            <div className='btn-false btn-false-login'>
              <span>Saque</span>
            </div>
            <img src={CircleIcon} alt='Imagem circulo' />
          </div>
          <form className='form-login'>
            <div className='container-inputs'>
              <div className='container-input'>
                <label htmlFor='value_deposit'>Valor</label>
                <input
                placeholder='R$ 1.000,00'
                  type='text'
                  name='value_deposit'
                />
              </div>
              <div className='container-input'>
                <label htmlFor='password_transact'>Senha para Transações</label>
                <input
                  type='password'
                  name='password_transact'
                />
                <img src={EyeIcon} alt="Senha protegida" />
              </div>
            </div>
            <button className='btn-black btn-black-deposit'>Sacar</button>
          </form>
        </div>
        <div className='content-image-login'>
          <img src={WithdrawImage} alt='Imagem Login' />
        </div>
      </div>
    </div>
  );
}

export default ModalWithdraw;