import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Account } from './Account';

@Entity('saques')
export class Withdraw {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'numeric'})
    valor: number

    @Column({type: 'date'})
    data: Date

    @Column({type: 'text'})
    senha: string

    @ManyToOne(() => Account, account => account.withdrawals)
    @JoinColumn({name: 'numero_conta'})
    account: Account
}