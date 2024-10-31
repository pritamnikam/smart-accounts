const hre = require("hardhat");

// const EP_ADDR = "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512"
const ACCOUNT_ADDRESS = "0xCafac3dD18aC6c6e92c921884f9E4176737C052c";

async function main() {
    // const code = await hre.ethers.provider.getCode(EP_ADDR);
    // console.log(code);

    const account = await hre.ethers.getContractAt("Account", ACCOUNT_ADDRESS);
    const count = await account.count();
    console.log(count);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});