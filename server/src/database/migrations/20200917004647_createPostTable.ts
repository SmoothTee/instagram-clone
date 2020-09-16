import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('post', (table) => {
    table.increments();
    table
      .integer('user_id')
      .references('id')
      .inTable('user')
      .unsigned()
      .notNullable();
    table.string('caption').notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('post');
}
