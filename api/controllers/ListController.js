/**
 * ListController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    //TODO: test
    /**
     * POST
     * @param {owner(name), parent(id), name} req 
     * @param {list} res 
     */
    create_list: async function(req, res){
        let list = undefined;
        try{
            //Find owner's id
            let owner = await User.findOne({name:req.body.owner});
            if(owner === undefined) return res.send("Owner not found!");
            owner = owner.id;
            //Create List with owner's id and name
            list = await List.create({name: req.body.name, owner: owner}).fetch();
            //Create association parent/child
            let assoc = undefined;
            if(req.body.name != 'root'){
                assoc = await List_to_list.create({parent: req.body.parent, child: list.id}).fetch();
                if(assoc == undefined) return res.send("Could not create association " + req.body.parent + ", " + list.id);
            }
            //Populate User's collection
            await User.find().populate('lists');
        }
        catch(err){
            return res.send(err);
        }
        if(list == undefined) return res.send("Could not create list" + req.body.name);
        return res.send(list); 
    },
    /**
     * Renames passed id's list with name
     * POST
     * @param {id, name} req 
     * @param {} res 
     */
    rename_list: async function(req, res){
        let list = undefined;
        try{
            list = await List.updateOne({id: req.body.id}).set({name: req.body.name});
        }
        catch(err){
            return res.send(err);
        }
        if(list === undefined) return res.sendStatus(404);
        return res.ok();
    },
    /**
     * Changes passed id's list checked property
     * POST
     * @param {id, checked} req 
     * @param {*} res 
     */
    check_list: async function(req, res){
        let list = undefined;
        try{
            list = await List.updateOne({id: req.body.id}).set({checked: req.body.checked});
        }
        catch(err){
            return res.send(err);
        }
        if(list === undefined) return res.sendStatus(404);
        return res.ok();
    },
    /**
     * POST
     * @param {id} req 
     * @param {*} res 
     */
    remove_list: async function(req, res){
        let removed = undefined;
        let children = [];
        try{
            //Remove List
            removed = await List.destroyOne({id:req.body.id});
            if(removed === undefined) return res.sendStatus(404);
            //Remove this list from it's parent
            await List_to_list.destroyOne({child: req.body.id});
            //Remove this list's children associations
            let rchildren = await List_to_list.destroy({parent: req.body.id}).fetch();
            while(Array.isArray(rchildren) && rchildren.length > 0){
                children = [];
                //Call remove_list for children
                for(i in rchildren){
                    children.push(rchildren[i].child);
                }
                console.log('children: ', children);
                rchildren = await List_to_list.destroy({parent: {in: children}}).fetch();
                await List.destroy({id:{in: children}});
                console.log('rchildren', rchildren, ' length: ' + rchildren.length);
            }
            //Populate User's collection
            await User.find().populate('lists');
        }
        catch(err){
            return res.send(err);
        }
        return res.ok();
    },
    /**
     * GET
     * @param {owner(name)} req 
     * @param {root} res 
     */
    find_root: async function(req, res){
        let root = undefined;
        try{
            let owner = await User.findOne({name:req.query.owner});
            if(owner === undefined) return res.sendStatus(404);
            owner = owner.id;
            root = await List.findOne({name:'root', owner:owner});
        }
        catch(err){
            return err;
        }
        if(root === undefined) return res.sendStatus(404);
        return res.send(root);
    }

};

