/**
 * Created by sanket on 5/06/2016.
 */

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var RestaurantSchema   = new Schema({
    name: String,
    location: String
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);
