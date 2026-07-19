import { Migration } from "sequelize-cli";
export default {
    up: (queryInterface, Sequelize) =>
        queryInterface.sequelize.transaction(async (transaction) => {
            await queryInterface.addConstraint("rooms", {
                fields: ["eventCategoryId"],
                type: "foreign key",
                name: "rooms_eventCategoryId_fkey",
                references: {
                    table: "room_categories",
                    field: "id",
                },
                onDelete: "SET NULL",
                onUpdate: "CASCADE",
                transaction,
            });
        }),
    down: (queryInterface, Sequelize) =>
        queryInterface.sequelize.transaction(async (transaction) => {
            await queryInterface.removeConstraint("rooms", "rooms_eventCategoryId_fkey", { transaction });
        }),
} satisfies Migration;
