import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Deposit } from './Deposit';
import { Transfer } from './Transfer';
import { Withdraw } from './Withdraw';

@Entity('contas')
export class Account {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'numeric' })
    saldo: number

    @Column({ type: 'text' })
    nome: string

    @Column({ type: 'integer', unique: true })
    cpf: number

    @Column({ type: 'date' })
    data_nascimento: Date

    @Column({ type: 'text' })
    telefone: string

    @Column({ type: 'text', unique: true })
    email: string

    @Column({ type: 'text' })
    senha_app: string

    @Column({ type: 'text' })
    senha_transacao: string

    @OneToMany(() => Deposit, deposit => deposit.account)
    deposits: Deposit[]

    @OneToMany(() => Withdraw, withdraw => withdraw.account)
    withdrawals: Withdraw[]

    @OneToMany(() => Transfer, transfer => transfer.account_origin)
    transfers_origin: Transfer[]

    @OneToMany(() => Transfer, transfer => transfer.account_destiny)
    transfers_destiny: Transfer[]
}