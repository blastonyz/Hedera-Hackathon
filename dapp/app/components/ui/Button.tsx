type BtnProps = {
  onClick: (e?: React.MouseEvent<HTMLButtonElement>) => unknown;
  text: string;
  account: WalletAddress;
};

const Button: React.FC<BtnProps> = ({ onClick, text, account }) => {
  return (
  <button
  onClick={onClick}
  disabled={!account}
  className={`py-2 px-4 rounded font-semibold w-36 transition duration-300 ${
    !account
      ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
      : 'bg-[#9BE10D] text-white hover:brightness-110 active:scale-95'
  }`}
>
  {text}
</button>

  );
};

export default Button