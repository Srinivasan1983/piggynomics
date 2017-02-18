
observeTransactions = function(){
    Transactions.find({}).observe({

        added: function(newDocument) {
          console.log("Added Transaction Document");
          checkTransactionConfirmations(newDocument);
        },

        removed: function(document) {
          console.log("Removed Transaction Document", document._id);
        }
    });
};
