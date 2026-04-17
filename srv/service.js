const { data } = require("@sap/cds/lib/dbs/cds-deploy")
module.exports = function (){
    this.on("getStock","Books",function() {
        return 100;
    });

    this.on("addStock", "Books", async function(req) {
        let book = await SELECT.one.from("Books").where({ ID: req.params[0].ID });
    
        if (!book) {
            req.error("Book not found");
            return;
        }

        console.log("Updating quantity for ", book);

        book.stock += req.data.quantity;

        await UPDATE("Books").set({ Stocks: book.stock }).where({ ID: req.params[0].ID });
        return book;
    });

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