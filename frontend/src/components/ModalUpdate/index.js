import './styles.css';
import BtnClose from '../../assets/btn-close.svg';
import CircleIcon from '../../assets/circle.svg';
import EyeIcon from '../../assets/eye.svg';
import EyeCloseIcon from '../../assets/eye-close.svg';
import UpdateImage from '../../assets/update-page.svg';
import { useContext } from 'react';
import { GlobalContext } from '../../contexts/GlobalContext';
import { getItem } from '../../utils/storage';
import { notifyError, notifySucess } from '../../utils/notifications';
import api from '../../services/api';
import { loadUpdateData } from '../../utils/requisitions';

function ModalUpdate() {
  const {
    setOpenModalUpdate,
    showPasswordUpdateApp,
    setShowPasswordUpdateApp,
    showPasswordUpdateTransaction,
    setShowPasswordUpdateTransaction,
    formUpdate,
    setFormUpdate,
    defaultFormUpdate,
    setName,
    setCpf,
    setEmailData,
    setDateOfBirth,
    setTelephone,
    setId
  } = useContext(GlobalContext);

  const token = getItem('token');

  async function handleSubmitUpdate(e) {
    e.preventDefault();

    try {
      const responseUpdate = await api.put('/conta', {
        nome: formUpdate.name,
        cpf: formUpdate.cpf,
        data_nascimento: formUpdate.date_of_birth,
        telefone: formUpdate.telephone,
        email: formUpdate.email,
        senha_app: formUpdate.password_app,
        senha_transacao: formUpdate.password_transaction
      },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

      notifySucess(responseUpdate.data.mensagem);

      const updateData = await loadUpdateData();
      
      setId(updateData.id);
      setName(updateData.nome);
      setCpf(updateData.cpf);
      setEmailData(updateData.email);
      setDateOfBirth(updateData.data_nascimento);
      setTelephone(updateData.telefone);
      setFormUpdate({ ...defaultFormUpdate });
      setShowPasswordUpdateApp(false);
      setShowPasswordUpdateTransaction(false);
      setOpenModalUpdate(false);
      
    } catch (error) {
      notifyError(error.response.status === 400 ? error.response.data[0].mensagem : error.response.data.mensagem);
    }
  }

  function handleChangeFormUpdate({ target }) {
    setFormUpdate({ ...formUpdate, [target.name]: target.value });
  }

  return (
    <div className='container-modal'>
      <div className='content-modal'>
        <img
          className='close-icon'
          src={BtnClose} alt='Fechar'
          onClick={() => setOpenModalUpdate(false)}
        />
        <div className='content-form-update'>
          <div className='mini-title mini-title-deposit'>
            <div className='btn-false btn-false-login'>
              <span>Dados da Conta</span>
            </div>
            <img src={CircleIcon} alt='Imagem circulo' />
          </div>
          <form
            className='form-update'
            onSubmit={handleSubmitUpdate}
          >
            <div className='container-inputs-update'>
              <div className='container-input-update'>
                <label htmlFor='name'>Nome</label>
                <input
                  type='text'
                  name='name'
                  value={formUpdate.name}
                  onChange={handleChangeFormUpdate}
                />
              </div>
              <div className='container-input-update'>
                <label htmlFor='cpf'>CPF</label>
                <input
                  type='text'
                  name='cpf'
                  value={formUpdate.cpf}
                  onChange={handleChangeFormUpdate}
                />
              </div>
              <div className='container-input-update'>
                <label htmlFor='date_of_birth'>Data de Nascimento</label>
                <input
                  type='date'
                  name='date_of_birth'
                  value={formUpdate.date_of_birth}
                  onChange={handleChangeFormUpdate}
                />
              </div>
              <div className='container-input-update'>
                <label htmlFor='telephone'>Telefone</label>
                <input
                  type='text'
                  name='telephone'
                  value={formUpdate.telephone}
                  onChange={handleChangeFormUpdate}
                />
              </div>
              <div className='container-input-update'>
                <label htmlFor='email'>E-mail</label>
                <input
                  type='text'
                  name='email'
                  value={formUpdate.email}
                  onChange={handleChangeFormUpdate}
                />
              </div>
              <div className='container-input-update'>
                <label htmlFor='password_app'>Senha  de acesso ao APP</label>
                <input
                  type={showPasswordUpdateApp ? 'text' : 'password'}
                  name='password_app'
                  value={formUpdate.password_app}
                  onChange={handleChangeFormUpdate}
                />
                <img
                  src={showPasswordUpdateApp ? EyeCloseIcon : EyeIcon}
                  alt="Senha protegida"
                  onClick={() => setShowPasswordUpdateApp(!showPasswordUpdateApp)}
                />
              </div>
              <div className='container-input-update'>
                <label htmlFor='password_transaction'>Senha para Transações</label>
                <input
                  type={showPasswordUpdateTransaction ? 'text' : 'password'}
                  name='password_transaction'
                  value={formUpdate.password_transaction}
                  onChange={handleChangeFormUpdate}
                />
                <img
                  src={showPasswordUpdateTransaction ? EyeCloseIcon : EyeIcon}
                  alt="Senha protegida"
                  onClick={() => setShowPasswordUpdateTransaction(!showPasswordUpdateTransaction)}
                />
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