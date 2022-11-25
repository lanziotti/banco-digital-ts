import { MigrationInterface, QueryRunner } from "typeorm";

export class default1669397631478 implements MigrationInterface {
    name = 'default1669397631478'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "transferencias" ("id" SERIAL NOT NULL, "valor" numeric NOT NULL, "data" date NOT NULL, "senha" text NOT NULL, "numero_conta_origem" integer, "numero_conta_destino" integer, CONSTRAINT "PK_68d981495936b6bdcfe66cf9047" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "saques" ("id" SERIAL NOT NULL, "valor" numeric NOT NULL, "data" date NOT NULL, "senha" text NOT NULL, "numero_conta" integer, CONSTRAINT "PK_a789921454f74cc82dd1aba639d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "transferencias" ADD CONSTRAINT "FK_f4c17518c33e0e72ad8f51b6ada" FOREIGN KEY ("numero_conta_origem") REFERENCES "contas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transferencias" ADD CONSTRAINT "FK_0a55db90f4d55751eb28efbcfa5" FOREIGN KEY ("numero_conta_destino") REFERENCES "contas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "saques" ADD CONSTRAINT "FK_d2db402a71f89d56f40718b6448" FOREIGN KEY ("numero_conta") REFERENCES "contas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "saques" DROP CONSTRAINT "FK_d2db402a71f89d56f40718b6448"`);
        await queryRunner.query(`ALTER TABLE "transferencias" DROP CONSTRAINT "FK_0a55db90f4d55751eb28efbcfa5"`);
        await queryRunner.query(`ALTER TABLE "transferencias" DROP CONSTRAINT "FK_f4c17518c33e0e72ad8f51b6ada"`);
        await queryRunner.query(`DROP TABLE "saques"`);
        await queryRunner.query(`DROP TABLE "transferencias"`);
    }

}
