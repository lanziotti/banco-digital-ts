import './styles.css';
import BtnClose from '../../assets/btn-close.svg';
import CircleIcon from '../../assets/circle.svg';
import AccountDataImage from '../../assets/account-data-page.svg';
import { useContext } from 'react';
import { GlobalContext } from '../../contexts/GlobalContext';
import { getItem } from '../../utils/storage';

function ModalAccountData() {
  const {
    setOpenModalAccountData
  } = useContext(GlobalContext);

  const userId = getItem('userId');
  const userName = getItem('userName');
  const userBalance = getItem('userBalance');
  const userCpf = getItem('userCpf');
  const userEmail = getItem('userEmail');
  const userDataNascimento = getItem('userDataNascimento');
  const userTelefone = getItem('userTelefone');

  return (
    <div className='container-modal'>
      <div className='content-modal'>
        <img
          className='close-icon'
          src={BtnClose}
          alt='Fechar'
          onClick={() => setOpenModalAccountData(false)}
        />
        <div className='content-form-deposit'>
          <div className='mini-title mini-title-deposit'>
            <div className='btn-false btn-false-login'>
              <span>Dados da Conta</span>
            </div>
            <img src={CircleIcon} alt='Imagem circulo' />
          </div>
          <div className='content-data'>
            <div className='data-complete'>
              <span className='first'>Número</span>
              <span className='second'>{`: ${userId}`}</span>
            </div>
            <div className='data-complete'>
              <span className='first'>Nome do Titular</span>
              <span className='second'>{`: ${userName}`}</span>
            </div>
            <div className='data-complete'>
              <span className='first'>CPF</span>
              <span className='second'>{`: ${userCpf}`}</span>
            </div>
            <div className='data-complete'>
              <span className='first'>E-mail</span>
              <span className='second'>{`: ${userEmail}`}</span>
            </div>
            <div className='data-complete'>
              <span className='first'>Data de Nascimento</span>
              <span className='second'>{`: ${userDataNascimento}`}</span>
            </div>
            <div className='data-complete'>
              <span className='first'>Telefone</span>
              <span className='second'>{`: ${userTelefone}`}</span>
            </div>
            <div className='data-complete'>
              <span className='first'>Saldo Atual</span>
              <span className='second'>{`: ${userBalance}`}</span>
            </div>
          </div>
          <button className='btn-yellow btn-update'>Atualizar Dados</button>
          <button className='btn-red btn-update'>Encerrar Conta</button>
        </div>
        <div className='content-image-account-data'>
          <img src={AccountDataImage} alt='Imagem Login' />
        </div>
      </div>
    </div>
  );
}

export default ModalAccountData;