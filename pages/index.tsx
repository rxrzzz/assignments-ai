import { Homebox } from "../components/Homebox";
import { homeboxes } from "../utils/index";

export default function Home() {
  return (
    <main className=" text-white min-h-screen bg-slate-900 font-alpino pb-18">
      <div className="text-center mx-auto">
        <h1 className="py-12 xl:text-9xl lg:text-7xl md:text-6xl text-5xl font-bold uppercase">
          Assignments AI
        </h1>
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
