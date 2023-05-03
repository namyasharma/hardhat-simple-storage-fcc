import { ethers } from "hardhat"
import { assert } from "chai"
import { SimpleStorage, SimpleStorage__factory } from "../typechain-types"

describe("SimpleStorage", function () {
    let simpleStorageFactory: SimpleStorage__factory,
        simpleStorage: SimpleStorage

    beforeEach(async function () {
        simpleStorageFactory = (await ethers.getContractFactory(
            "SimpleStorage"
        )) as SimpleStorage__factory
        simpleStorage = await simpleStorageFactory.deploy()
    })

    it("Should start with a favourite number of 0", async function () {
        const currentValue = await simpleStorage.retrieve()
        const expectedValue = 0
        assert.equal(currentValue.toString(), expectedValue.toString())
    })

    it("Should update when we call store", async function () {
        const expectedValue = await simpleStorage.retrieve()
        const transactionResponse = await simpleStorage.store(10)
        await transactionResponse.wait(1)
        const currentValue = await simpleStorage.retrieve()
        assert.notEqual(currentValue.toString(), expectedValue.toString())
    })

    it("Should add a person to the mapping when we call addPerson", async function () {
        const expectedValue = await simpleStorage.getValueAtMapping("Namya")
        const transactionResponse = await simpleStorage.addPerson("Namya", 10)
        await transactionResponse.wait(1)
        const currentValue = await simpleStorage.getValueAtMapping("Namya")
        assert.notEqual(currentValue, expectedValue)
    })
})
