import { Migration } from "sequelize-cli";
export default {
    up: (queryInterface, Sequelize) =>
        queryInterface.sequelize.transaction(async (transaction) => {
            await queryInterface.addColumn(
                "rooms",
                "eventCategoryId",
                {
                    type: Sequelize.STRING(64),
                    allowNull: true,
                    defaultValue: null,
                },
                { transaction },
            );
        }),
    down: (queryInterface, Sequelize) =>
        queryInterface.sequelize.transaction(async (transaction) => {
            await queryInterface.removeColumn("rooms", "eventCategoryId", { transaction });
        }),
} satisfies Migration;
