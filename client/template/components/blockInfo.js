var blockInfoCallback = function(e, res){
    var template = this;
    console.log('get block info: ', res, e );

    if(!e && res) {
        Session.set('getBlock.blockInfo', res);

    }else if(res == null){
        alert("No such block exits.");
    }
};

Template.searchBlockComponent.helpers({
  // difficulty
  difficulty: function(){
    return Session.get('getBlock.blockInfo').difficulty;
  },

  // extraData
  extraData: function(){
    return Session.get('getBlock.blockInfo').extraData;
  },

  // gasLimit
  gasLimit: function(){
    return Session.get('getBlock.blockInfo').gasLimit;
  },

  // gasUsed
  gasUsed: function(){
    return Session.get('getBlock.blockInfo').gasUsed;
  },

  // hash
  hash: function(){
    return Session.get('getBlock.blockInfo').hash;
  },

  // LogsBloom
  //LogsBloom: function(){
  //  return Session.get('getBlock.blockInfo').logsBloom;
  //},

  // miner
  miner: function(){
    return Session.get('getBlock.blockInfo').miner;
  },

  // nonce
  nonce: function(){
    return Session.get('getBlock.blockInfo').nonce;
  },

  // number
  number: function(){
    return Session.get('getBlock.blockInfo').number;
  },

  // parentHash
  parentHash: function(){
    return Session.get('getBlock.blockInfo').parentHash;
  },

  // receiptRoot
  receiptRoot: function(){
    return Session.get('getBlock.blockInfo').receiptRoot;
  },

  // sha3Uncles
  sha3Uncle: function(){
    return Session.get('getBlock.blockInfo').sha3Uncles;
  },

  // size
  size: function(){
    return Session.get('getBlock.blockInfo').size;
  },

  // stateRoot
  stateRoot: function(){
    return Session.get('getBlock.blockInfo').stateRoot;
  },

  // timestamp
  timestamp: function(){
    return unix2datetime(Session.get('getBlock.blockInfo').timestamp);
  },

  // totalDifficulty
  totalDifficulty: function(){
    return Session.get('getBlock.blockInfo').totalDifficulty;
  },

  // Transactions
  Transactions: function(){
    return Session.get('getBlock.blockInfo').transactions;
  },

  // transactionRoot
  transactionsRoot: function(){
    return Session.get('getBlock.blockInfo').transactionsRoot;
  },

  // uncles
  uncles: function(){
    return Session.get('getBlock.blockInfo').uncles;
  }

});


Template.searchBlockComponent.events({

  'submit form': function(e) {
    var template = this;

    e.preventDefault();

    var blockInfo = {
        blockNo : $(e.target).find('[name=blockNo]').val()
    };
    web3.eth.getBlock(blockInfo.blockNo, blockInfoCallback.bind(template));
  }
});
