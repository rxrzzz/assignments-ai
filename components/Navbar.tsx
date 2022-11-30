import Link from "next/link";

export const Navbar = ({ color }: { color: string }) => {
  return (
    <header className="sticky top-8 z-10 mb-12">
      <Link
        className=" text-white text-xl p-2 rounded-full w-[120px] h-[120px] shadow-sm font-medium"
        href={"/"}
        style={{ backgroundColor: color }}
      >
        Home
      </Link>
    </header>
  );
};
