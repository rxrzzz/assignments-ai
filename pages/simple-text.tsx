import { useRouter } from "next/router";
import { useState } from "react";
import { homeboxes, openai } from "../utils";
export default function SimpleText() {
  const { pathname } = useRouter();
  const pageProps = homeboxes.find((homebox) => homebox.link === pathname)!;

  const [prompt, setPrompt] = useState<string | undefined>("");
  const [result, setResult] = useState<string | undefined>("");
  async function summarizeData() {
    const { data } = await openai.createCompletion({
      model: "text-davinci-003",
      prompt:
        "Summarize this text for a 2nd grade student:" + "\n" + `${prompt}`,
      max_tokens: 1500,
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
            style={{ backgroundColor: pageProps.colorOne }}
            className="h-[200px] w-[200px] 
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
        <section className="flex mt-24 justify-between">
          <main className="w-5/12 ">
            <textarea
              name=""
              id=""
              placeholder="Enter text meant to be made easier to understand here:"
              className="min-h-[200px] text-xl p-2 bg-slate-800 w-full text-white resize-none"
              onChange={(e) => setPrompt(e.target.value)}
            ></textarea>
            <button
              onClick={summarizeData}
              style={{ backgroundColor: pageProps.colorOne }}
              className=" text-white px-2 py-1 text-xl mt-4 rounded-sm"
            >
              Make it Simpler.
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
