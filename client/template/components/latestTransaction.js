Template.latestTransactionComponent.helpers({


  items: function(){
    selector = {};
    return Transactions.find(selector, {sort: {timestamp: -1}, limit: 5}).fetch();
  },

  latestBlockNum: function(){
    return EthBlocks.latest.number;
  },

  latestBlockDatetime: function(){
    return unix2datetime(EthBlocks.latest.timestamp);
  }

});



Template.transactionItem.helpers({


  txDateTime: function(){
    return unix2datetime(this.timestamp);
  },


  amountInEther: function(){
    var amountEth = web3.fromWei(this.amount, "ether");
    return parseFloat(amountEth).toFixed(3);
  },

  //currentBlockNum: function(){
  //  return Session.get("check_transaction_conf.txblock")
//  },


  confirmationCount: function(){
    var count = 0;
    if(this.blockNumber) count = EthBlocks.latest.number - this.blockNumber +1;
    if(count > 50) count = "50+";
    return count;
  }
});
