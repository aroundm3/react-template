export default function Tooltip({
  message,
  children,
}: {
  message: string;
  children: React.ReactElement;
}) {
  return (
    <div className="group relative w-full h-full">
      {children}
      <div className="z-30 absolute left-1/2 bottom-8 ml-auto mr-auto min-w-max -translate-x-1/2 scale-0 transform rounded-lg px-3 py-2 transition-all duration-300 group-hover:scale-100">
        <div className="flex max-w-xs flex-col items-center">
          <div
            className="rounded-lg bg-[#212121] text-center text-xs text-[#F9F9F9]"
            style={{ padding: "3px 8px 3px 8px" }}
          >
            {message}
          </div>
          <div className="clip-bottom h-2 w-4 bg-[#212121]"></div>
        </div>
      </div>
    </div>
  );
}
