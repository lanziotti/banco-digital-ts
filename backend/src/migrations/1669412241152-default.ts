import { MigrationInterface, QueryRunner } from "typeorm";

export class default1669412241152 implements MigrationInterface {
    name = 'default1669412241152'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "transferencias" ("id" SERIAL NOT NULL, "valor" numeric NOT NULL, "data" date NOT NULL, "senha" text NOT NULL, "numero_conta_origem" integer, "numero_conta_destino" integer, CONSTRAINT "PK_68d981495936b6bdcfe66cf9047" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "saques" ("id" SERIAL NOT NULL, "valor" numeric NOT NULL, "data" date NOT NULL, "senha" text NOT NULL, "numero_conta" integer, CONSTRAINT "PK_a789921454f74cc82dd1aba639d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contas" ("id" SERIAL NOT NULL, "saldo" numeric NOT NULL, "nome" text NOT NULL, "cpf" text NOT NULL, "data_nascimento" date NOT NULL, "telefone" text NOT NULL, "email" text NOT NULL, "senha_app" text NOT NULL, "senha_transacao" text NOT NULL, CONSTRAINT "UQ_04cdfa971a1e36b6f3efd5e4b7d" UNIQUE ("cpf"), CONSTRAINT "UQ_e1b85cfa5dd4d35eaa188c4815f" UNIQUE ("email"), CONSTRAINT "PK_f5a347b0829de9a7a38cf1d052f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "depositos" ("id" SERIAL NOT NULL, "valor" numeric NOT NULL, "data" date NOT NULL, "senha" text NOT NULL, "numero_conta" integer, CONSTRAINT "PK_89a002afddf6f6a464c54f6d3cd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "transferencias" ADD CONSTRAINT "FK_f4c17518c33e0e72ad8f51b6ada" FOREIGN KEY ("numero_conta_origem") REFERENCES "contas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transferencias" ADD CONSTRAINT "FK_0a55db90f4d55751eb28efbcfa5" FOREIGN KEY ("numero_conta_destino") REFERENCES "contas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "saques" ADD CONSTRAINT "FK_d2db402a71f89d56f40718b6448" FOREIGN KEY ("numero_conta") REFERENCES "contas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "depositos" ADD CONSTRAINT "FK_d195144d6d9f171a922d15a1000" FOREIGN KEY ("numero_conta") REFERENCES "contas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "depositos" DROP CONSTRAINT "FK_d195144d6d9f171a922d15a1000"`);
        await queryRunner.query(`ALTER TABLE "saques" DROP CONSTRAINT "FK_d2db402a71f89d56f40718b6448"`);
        await queryRunner.query(`ALTER TABLE "transferencias" DROP CONSTRAINT "FK_0a55db90f4d55751eb28efbcfa5"`);
        await queryRunner.query(`ALTER TABLE "transferencias" DROP CONSTRAINT "FK_f4c17518c33e0e72ad8f51b6ada"`);
        await queryRunner.query(`DROP TABLE "depositos"`);
        await queryRunner.query(`DROP TABLE "contas"`);
        await queryRunner.query(`DROP TABLE "saques"`);
        await queryRunner.query(`DROP TABLE "transferencias"`);
    }

}
