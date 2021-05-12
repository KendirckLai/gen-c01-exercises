import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
    const hasTable = await knex.schema.hasTable("regions");
    if (!hasTable) {
        await knex.schema.createTable("regions", table => {
            table.increments();
            table.string("regionName").notNullable();
        });
    } else {
        return Promise.resolve();
    }
}

    export async function down(knex: Knex): Promise<any> {
        await knex.schema.dropTableIfExists("regions");

    }