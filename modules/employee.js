var mongoose= require('mongoose');

mongoose.connect('mongodb://localhost:27017/employee', { useNewUrlParser: true,useUnifiedTopology: true});
var conn= mongoose.connection;

var employeeSchema= new mongoose.Schema({
    name : String,
    email : String,
    etype : String,
    hourratte : Number,
    totalhour : Number,
   
})

var employeeModel = mongoose.model('Employee',employeeSchema);
module.exports=employeeModel;