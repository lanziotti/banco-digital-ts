import './styles.css';
import BtnClose from '../../assets/btn-close.svg';
import CircleIcon from '../../assets/circle.svg';
import EyeIcon from '../../assets/eye.svg';
import UpdateImage from '../../assets/update-page.svg';

function ModalUpdate() {
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
          <form className='form-login'>
            <div className='container-inputs'>
              <div className='container-input-update'>
                <label htmlFor='name'>Nome</label>
                <input
                  type='text'
                  name='name'
                />
              </div>
              <div className='container-input-update'>
                <label htmlFor='cpf'>CPF</label>
                <input
                  type='text'
                  name='cpf'
                />
              </div>
              <div className='container-input-update'>
                <label htmlFor='date_of_birth'>Data de Nascimento</label>
                <input
                  type='text'
                  name='date_of_birth'
                />
              </div>
              <div className='container-input-update'>
                <label htmlFor='telephone'>Telefone</label>
                <input
                  type='text'
                  name='telephone'
                />
              </div>
              <div className='container-input-update'>
                <label htmlFor='email'>E-mail</label>
                <input
                  type='text'
                  name='email'
                />
              </div>
              <div className='container-input-update'>
                <label htmlFor='password_app'>Senha  de acesso ao APP</label>
                <input
                  type='password'
                  name='password_app'
                />
                <img src={EyeIcon} alt="Senha protegida" />
              </div>
              <div className='container-input-update'>
                <label htmlFor='password_transact'>Senha para Transações</label>
                <input
                  type='password'
                  name='password_transact'
                />
                <img src={EyeIcon} alt="Senha protegida" />
              </div>
            </div>
            <button className='btn-yellow btn-black-deposit'>Atualizar</button>
          </form>
        </div>
        <div className='content-image-login'>
          <img src={UpdateImage} alt='Imagem Login' />
        </div>
      </div>
    </div>
  );
}

export default ModalUpdate;