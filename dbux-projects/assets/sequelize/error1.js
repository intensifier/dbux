'use strict';

const { createSequelizeInstance } = require('./dev/sscce-helpers');
const { Model, DataTypes } = require('.');

const { expect, assert } = require('chai');

const sequelize = createSequelizeInstance({ benchmark: true });

class User extends Model { }
User.init({
  username: DataTypes.STRING,
  birthday: DataTypes.DATE
}, { sequelize, modelName: 'user' });

(async () => {
  try {
    try {
      await sequelize.sync({ force: true });

      const result = await User.findAll({ where: { colDoesNotExist: 1 } });
      console.log('\result:', result);
      assert.fail('error should have been thrown');
    }
    finally {
      await sequelize.close();
    }
  }
  catch (err) {
    console.error('####### FAIL\n\n', err);
    expect(true).to.equal(true);
  }
})();
