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
      <div className="w-full">
        <aside
          style={{
            background: colorOne,
          }}
          className="w-full pt-8 bg-gradient-to-r pb-3 
          h-[150px]
      animate-gradient-y"
        >
          <main className="ml-4">
            <h1 className="text-2xl font-medium leading-tight">{description}</h1>
            <p className="text-lg mt-2 font-medium opacity-90 ">
              {title}
            </p>
          </main>
        </aside>
      </div>
    </Link>
  );
};
