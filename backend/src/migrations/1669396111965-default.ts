import { MigrationInterface, QueryRunner } from "typeorm";

export class default1669396111965 implements MigrationInterface {
    name = 'default1669396111965'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "depositos" ("id" SERIAL NOT NULL, "valor" numeric NOT NULL, "data" date NOT NULL, "senha" text NOT NULL, "numero_conta" integer, CONSTRAINT "PK_89a002afddf6f6a464c54f6d3cd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contas" ("id" SERIAL NOT NULL, "saldo" numeric NOT NULL, "nome" text NOT NULL, "cpf" integer NOT NULL, "data_nascimento" date NOT NULL, "telefone" text NOT NULL, "email" text NOT NULL, "senha_app" text NOT NULL, "senha_transacao" text NOT NULL, CONSTRAINT "UQ_04cdfa971a1e36b6f3efd5e4b7d" UNIQUE ("cpf"), CONSTRAINT "UQ_e1b85cfa5dd4d35eaa188c4815f" UNIQUE ("email"), CONSTRAINT "PK_f5a347b0829de9a7a38cf1d052f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "depositos" ADD CONSTRAINT "FK_d195144d6d9f171a922d15a1000" FOREIGN KEY ("numero_conta") REFERENCES "contas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "depositos" DROP CONSTRAINT "FK_d195144d6d9f171a922d15a1000"`);
        await queryRunner.query(`DROP TABLE "contas"`);
        await queryRunner.query(`DROP TABLE "depositos"`);
    }

}
