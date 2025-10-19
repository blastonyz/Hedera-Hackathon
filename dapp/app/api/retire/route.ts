import { NextResponse } from 'next/server';
import { JsonRpcProvider, Wallet, Contract } from 'ethers';
import { addrCarbonRetire } from '@/contracts/adresses';
import CarbonRetireNFT from '@contracts/CarbonRetireNFT.sol/CarbonRetireNFT.json';
import { keccak256, toUtf8Bytes } from 'ethers';

export async function POST(request: Request) {
  const { tokenAddress } = await request.json();
  console.log('tokenAddress: ', tokenAddress);

  const provider = new JsonRpcProvider(process.env.HEDERA_RPC_URL);
  const wallet = new Wallet(process.env.HEDERA_PRIVATE_KEY || '', provider);
  const retireContract = new Contract(addrCarbonRetire, CarbonRetireNFT.abi, wallet);

  const role = keccak256(toUtf8Bytes('MINTER_ROLE'));

  try {
    const tx = await retireContract.grantRole(
      role,
      tokenAddress
    );
    await tx.wait();
    return NextResponse.json({ success: true, txHash: tx.hash });
  } catch (err: unknown) {
    let errorMessage = 'Unknown Error';
    if (
      typeof err === 'object' &&
      err !== null &&
      'message' in err &&
      typeof (err as { message?: unknown }).message === 'string'
    ) {
      errorMessage = (err as { message: string }).message;
    }

    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });

  }
}