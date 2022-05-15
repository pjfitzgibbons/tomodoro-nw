import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm"
import { inheritLeadingComments } from "../../dev-extensions/react-devtools/build/parseSourceAndMetadata.worker.worker"

export class CreateTask1652626930589 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'tasks',
                columns: [
                    { name: 'id', type: 'integer', isPrimary: true},
                    { name: 'name', type: 'text'},
                    { name: 'startDate', type: 'text'},
                    { name: 'endDate', type: 'text', isNullable: true }
                ]
            }),
            true
        )
        await queryRunner.createIndex(
            'tasks',
            new TableIndex({
                name: 'idx_tasks_pk',
                columnNames: ['id']
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('tasks')
        await queryRunner.dropTable('tasks')
    }

}
