
exports.up = function (knex) {
    return knex.schema.createTable("warehouse", (table) => {
        table.increments();
        table.string("full_name");
        table.text("address_line_1");
        table.text("address_line_2");
        table.string("state");
        table.string("city");
        table.string("post_code");
        table.string("phone");
        table.string("country");
        table.boolean("is_active").defaultTo(1);
        table.timestamps(true, true);
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable("warehouse");
};
