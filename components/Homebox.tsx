import Link from "next/link";

type HomeboxProps = {
  colorOne: string;
  colorTwo: string;
  title: string;
  description: string;
};

export const Homebox = ({
  colorOne,
  colorTwo,
  description,
  title,
}: HomeboxProps) => {
  return (
    <Link href={"/"}>
      <div className="flex  p-2 justify-evenly font-alpino mx-auto">
        <aside
          style={{
            background: `linear-gradient(to bottom,  ${colorOne} 0%,${colorTwo} 50%)`,
          }}
          className="md:h-[150px] md:w-[150px] w-[100px] h-[100px] bg-gradient-to-r 
      rounded-full
      animate-gradient-y"
        ></aside>
        <main className="ml-4 w-7/12">
          <h1 className="text-2xl font-medium underline">{title}</h1>
          <p className="text-lg mt-2 font-medium opacity-90 ">{description}</p>
        </main>
      </div>
    </Link>
  );
};
