import { QueryInterface } from "sequelize";
import Sequelize from "sequelize";

export default {
  up: (queryInterface: QueryInterface) =>
    queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
        "rooms",
        {
          id: {
            primaryKey: true,
            type: Sequelize.UUID,
          },
          type: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          name: {
            allowNull: false,
            type: Sequelize.STRING(32),
          },
          description: {
            allowNull: true,
            type: Sequelize.TEXT,
          },
          thumbnail: {
            allowNull: true,
            type: Sequelize.BLOB("medium"),
          },
          maxUsers: {
            allowNull: false,
            type: Sequelize.INTEGER,
          },
          structure: {
            allowNull: false,
            type: Sequelize.TEXT,
          },
          lock: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          password: {
            allowNull: true,
            type: Sequelize.STRING,
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          ownerId: {
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
            references: {
              model: "users",
              key: "id",
            },
            allowNull: true,
            type: Sequelize.UUID,
          },
          categoryId: {
            allowNull: true,
            type: Sequelize.STRING(64),
          },
          groupId: {
            allowNull: true,
            type: Sequelize.STRING,
          },
          speed: {
            type: Sequelize.FLOAT,
            defaultValue: 1,
            allowNull: false,
          },
        },
        { transaction },
      );
    }),

  down: (queryInterface: QueryInterface) => {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.dropTable("rooms", { transaction });
    });
  },
};
