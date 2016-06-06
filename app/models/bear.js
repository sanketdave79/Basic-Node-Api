/**
 * Created by sanket on 5/06/2016.
 */

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var BearSchema   = new Schema({
    customer: [{ type: Schema.Types.ObjectId, ref: 'Customer' }],
    brand: String,
    restaurant : [{ type: Schema.Types.ObjectId, ref: 'Restaurant' }]
});

module.exports = mongoose.model('Bear', BearSchema);

