import { Migration } from "sequelize-cli";

export default {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn("rooms", "trading", {
            type: Sequelize.STRING,
            defaultValue: "everyone",
            allowNull: false,
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn("rooms", "trading");
    },
} satisfies Migration;
