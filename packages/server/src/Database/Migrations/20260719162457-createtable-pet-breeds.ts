import { QueryInterface } from "sequelize";
import Sequelize from "sequelize";

export default {
  up: (queryInterface: QueryInterface) =>
    queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
        "pet_breeds",
        {
          id: {
            primaryKey: true,
            type: Sequelize.UUID,
          },
          type: {
            type: Sequelize.STRING,
          },
          name: {
            allowNull: false,
            type: Sequelize.STRING(256),
          },
          index: {
            allowNull: false,
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
        },
        { transaction },
      );
    }),

  down: (queryInterface: QueryInterface) => {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.dropTable("pet_breeds", { transaction });
    });
  },
};
