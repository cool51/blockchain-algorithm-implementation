import Blockchain from "./blockchain.js";

const bitcoin = new Blockchain();
const previousBlockHash = "8SA7D8EW7W87S54D8EW7R8E54345W";
const currentBlockData = [
  {
    amount: 45,
    sender: "6RE56E5R655D6GEWG54C5",
    receiver: "E88EE4545F8E68A9",
  },
  {
    amount: 42,
    sender: "34236RE56E5R655D6GEWG54C51",
    receiver: "324dsE88EE4545F8E68A9",
  },
  {
    amount: 66,
    sender: "54356RE56E5R655D6GEWG54C5",
    receiver: "glaofE88EE4545F8E68A9",
  },
];
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
console.log(bitcoin);
