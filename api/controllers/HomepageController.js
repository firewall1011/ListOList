/**
 * HomepageController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  

  /**
   * `HomepageController.formTest()`
   */
  addItem: async function (req, res) {
    var item = await Item.findOne({ value: req.body.value });
    if (item != undefined) { console.log(item); return res.status('Item repetido'); }
    await Item.create({
      // id      : req.body.id,
      value   : req.body.value,
      checked : req.body.checked
    });
    return res.send(req.body.value);
  }

};

