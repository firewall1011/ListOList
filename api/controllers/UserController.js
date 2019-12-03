/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    /**
     * Cria usuario a partir de nome e retorna o mesmo
     * @param {name} req 
     * @param {name, photo, theme} res 
     */
    create_user: async function (req, res) {
        let createdUser = undefined;
        try{
            createdUser = await User.create(req.body).fetch();
        }
        catch(err){
            return res.send(err);
        }
        sails.log('created this user: ', createdUser);
        return res.send(createdUser);
    },
    /**
     * Procura o usuario a partir do nome e retorna o mesmo
     * @param {name} req 
     * @param {usuario} res 
     */
    find_user: async function(req, res){
        let user = undefined;
        try{
            user = await User.findOne({name: req.query.name});
        }
        catch(err){
            return res.send(err);
        }
        if(user == undefined) return res.sendStatus(404);
        return res.send(user);
        //return res.redirect(200, 'back');
    },
    /**
     * Atualiza um dado do usuario, identificando o usuario pelo nome
     * update e' um JSON, exemplo update: { theme: 1 }
     * @param {name, update} req 
     * @param {*} res 
     */
    update_user: async function(req, res){
        let user = undefined;
        try{
            //var user = await User.updateOne({name: req.body.name}).set({theme: req.body.theme});
            user = await User.updateOne({name: req.body.name}).set(req.body.update);
        }
        catch(err){
            return res.send(err);
        }
        if(user === undefined) return res.sendStatus(404);
        return res.send(user);
    },
    /**
     * Deleta um usuario de name, retorna 404 ou 200
     * @param {name} req 
     * @param {404 ou 200} res 
     */
    remove_user: async function(req, res){
        let deleted = undefined;
        try{
            deleted = await User.destroyOne({name:req.body.name});
            //TODO: remover listas do usuario e associacoes delas
        }
        catch(err){
            return err;
        }
        if(deleted === undefined) res.redirect(404, 'back'); 
        return res.redirect(200, 'back');
    }

};

