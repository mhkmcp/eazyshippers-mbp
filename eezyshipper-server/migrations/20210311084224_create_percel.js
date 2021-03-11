
exports.up = function (knex) {

    return knex.schema.createTable("percel", (table) => {
        table.increments();
        // table.string("name");
        table.integer("user_id");
        table.string("timestamp");
        table.string("transaction_id");
        table.string("shopped_from");
        table.string("destination");
        table.string("no_of_package");
        table.string("total_weight");
        table.string("eta");
        table.string("status");
        table.integer("payment_id").defaultTo(0);   // 0: unpaid, xxxxx: payment_id
        table.boolean("is_complete").defaultTo(0);  // 1: history, 0:active
        // table.boolean("is_paid").defaultTo(0);   // 1: paid, 0: Click to Pay
        table.timestamps(true, true);
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable("percel");
};
