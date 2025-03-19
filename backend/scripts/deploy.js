async function main() {
    const Pictagram = await ethers.getContractFactory("Pictagram");
    const pictagram = await Pictagram.deploy();
    await pictagram.waitForDeployment();
  
    console.log("Pictagram deployed to:", await pictagram.getAddress());
  }
  
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  