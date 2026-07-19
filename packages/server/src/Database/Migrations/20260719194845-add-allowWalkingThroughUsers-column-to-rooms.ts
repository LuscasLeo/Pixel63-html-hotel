import type { Migration } from "sequelize-cli";

export default {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn("rooms", "allowWalkingThroughUsers", {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn("rooms", "allowWalkingThroughUsers");
    },
} satisfies Migration;
