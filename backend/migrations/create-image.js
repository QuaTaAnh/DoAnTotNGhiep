'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Images', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER,
                autoIncrement: true
            },
            postId: {
                type: Sequelize.INTEGER
            },
            imageUrl: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Images');
    }
};