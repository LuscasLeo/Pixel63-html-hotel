import { QueryInterface } from "sequelize";
import Sequelize from "sequelize";

export default {
  up: (queryInterface: QueryInterface) =>
    queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
        "web_articles",
        {
          id: {
            primaryKey: true,
            type: Sequelize.UUID,
          },
          bannerUrl: {
            allowNull: false,
            type: Sequelize.TEXT,
          },
          title: {
            allowNull: false,
            type: Sequelize.STRING(150),
          },
          content: {
            allowNull: false,
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
          authorId: {
            allowNull: true,
            type: Sequelize.UUID,
          },
        },
        { transaction },
      );
    }),

  down: (queryInterface: QueryInterface) => {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.dropTable("web_articles", { transaction });
    });
  },
};
