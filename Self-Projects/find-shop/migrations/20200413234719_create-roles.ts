import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
	await knex.schema.createTable("roles", table => {
		table.increments();
		table.string("role").notNullable().unique();
	});
}


export async function down(knex: Knex): Promise<any> {
	await knex.schema.dropTable("roles");

}
