import './styles.css';
import HeaderMain from '../../components/HeaderMain';

function Extract() {
  return (
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
            <div className='record'>
                <span className='number_id_record'>43</span>
                <span className='value_record'>R$ 2.000,00</span>
                <span className='date_record'>2023-02-09</span>
            </div>
            <div className='record'>
                <span className='number_id_record'>45</span>
                <span className='value_record'>R$ 1.000,00</span>
                <span className='date_record'>2023-02-12</span>
            </div>
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
            <div className='record'>
                <span className='number_id_record'>9</span>
                <span className='value_record'>R$ 1.500,00</span>
                <span className='date_record'>2023-02-22</span>
            </div>
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
            <div className='record'>
                <span className='number_id_record_transfer'>5</span>
                <span className='value_record_transfer'>R$ 500,00</span>
                <span className='date_record_transfer'>2023-02-18</span>
                <span className='number_account'>7</span>
            </div>
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
            <div className='record'>
                <span className='number_id_record_transfer'>1</span>
                <span className='value_record_transfer'>R$ 800,00</span>
                <span className='date_record_transfer'>2023-02-20</span>
                <span className='number_account'>7</span>
            </div>
        </div>
      </main>
    </div>
  );
}

export default Extract;
