import sha256 from "sha256";
function Blockchain() {
  this.chain = [];
  this.pendingTransactions = [];
}
// create new block
//inside this block is transaction which have been creted since our last block was mined
Blockchain.prototype.createNewBlock = function (
  nonce,
  previousBlockHash,
  hash
) {
  const newBlock = {
    index: this.chain.length + 1, //it is a block number
    timeStamp: Date.now(), //time block was created
    transactions: this.pendingTransactions, //put all remaining new transations into block so they are into block
    nonce: nonce, //it is related to proof of work
    hash: hash, //it is a data from newBlock compressed into single string of code  which is this hash
    previousBlockHash: previousBlockHash, //hashing from previous block
  };
  this.pendingTransactions = []; //clearnig all new transactions as all transations were added into new block
  this.chain.push(newBlock);

  return newBlock;
};

Blockchain.prototype.getLastBlock = function () {
  return this.chain[this.chain.length - 1];
};

/*
lot of people are making a lot of differnet transactions i,e they are sendign
and receiving money in blockchain. So each time transaction is created it will be
pushed into pendingTransactions array 

Although they are all pused into newTransactio they are still not added into our block chain yet.
they will be added into blockcahin only when new block will be mined  i.e when new block is created
So all these transactions are pending transations which when gets validated will be engraved into stone of blockcahin in golden words  haha.
validation occurs when we create new block with createNewBlock() function
*/
Blockchain.prototype.creteNewTransaction = function (amount, sender, receiver) {
  //amount=amount being sent in transaction
  //sender=sender address,receiver=receiver adderess
  const newTransaction = { amount: amount, sender: sender, receiver: receiver };
  this.pendingTransactions.push(newTransaction);
  return this.getLastBlock()["index"] + 1;
};

/* 
  Hashing a blockchain data
  It takes block from blockchain and hash its data into fixed length string
  i.e pass some blocks of data into hash method and in return get fixed length string which is our hashed data
  
  For this will be using SHA256 hash
  will will hash previousblockjash,curerntclockdata,nonce
*/

Blockchain.prototype.hashBlock = function (
  previousBlockHash,
  currentBlockData,
  nonce
) {
  //previouis block is string,nonce is number it needs to be stringfied and blcok data in json which needs to be stringified
  //all this data comes from single block in our chain and we will hash this data which is esentially hashing a block

  const concatStringData =
    previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);

  const hashedData = sha256(concatStringData);
  return hashedData;
};

export default Blockchain;
