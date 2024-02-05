type InputHelperCore = {
  variant?: 'default' | 'error';
  message: string;
  className?: string;
};

export default function InputHelperCore({ variant, message, className }: InputHelperCore) {
  return (
    <div
      className={`w-full px-auto py-auto text-[13px] font-[500] leading-[160%] ml-20 ${className}`}
      style={{ color: variant === 'error' ? '#EA0B0B' : '#C1C1CF' }}>
      {message}
    </div>
  );
}
