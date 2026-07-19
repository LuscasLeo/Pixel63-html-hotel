import { QueryInterface } from "sequelize";
import Sequelize from "sequelize";

export default {
  up: (queryInterface: QueryInterface) =>
    queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
        "role_permissions",
        {
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
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
          permissionId: {
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            references: {
              model: "permissions",
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
      await queryInterface.dropTable("role_permissions", { transaction });
    });
  },
};
