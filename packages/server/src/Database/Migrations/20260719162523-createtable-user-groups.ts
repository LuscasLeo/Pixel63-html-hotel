import { QueryInterface } from "sequelize";
import Sequelize from "sequelize";

export default {
  up: (queryInterface: QueryInterface) =>
    queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
        "user_groups",
        {
          userId: {
            onDelete: "NO ACTION",
            onUpdate: "CASCADE",
            references: {
              model: "users",
              key: "id",
            },
            primaryKey: true,
            unique: "user_groups_groupId_userId_unique",
            allowNull: true,
            type: Sequelize.UUID,
          },
          groupId: {
            onDelete: "NO ACTION",
            onUpdate: "CASCADE",
            references: {
              model: "room_groups",
              key: "id",
            },
            primaryKey: true,
            unique: "user_groups_groupId_userId_unique",
            allowNull: true,
            type: Sequelize.STRING,
          },
          pending: {
            type: Sequelize.BOOLEAN,
          },
          owner: {
            allowNull: false,
            type: Sequelize.BOOLEAN,
          },
          admin: {
            allowNull: false,
            type: Sequelize.BOOLEAN,
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
        },
        { transaction },
      );
    }),

  down: (queryInterface: QueryInterface) => {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.dropTable("user_groups", { transaction });
    });
  },
};
