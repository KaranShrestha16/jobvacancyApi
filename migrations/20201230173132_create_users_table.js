exports.up = function (knex, Promise) {
    return knex.schema.createTable('users', function (table) {
        table.increments('user_id');
        table.string('name').notNullable();
        table.string('birth_date').notNullable();
        table.string('gender').notNullable();
        table.string('address').notNullable();
        table.string('contact').notNullable();
        table.string('user_type').notNullable();
        table.string('email').notNullable().unique();
        table.string('password').notNullable();
        table.string('image_name').notNullable();
        table.string('education_level').notNullable();
        table.string('professional_skill').notNullable();
        table.string('experience').notNullable();
    }).createTable('organizations', function (table) {
        table.increments('org_id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable().unique();
        table.string('contact').notNullable();
        table.string('address').notNullable();
        table.string('image_name').notNullable();
        table.string('description').notNullable();
        table.string('password').notNullable();
        table.string('varified').notNullable();
    }).createTable('jobs', function (table) {
        table.increments('job_id').primary();
        table.integer('no_of_vacancy').notNullable() ;
        table.string('title').notNullable().notNullable()
        table.string('job_category').notNullable()
        table.string('job_type').notNullable();
        table.string('location').notNullable();
        table.string('salary').notNullable();
        table.string('deadline').notNullable();
        table.string('postdate').notNullable();
        table.string('education_level').notNullable();
        table.string('professional_skill').notNullable();
        table.string('experience').notNullable();
        table.string('job_description').notNullable();
        table.integer('org_id').unsigned().references('org_id').inTable('organizations').onDelete('CASCADE');
    })
    .createTable('job_apply', function (table) {
        table.increments('job_apply_id').primary();
        table.string('apply_date').notNullable();
        table.integer('job_id').unsigned().references('job_id').inTable('jobs').onDelete('CASCADE');
        table.integer('user_id').unsigned().references('user_id').inTable('users').onDelete('CASCADE');
    }) 
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('users').dropTable('organizations').dropTable('jobs').dropTable('job_apply');
};
