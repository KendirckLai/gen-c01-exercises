import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
    const hasTable = await knex.schema.hasTable("areas");
    if (!hasTable) {
        await knex.schema.createTable("areas", table => {
            table.increments();
            table.string("areaName").notNullable();
            table.integer("region_id").unsigned();
            table.foreign("region_id").references("regions.id");
            table.timestamps(false, true);
        });
    } else {
        return Promise.resolve();
    }
}

    export async function down(knex: Knex): Promise<any> {
        await knex.schema.dropTableIfExists("areas");

    }