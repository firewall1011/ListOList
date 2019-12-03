/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/
  // Views
  '/': { view: 'pages/homepage'},

  //User Controller
  'post /create_user':         'UserController.create_user',
  'get /find_user':           'UserController.find_user',
  'post /update_user':         'UserController.update_user',
  'post /remove_user':         'UserController.remove_user', //TODO: trocar pra delete(get)
  
  //ListAssociation Controller
  'post /create_association':  'ListAssociationController.create_association',
  'post /create_list':         'ListController.create_list',

  //List Controller
  'post /create_list':         'ListController.create_list',
  'get /find_root':           'ListController.find_root',
  'post /rename_list':         'ListController.rename_list',
  'post /check_list':         'ListController.check_list',
  'post /remove_list':         'ListController.remove_list', //TODO: trocar pra delete(get)

  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
