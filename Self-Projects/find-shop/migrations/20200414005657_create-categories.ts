import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
    const hasTable = await knex.schema.hasTable("categories");
    if (!hasTable) {
        await knex.schema.createTable("categories", table => {
            table.increments();
            table.string("categoryName").notNullable();
        });
    } else {
        return Promise.resolve();
    }
}

    export async function down(knex: Knex): Promise<any> {
        await knex.schema.dropTableIfExists("categories");

    }