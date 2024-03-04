type InputHelperCore = {
  variant?: 'default' | 'error';
  message: string;
  className?: string;
};

export default function InputHelperCore({ variant, message, className }: InputHelperCore) {
  return (
    <div
      className={`px-auto py-auto ml-20 w-full text-[13px] font-[500] leading-[160%] ${className}`}
      style={{ color: variant === 'error' ? '#EA0B0B' : '#C1C1CF' }}>
      {message}
    </div>
  );
}
