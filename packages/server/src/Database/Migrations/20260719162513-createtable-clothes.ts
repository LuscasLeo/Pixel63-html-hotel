import { QueryInterface } from "sequelize";
import Sequelize from "sequelize";

export default {
  up: (queryInterface: QueryInterface) =>
    queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
        "clothes",
        {
          id: {
            primaryKey: true,
            type: Sequelize.UUID,
          },
          part: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          setId: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          membership: {
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
        },
        { transaction },
      );
    }),

  down: (queryInterface: QueryInterface) => {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.dropTable("clothes", { transaction });
    });
  },
};
