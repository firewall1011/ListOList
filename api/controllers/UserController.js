/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    addUser: async function (req, res) {
        var createdUser = await User.create({name:'Finn'}).fetch();

        sails.log('Finn\'s id is:', createdUser.id);
        return res.json({name: 'yeahhhh'});
    }

};

