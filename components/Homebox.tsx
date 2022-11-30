import Link from "next/link";

type HomeboxProps = {
  colorOne: string;
  colorTwo: string;
  title: string;
  description: string;
  link: string;
};

export const Homebox = ({
  colorOne,
  colorTwo,
  description,
  link,
  title,
}: HomeboxProps) => {
  return (
    <Link href={link} className="w-[95%] md:w-full mx-auto">
      <div className="w-full">
        <aside
          style={{
            background: colorOne,
          }}
          className="w-full pt-8 bg-gradient-to-r pb-3 
          h-[150px] shadow-xl
      "
        >
          <main className="ml-4">
            <h1 className="text-2xl font-bold leading-tight">
              {description}
            </h1>
            <p className="text-lg mt-2 font-medium opacity-80 ">{title}</p>
          </main>
        </aside>
      </div>
    </Link>
  );
};
