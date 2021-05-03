import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
    const hasTable = await knex.schema.hasTable("shops");
    if (!hasTable) {
        await knex.schema.createTable("shops", table => {
            table.increments();
            table.string("shopNameChinese");
            table.string("shopNameEnglish");
            table.integer("area_id").unsigned();
            table.foreign("area_id").references("areas.id");
            table.integer("category_id").unsigned();
            table.foreign("category_id").references("categories.id");
            table.timestamps(false, true);
        });
    } else {
        return Promise.resolve();
    }
}

    export async function down(knex: Knex): Promise<any> {
        await knex.schema.dropTableIfExists("shops");

    }