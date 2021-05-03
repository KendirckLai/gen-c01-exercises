import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
    const hasTable = await knex.schema.hasTable("comments");
    if (!hasTable) {
        await knex.schema.createTable("comments", table => {
            table.increments();
            table.text("content");
            table.text("photo");
            table.integer("productVsPrice");
            table.integer("serviceRating");
            table.integer("satisfaction");
            table.integer("user_id").unsigned();
            table.foreign("user_id").references("users.id");
            table.integer("shop_id").unsigned();
            table.foreign("shop_id").references("shops.id");
            table.timestamps(false, true);
        });
    } else {
        return Promise.resolve();
    }
}

    export async function down(knex: Knex): Promise<any> {
        await knex.schema.dropTableIfExists("comments");

    }