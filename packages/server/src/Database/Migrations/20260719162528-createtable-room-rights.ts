import { QueryInterface } from "sequelize";
import Sequelize from "sequelize";

export default {
  up: (queryInterface: QueryInterface) =>
    queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
        "room_rights",
        {
          id: {
            primaryKey: true,
            type: Sequelize.UUID,
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          roomId: {
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
            references: {
              model: "rooms",
              key: "id",
            },
            allowNull: true,
            type: Sequelize.UUID,
          },
          userId: {
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
            references: {
              model: "users",
              key: "id",
            },
            allowNull: true,
            type: Sequelize.UUID,
          },
        },
        { transaction },
      );
    }),

  down: (queryInterface: QueryInterface) => {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.dropTable("room_rights", { transaction });
    });
  },
};
