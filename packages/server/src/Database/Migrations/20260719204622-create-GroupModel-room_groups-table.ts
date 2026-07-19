import { Migration } from "sequelize-cli";

module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.sequelize.transaction(async (transaction) => {
            await queryInterface.createTable(
                "room_groups",
                {
                    id: {
                        type: Sequelize.STRING,
                        primaryKey: true,
                    },
                    name: {
                        type: Sequelize.STRING,
                        allowNull: false,
                    },
                    description: {
                        type: Sequelize.STRING,
                        allowNull: false,
                    },
                    primaryColor: {
                        type: Sequelize.STRING,
                        allowNull: false,
                    },
                    secondaryColor: {
                        type: Sequelize.STRING,
                        allowNull: false,
                    },
                    badge: {
                        type: Sequelize.TEXT,
                        allowNull: false,
                    },
                    type: {
                        type: Sequelize.STRING,
                        allowNull: false,
                        defaultValue: "public",
                    },
                    rights: {
                        type: Sequelize.STRING,
                        allowNull: false,
                        defaultValue: "owner",
                    },
                },
                { transaction },
            );
        }),

    down: (queryInterface, Sequelize) =>
        queryInterface.sequelize.transaction(async (transaction) => {
            await queryInterface.dropTable("room_groups", { transaction });
        }),
} satisfies Migration;
