var bcrypt = require('bcrypt');


module.exports = {
    change: function (req, res, next) {
        var saltRounds = 10;
        console.log(req.body);
        bcrypt.hash(req.body.passsword, saltRounds, function (err, encryptedPassword) {
            if (err){
                res.status
            }
            else{
                req.body.passsword = encryptedPassword;
                next(); 
            }
            console.log(err);
            console.log(encryptedPassword);
            
        });
    },

}