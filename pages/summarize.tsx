import { useRouter } from "next/router";
import { useState } from "react";
import { homeboxes, openai } from "../utils";

export default function Summarize() {
  const { pathname } = useRouter();
  const pageProps = homeboxes.find((homebox) => homebox.link === pathname)!;

  const [prompt, setPrompt] = useState<string | undefined>("");
  const [result, setResult] = useState<string | undefined>("");
  async function summarizeData() {
    const { data } = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt + `\n\n` + "tl;dr",
      max_tokens: 1000,
      temperature: 1,
    });
    console.log(data);
    setResult(data.choices[0].text);
  }

  return (
    <main className="min-h-screen bg-slate-900 font-alpino">
      <div className="max-w-[1200px] mx-auto pt-16">
        <section className="flex justify-between items-baseline">
          <div
            className="h-[200px] w-[200px] bg-[#ffb347]
         rounded-sm text-white text-6xl flex items-center shadow-md
          justify-center"
          >
            <h1>{pageProps.no}</h1>
          </div>
          <div className="text-white">
            <h1 className="text-6xl font-bold">{pageProps.description}</h1>
            <p className="text-xl">{pageProps.title}</p>
          </div>
        </section>
        <section className="flex mt-12 justify-between">
          <main className="w-5/12 ">
            <textarea
              name=""
              id=""
              placeholder="Enter text to summarize here."
              className="min-h-[200px] text-xl p-2 bg-slate-800 w-full text-white resize-none"
              onChange={(e) => setPrompt(e.target.value)}
            ></textarea>
            <button
              onClick={summarizeData}
              className="bg-[#ffb347] text-white px-2 py-1 text-xl mt-4 rounded-sm"
            >
              Summarize Text
            </button>
          </main>
          <aside className="text-white w-6/12">
            <h1 className="text-3xl font-bold">Response</h1>
            {result !== "" ? <p className="text-xl mt-4">{result}</p> : null}
          </aside>
        </section>
      </div>
    </main>
  );
}
