/**
 * List_to_list.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    parent: {
      type: 'number',
      required: true
    },
    child:{
      type: 'number',
      required: true
    }
  },

};

