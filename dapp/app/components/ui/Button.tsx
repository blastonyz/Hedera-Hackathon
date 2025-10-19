import { JsonRpcSigner } from "ethers";

type BtnProps = {
  onClick: (e?: React.MouseEvent<HTMLButtonElement>) => unknown;
  text: string;
  account: WalletAddress;
  loading:boolean;
  mainSigner: JsonRpcSigner | null;
};

const Button: React.FC<BtnProps> = ({ onClick, text, account,loading, mainSigner}) => {
  return (
  <button
  onClick={onClick}
  disabled={!account || !mainSigner}
  className={`py-2 px-4 rounded font-semibold w-36 transition duration-300 ${
    !account
      ? 'bg-violet-400 text-white cursor-not-allowed'
      : 'bg-lime-500 text-white hover:brightness-110 active:scale-95'
  }`}
>
  {loading ? "Wait..." : `${text}`}
</button>

  );
};

export default Button