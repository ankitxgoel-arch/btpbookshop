const { data } = require("@sap/cds/lib/dbs/cds-deploy")

module.exports = function() {
    this.before ("CREATE", "Books", function(req) {
        console.log (req.data)
        if (req.data.Stocks < 100)
            throw new Error  ("Stocks must be more than 100")
    })
     this.after ("READ", "Books", function(data) {
        for (let index in data){
            if (data[index].Stocks > 25){
                data[index].Title += " --- 10% discount"
                data[index].Price = data[index].Price * 0.9
            }
        }
        console.log (data,"After Read Book Triggered")
    })
    this.before ("READ", "Author", function() {
        console.log ("Read Authors Triggered")
    })   
}