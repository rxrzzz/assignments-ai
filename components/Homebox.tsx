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
      onMouseOver={(e) => {
        e.currentTarget.style.background = colorOne;
        e.currentTarget.style.color = "white";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.background = "white";
        e.currentTarget.style.color = "black";
      }}
      href={link}
      className="h-full w-full shadow-xl transition-colors duration-300  bg-white pt-16 pb-4  rounded-md bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-30"
    >
      <aside>
        <main className="ml-4">
          <div
            className="h-[50px] w-[50px] rounded-full mb-4"
            style={{
              background: `radial-gradient(circle, white 0%, white 0%, ${colorOne} 100%)`,
            }}
          ></div>
          <h1 className="text-2xl font-bold  leading-tight ">
            {description}
          </h1>
          <p className="text-md mt-2 font-medium  max-w-[190px] ">
            {title}
          </p>
        </main>
      </aside>
    </Link>
  );
};
