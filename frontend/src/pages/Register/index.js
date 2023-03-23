import './styles.css';
import HeaderLogin from '../../components/HeaderLogin';
import ImageRegister from '../../assets/image-register.svg';
import CircleIcon from '../../assets/circle.svg';
import EyeIcon from '../../assets/eye.svg';
import { useContext } from 'react';
import { ModalLoginContext } from '../../contexts/ModalLoginContext';
import ModalLogin from '../../components/ModalLogin'


function Register() {
    const { openModalLogin } = useContext(ModalLoginContext);

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
                        <form className='form-register'>
                            <div className='container-inputs'>
                                <div className='container-input'>
                                    <label htmlFor='name'>Nome</label>
                                    <input
                                        placeholder='Ex: José Silva'
                                        type='text'
                                        name='name'
                                    />
                                </div>
                                <div className='container-input'>
                                    <label htmlFor='cpf'>CPF</label>
                                    <input
                                        placeholder='Somente números. Ex: 00000000000'
                                        type='text'
                                        name='cpf'
                                    />
                                </div>
                                <div className='container-input'>
                                    <label htmlFor='date_of_birth'>Data de Nascimento</label>
                                    <input
                                        placeholder='Ano-Mês-Dia. Ex: 1990-05-20'
                                        type='text'
                                        name='date_of_birth'
                                    />
                                </div>
                                <div className='container-input'>
                                    <label htmlFor='telephone'>Telefone</label>
                                    <input
                                        placeholder='Ex: (xx)xxxxx-xxxx'
                                        type='text'
                                        name='telephone'
                                    />
                                </div>
                                <div className='container-input'>
                                    <label htmlFor='email'>E-mail</label>
                                    <input
                                        placeholder='Ex: jose@email.com'
                                        type='text'
                                        name='email'
                                    />
                                </div>
                                <div className='container-input'>
                                    <label htmlFor='password_app'>Senha  de acesso ao APP</label>
                                    <input
                                        type='password'
                                        name='password_app'
                                    />
                                    <img src={EyeIcon} alt="Senha protegida" />
                                </div>
                                <div className='container-input'>
                                    <label htmlFor='password_transaction'>Senha para Transações</label>
                                    <input
                                        type='password'
                                        name='password_transaction'
                                    />
                                    <img src={EyeIcon} alt="Senha protegida" />
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
