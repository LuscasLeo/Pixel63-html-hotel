import { QueryInterface } from "sequelize";
import Sequelize from "sequelize";

export default {
  up: (queryInterface: QueryInterface) =>
    queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
        "user_roles",
        {
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          userId: {
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            references: {
              model: "users",
              key: "id",
            },
            primaryKey: true,
            type: Sequelize.UUID,
          },
          roleId: {
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            references: {
              model: "permission_roles",
              key: "id",
            },
            primaryKey: true,
            type: Sequelize.STRING,
          },
        },
        { transaction },
      );
    }),

  down: (queryInterface: QueryInterface) => {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.dropTable("user_roles", { transaction });
    });
  },
};
