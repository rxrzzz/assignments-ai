import { useRouter } from "next/router";
import { useState } from "react";
import { homeboxes, openai } from "../utils";

export default function QuickDraw() {
  const { pathname } = useRouter();
  const pageProps = homeboxes.find((homebox) => homebox.link === pathname)!;

  const [prompt, setPrompt] = useState<string | undefined>("");
  const [result, setResult] = useState<string | undefined>("");
  const [loading, setLoading] = useState(false);
  async function summarizeData() {
    setLoading(true);
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `What are the key things I should know when studying about ${prompt}?. List them out, seperating each point with a number followed by  \"###\"`,
      max_tokens: 1200,
      temperature: 0,
    });
    setResult(response.data.choices[0].text);
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-slate-900 font-alpino">
      <div className="max-w-[1200px] py-16 flex justify-between mx-auto">
        <div className="w-5/12 ">
          <div className="flex">
            <div
              style={{ backgroundColor: pageProps.colorOne }}
              className="lg:h-[200px] lg:w-[200px] h-[100px] w-[100px]
       rounded-sm text-white text-6xl flex items-center shadow-md
       mr-6
        justify-center"
            >
              <h1>{pageProps.no}</h1>
            </div>
            <div>
              <div className="text-white max-w-[280px]">
                <h1 className="lg:text-5xl md:text-5xl text-4xl font-bold">
                  {pageProps.description}
                </h1>
                <p className="md:text-xl text-md">{pageProps.title}</p>
              </div>
            </div>
            <div>

            </div>
          </div>
        </div>
        {/*         
        <section className="flex flex-col justify-between items-center w-[95%] md:w-full mx-auto ">
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
              placeholder="Enter the topic you want to generate study notes from here (200 characters max)"
              className="min-h-[150px] text-xl p-2 bg-slate-800 w-full text-white resize-none"
              onChange={(e) => setPrompt(e.target.value)}
            ></textarea>
            {!loading ? (
              <button
                onClick={summarizeData}
                style={{ backgroundColor: pageProps.colorOne }}
                className=" text-white px-2 py-1 text-xl mt-4 rounded-sm"
              >
                Generate Points.
              </button>
            ) : (
              <button
                onClick={summarizeData}
                disabled
                style={{ backgroundColor: pageProps.colorOne }}
                className=" text-white px-2 py-1 text-xl mt-4 rounded-sm opacity-90"
              >
                Loading...
              </button>
            )}
          </main>
          <aside className="text-white md:w-6/12 w-[95%] mx-auto mt-8 md:mt-0">
            <h1 className="text-3xl font-bold">Response</h1>
            {result !== "" ? (
              <div
                className="min-h-[150px] text-xl p-2 bg-slate-800 w-full text-white resize-none mt-8"
                dangerouslySetInnerHTML={{
                  __html: `<div>${result?.replaceAll(
                    "###",
                    "<br/></br>"
                  )}<div>`,
                }}
              ></div>
            ) : null}
          </aside>
        </section> */}
      </div>
    </main>
  );
}
