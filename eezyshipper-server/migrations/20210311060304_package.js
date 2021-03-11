
exports.up = function (knex) {
    return knex.schema.createTable("package", (table) => {
        table.increments();
        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("package");
};
