import { Homebox } from "../components/Homebox";
import { homeboxes } from "../utils/index";

export default function Home() {
  return (
    <main className="  min-h-screen bg-[#eee] font-alpino">
      <div className="mx-auto max-w-[1600px]  flex w-[95%]">
        <h1 className="lg:py-12 py-6  xl:text-7xl lg:text-7xl md:text-6xl text-5xl font-bold ">
          <span className="block text-[#222]">home</span>
          <span className="block text-[#222]">work</span>
          <span>.ai</span>
        </h1>
      </div>
      <div className="md:pb-10 pb-12 lg:pb-0">
        <section
          className="grid lg:grid-cols-3 xl:grid-cols-4 md:grid-cols-2 grid-cols-1 w-[95%]
       max-w-[1600px] mx-auto mt-16 lg:gap-20 md:gap-12 gap-6"
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
      </div>
    </main>
  );
}
