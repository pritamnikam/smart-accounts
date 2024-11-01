const hre = require("hardhat");

const ACCOUNT_ADDR = "0x738d6c07c28a816b1065273f4fe2e933ac4958d2";

async function main() {
    const account = await hre.ethers.getContractAt("Account", ACCOUNT_ADDR);
    const count = await account.count();
    console.log(count);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});