
var requiredConfirmations = 12;

var updateTransaction = function(oldDocument, transaction, receipt){
  if(receipt && transaction){
    var actualFee = transaction.gasPrice.times(new BigNumber(receipt.gasUsed)).toString(10);
      Transactions.update({_id: oldDocument._id},
                          {$set: {
                                  blockNumber:transaction.blockNumber,
                                  blockHash: transaction.blockHash,
                                  transactionIndex: transaction.transactionIndex,
                                  fee: actualFee
                                 }
                          });
  }else{
    console.log("NOT UPDATED");
  }
};


checkTransactionConfirmations = function(tx){
  var confCount = 0;
  var filter = web3.eth.filter('latest');

  filter.watch(function(e, blockHash){
    if(!e) {
      console.log("Received New Block");
      confCount++;

      tx = Transactions.findOne(tx._id);
      if(!tx) {
        filter.stopWatching();
        return;
      }

     web3.eth.getTransaction(tx.transactionHash, function(e, transaction){
       web3.eth.getTransactionReceipt(tx.transactionHash, function(e, receipt){
          if(!e) {


            if(!receipt || !transaction){
              if(confCount > requiredConfirmations*2){
                Transactions.remove(tx._id);
                filter.stopWatching();
                return;
              }else{
                //return;
                Transactions.added(tx._id);
              }

            }else if(transaction.blockNumber) {
              if(transaction.blockNumber !== tx.blockNumber){
                updateTransaction(tx, transaction, receipt);
                //Session.set('check_transaction_conf.txblock', transaction.blockNumber);
              }

              web3.eth.getBlock(transaction.blockNumber, function(e, block) {
              if(!e) {
                if(block.hash !== transaction.blockHash) {
                  // remove if the parent block is not in the chain anymore.
                  Transactions.remove(tx._id);
                  filter.stopWatching();
                  return;
                }
              }
              });


              var confirmations = (EthBlocks.latest.number + 1) - tx.blockNumber;
              if(confirmations > requiredConfirmations){
                console.log("Confirmed Enough. Stop Watching... TxHash=", tx.transactionHash);
                filter.stopWatching();
              }
            }
          }
        });
      });
    }
  });
};
