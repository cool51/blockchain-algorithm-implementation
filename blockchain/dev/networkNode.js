import express from "express";
import Blockchain from "./blockchain.js";
import statusCodes from "http-status-codes";
import bodyParser from "body-parser";
import axios from "axios";
import { v1 as uuid } from "uuid";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const bitcoin = new Blockchain();
const portNo = process.argv[2];

/* 
Get whole blockchain data

*/
app.get("/blockchain", (req, res) => {
  res.status(statusCodes.OK).send(bitcoin);
});
/* 
To add new pending transaction to be added into blockchain once mined
*/
app.post("/transaction", (req, res) => {
  console.log("TRASNACTION", req.body);
  const newTransaction = req.body.newTransaction;

  const blockIndex = bitcoin.addTransactionToPendingTransaction(newTransaction);

  res
    .status(statusCodes.OK)
    .json({ message: "Transaciion will be added to block", blockIndex });
});
/* 
To mine new block into blockchain
Since mining is done by particular node ne node wanting to mine will hit /mine endpoint
now once mining is completed i.e block is created through PoW ,new block willbe broadcasted to all connect4ed nodes through /receive-new-block api
to keep all nodes synchronized,before adding it inot block chain it needs to be validated, 
after adding it into block chain each nodes clear out their pendng transaction array

after successfully broadcasting and block has been validated we have to reward miner for cretinon and addtion of block by sending up some bitcoin to a miner
so we need to make new trasacton and again broadcast it to all nodesthrough ouer /transaction/broadcast api


*/
app.get("/mine", async (req, res) => {
  try {
    const lastBlock = bitcoin.getLastBlock();
    const prevBlockHash = lastBlock["hash"];
    const currentBlockData = {
      transactions: bitcoin.pendingTransactions,
      index: lastBlock["index"] + 1,
    };
    const nonce = bitcoin.proofOfWork(prevBlockHash, currentBlockData);
    const dataHashOfNewBlock = bitcoin.hashBlock(
      prevBlockHash,
      currentBlockData,
      nonce
    );
    const newBlock = bitcoin.createNewBlock(
      nonce,
      prevBlockHash,
      dataHashOfNewBlock
    );

    // boradcast block
    const allBoradcastNOdePromises = [];
    bitcoin.networkNodes.map((nodeURL) => {
      const networkBroadcastURL = nodeURL + "/receive-new-block";
      console.log("BLock Broadcast URL", networkBroadcastURL);
      const blockPromise = axios.post(networkBroadcastURL, {
        newBlock: newBlock,
      });
      allBoradcastNOdePromises.push(blockPromise);
    });

    await Promise.all(allBoradcastNOdePromises);
    //send bitcoin to miner
    const broadcastURL = bitcoin.currentNodeURL + "/transaction/broadcast";
    await axios.post(broadcastURL, {
      amount: 10,
      sender: "00",
      receiver: uuid().split("-").join(""), //for now lets take receiver node has this random address
    });
    res.status(statusCodes.OK).json({
      message: "Successfully mined and addes new block into blockcahin",
      newBlock: newBlock,
    });
  } catch (error) {
    res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Successfully not mined",
      error: error,
    });
  }
});
/* 
caller : new peer who wants to be newNode in blockcahin network
called on :one of member node which is already in blockachain 

body:  URL of new node

process:member node will send this newNode data  to all other remainig member nodes
member nodes will receive this newNode url data through /register-node" api

After the broadcast is complete, the member node that we hit will send a request to the newNode and  will
hit the register-nodes-bulk endpoint.
this will register all the other nodes in the network with our newNode.

*/

