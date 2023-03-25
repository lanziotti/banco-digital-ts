import './styles.css';
import BtnClose from '../../assets/btn-close.svg';
import CircleIcon from '../../assets/circle.svg';
import AccountDataImage from '../../assets/account-data-page.svg';
import { useContext } from 'react';
import { GlobalContext } from '../../contexts/GlobalContext';
import { getItem } from '../../utils/storage';
import { formatToDate, formatToMoney } from '../../utils/formatters';

function ModalAccountData() {
  const {
    setOpenModalAccountData,
    balance,
    setOpenModalUpdate,
    id,
    name,
    cpf,
    emailData,
    dateOfBirth,
    telephone
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
        <div className='content-form-account-data'>
          <div className='mini-title mini-title-deposit'>
            <div className='btn-false btn-false-login'>
              <span>Dados da Conta</span>
            </div>
            <img src={CircleIcon} alt='Imagem circulo' />
          </div>
          <div className='content-data'>
            <div className='data-complete'>
              <span className='first'>Número</span>
              <span className='second'>{`: ${id ? id : userId}`}</span>
            </div>
            <div className='data-complete'>
              <span className='first'>Nome do Titular</span>
              <span className='second'>{`: ${name ? name : userName}`}</span>
            </div>
            <div className='data-complete'>
              <span className='first'>CPF</span>
              <span className='second'>{`: ${cpf ? cpf : userCpf}`}</span>
            </div>
            <div className='data-complete'>
              <span className='first'>E-mail</span>
              <span className='second'>{`: ${emailData ? emailData : userEmail}`}</span>
            </div>
            <div className='data-complete'>
              <span className='first'>Data de Nascimento</span>
              <span className='second'>{`: ${dateOfBirth ? formatToDate(dateOfBirth) : formatToDate(userDataNascimento)}`}</span>
            </div>
            <div className='data-complete'>
              <span className='first'>Telefone</span>
              <span className='second'>{`: ${telephone ? telephone : userTelefone}`}</span>
            </div>
            <div className='data-complete'>
              <span className='first'>Saldo Atual</span>
              <span className='second'>{`: ${balance ? formatToMoney(Number(balance)) : formatToMoney(Number(userBalance))}`}</span>
            </div>
          </div>
          <button
            className='btn-yellow btn-update'
            onClick={() => {
              setOpenModalUpdate(true)
              setOpenModalAccountData(false)
            }}
          >Atualizar Dados</button>
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