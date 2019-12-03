/**
 * ListAssociationController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  //TODO: TEST, Thrash
  create_association: async function(req, res){
    try{
        var association = await List_to_list.create({
            parent: req.body.parent,
            child: req.body.child
        }).fetch();
    }
    catch(err){
        return err;
    }
    Sails.log('Created association: ', association);
    return res.redirect(200, 'back');
  },
  remove_association: async function(req, res){
    try{
      var association = await List_to_list.destroyOne({child: req.body.child});
    }
    catch(err){
        return err;
    }
    if(association === undefined) return res.redirect(404, 'back');
    Sails.log('removed association: ', association);
    return res.redirect(200, 'back');
  },
  remove_associations: async function(req, res){
    try{
      var association = await List_to_list.destroy({parent: req.body.parent});
    }
    catch(err){
        return err;
    }
    if(association === undefined) return res.redirect(404, 'back');
    Sails.log('removed association: ', association);
    res.set(association);
    return res.redirect(200, 'back');
  },
  thrash_list: async function(req, res){
    try{
        //Procura dono
        let owner = await User.findOne({name:req.body.name});
        if(owner === undefined) return res.redirect(404, 'back');
        owner = owner.id;
        //Procura lixeira pertencente ao dono
        var thrash = await List.findOne({name:'lixeira', owner:owner});
        //Associa lista com lixeira e remove associacao previa
        //axios.post('/remove_association', {child:req.body.id})
        //axios.post('/create_association', {parent:thrash.id, child:req.body.id})
    }
    catch(err){
        return err;
    }
    return res.redirect(200, 'back');
  },
};

