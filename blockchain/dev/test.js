import Blockchain from "./blockchain.js";

const bitcoin = new Blockchain();
console.log(bitcoin);
bitcoin.createNewBlock(122, "XXIIWWHNBKL", "4577XII8iEII");
bitcoin.createNewBlock(123, "665WWHNBKL", "4547XII8iEII");
bitcoin.createNewBlock(125, "7645IWWHNBKL", "DS7XII8iEII");
bitcoin.creteNewTransaction(100, "SADWASD", "XX2322");
bitcoin.createNewBlock(126, "453WHNBKL", "RRRR7HHXII8iEII");
bitcoin.creteNewTransaction(342, "dadSasdADWASD", "adXX2322");
bitcoin.creteNewTransaction(345234, "asdSADWASD", "asdaXX2322");
bitcoin.creteNewTransaction(454, "SADasdasWASD", "32423X423X2322");
bitcoin.createNewBlock(77, "453WHNBKL", "RRRR7HHXII8iEII");
bitcoin.creteNewTransaction(100, "SADWASD", "XX2322");
bitcoin.creteNewTransaction(100, "SADWASD", "XX2322");
bitcoin.creteNewTransaction(100, "SADWASD", "XX2322");

console.log(bitcoin.chain[4]);
// console.log(bitcoin);
