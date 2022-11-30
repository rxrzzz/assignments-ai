import { Homebox } from "../components/Homebox";
import { homeboxes } from "../utils/index";

export default function Home() {
  const colorOne =
    homeboxes[Math.floor(Math.random() * homeboxes.length)].colorOne;
  const colorTwo =
    homeboxes[Math.floor(Math.random() * homeboxes.length)].colorTwo;
  return (
    <main className=" text-white min-h-screen bg-slate-900 font-alpino pb-18">
      <div className="text-center mx-auto max-w-[1000px]  md:py-10 py-6">
        <h1 className="lg:py-12  xl:text-9xl lg:text-7xl md:text-6xl text-5xl font-bold ">
          <span style={{ color: colorOne }}>homework</span>
          <span style={{ color: colorTwo }}>.ai</span>
        </h1>
        <p>Working on your assignments does not get easier than this!</p>
      </div>
      <section
        className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1
       max-w-[1400px] mx-auto mt-16 gap-12 "
      >
        {homeboxes.map((homebox) => (
          <Homebox
            colorOne={homebox.colorOne}
            colorTwo={homebox.colorTwo}
            link={homebox.link}
            description={homebox.description}
            title={homebox.title}
            key={homebox.title}
          />
        ))}
      </section>
    </main>
  );
}
