const hre = require("hardhat");

const EP_ADDR = "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512"
const ACCOUNT_ADDRESS = "0xa16E02E87b7454126E5E10d957A927A7F5B5d2be";
const PAYMASTER_ADDRESS = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";


async function main() {
    // const code = await hre.ethers.provider.getCode(EP_ADDR);
    // console.log(code);

    const account = await hre.ethers.getContractAt("Account", ACCOUNT_ADDRESS);
    const count = await account.count();
    console.log(count);

    console.log("account balance: ", await hre.ethers.provider.getBalance(ACCOUNT_ADDRESS));

    const entryPoint = await hre.ethers.getContractAt("EntryPoint", EP_ADDR);
    console.log("account balance on EntryPoint: ", await entryPoint.balanceOf(ACCOUNT_ADDRESS));

    console.log("Paymaster balance on EntryPoint: ", await entryPoint.balanceOf(PAYMASTER_ADDRESS));

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});