
exports.up = function (knex) {

    return knex.schema.createTable("payment", (table) => {
        table.increments();
        table.integer("user_id");
        table.string("card_type");
        table.string("card_number");
        table.string("month_year");
        table.string("cvc");
        table.boolean("is_save").defaultTo(0);  // 1: history, 0:active
        table.timestamps(true, true);
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists("payment");
};
