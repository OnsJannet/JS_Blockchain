#!/usr/bin/node

const SHA256 = require('crypto-js/sha256')

/* index: where the blocks sit
   timestamp: when the block was created
   data: data "detail transaction"
   previoushash: string that contains the hash of the previous block
*/

class Block{
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = ''
    }
    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block(0, "02/10/2021", "Genesis Block", "0" );
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
}


let SwiftieCoin = new Blockchain();
SwiftieCoin.addBlock(new Block(1, "02/09/2021", {amount: 13}));
SwiftieCoin.addBlock(new Block(2, "15/09/2021", {amount: 10}));

console.log(JSON.stringify(SwiftieCoin, null, 4));