app.post("/register-and-broadcast-node", async (req, res) => {
  try {
    const newNodeUrl = req.body.newNodeUrl;
    console.log("Network nodes", newNodeUrl);

    if (bitcoin.networkNodes.indexOf(newNodeUrl) === -1) {
      bitcoin.networkNodes.push(newNodeUrl);
      console.log("Network nodes1", bitcoin.networkNodes);
    }
    const allNodesPromeses = [];
    bitcoin.networkNodes.map(async (nodesURL) => {
      const regNodeUrl = nodesURL + "/register-node";
      console.log("reg", regNodeUrl);
      const promiseReturn = axios.post(regNodeUrl, {
        newNodeURL: newNodeUrl,
      });
      allNodesPromeses.push(promiseReturn);
    });

    await Promise.all(allNodesPromeses);
    const newNodeBulkPassURL = newNodeUrl + "/register-node-bulk";
    await axios.post(newNodeBulkPassURL, {
      allNetworkNodes: [...bitcoin.networkNodes, bitcoin.currentNodeURL],
    });

    // console.log("PROPOGATED TO ALL", propagatedToALL);
    res
      .status(statusCodes.OK)
      .send({ message: "propogated to all,Node registered successfully" });
  } catch (error) {
    // console.log("error ", error);
    res.status(statusCodes.BAD_REQUEST).json({ err: error });
  }
});

app.post("/register-node", (req, res) => {
  console.log("Register Node");
  const newNodeURL = req.body.newNodeURL;
  if (
    bitcoin.networkNodes.indexOf(newNodeURL) === -1 &&
    bitcoin.currentNodeURL !== newNodeURL
  ) {
    bitcoin.networkNodes.push(newNodeURL);
  }
  res.status(statusCodes.OK).json({ message: "New Node added" });
});

app.post("/register-node-bulk", (req, res) => {
  console.log("NODE BULK ADDED");
  const allNetworkNodes = req.body.allNetworkNodes;

  allNetworkNodes.map((networkNodeURL) => {
    if (
      bitcoin.networkNodes.indexOf(networkNodeURL) === -1 &&
      bitcoin.currentNodeURL !== networkNodeURL
    ) {
      bitcoin.networkNodes.push(networkNodeURL);
    }
  });
  res.status(statusCodes.OK).json({ message: "NODE BULK ADDED" });
});

app.post("/transaction/broadcast", async (req, res) => {
  const newTransaction = bitcoin.creteNewTransaction(
    req.body.amount,
    req.body.sender,
    req.body.receiver
  );
  const blockIndex = bitcoin.addTransactionToPendingTransaction(newTransaction);
  //Now broadcast to all network nodes
  const allNodesPromeses = [];

  bitcoin.networkNodes.map((nodeURL) => {
    const nodeTransactionURL = nodeURL + "/transaction";
    const nodePromise = axios.post(nodeTransactionURL, {
      newTransaction: newTransaction,
    });
    allNodesPromeses.push(nodePromise);
  });
  await Promise.all(allNodesPromeses);
  res
    .status(statusCodes.OK)
    .json({ message: "Transaciion added and broadcasted", blockIndex });
});
//this receives mined block by other node so that it can be veririfed and added into blockchain
//if verified push into blockchain adn clear pending transaction

app.post("/receive-new-block", (req, res) => {
  try {
    const newBlock = req.body.newBlock;
    const lastBlock = bitcoin.getLastBlock();
    //verify wether previous hash matches with last block hash
    ///verify wether index of new block matccehs with index of lastblock+1
    console.log(
      "Mined block received",
      newBlock,
      lastBlock.hash,
      newBlock.previousBlockHash,
      lastBlock["index"] + 1 === newBlock["index"]
    );
    if (
      lastBlock.hash === newBlock.previousBlockHash &&
      lastBlock["index"] + 1 === newBlock["index"]
    ) {
      bitcoin.chain.push(newBlock);
      bitcoin.pendingTransactions = [];
      console.log("YOYO RECEIVED AND ADDED");
      res.status(200).json({ message: "received and added block" });
      return;
    } else {
      console.log("COULDNT RECEIVE AND ADD");
      res.status(statusCodes.NOT_ACCEPTABLE).json({
        message: "Couldnt receive and add block to chain",
      });
    }
  } catch (error) {
    console.log("ERROR VERIFIYING", error);
    res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error while verifying",
      error: error,
    });
  }
});
app.listen(portNo, () => console.log(` app listening on port ${portNo}.`));
