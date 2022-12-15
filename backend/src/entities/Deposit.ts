import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Account } from './Account';

@Entity('depositos')
export class Deposit {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'numeric' })
    valor: number

    @Column({ type: 'date' })
    data: Date

    @Column({ type: 'text' })
    senha: string

    @ManyToOne(() => Account, account => account.deposits)
    @JoinColumn({ name: 'numero_conta' })
    account: Account | number
}