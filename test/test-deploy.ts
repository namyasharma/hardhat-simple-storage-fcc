import { ethers } from "hardhat"
import { assert } from "chai"
import { Contract } from "ethers"

describe("SimpleStorage", function () {
    let simpleStotageFactory, simpleStorage: Contract

    beforeEach(async function () {
        simpleStotageFactory = await ethers.getContractFactory("SimpleStorage")
        simpleStorage = await simpleStotageFactory.deploy()
    })

    it("Should start with a favourite number of 0", async function () {
        const currentValue = await simpleStorage.retrieve()
        const expectedValue = 0
        assert.equal(currentValue.toString(), expectedValue)
    })

    it("Should update when we call store", async function () {
        const expectedValue = await simpleStorage.retrieve()
        const transactionResponse = await simpleStorage.store(10)
        await transactionResponse.wait(1)
        const currentValue = await simpleStorage.retrieve()
        assert.notEqual(currentValue.toString(), expectedValue)
    })

    it("Should add a person to the mapping when we call addPerson", async function () {
        const expectedValue = await simpleStorage.getValueAtMapping("Namya")
        const transactionResponse = await simpleStorage.addPerson("Namya", 10)
        await transactionResponse.wait(1)
        const currentValue = await simpleStorage.getValueAtMapping("Namya")
        assert.notEqual(currentValue, expectedValue)
    })
})
