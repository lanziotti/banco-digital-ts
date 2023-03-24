import './styles.css';
import BtnClose from '../../assets/btn-close.svg';
import CircleIcon from '../../assets/circle.svg';
import EyeIcon from '../../assets/eye.svg';
import EyeCloseIcon from '../../assets/eye-close.svg';
import TransferImage from '../../assets/transfer-page.svg';
import { useContext } from 'react';
import { GlobalContext } from '../../contexts/GlobalContext';
import { getItem } from '../../utils/storage';
import api from '../../services/api';
import { notifyError, notifySucess } from '../../utils/notifications';
import { loadBalance } from '../../utils/requisitions';

function ModalTransfer() {
  const {
    setOpenModalTransfer,
    showPasswordTransfer,
    setShowPasswordTransfer,
    destinationAccountNumber,
    setDestinationAccountNumber,
    valueTransfer,
    setValueTransfer,
    passwordTransfer,
    setPasswordTransfer,
    setBalance
  } = useContext(GlobalContext);

  const token = getItem('token');

  async function handleSubmitTransfer(e) {
    e.preventDefault();

    try {
      const responseTransfer = await api.post('/transferencia', {
        numero_conta_destino: Number(destinationAccountNumber),
        valor: Number(valueTransfer),
        senha: passwordTransfer
      },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

      notifySucess(responseTransfer.data.mensagem);

      const afterBalance = await loadBalance();

      setDestinationAccountNumber('');
      setValueTransfer('');
      setPasswordTransfer('');
      setShowPasswordTransfer(false);
      setOpenModalTransfer(false);
      setBalance(afterBalance);

    } catch (error) {
      notifyError(error.response.status === 400 ? error.response.data[0].mensagem : error.response.data.mensagem);
    }
  }

  return (
    <div className='container-modal'>
      <div className='content-modal'>
        <img
          className='close-icon'
          src={BtnClose} alt='Fechar'
          onClick={() => {
            setOpenModalTransfer(false)
            setDestinationAccountNumber('');
            setValueTransfer('');
            setPasswordTransfer('');
          }}
        />
        <div className='content-form-deposit'>
          <div className='mini-title mini-title-deposit'>
            <div className='btn-false btn-false-login'>
              <span>Transferência</span>
            </div>
            <img src={CircleIcon} alt='Imagem circulo' />
          </div>
          <form
            className='form-transfer'
            onSubmit={handleSubmitTransfer}
          >
            <div className='container-inputs'>
              <div className='container-input'>
                <label htmlFor='number_account'>Número da conta do favorecido</label>
                <input
                  type='text'
                  name='number_account'
                  value={destinationAccountNumber}
                  onChange={(e) => setDestinationAccountNumber(e.target.value)}
                />
              </div>
              <div className='container-input'>
                <label htmlFor='value_deposit'>Valor</label>
                <input
                  type='text'
                  name='value_deposit'
                  value={valueTransfer}
                  onChange={(e) => setValueTransfer(e.target.value)}
                />
              </div>
              <div className='container-input'>
                <label htmlFor='password_transact'>Senha para Transações</label>
                <input
                  type={showPasswordTransfer ? 'text' : 'password'}
                  name='password_transact'
                  value={passwordTransfer}
                  onChange={(e) => setPasswordTransfer(e.target.value)}
                />
                <img
                  src={showPasswordTransfer ? EyeCloseIcon : EyeIcon}
                  alt="Senha protegida"
                  onClick={() => setShowPasswordTransfer(!showPasswordTransfer)}
                />
              </div>
            </div>
            <button className='btn-black btn-black-deposit'>Transferir</button>
          </form>
        </div>
        <div className='content-image-login'>
          <img src={TransferImage} alt='Imagem Login' />
        </div>
      </div>
    </div>
  );
}

export default ModalTransfer;