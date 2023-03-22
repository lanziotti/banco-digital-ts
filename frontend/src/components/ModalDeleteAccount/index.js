import './styles.css';
import BtnClose from '../../assets/btn-close.svg';
import DeleteAccountImage from '../../assets/delete-account-page.svg';

function ModalDeleteAccount() {
  return (
    <div className='container-modal'>
      <div className='content-modal'>
        <img className='close-icon' src={BtnClose} alt='Fechar' />
        <div className='content-form-login'>
          <h2>Tem certeza que deseja encerrar sua conta?</h2>
            <button className='btn-green btn-black-login btn-green-size'>Sim</button>
            <button className='btn-red btn-black-login'>Não</button>
        </div>
        <div className='content-image-login'>
          <img src={DeleteAccountImage} alt='Imagem Login' />
        </div>
      </div>
    </div>
  );
}

export default ModalDeleteAccount;