const hre = require("hardhat");

const FACTORY_NONCE = 1;
const FACTORY_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const EP_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const PAYMASTER_ADDRESS = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

async function main() {
    const [signer0] = await hre.ethers.getSigners();
    const address0 = await signer0.getAddress();
    const entryPoint = await hre.ethers.getContractAt("EntryPoint", EP_ADDRESS);
    
    // CREATE: hash(deployer + nonce)
    // CREATE2: hash(0xff + sender + bytecode + salt)

    const sender = await hre.ethers.getCreateAddress({
        from: FACTORY_ADDRESS,
        nonce: FACTORY_NONCE
    });

    console.log({ sender });

    const AccountFactory = await hre.ethers.getContractFactory("AccountFactory");
    const initCode = 
        FACTORY_ADDRESS + 
        AccountFactory.interface
            .encodeFunctionData("createAccount", [address0])
            .slice(2); // to remove hex prefix values
    
    const Account = await hre.ethers.getContractFactory("Account");
    const callData = Account.interface.encodeFunctionData("execute");


    // AA21 didn't pay prefund
    await entryPoint.depositTo(PAYMASTER_ADDRESS, {
        value: hre.ethers.parseEther("100")
    });

    const UserOp = {
        sender, // smart account address
        nonce: await entryPoint.getNonce(sender, 0),
        initCode,
        callData,
        callGasLimit: 800_000,
        verificationGasLimit: 800_000,
        preVerificationGas: 100_000,
        maxFeePerGas: hre.ethers.parseUnits("10", "gwei"),
        maxPriorityFeePerGas: hre.ethers.parseUnits("5", "gwei"),
        paymasterAndData: PAYMASTER_ADDRESS,
        signature: "0x",
    };

    const userOpHash = await entryPoint.getUserOpHash(UserOp);
    UserOp.signature = signer0.signMessage(
        hre.ethers.getBytes(userOpHash)
    );

    const tx = await entryPoint.handleOps([UserOp], address0);
    const receipt = await tx.wait();
    console.log(receipt);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});