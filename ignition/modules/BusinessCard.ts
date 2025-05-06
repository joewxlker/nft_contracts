// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import dotenv from "dotenv";

dotenv.config();

const BusinessCardModule = buildModule("BusinessCardModule", (m) => {
  const unServerUrl = m.getParameter("unServerUrl", `${process.env.SERVER_URL}`);

  const businessCard = m.contract("BusinessCard", [unServerUrl]);

  return { businessCard };
});

export default BusinessCardModule;