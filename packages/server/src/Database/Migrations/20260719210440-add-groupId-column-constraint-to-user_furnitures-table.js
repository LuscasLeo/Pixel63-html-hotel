"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        queryInterface.addConstraint("user_furnitures", {
            fields: ["groupId"],
            type: "foreign key",
            name: "user_furnitures_groupId_fkey",
            references: {
                table: "room_groups",
                field: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "SET NULL",
        });
    },

    async down(queryInterface, Sequelize) {
        queryInterface.removeConstraint("user_furnitures", "user_furnitures_groupId_fkey");
    },
};
