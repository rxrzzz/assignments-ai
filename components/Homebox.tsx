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
    <Link
      href={link}
      style={{
        backgroundColor: colorOne,
      }}
      className="w-[95%] flex items-baseline md:w-full mx-auto h-fit pt-20 pb-6  rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-60"
    >

        <aside>
          <main className="ml-4">
            <h1 className="text-3xl font-medium leading-tight text-slate-200">{description}</h1>
            <p className="text-md mt-2 font-medium opacity-80 ">{title}</p>
          </main>
        </aside>

    </Link>
  );
};
