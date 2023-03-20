import './styles.css';
import HeaderLogin from '../../components/HeaderLogin';
import CircleIcon from '../../assets/circle.svg';
import ImageHome from '../../assets/image-home.svg';

function Home() {
  return (
    <div className='container-home'>
      <HeaderLogin />
      <main className='main-home'>
        <div className='content-text'>
          <div className='mini-title'>
            <div className='btn-false btn-false-size'>
              <span>Navegação Digital</span>
            </div>
            <img src={CircleIcon} alt='Imagem circulo' />
          </div>
          <h2>Navegue por todos os nossos</h2>
          <h1>Serviços Bancários</h1>
          <h2>sem problemas</h2>
          <p>Faça o gerenciamento do seu dinheiro de forma rápida e segura. Abra sua conta rapidamente.</p>
          <button className='btn-black'>Abrir Conta</button>
        </div>
        <div className='content-image'>
          <img src={ImageHome} alt='Imagem Home' />
        </div>
      </main>
    </div>
  );
}

export default Home;
