import { Migration } from "sequelize-cli";
export default {
    up: (queryInterface, Sequelize) =>
        queryInterface.sequelize.transaction(async (transaction) => {
            await queryInterface.addColumn(
                "rooms",
                "eventName",
                {
                    type: Sequelize.STRING(32),
                    allowNull: true,
                    defaultValue: null,
                },
                { transaction },
            );
        }),
    down: (queryInterface, Sequelize) =>
        queryInterface.sequelize.transaction(async (transaction) => {
            await queryInterface.removeColumn("rooms", "eventName", { transaction });
        }),
} satisfies Migration;
