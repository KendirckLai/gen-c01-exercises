import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {

    await knex.schema.createTable("message", table => {
        table.increments();
        table.string("content");
        table.timestamps(false, true);
    });
}


export async function down(knex: Knex): Promise<any> {

    await knex.schema.dropTable("message");
}

