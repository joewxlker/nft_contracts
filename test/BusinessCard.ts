import { expect } from "chai";
import hre from "hardhat";

describe("BusinessCard", function () {
  async function loadFixtures() {
    const [owner, caller] = await hre.ethers.getSigners();

    const BusinessCard = await hre.ethers.getContractFactory("BusinessCard");
    const businessCard = await BusinessCard.deploy("https://test.domain_name.com");

    return { BusinessCard, businessCard, owner, caller };
  }

  it("mints NFT", async () => {
    const { businessCard, caller } = await loadFixtures();
    
    const businessCardAsCaller = businessCard.connect(caller);
    await businessCardAsCaller.mint(caller.address);
  });

  it("generates uri", async () => {
    const { businessCard, caller } = await loadFixtures();
    
    const businessCardAsCaller = businessCard.connect(caller);
    await businessCardAsCaller.mint(caller.address);
    const uri = await businessCardAsCaller.tokenURI(0);

    expect(uri).to.equal("https://test.domain_name.com/api/metadata/0")
  });
});