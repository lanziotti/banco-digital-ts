import './styles.css';
import HeaderLogin from '../../components/HeaderLogin';
import ImageRegister from '../../assets/image-register.svg';
import CircleIcon from '../../assets/circle.svg';
import EyeIcon from '../../assets/eye.svg';
import EyeCloseIcon from '../../assets/eye-close.svg';
import { useContext, useEffect } from 'react';
import { GlobalContext } from '../../contexts/GlobalContext';
import ModalLogin from '../../components/ModalLogin';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { notifyError, notifySucess } from '../../utils/notifications';
import { getItem, setItem } from '../../utils/storage';


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

    useEffect(() => {
        const token = getItem('token');

        if (token) {
            navigate('/main');
        }
    }, [navigate]);

    async function handleSubmitRegister(e) {
        e.preventDefault();

        try {
            if (!formRegister.name || !formRegister.cpf || !formRegister.date_of_birth || !formRegister.telephone || !formRegister.email || !formRegister.password_app || !formRegister.password_transaction) {
                return notifyError('Todos os campos são obrigatórios.');
            }

            await api.post('/conta',
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


            notifySucess('Sua conta Digital Banking foi criada com sucesso!');

            const responseLogin = await api.post('/login', {
                email: formRegister.email,
                senha: formRegister.password_app
            });

            const { usuario, token } = responseLogin.data;

            setItem('token', token);
            setItem('userId', usuario.id);
            setItem('userName', usuario.nome);
            setItem('userBalance', usuario.saldo);
            setItem('userCpf', usuario.cpf);
            setItem('userEmail', usuario.email);
            setItem('userDataNascimento', usuario.data_nascimento);
            setItem('userTelefone', usuario.telefone);

            setFormRegister({ ...defaultFormRegister });

            navigate('/main');

        } catch (error) {
            notifyError(error.response.status === 400 && (error.response.data.mensagem === 'Já existe uma conta aberta com esse CPF.' || error.response.data.mensagem === 'Já existe uma conta aberta com esse E-MAIL.') ? error.response.data.mensagem : error.response.data[0].mensagem);
        }
    }

    function handleChangeFormRegister({ target }) {
        setFormRegister({ ...formRegister, [target.name]: target.value });
    }

    return (
        <>
            <div className='container-register'>
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
                            autoComplete='off'
                        >
                            <div className='container-inputs'>
                                <div className='container-input'>
                                    <label htmlFor='name'>Nome</label>
                                    <input type='password' className='stealthy' tabIndex='-1' />
                                    <input
                                        placeholder='Ex: José Silva'
                                        type='text'
                                        name='name'
                                        value={formRegister.name}
                                        autoComplete='off'
                                        onChange={handleChangeFormRegister}
                                    />
                                    <input type='password' className='stealthy' tabIndex='-1' />
                                </div>
                                <div className='container-input'>
                                    <label htmlFor='cpf'>CPF</label>
                                    <input type='password' className='stealthy' tabIndex='-1' />
                                    <input
                                        placeholder='Somente números. Ex: 00000000000'
                                        type='text'
                                        name='cpf'
                                        value={formRegister.cpf}
                                        autoComplete='off'
                                        onChange={handleChangeFormRegister}
                                    />
                                    <input type='password' className='stealthy' tabIndex='-1' />
                                </div>
                                <div className='container-input'>
                                    <label htmlFor='date_of_birth'>Data de Nascimento</label>
                                    <input type='password' className='stealthy' tabIndex='-1' />
                                    <input
                                        placeholder='Ano-Mês-Dia. Ex: 1990-05-20'
                                        type='date'
                                        name='date_of_birth'
                                        value={formRegister.date_of_birth}
                                        autoComplete='off'
                                        onChange={handleChangeFormRegister}
                                    />
                                    <input type='password' className='stealthy' tabIndex='-1' />
                                </div>
                                <div className='container-input'>
                                    <label htmlFor='telephone'>Telefone</label>
                                    <input type='password' className='stealthy' tabIndex='-1' />
                                    <input
                                        placeholder='Ex: (xx)xxxxx-xxxx'
                                        type='text'
                                        name='telephone'
                                        value={formRegister.telephone}
                                        autoComplete='off'
                                        onChange={handleChangeFormRegister}
                                    />
                                    <input type='password' className='stealthy' tabIndex='-1' />
                                </div>
                                <div className='container-input'>
                                    <label htmlFor='email'>E-mail</label>
                                    <input type='text' name='email' className='stealthy' tabIndex='-1' />
                                    <input
                                        placeholder='Ex: jose@email.com'
                                        type='text'
                                        name='email'
                                        value={formRegister.email}
                                        autoComplete='off'
                                        onChange={handleChangeFormRegister}
                                    />
                                    <input type='text' name='email' className='stealthy' tabIndex='-1' />
                                </div>
                                <div className='container-input'>
                                    <label htmlFor='password_app'>Senha  de acesso ao APP</label>
                                    <input type='password' className='stealthy' tabIndex='-1' />
                                    <input
                                        type={showPasswordApp ? 'text' : 'password'}
                                        name='password_app'
                                        value={formRegister.password_app}
                                        autoComplete='off'
                                        onChange={handleChangeFormRegister}
                                    />
                                    <input type='password' className='stealthy' tabIndex='-1' />
                                    <img
                                        src={showPasswordApp ? EyeCloseIcon : EyeIcon}
                                        alt="Senha protegida"
                                        onClick={() => setShowPasswordApp(!showPasswordApp)}
                                    />
                                </div>
                                <div className='container-input'>
                                    <label htmlFor='password_transaction'>Senha para Transações</label>
                                    <input type='password' className='stealthy' tabIndex='-1' />
                                    <input
                                        type={showPasswordTransaction ? 'text' : 'password'}
                                        name='password_transaction'
                                        value={formRegister.password_transaction}
                                        autoComplete='off'
                                        onChange={handleChangeFormRegister}
                                    />
                                    <input type='password' className='stealthy' tabIndex='-1' />
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
