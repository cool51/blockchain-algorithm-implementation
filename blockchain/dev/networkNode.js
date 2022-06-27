import express from "express";
import Blockchain from "./blockchain.js";
import statusCodes from "http-status-codes";
import bodyParser from "body-parser";
import axios from "axios";

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
  const blockIndex = bitcoin.creteNewTransaction(
    req.body.amount,
    req.body.sender,
    req.body.receiver
  );
  res
    .status(statusCodes.OK)
    .json({ message: "Transaciion will be added to block", blockIndex });
});
/* 
To mine new block into blockchain
*/
app.get("/mine", (req, res) => {
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
  res.status(statusCodes.OK).json({
    message: "Successfully mined and addes new block into blockcahin",
    newBlock: newBlock,
  });
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
    const newNodeURL = req.body.newNodeURL;
    if (bitcoin.networkNodes.indexOf(newNodeURL) === -1) {
      bitcoin.networkNodes.push(newNodeURL);
    }
    const allNodesPromeses = [];
    bitcoin.networkNodes.map(async (nodesURL) => {
      const regNodeUrl = nodesURL + "/register-node";
      console.log("reg", regNodeUrl);
      const promiseReturn = axios.post(regNodeUrl, {
        newNodeURL: newNodeURL,
      });
      allNodesPromeses.push(promiseReturn);
    });

    await Promise.all(allNodesPromeses);
    const newNodeBulkPassURL = newNodeURL + "/register-node-bulk";
    await axios.post(newNodeBulkPassURL, {
      allNetworkNodes: [...bitcoin.networkNodes, bitcoin.currentNodeURL],
    });

    // console.log("PROPOGATED TO ALL", propagatedToALL);
    res
      .status(statusCodes.OK)
      .send({ message: "propogated to all,Node registered successfully" });
  } catch (error) {
    console.log("error ", error);
    res.status(statusCodes.BAD_REQUEST).json({ error: error });
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
app.listen(portNo, () => console.log(` app listening on port ${portNo}.`));
