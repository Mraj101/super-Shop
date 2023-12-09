// const assert = require('assert');
const {expect}=require('chai')
const {add} =require('../app')
describe('describing add function here',()=>{

    it("should add 2 numbers",()=>{
        const result=add(2,2);
        // assert.equal(result,4);
        expect(result).to.be.equal(4)
    });   
    

    it("should handle 1 argument",()=>{
        const result=add(2);
        // assert.equal(result,2);
        expect(result).to.be.equal(2)
    });


    it("should handle wrong arg types",()=>{
        const result=add(2,"test");
        // assert.equal(result,0);
        expect(result).to.be.equal(0)
    });
});