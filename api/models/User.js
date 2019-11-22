/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'string',
      unique: true,
      required: true
    },
    // pass: {
    //   type: 'string',
    //   encrypt: true
    // },
    // photo: {
    //   type: 'bytea'
    // },
    theme: {
      type: 'number',
      defaultsTo: 0,
      isIn: [0, 1, 2, 3, 4]
    },
    //Reference to lists
    lists: {
      collection: 'list',
      via: 'owner'
    }
  },

};

