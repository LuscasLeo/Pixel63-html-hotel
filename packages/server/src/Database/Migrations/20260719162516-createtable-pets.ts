import { QueryInterface } from "sequelize";
import Sequelize from "sequelize";

export default {
  up: (queryInterface: QueryInterface) =>
    queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
        "pets",
        {
          id: {
            primaryKey: true,
            type: Sequelize.UUID,
          },
          type: {
            allowNull: false,
            type: Sequelize.STRING(64),
          },
          name: {
            allowNull: false,
            type: Sequelize.STRING(256),
          },
          palettes: {
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
          breedId: {
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
            references: {
              model: "pet_breeds",
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
      await queryInterface.dropTable("pets", { transaction });
    });
  },
};
