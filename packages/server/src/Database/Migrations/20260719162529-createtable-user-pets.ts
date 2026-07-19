import { QueryInterface } from "sequelize";
import Sequelize from "sequelize";

export default {
  up: (queryInterface: QueryInterface) =>
    queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
        "user_pets",
        {
          id: {
            primaryKey: true,
            type: Sequelize.UUID,
          },
          name: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          position: {
            allowNull: true,
            type: Sequelize.TEXT,
          },
          direction: {
            allowNull: true,
            type: Sequelize.INTEGER,
          },
          animation: {
            type: Sequelize.INTEGER,
          },
          color: {
            type: Sequelize.INTEGER,
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          petId: {
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
            references: {
              model: "pets",
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
          roomId: {
            allowNull: true,
            type: Sequelize.UUID,
          },
        },
        { transaction },
      );
    }),

  down: (queryInterface: QueryInterface) => {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.dropTable("user_pets", { transaction });
    });
  },
};
