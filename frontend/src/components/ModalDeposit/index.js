import './styles.css';
import BtnClose from '../../assets/btn-close.svg';
import CircleIcon from '../../assets/circle.svg';
import EyeIcon from '../../assets/eye.svg';
import EyeCloseIcon from '../../assets/eye-close.svg';
import DepositImage from '../../assets/deposit-page.svg';
import { useContext } from 'react';
import { GlobalContext } from '../../contexts/GlobalContext';
import { notifyError, notifySucess } from '../../utils/notifications';
import api from '../../services/api';
import { getItem } from '../../utils/storage';
import { loadBalance } from '../../utils/requisitions';

function ModalDeposit() {
  const {
    setOpenModalDeposit,
    showPasswordDeposit,
    setShowPasswordDeposit,
    valueDeposit,
    setValueDeposit,
    passwordDeposit,
    setPasswordDeposit,
    setBalance
  } = useContext(GlobalContext);

  const token = getItem('token');

  async function handleSubmitDeposit(e) {
    e.preventDefault();

    try {
      const responseDeposit = await api.post('/deposito', {
        valor: Number(valueDeposit),
        senha: passwordDeposit
      },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

      notifySucess(responseDeposit.data.mensagem);

      const afterBalance = await loadBalance();

      setValueDeposit('');
      setPasswordDeposit('');
      setShowPasswordDeposit(false);
      setOpenModalDeposit(false);
      setBalance(afterBalance);

    } catch (error) {
      notifyError(error.response.status === 400 ? error.response.data[0].mensagem : error.response.data.mensagem);
    }
  }

  return (
    <div className='container-modal'>
      <div className='content-modal-deposit'>
        <img
          className='close-icon'
          src={BtnClose}
          alt='Fechar'
          onClick={() => {
            setOpenModalDeposit(false)
            setValueDeposit('');
            setPasswordDeposit('');
          }}
        />
        <div className='content-form-deposit-new'>
          <div className='mini-title mini-title-deposit'>
            <div className='btn-false btn-false-login'>
              <span>Depósito</span>
            </div>
            <img src={CircleIcon} alt='Imagem circulo' />
          </div>
          <form
            className='form-deposit'
            autoComplete='off'
            onSubmit={handleSubmitDeposit}
          >
            <div className='container-inputs'>
              <div className='container-input'>
                <label htmlFor='value_deposit'>Valor</label>
                <input
                  type='text'
                  name='value_deposit'
                  value={valueDeposit}
                  onChange={(e) => setValueDeposit(e.target.value)}
                />
              </div>
              <div className='container-input'>
                <label htmlFor='password_transact'>Senha para Transações</label>
                <input
                  type={showPasswordDeposit ? 'text' : 'password'}
                  name='password_transact'
                  value={passwordDeposit}
                  onChange={(e) => setPasswordDeposit(e.target.value)}
                />
                <img
                  src={showPasswordDeposit ? EyeCloseIcon : EyeIcon}
                  alt="Senha protegida"
                  onClick={() => setShowPasswordDeposit(!showPasswordDeposit)}
                />
              </div>
            </div>
            <button className='btn-black btn-black-deposit'>Depositar</button>
          </form>
        </div>
        <div className='content-image-deposit'>
          <img src={DepositImage} alt='Imagem Login' />
        </div>
      </div>
    </div>
  );
}

export default ModalDeposit;