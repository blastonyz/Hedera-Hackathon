import { Contract } from "ethers";

export const buyBatchFunction = async ({
  carbonToken,
  paymentToken,
  account,
  price,
  cid,
  quantity,
  nftAddress,
}: {
  carbonToken: Contract;
  paymentToken: Contract;
  account: string;
  price: string;
  cid: string;
  quantity: number;
  nftAddress: string;
}) => {
  const amount = BigInt(parseFloat(price) * quantity * 10 ** 18);
  /*
  const balance = await paymentToken.balanceOf(account);
  if (balance < amount) {
    throw new Error("❌ Insufficient balance");
  }*/

  const allowance = await paymentToken.allowance(account, nftAddress);
  if (allowance < amount) {
    const tx = await paymentToken.approve(nftAddress, amount);
    await tx.wait();
  }

  //await carbonToken.buy.staticCall(cid, quantity);
  const tx = await carbonToken.buy(cid, quantity);
  return await tx.wait();
};