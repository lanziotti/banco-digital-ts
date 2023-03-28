import './styles.css';
import BtnClose from '../../assets/btn-close.svg';
import CircleIcon from '../../assets/circle.svg';
import EyeIcon from '../../assets/eye.svg';
import EyeCloseIcon from '../../assets/eye-close.svg';
import WithdrawImage from '../../assets/withdraw-page.svg';
import { useContext } from 'react';
import { GlobalContext } from '../../contexts/GlobalContext';
import { getItem } from '../../utils/storage';
import { notifyError, notifySucess } from '../../utils/notifications';
import api from '../../services/api';
import { loadBalance } from '../../utils/requisitions';

function ModalWithdraw() {
  const {
    setOpenModalWithdraw,
    showPasswordWithdraw,
    setShowPasswordWithdraw,
    valueWithdraw,
    setValueWithdraw,
    passwordWithdraw,
    setPasswordWithdraw,
    setBalance
  } = useContext(GlobalContext);

  const token = getItem('token');

  async function handleSubmitWithdraw(e) {
    e.preventDefault();

    try {
      const responseWithdraw = await api.post('/saque', {
        valor: Number(valueWithdraw),
        senha: passwordWithdraw
      },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

      notifySucess(responseWithdraw.data.mensagem);

      const afterBalance = await loadBalance();

      setValueWithdraw('');
      setPasswordWithdraw('');
      setShowPasswordWithdraw(false);
      setOpenModalWithdraw(false);
      setBalance(afterBalance);

    } catch (error) {
      notifyError(error.response.status === 400 ? error.response.data[0].mensagem : error.response.data.mensagem);
    }
  }

  return (
    <div className='container-modal'>
      <div className='content-modal-withdraw'>
        <img
          className='close-icon'
          src={BtnClose}
          alt='Fechar'
          onClick={() => {
            setOpenModalWithdraw(false)
            setValueWithdraw('');
            setPasswordWithdraw('');
          }}
        />
        <div className='content-form-deposit'>
          <div className='mini-title mini-title-deposit'>
            <div className='btn-false btn-false-login'>
              <span>Saque</span>
            </div>
            <img src={CircleIcon} alt='Imagem circulo' />
          </div>
          <form
            className='form-withdraw'
            onSubmit={handleSubmitWithdraw}
          >
            <div className='container-inputs'>
              <div className='container-input'>
                <label htmlFor='value_deposit'>Valor</label>
                <input
                  type='text'
                  name='value_deposit'
                  value={valueWithdraw}
                  onChange={(e) => setValueWithdraw(e.target.value)}
                />
              </div>
              <div className='container-input'>
                <label htmlFor='password_transact'>Senha para Transações</label>
                <input
                  type={showPasswordWithdraw ? 'text' : 'password'}
                  name='password_transact'
                  value={passwordWithdraw}
                  onChange={(e) => setPasswordWithdraw(e.target.value)}
                />
                <img
                  src={showPasswordWithdraw ? EyeCloseIcon : EyeIcon}
                  alt="Senha protegida"
                  onClick={() => setShowPasswordWithdraw(!showPasswordWithdraw)}
                />
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