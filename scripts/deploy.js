const hre = require("hardhat");

async function main() {
    const af = await hre.ethers.deployContract("AccountFactory");
    await af.waitForDeployment();
    console.log(
        `AccountFactory deployed to ${af.target}`
    );

    const ep = await hre.ethers.deployContract("EntryPoint");
    await ep.waitForDeployment();
    console.log(
        `EP deployed to ${ep.target}`
    );

    const paymaster = await hre.ethers.deployContract("Paymaster");
    await paymaster.waitForDeployment();
    console.log(
        `Paymaster deployed to ${paymaster.target}`
    );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});