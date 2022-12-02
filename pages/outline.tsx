import { useRouter } from "next/router";
import { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Options } from "../components/options";
import { Prompt } from "../components/Prompt";
import { homeboxes, openai } from "../utils";

export default function Outline() {
  const { pathname } = useRouter();
  const pageProps = homeboxes.find((homebox) => homebox.link === pathname)!;

  const [prompt, setPrompt] = useState<string | undefined>("");
  const [result, setResult] = useState<string | undefined>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function generateOutline() {
    setLoading(true);
    await openai
      .createCompletion({
        model: "text-davinci-003",
        prompt: "Create an outline for an essay about" + " " + `${prompt}`,
        max_tokens: 500,
        temperature: 1,
      })
      .then((response) => {
        const { data } = response;
        setResult(data.choices[0].text);
        setLoading(false);
        setError("");
      })
      .catch((err) => {
        setError(
          "An error occured. Please wait for a minute and then retry or choose another response type."
        );
        setLoading(false);
      });
  }

  return (
    <main
      className=" font-alpino min-h-screen"
      style={{
        background: `linear-gradient(to bottom, ${pageProps.colorOne} 1%, #eee 10%, #eee 100%)`,
      }}
    >
      <div className="max-w-[1600px] py-16 flex justify-between mx-auto flex-wrap w-[95%] ">
        <div className="lg:w-5/12 w-11/12 mx-auto">
          <Navbar color={pageProps.colorOne} />
          <Prompt
            colorOne={pageProps.colorOne}
            description={pageProps.description}
            exampleAnswer="I. Introduction A. Definition of smoking B. Overview of dangers of
            smoking on pregnant women II. Negative Impact on Mother A.
            Increased risk of miscarriage B. Increase in complications during
            labor C. Increase in infertility III. Negative Impact on Child A.
            Health complications B. Fetal growth restriction C. Preterm
            delivery IV. Treatment A. Quitting smoking B. Smoking cessation
            treatments V. Conclusion A. Summary of dangers of smoking on
            pregnant women B. Recommendations"
            examplePrompt="The dangers of smoking on women."
            no={pageProps.no}
            title={pageProps.title}
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
                className="mb-3 self-end mt-8 p-2 font-medium text-white"
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
                __html: `<p className="bg-red-500">${error}</p>`,
              }}
            ></div>
          ) : null}
        </div>
      </div>
    </main>
  );
}
