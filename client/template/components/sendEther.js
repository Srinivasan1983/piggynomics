var estimatedFeeInWei =  function(){
  var gas = Session.get('sendEther.estimatedGas');
  var gasPrice = new BigNumber(Session.get('sendEther.currentGasPrice'));
  return gasPrice.mul(gas);
}

var estimationCallback = function(e, res){
    var template = this;
    console.log('Estimated gas: ', res, e);
    if(!e && res) {
        Session.set('sendEther.estimatedGas', res);
    }
};

var getGasPriceCallback = function(e, res){
    var template = this;
    console.log('Current Gas Price in Wei: ', res.toString(10), e);
    if(!e && res) {
        Session.set('sendEther.currentGasPrice', res.toString(10));
    }
};

Template.sendEtherComponent.onRendered(function(){
  $('.form-horizontal').validate({
    rules: {
        amount: {
            number: true
          }
      }
  });

});

Template.sendEtherComponent.events({
  'submit form': function(e) {
    var template = this;
    e.preventDefault();
    var fundInfo = {
      fAddr: $(e.target).find('[name=f-addr]').val(),
      tAddr: $(e.target).find('[name=t-addr]').val(),
      amount: web3.toWei($(e.target).find('[name=amount]').val(),'ether'),
      amountInNum : $(e.target).find('[name=amount]').val()
    };

    if(EthAccounts.findOne({address: myAccount}, {reactive: false})) {
      Session.set('sendEther.fundInfo', fundInfo);
      console.log(fundInfo);
      web3.eth.estimateGas({from: myAccount, to: fundInfo.tAddr, value: fundInfo.amount}, estimationCallback.bind(template));
      web3.eth.getGasPrice(getGasPriceCallback.bind(template));
      $('#sendConfirmModal').modal('show');
    }
  }

});

Template.sendConfirmModalTemplate.helpers({
  sendAmountInEther: function(){
    var amountEth = web3.fromWei(Session.get("sendEther.fundInfo").amount,'ether');
    return parseFloat(amountEth).toFixed(3);
  },
  fAddr: function(){
    return myAccount; //Session.get("sendEther.fundInfo").fAddr;
  },
  tAddr: function(){
    return Session.get("sendEther.fundInfo").tAddr;
  },
  fee: function(){
    return web3.fromWei(estimatedFeeInWei(),'ether').toString(10);
  }

});

Template.deployContract.events({
  'click #deploy': function(e) {
    e.preventDefault();
    sendEtherObject = web3.eth.contract(abi);
      sendEtherObject.new({
      from: myAccount,
      data: contractCode,
      gas:4700000
    }, function(err, res){
       if(err){
         alert("error occured pls,. check the console log");
         console.log(err);
      }else{
        if (typeof res.address !== 'undefined') {
          contractAddress = res.address;
          console.log(contractAddress);
         alert('Contract mined! address: ' + res.address + ' transactionHash: ' + res.transactionHash);
           $('#deployContractmodal').modal('hide');
          }
        }
      });
    }
});

Template.sendConfirmModalTemplate.events({
  'click #send': function(e) {
    e.preventDefault();

    sendEtherInstance = sendEtherObject.at(contractAddress);
    console.log(sendEtherInstance);
    //console.log("Contract Address", contractAddress);
    var fundInfo = Session.get("sendEther.fundInfo");
    console.log(myAccount)
    console.log(fundInfo.amountInNum);
    var txHash = sendEtherInstance.transfer.sendTransaction(
      fundInfo.tAddr,
      fundInfo.amount,
    {from:myAccount,gas :200000}, function(error,txHash){
      console.log("Transaction Hash:", txHash, error);

      if(!error) {
        alert("Ether Transfer Succeeded");
        sendEtherInstance.balanceOf(myAccount, function(err, res){
          if(!err) {
            sendEtherInstance.balance(function(err,res){
              alert("Your Account Balance (in Ether) " + web3.fromWei(res,'ether').toString(10))
            });
          }
        });

        //alert(sendEtherInstance.confirmSignal);
        Transactions.upsert(txHash, {$set: {
          amount: Session.get("sendEther.fundInfo").amount,
          //from: Session.get("sendEther.fundInfo").fAddr,
          from: web3.eth.getTransaction(txHash).from,
          to: Session.get("sendEther.fundInfo").tAddr,
          timestamp: getCurrentUnixTime(),
          transactionHash: txHash,
          currentBlockNum: web3.eth.getTransaction(txHash).blockNumber,
          fee: estimatedFeeInWei().toString(10),
        }});
      } else {
        alert("Ether Transfer Failed");
      }
    });
    $('#sendConfirmModal').modal('hide');
}});
