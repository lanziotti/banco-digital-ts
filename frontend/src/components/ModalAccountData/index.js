import './styles.css';
import BtnClose from '../../assets/btn-close.svg';
import CircleIcon from '../../assets/circle.svg';
import AccountDataImage from '../../assets/account-data-page.svg';

function ModalAccountData() {
  return (
    <div className='container-modal'>
      <div className='content-modal'>
        <img className='close-icon' src={BtnClose} alt='Fechar' />
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
              <span className='second'>: 723</span>
            </div>
            <div className='data-complete'>
              <span className='first'>Nome do Titular</span>
              <span className='second'>: Rodrigo</span>
            </div>
            <div className='data-complete'>
              <span className='first'>CPF</span>
              <span className='second'>: 00000000000</span>
            </div>
            <div className='data-complete'>
              <span className='first'>E-mail</span>
              <span className='second'>: rodrigo@email.com</span>
            </div>
            <div className='data-complete'>
              <span className='first'>Data de Nascimento</span>
              <span className='second'>: 1987-09-18</span>
            </div>
            <div className='data-complete'>
              <span className='first'>Telefone</span>
              <span className='second'>: (32)99849-8002</span>
            </div>
            <div className='data-complete'>
              <span className='first'>Saldo Atual</span>
              <span className='second'>: R$ 10.000,00</span>
            </div>
          </div>
          <button className='btn-yellow btn-update'>Atualizar Dados</button>
          <button className='btn-red btn-update'>Encerrar Conta</button>
        </div>
        <div className='content-image-login'>
          <img src={AccountDataImage} alt='Imagem Login' />
        </div>
      </div>
    </div>
  );
}

export default ModalAccountData;