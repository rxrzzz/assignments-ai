import { useRouter } from "next/router";
import { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Options } from "../components/options";
import { homeboxes, openai } from "../utils";

export default function Outline() {
  const { pathname } = useRouter();
  const pageProps = homeboxes.find((homebox) => homebox.link === pathname)!;
  const [option, setOption] = useState("text-ada-001");

  const changeOption = (inputOption: string) => {
    setOption(inputOption);
  };

  const [prompt, setPrompt] = useState<string | undefined>("");
  const [result, setResult] = useState<string | undefined>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function generateOutline() {
    setLoading(true);
    await openai
      .createCompletion({
        model: option,
        prompt: "Create an outline for an essay about" + " " + `${prompt}`,
        max_tokens: 500,
        temperature: 1,
      })
      .then((response) => {
        const { data } = response;
        setResult(data.choices[0].text);
        setLoading(false);
      })
      .catch((err) => {
        setError("An error occured. Please wait for a minute and then retry.");
        setLoading(false)
      });
  }

  return (
    <main className="min-h-screen bg-slate-900 font-alpino text-white">
      <div className="max-w-[1200px] py-16 flex justify-between mx-auto flex-wrap">
        <div className="lg:w-5/12 w-11/12 mx-auto">
          <Navbar color={pageProps.colorOne} />
          <div className="flex">
            <div
              style={{ backgroundColor: pageProps.colorOne }}
              className="lg:h-[110px] lg:w-[110px] h-[100px] w-[100px]
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
                <p className="md:text-xl text-md mt-2">{pageProps.title}</p>
              </div>
            </div>
          </div>
          <div>
            <h1 className="font-medium text-lg mt-5">Example Prompt</h1>
            <p className="mb-4 border p-2 mt-2">
              The dangers of smoking on pregnant women.
            </p>
          </div>
          <div>
            <h1 className="font-medium text-lg">Example Response</h1>
            <p className="mb-4 border p-2 mt-2">
              I. Introduction A. Definition of smoking B. Overview of dangers of
              smoking on pregnant women II. Negative Impact on Mother A.
              Increased risk of miscarriage B. Increase in complications during
              labor C. Increase in infertility III. Negative Impact on Child A.
              Health complications B. Fetal growth restriction C. Preterm
              delivery IV. Treatment A. Quitting smoking B. Smoking cessation
              treatments V. Conclusion A. Summary of dangers of smoking on
              pregnant women B. Recommendations
            </p>
          </div>
          <Options
            color={pageProps.colorOne}
            option={option}
            setOption={changeOption}
          />
          <textarea
            maxLength={200}
            placeholder="Enter the topic you want to make an outline for here (200 characters max)"
            className="min-h-[150px] text-xl p-2 bg-slate-800 w-full text-white resize-none"
            onChange={(e) => setPrompt(e.target.value)}
          ></textarea>
          {!loading ? (
            <button
              onClick={generateOutline}
              style={{ backgroundColor: pageProps.colorOne }}
              className=" text-white px-2 py-1 text-xl mt-4 rounded-sm"
            >
              Create Outline
            </button>
          ) : (
            <button
              onClick={generateOutline}
              disabled
              style={{ backgroundColor: pageProps.colorOne }}
              className=" text-white px-2 py-1 text-xl mt-4 rounded-sm opacity-90"
            >
              Loading...
            </button>
          )}
        </div>
        <div className="lg:w-5/12 w-11/12 mx-auto">
          <h1 className="text-3xl font-bold mt-16">Response</h1>
          {result !== "" ? (
            <>
              <button
                onClick={() => window.navigator.clipboard.writeText(result!)}
                className="mb-3 self-end mt-8 p-2 font-medium"
                style={{ backgroundColor: pageProps.colorOne }}
              >
                Copy Text
              </button>
              <div
                className="min-h-[150px] text-xl p-2 bg-slate-800 w-full text-white resize-none "
                dangerouslySetInnerHTML={{
                  __html: `<p>${result}</p>`,
                }}
              ></div>
            </>
          ) : null}
          {error !== "" ? (
            <div
              className="min-h-[150px] text-xl p-2 bg-slate-800 w-full text-white resize-none mt-8"
              dangerouslySetInnerHTML={{
                __html: `<p>${error}</p>`,
              }}
            ></div>
          ) : null}
        </div>
      </div>
    </main>
  );
}
