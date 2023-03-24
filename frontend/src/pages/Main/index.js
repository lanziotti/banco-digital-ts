import './styles.css';
import HeaderMain from '../../components/HeaderMain';
import CircleIcon from '../../assets/circle.svg';
import DepositIcon from '../../assets/deposit.svg';
import WithdrawIcon from '../../assets/withdraw.svg';
import TransferIcon from '../../assets/transfer.svg';
import ExtractIcon from '../../assets/extract.svg';
import { getItem } from '../../utils/storage';
import { useContext } from 'react';
import { GlobalContext } from '../../contexts/GlobalContext';
import ModalAccountData from '../../components/ModalAccountData';


function Main() {
    const { openModalAccountData
    } = useContext(GlobalContext);

    const userName = getItem('userName');
    const userBalance = getItem('userBalance');

    return (
        <>
            <div className='container'>
                <HeaderMain />
                <main className='container-main'>
                    <div className='container-balance'>
                        <div className='mini-title'>
                            <div className='btn-false btn-false-main'>
                                <span>Área do cliente</span>
                            </div>
                            <img src={CircleIcon} alt='Imagem circulo' />
                        </div>
                        <h2>{`Bem-vindo ${userName}`}</h2>
                        <h3>Saldo disponível:</h3>
                        <h1>{`R$ ${userBalance}`}</h1>
                    </div>
                    <div className='container-patchs'>
                        <h4 className='patchs-title'>O que deseja fazer?</h4>
                        <div className='patchs'>
                            <div className='patch'>
                                <div className='patch-img'>
                                    <img src={DepositIcon} alt='Depósito' />
                                </div>
                                <h4>Depósito</h4>
                            </div>
                            <div className='patch'>
                                <div className='patch-img'>
                                    <img src={WithdrawIcon} alt='Saque' />
                                </div>
                                <h4>Saque</h4>
                            </div>
                        </div>
                        <div className='patchs'>
                            <div className='patch'>
                                <div className='patch-img'>
                                    <img src={TransferIcon} alt='Transação' />
                                </div>
                                <h4>Transferência</h4>
                            </div>
                            <div className='patch'>
                                <div className='patch-img'>
                                    <img src={ExtractIcon} alt='Extrato' />
                                </div>
                                <h4>Extrato</h4>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            {
                openModalAccountData &&
                <ModalAccountData />
            }
        </>
    );
}

export default Main;
