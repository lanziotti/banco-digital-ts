import './styles.css';
import HeaderMain from '../../components/HeaderMain';
import { useContext, useEffect } from 'react';
import { GlobalContext } from '../../contexts/GlobalContext';
import ModalAccountData from '../../components/ModalAccountData';
import ModalUpdate from '../../components/ModalUpdate';
import ModalDeleteAccount from '../../components/ModalDeleteAccount';
import { loadExtract } from '../../utils/requisitions';
import { formatToDate, formatToMoney } from '../../utils/formatters';

function Extract() {
    const { openModalAccountData,
        openModalUpdate,
        openModalDeleteAccount,
        depositsTransactions,
        setDepositsTransactions,
        withdrawTransactions,
        setWithdrawTransactions,
        sentTransfers,
        setSentTransfers,
        incomingTransfers,
        setIncomingTransfers
    } = useContext(GlobalContext);

    useEffect(() => {
        setDepositsTransactions([]);
        setWithdrawTransactions([]);
        setSentTransfers([]);
        setIncomingTransfers([]);

        async function getAllTransactions() {
            const allTransacions = await loadExtract();

            setDepositsTransactions([...allTransacions.depositos]);
            setWithdrawTransactions([...allTransacions.saques]);
            setSentTransfers([...allTransacions.transferenciasEnviadas]);
            setIncomingTransfers([...allTransacions.transferenciasRecebidas]);
        }

        getAllTransactions();
    }, [setDepositsTransactions, setWithdrawTransactions, setSentTransfers, setIncomingTransfers]);

    return (
        <>
            <div className='container'>
                <HeaderMain />
                <main className='main-extract'>
                    <div className='container-deposits'>
                        <div className='title'>
                            <h2>Depósitos</h2>
                        </div>
                        <div className='sub-title'>
                            <h3 className='number_id'>Número ID</h3>
                            <h3>Valor</h3>
                            <h3 className='date'>Data</h3>
                        </div>
                        {depositsTransactions.map((deposit) => (
                            <div className='record' key={deposit.id}>
                                <span className='number_id_record'>{deposit.id}</span>
                                <span className='value_record'>{formatToMoney(Number(deposit.valor))}</span>
                                <span className='date_record'>{formatToDate(deposit.data)}</span>
                            </div>
                        ))}
                    </div>
                    <div className='container-deposits'>
                        <div className='title'>
                            <h2>Saques</h2>
                        </div>
                        <div className='sub-title'>
                            <h3 className='number_id'>Número ID</h3>
                            <h3>Valor</h3>
                            <h3 className='date'>Data</h3>
                        </div>
                        {withdrawTransactions.map((withdraw) => (
                            <div className='record' key={withdraw.id}>
                                <span className='number_id_record'>{withdraw.id}</span>
                                <span className='value_record'>{formatToMoney(Number(withdraw.valor))}</span>
                                <span className='date_record'>{formatToDate(withdraw.data)}</span>
                            </div>
                        ))}
                    </div>
                    <div className='container-deposits'>
                        <div className='title'>
                            <h2>Transferências Enviadas</h2>
                        </div>
                        <div className='sub-title'>
                            <h3 className='number_id_transfer'>Número ID</h3>
                            <h3 className='value_transfer'>Valor</h3>
                            <h3 className='date_transfer'>Data</h3>
                            <h3>N° Conta Destino</h3>
                        </div>
                        {sentTransfers.map((sentTransfer) => (
                            <div className='record' key={sentTransfer.id}>
                                <span className='number_id_record_transfer'>{sentTransfer.id}</span>
                                <span className='value_record_transfer'>{formatToMoney(Number(sentTransfer.valor))}</span>
                                <span className='date_record_transfer'>{formatToDate(sentTransfer.data)}</span>
                                <span className='number_account'>{sentTransfer.numero_conta_destino}</span>
                            </div>
                        ))}
                    </div>
                    <div className='container-deposits'>
                        <div className='title'>
                            <h2>Transferências Recebidas</h2>
                        </div>
                        <div className='sub-title'>
                            <h3 className='number_id_transfer'>Número ID</h3>
                            <h3 className='value_transfer'>Valor</h3>
                            <h3 className='date_transfer'>Data</h3>
                            <h3>N° Conta Origem</h3>
                        </div>
                        {incomingTransfers.map((incomingTransfer) => (
                            <div className='record' key={incomingTransfer.id}>
                                <span className='number_id_record_transfer'>{incomingTransfer.id}</span>
                                <span className='value_record_transfer'>{formatToMoney(Number(incomingTransfer.valor))}</span>
                                <span className='date_record_transfer'>{formatToDate(incomingTransfer.data)}</span>
                                <span className='number_account'>{incomingTransfer.numero_conta_origem}</span>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
            {
                openModalAccountData &&
                <ModalAccountData />
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

export default Extract;
