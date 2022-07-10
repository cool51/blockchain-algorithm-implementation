import Blockchain from "./blockchain.js";

const bitcoin = new Blockchain();
const testBC = {
  chain: [
    {
      index: 1,
      timeStamp: 1656849088258,
      transactions: [],
      nonce: 12558,
      hash: "xxYxx",
      previousBlockHash: "yyXyy",
    },
    {
      index: 2,
      timeStamp: 1656849141850,
      transactions: [
        {
          amount: 500,
          sender: "NODE-1-XYZZYSPOON!",
          receiver: "COOLSXYZZ5",
          transactionID: "8927ac70fac611ec89abbf2610c5e0d6",
        },
      ],
      nonce: 150943,
      hash: "000072132675f692dd0576c33e9c1d54c0e1873b5a076d3a6e5bb658ffce8279",
      previousBlockHash: "xxYxx",
    },
    {
      index: 3,
      timeStamp: 1656849149468,
      transactions: [
        {
          amount: 10,
          sender: "00",
          receiver: "98f9d060fac611ec89abbf2610c5e0d6",
          transactionID: "98fa93b0fac611ec89abbf2610c5e0d6",
        },
        {
          amount: 500,
          sender: "NODE-1-XYZZYSPOON!",
          receiver: "COOLSXYZZ5",
          transactionID: "9a520d60fac611ec89abbf2610c5e0d6",
        },
        {
          amount: 500,
          sender: "NODE-1-XYZZYSPOON!",
          receiver: "COOLSXYZZ5",
          transactionID: "9be4bb50fac611ec89abbf2610c5e0d6",
        },
      ],
      nonce: 53706,
      hash: "0000c9703b96f78b3ebb57cadb1db1895ef3a4070d38230bff968e62f1e2a196",
      previousBlockHash:
        "000072132675f692dd0576c33e9c1d54c0e1873b5a076d3a6e5bb658ffce8279",
    },
    {
      index: 4,
      timeStamp: 1656849154719,
      transactions: [
        {
          amount: 10,
          sender: "00",
          receiver: "9d854bf0fac611ec89abbf2610c5e0d6",
          transactionID: "9d85e830fac611ec89abbf2610c5e0d6",
        },
        {
          amount: 500,
          sender: "NODE-1-XYZZYSPOON!",
          receiver: "COOLSXYZZ5",
          transactionID: "9eb8c2e0fac611ec89abbf2610c5e0d6",
        },
      ],
      nonce: 72900,
      hash: "00003p56c6f3dc3d34b8c087b2325909c7aa72f48b4bdb458dd37c118de58404",
      previousBlockHash:
        "0000c9703b96f78b3ebb57cadb1db1895ef3a4070d38230bff968e62f1e2a196",
    },
    {
      index: 5,
      timeStamp: 1656849368390,
      transactions: [
        {
          amount: 10,
          sender: "00",
          receiver: "a0a52990fac611ec89abbf2610c5e0d6",
          transactionID: "a0a5ece0fac611ec89abbf2610c5e0d6",
        },
        {
          amount: 500,
          sender: "NODE-2-XYZZYSPOON!",
          receiver: "COOLSXYZZ5",
          transactionID: "19c80ea0fac711eca70e03bbcf878104",
        },
        {
          amount: 500,
          sender: "NODE-3-XYZZYSPOON!",
          receiver: "COOLSXYZZ5",
          transactionID: "1ec510b0fac711ec926fd365cedc0a3f",
        },
      ],
      nonce: 2379,
      hash: "0000f633eo97775c4dbb648fb3360a18840a96967ef9772358e345b822a59519",
      previousBlockHash:
        "00003656c6f3dc3d34b8c087b2325909c7aa72f48b4bdb458dd37c118de58404",
    },
  ],
  pendingTransactions: [
    {
      amount: 10,
      sender: "00",
      receiver: "20022490fac711ec89abbf2610c5e0d6",
      transactionID: "2002e7e0fac711ec89abbf2610c5e0d6",
    },
  ],
  currentNodeURL: "http://localhost:3001",
  networkNodes: ["http://localhost:3002", "http://localhost:3003"],
};

// const previousBlockHash = "8SA7D8EW7W87S54D8EW7R8E54345W";
// const currentBlockData = [
//   {
//     amount: 45,
//     sender: "6RE56E5R655D6GEWG54C5",
//     receiver: "E88EE4545F8E68A9",
//   },
//   {
//     amount: 42,
//     sender: "34236RE56E5R655D6GEWG54C51",
//     receiver: "324dsE88EE4545F8E68A9",
//   },
//   {
//     amount: 66,
//     sender: "54356RE56E5R655D6GEWG54C5",
//     receiver: "glaofE88EE4545F8E68A9",
//   },
// ];
// const nonce = 455;
// console.log("found", bitcoin.proofOfWork(previousBlockHash, currentBlockData));
// console.log(bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce));

// bitcoin.createNewBlock(122, "XXIIWWHNBKL", "4577XII8iEII");
// bitcoin.createNewBlock(123, "665WWHNBKL", "4547XII8iEII");
// bitcoin.createNewBlock(125, "7645IWWHNBKL", "DS7XII8iEII");
// bitcoin.creteNewTransaction(100, "SADWASD", "XX2322");
// bitcoin.createNewBlock(126, "453WHNBKL", "RRRR7HHXII8iEII");
// bitcoin.creteNewTransaction(342, "dadSasdADWASD", "adXX2322");
// bitcoin.creteNewTransaction(345234, "asdSADWASD", "asdaXX2322");
// bitcoin.creteNewTransaction(454, "SADasdasWASD", "32423X423X2322");
// bitcoin.createNewBlock(77, "453WHNBKL", "RRRR7HHXII8iEII");
// bitcoin.creteNewTransaction(100, "SADWASD", "XX2322");
// bitcoin.creteNewTransaction(100, "SADWASD", "XX2322");
// bitcoin.creteNewTransaction(100, "SADWASD", "XX2322");

// console.log(bitcoin.chain[4]);
console.log(bitcoin.isChainValid(testBC.chain));
