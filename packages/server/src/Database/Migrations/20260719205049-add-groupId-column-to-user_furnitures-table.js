"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        queryInterface.addColumn("user_furnitures", "groupId", {
            type: Sequelize.STRING,
            allowNull: true,
            references: {
                model: "room_groups",
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "SET NULL",
        });
    },

    async down(queryInterface, Sequelize) {
        queryInterface.removeColumn("user_furnitures", "groupId");
    },
};
