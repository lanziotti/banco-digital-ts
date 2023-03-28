import './styles.css';
import BtnClose from '../../assets/btn-close.svg';
import DeleteAccountImage from '../../assets/delete-account-page.svg';
import { useContext } from 'react';
import { GlobalContext } from '../../contexts/GlobalContext';
import { clear, getItem } from '../../utils/storage';
import { notifyError, notifySucess } from '../../utils/notifications';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

function ModalDeleteAccount() {
  const {
    setOpenModalDeleteAccount,
    setOpenModalAccountData,
    setOpenModalLogin,
    setName,
    setCpf,
    setEmailData,
    setDateOfBirth,
    setTelephone,
    setId,
    setBalance
  } = useContext(GlobalContext);

  const navigate = useNavigate();

  const token = getItem('token');

  async function handleDeleteAccount() {
    try {
      const responseDelete = await api.delete('/conta', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      notifySucess(responseDelete.data.mensagem);

      setOpenModalDeleteAccount(false);
      setOpenModalAccountData(false);
      setOpenModalLogin(false);

      clear();

      setId(0);
      setName('');
      setCpf('');
      setEmailData('');
      setDateOfBirth('');
      setTelephone('');
      setBalance('');

      navigate('/');

    } catch (error) {
      notifyError(error.response.data.mensagem);
    }
  }

  return (
    <div className='container-modal'>
      <div className='content-modal-delete'>
        <img
          className='close-icon'
          src={BtnClose}
          alt='Fechar'
          onClick={() => {
            setOpenModalDeleteAccount(false)
            setOpenModalAccountData(false)
          }}
        />
        <div className='content-form-login'>
          <h2>Tem certeza que deseja encerrar sua conta?</h2>
          <button
            className='btn-green btn-black-login btn-green-size'
            onClick={handleDeleteAccount}
          >Sim</button>
          <button
            className='btn-red btn-black-login'
            onClick={() => {
              setOpenModalDeleteAccount(false)
              setOpenModalAccountData(false)
            }}
          >Não</button>
        </div>
        <div className='content-image-login'>
          <img src={DeleteAccountImage} alt='Imagem Login' />
        </div>
      </div>
    </div>
  );
}

export default ModalDeleteAccount;