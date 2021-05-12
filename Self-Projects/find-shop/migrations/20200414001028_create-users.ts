import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
    const hasTable = await knex.schema.hasTable("users");
    if (!hasTable) {
        await knex.schema.createTable("users", table => {
            table.increments();
            table.string("name").notNullable();
            table.integer("role_id").unsigned();
            table.foreign("role_id").references("roles.id");
            table.timestamps(false, true);
        });
    } else {
        return Promise.resolve();
    }
}

    export async function down(knex: Knex): Promise<any> {
        await knex.schema.dropTableIfExists("users");

    }