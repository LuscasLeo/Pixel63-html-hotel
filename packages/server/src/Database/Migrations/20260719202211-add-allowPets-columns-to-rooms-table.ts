import { Migration } from "sequelize-cli";
export default {
    up: (queryInterface, Sequelize) =>
        queryInterface.sequelize.transaction(async (transaction) => {
            await queryInterface.addColumn(
                "rooms",
                "allowPets",
                {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                    defaultValue: true,
                },
                { transaction },
            );
        }),
    down: (queryInterface, Sequelize) =>
        queryInterface.sequelize.transaction(async (transaction) => {
            await queryInterface.removeColumn("rooms", "allowPets", { transaction });
        }),
} satisfies Migration;
