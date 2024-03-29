import { useContext } from 'react';
import CircleIcon from '../../assets/circle.svg';
import DepositIcon from '../../assets/deposit.svg';
import ExtractIcon from '../../assets/extract.svg';
import TransferIcon from '../../assets/transfer.svg';
import WithdrawIcon from '../../assets/withdraw.svg';
import HeaderMain from '../../components/HeaderMain';
import ModalAccountData from '../../components/ModalAccountData';
import ModalDeposit from '../../components/ModalDeposit';
import ModalWithdraw from '../../components/ModalWithdraw';
import ModalTransfer from '../../components/ModalTransfer';
import ModalUpdate from '../../components/ModalUpdate';
import ModalDeleteAccount from '../../components/ModalDeleteAccount';
import { GlobalContext } from '../../contexts/GlobalContext';
import { formatToMoney } from '../../utils/formatters';
import { getItem } from '../../utils/storage';
import './styles.css';
import { useNavigate } from 'react-router-dom';


function Main() {
    const { openModalAccountData,
        openModalDeposit,
        setOpenModalDeposit,
        balance,
        openModalWithdraw,
        setOpenModalWithdraw,
        openModalTransfer,
        setOpenModalTransfer,
        openModalUpdate,
        name,
        openModalDeleteAccount
    } = useContext(GlobalContext);

    const navigate = useNavigate();

    const userName = getItem('userName');
    const userBalance = getItem('userBalance');

    return (
        <>
            <div className='container-main-global'>
                <HeaderMain />
                <main className='container-main'>
                    <div className='container-balance'>
                        <div className='mini-title'>
                            <div className='btn-false btn-false-main'>
                                <span>Área do cliente</span>
                            </div>
                            <img src={CircleIcon} alt='Imagem circulo' />
                        </div>
                        <h2>{`Bem-vindo ${name ? name : userName}`}</h2>
                        <h3>Saldo disponível:</h3>
                        <h1>{balance ? formatToMoney(Number(balance)) : formatToMoney(Number(userBalance))}</h1>
                    </div>
                    <div className='container-patchs'>
                        <h4 className='patchs-title'>O que deseja fazer?</h4>
                        <div className='patchs'>
                            <div
                                className='patch'
                                onClick={() => setOpenModalDeposit(true)}
                            >
                                <div className='patch-img'>
                                    <img src={DepositIcon} alt='Depósito' />
                                </div>
                                <h4>Depósito</h4>
                            </div>
                            <div
                                className='patch'
                                onClick={() => setOpenModalWithdraw(true)}
                            >
                                <div className='patch-img'>
                                    <img src={WithdrawIcon} alt='Saque' />
                                </div>
                                <h4>Saque</h4>
                            </div>
                        </div>
                        <div className='patchs'>
                            <div
                                className='patch'
                                onClick={() => setOpenModalTransfer(true)}
                            >
                                <div className='patch-img'>
                                    <img src={TransferIcon} alt='Transação' />
                                </div>
                                <h4>Transferência</h4>
                            </div>
                            <div
                                className='patch'
                                onClick={() => navigate('/extract')}
                            >
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
            {
                openModalDeposit &&
                <ModalDeposit />
            }
            {
                openModalWithdraw &&
                <ModalWithdraw />
            }
            {
                openModalTransfer &&
                <ModalTransfer />
            }
            {
                openModalUpdate &&
                <ModalUpdate />
            }
            {
                openModalDeleteAccount &&
                <ModalDeleteAccount />
            }
        </>
    );
}

export default Main;
