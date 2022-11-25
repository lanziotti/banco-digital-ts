import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Account } from './Account';

@Entity('transferencias')
export class Transfer {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'numeric'})
    valor: number

    @Column({type: 'date'})
    data: Date

    @Column({type: 'text'})
    senha: string

    @ManyToOne(() => Account, account => account.transfers_origin)
    @JoinColumn({name: 'numero_conta_origem'})
    account_origin: Account

    @ManyToOne(() => Account, account => account.transfers_destiny)
    @JoinColumn({name: 'numero_conta_destino'})
    account_destiny: Account
}