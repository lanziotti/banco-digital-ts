import './styles.css';
import HeaderLogin from '../../components/HeaderLogin';
import ImageRegister from '../../assets/image-register.svg';
import CircleIcon from '../../assets/circle.svg';
import EyeIcon from '../../assets/eye.svg';
import EyeCloseIcon from '../../assets/eye-close.svg';
import { useContext } from 'react';
import { GlobalContext } from '../../contexts/GlobalContext';
import ModalLogin from '../../components/ModalLogin';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { notifyError, notifySucess } from '../../utils/notifications';


function Register() {
    const {
        openModalLogin,
        formRegister,
        setFormRegister,
        defaultFormRegister,
        showPasswordApp,
        setShowPasswordApp,
        showPasswordTransaction,
        setShowPasswordTransaction
    } = useContext(GlobalContext);

    const navigate = useNavigate();

    async function handleSubmitRegister(e) {
        e.preventDefault();

        try {
            if (!formRegister.name || !formRegister.cpf || !formRegister.date_of_birth || !formRegister.telephone || !formRegister.email || !formRegister.password_app || !formRegister.password_transaction) {
                return notifyError('Todos os campos são obrigatórios.');
            }

            const response = await api.post('/conta',
                {
                    nome: formRegister.name,
                    cpf: formRegister.cpf,
                    data_nascimento: formRegister.date_of_birth,
                    telefone: formRegister.telephone,
                    email: formRegister.email,
                    senha_app: formRegister.password_app,
                    senha_transacao: formRegister.password_transaction
                }
            );

            if (response.status > 204) {
                return notifyError(response.data);
            }

            notifySucess('Sua conta Digital Banking foi criada com sucesso!');

            setFormRegister({ ...defaultFormRegister });

            navigate('/');

        } catch (error) {
            notifyError(error.response.status === 400 ? error.response.data[0].mensagem : error.response.data.mensagem);
        }
    }

    function handleChangeFormRegister({ target }) {
        setFormRegister({ ...formRegister, [target.name]: target.value });
    }

    return (
        <>
            <div className='container'>
                <HeaderLogin />
                <main className='main-register'>
                    <div className='content-paragraph'>
                        <p>Abra sua conta agora e tenha praticidade e segurança com seu dinheiro. É rapidinho...</p>
                        <img src={ImageRegister} alt='Imagem Cadastro' />
                    </div>
                    <div className='content-form'>
                        <div className='mini-title'>
                            <div className='btn-false btn-false-register'>
                                <span>Nova Conta</span>
                            </div>
                            <img src={CircleIcon} alt='Imagem circulo' />
                        </div>
                        <form
                            className='form-register'
                            onSubmit={handleSubmitRegister}
                        >
                            <div className='container-inputs'>
                                <div className='container-input'>
                                    <label htmlFor='name'>Nome</label>
                                    <input
                                        placeholder='Ex: José Silva'
                                        type='text'
                                        name='name'
                                        value={formRegister.name}
                                        onChange={handleChangeFormRegister}
                                    />
                                </div>
                                <div className='container-input'>
                                    <label htmlFor='cpf'>CPF</label>
                                    <input
                                        placeholder='Somente números. Ex: 00000000000'
                                        type='text'
                                        name='cpf'
                                        value={formRegister.cpf}
                                        onChange={handleChangeFormRegister}
                                    />
                                </div>
                                <div className='container-input'>
                                    <label htmlFor='date_of_birth'>Data de Nascimento</label>
                                    <input
                                        placeholder='Ano-Mês-Dia. Ex: 1990-05-20'
                                        type='text'
                                        name='date_of_birth'
                                        value={formRegister.date_of_birth}
                                        onChange={handleChangeFormRegister}
                                    />
                                </div>
                                <div className='container-input'>
                                    <label htmlFor='telephone'>Telefone</label>
                                    <input
                                        placeholder='Ex: (xx)xxxxx-xxxx'
                                        type='text'
                                        name='telephone'
                                        value={formRegister.telephone}
                                        onChange={handleChangeFormRegister}
                                    />
                                </div>
                                <div className='container-input'>
                                    <label htmlFor='email'>E-mail</label>
                                    <input
                                        placeholder='Ex: jose@email.com'
                                        type='text'
                                        name='email'
                                        value={formRegister.email}
                                        onChange={handleChangeFormRegister}
                                    />
                                </div>
                                <div className='container-input'>
                                    <label htmlFor='password_app'>Senha  de acesso ao APP</label>
                                    <input
                                        type={showPasswordApp ? 'text' : 'password'}
                                        name='password_app'
                                        value={formRegister.password_app}
                                        onChange={handleChangeFormRegister}
                                    />
                                    <img
                                        src={showPasswordApp ? EyeCloseIcon : EyeIcon}
                                        alt="Senha protegida"
                                        onClick={() => setShowPasswordApp(!showPasswordApp)}
                                    />
                                </div>
                                <div className='container-input'>
                                    <label htmlFor='password_transaction'>Senha para Transações</label>
                                    <input
                                        type={showPasswordTransaction ? 'text' : 'password'}
                                        name='password_transaction'
                                        value={formRegister.password_transaction}
                                        onChange={handleChangeFormRegister}
                                    />
                                    <img
                                        src={showPasswordTransaction ? EyeCloseIcon : EyeIcon}
                                        alt="Senha protegida"
                                        onClick={() => setShowPasswordTransaction(!showPasswordTransaction)}
                                    />
                                </div>
                            </div>
                            <button className='btn-black'>Abrir Conta</button>
                        </form>
                    </div>
                </main>
            </div>
            {
                openModalLogin &&
                <ModalLogin />
            }
        </>
    );
}

export default Register;
