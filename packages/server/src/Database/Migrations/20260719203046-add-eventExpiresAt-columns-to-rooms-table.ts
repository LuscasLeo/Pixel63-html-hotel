import { Migration } from "sequelize-cli";
export default {
    up: (queryInterface, Sequelize) =>
        queryInterface.sequelize.transaction(async (transaction) => {
            await queryInterface.addColumn(
                "rooms",
                "eventExpiresAt",
                {
                    type: Sequelize.TEXT,
                    allowNull: true,
                    defaultValue: null,
                },
                { transaction },
            );
        }),
    down: (queryInterface, Sequelize) =>
        queryInterface.sequelize.transaction(async (transaction) => {
            await queryInterface.removeColumn("rooms", "eventExpiresAt", { transaction });
        }),
} satisfies Migration;
