#!/usr/bin/node

const SHA256 = require('crypto-js/sha256')


/* index: where the blocks sit
   timestamp: when the block was created
   data: data "detail transaction"
   previoushash: string that contains the hash of the previous block
*/

class Transactions{
    constructor(fromAddress, toAddress, amount){
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}




class Block{
    constructor(timestamp, transactions, previousHash = ''){
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    // calculates the hash of the block
    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + this.nonce + JSON.stringify(this.data)).toString();
    }

    mineBlock(difficulty){
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')){
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log("Block mined: " + this.hash);
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        this.pendingTransactions = [];
        this.miningReword = 10; //we can change this in the future
    }

    createGenesisBlock(){
        return new Block("02/10/2021", "Genesis Block", "0" );
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    //isChainValid returns true if it's valid or False if something is wrong
    isChainValid(){
        for(let indexBlock = 1; indexBlock < this.chain.length; indexBlock++){
            const currentBlock = this.chain[indexBlock];
            const previousBlock = this.chain[indexBlock - 1];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            } //check for hash calculations
            
            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            } 
        }

        return true;
    }
}

// tests
let SwiftieCoin = new Blockchain();

console.log(" Mining Block 1...");
SwiftieCoin.addBlock(new Block(1, "02/09/2021", {amount: 13}));

console.log(" Mining Block 2...");
SwiftieCoin.addBlock(new Block(2, "15/09/2021", {amount: 10}));

//console.log('Is blockchain valid? ' + SwiftieCoin.isChainValid());
//console.log(JSON.stringify(SwiftieCoin, null, 4));