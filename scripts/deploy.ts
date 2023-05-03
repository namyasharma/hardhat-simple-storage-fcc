// imports
import '@nomiclabs/hardhat-ethers'
import { ethers, run, network } from 'hardhat'
//async
async function main() {
    const SimpleStotageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )
    console.log("Deploying contract...")
    const simpleStorage = await SimpleStotageFactory.deploy()
    await simpleStorage.deployed()
    console.log(`Deployed contract to : ${simpleStorage.address}`)
    //what happens when we deploy our code to the hardhat network?
    if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
        await simpleStorage.deployTransaction.wait(6)
        await verify(simpleStorage.address, [])
    }

    const currentValue = await simpleStorage.retrieve()
    console.log(`Current value is ${currentValue}`)

    //Update current value
    const transactionResponse = await simpleStorage.store(10)
    await transactionResponse.wait(1)
    const updatedValue = await simpleStorage.retrieve()
    console.log(`Updated value is ${updatedValue}`)

    const addPersonResponse = await simpleStorage.addPerson("Namya", 7)
    await addPersonResponse.wait(1)
    const updatedList = await simpleStorage.getValueAtMapping("Namya")
    console.log(`Updated list is : ${updatedList}`)
}

//verify
async function verify(contractAddress: string, args: any[]) {
    console.log("Verifying contract...")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (e: any) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already verified")
        } else console.log(e)
    }
}

//main
main()
    .then(() => process.exit(0))
    .catch((error) => console.error(error))
