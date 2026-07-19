import { QueryInterface } from "sequelize";
import Sequelize from "sequelize";

export default {
  up: (queryInterface: QueryInterface) =>
    queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
        "user_furnitures",
        {
          id: {
            primaryKey: true,
            type: Sequelize.UUID,
          },
          name: {
            allowNull: true,
            type: Sequelize.STRING(256),
          },
          description: {
            allowNull: true,
            type: Sequelize.STRING(256),
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
          animationTags: {
            allowNull: true,
            type: Sequelize.TEXT,
          },
          colorTags: {
            allowNull: true,
            type: Sequelize.TEXT,
          },
          color: {
            type: Sequelize.INTEGER,
          },
          data: {
            allowNull: true,
            type: Sequelize.TEXT,
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          furnitureId: {
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
            references: {
              model: "furnitures",
              key: "id",
            },
            allowNull: true,
            type: Sequelize.UUID,
          },
          userId: {
            allowNull: true,
            type: Sequelize.UUID,
          },
          roomId: {
            allowNull: true,
            type: Sequelize.UUID,
          },
          traxId: {
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
            references: {
              model: "user_furnitures",
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
      await queryInterface.dropTable("user_furnitures", { transaction });
    });
  },
};
