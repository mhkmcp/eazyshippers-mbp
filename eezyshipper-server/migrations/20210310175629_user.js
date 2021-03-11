exports.up = function (knex) {
    return knex.schema.createTable("user", (table) => {
        table.increments();
        table.string("es_id");
        table.string("first_name");
        table.string("last_name");
        table.string("email").unique();
        table.string("role").defaultTo("customer");
        table.string("password");

        table.date("date_of_birth");
        table.string("address_line_1");
        table.string("address_line_2");
        table.string("city");
        table.string("country");
        table.string("nationality");
        table.string("identification_document");
        table.boolean("service_update_mail").defaultTo(0);
        table.boolean("promotional_mail").defaultTo(0);
        table.boolean("is_verified").defaultTo(0);
        table.boolean("is_active").defaultTo(1);

        table.timestamps(true, true);
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable("user");
};