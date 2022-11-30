import { useRouter } from "next/router";
import { useState } from "react";
import { homeboxes, openai } from "../utils";

export default function Extract() {
  const { pathname } = useRouter();
  const pageProps = homeboxes.find((homebox) => homebox.link === pathname)!;

  const [prompt, setPrompt] = useState<string | undefined>("");
  const [result, setResult] = useState<string | undefined>("");
  async function summarizeData() {
    const { data } = await openai.createCompletion({
      model: "text-ada-001",
      prompt:
        "Extract the keywords from the following text:" + "\n" + `${prompt}`,
      max_tokens: 400,
      temperature: 1,
    });
    console.log(data);
    setResult(data.choices[0].text);
  }

  return (
    <main className="min-h-screen bg-slate-900 font-alpino">
      <div className="max-w-[1200px] mx-auto pt-16">
        <section className="flex justify-between items-center w-[95%] md:w-full mx-auto">
          <div
            style={{ backgroundColor: pageProps.colorOne }}
            className="lg:h-[200px] lg:w-[200px] h-[100px] w-[100px]
       rounded-sm text-white text-6xl flex items-center shadow-md
        justify-center"
          >
            <h1>{pageProps.no}</h1>
          </div>
          <div className="text-white ml-4 md:ml-0">
            <h1 className="lg:text-6xl md:text-5xl text-4xl font-bold">
              {pageProps.description}
            </h1>
            <p className="md:text-xl text-md">{pageProps.title}</p>
          </div>
        </section>
        <section className="flex mt-24  justify-between flex-wrap">
          <main className="lg:w-5/12 w-[95%]  mx-auto md:mx-0">
            <textarea
              maxLength={200}
              placeholder="Enter the text you want to extract key words from here (200 characters max)"
              className="min-h-[150px] text-xl p-2 bg-slate-800 w-full text-white resize-none"
              onChange={(e) => setPrompt(e.target.value)}
            ></textarea>
            <button
              onClick={summarizeData}
              style={{ backgroundColor: pageProps.colorOne }}
              className=" text-white px-2 py-1 text-xl mt-4 rounded-sm"
            >
                Extract Key Words
            </button>
          </main>
          <aside className="text-white md:w-6/12 w-[95%] mx-auto mt-8 md:mt-0">
            <h1 className="text-3xl font-bold">Response</h1>
            {result !== "" ? <p className="text-xl mt-4">{result}</p> : null}
          </aside>
        </section>
      </div>
    </main>
  );
}
