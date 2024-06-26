import { useRouter } from "next/router";
import { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Options } from "../components/options";
import { Prompt } from "../components/Prompt";
import { homeboxes, openai } from "../utils";

export default function Math() {
  const { pathname } = useRouter();
  const pageProps = homeboxes.find((homebox) => homebox.link === pathname)!;

  const [prompt, setPrompt] = useState<string | undefined>("");
  const [result, setResult] = useState<string | undefined>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function solveMath() {
    setLoading(true);
    await openai
      .createCompletion({
        model: "text-davinci-003",
        prompt:
          "I am a bot. I am highly profecient in solving mathematical related problems and equations. I am profecient in algebra, calculus, trigonometry and other math related topics." +
          "\n" +
          'Explain step by step how to arrive at the answer to this math question. Seperate each step by \"###\" ": ' +
          `${prompt}`,
        max_tokens: 1000,
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
            exampleAnswer="Step 1: To solve this question, use the antiderivative (or indefinite integral) to solve for the value.

            Step 2: The antiderivative of 8x^3 is 8/4 x^4, so the equation is ∫ 8x^3 dx = 8/4 x^4 + C (where C is the constant of integration).
            
            Step 3: Plug in the upper and lower limits of the integral (in this case, it is just x).
            
            Step 4: Substitute for the limits of integration into the equation: 8/4 x^4 + C.
            
            Step 5: Solve for C by subtracting the lower limit (in this case, x) from both sides of the equation.
            
            Step 6: The answer should be: 8/4 x^4 − x."
            examplePrompt="What is the value of ∫ 8 x3 dx."
            no={pageProps.no}
            title={pageProps.title}
          />
          <textarea
            placeholder="Enter the text you want to generate a simplified version for here."
            className="min-h-[150px] text-xl p-2 bg-slate-800 w-full text-white resize-none"
            onChange={(e) => setPrompt(e.target.value)}
          ></textarea>
          {!loading ? (
            <button
              onClick={solveMath}
              style={{ backgroundColor: pageProps.colorOne }}
              className=" text-white px-2 py-1 text-xl mt-4 rounded-sm"
            >
              Solve Question.
            </button>
          ) : (
            <button
              onClick={solveMath}
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
                onClick={() =>
                  window.navigator.clipboard.writeText(
                    result!.replaceAll("###", "    ")
                  )
                }
                className="mb-3 self-end mt-8 p-2 font-medium text-white"
                style={{ backgroundColor: pageProps.colorOne }}
              >
                Copy Text
              </button>
              <div
                className="min-h-[150px] text-xl p-2 bg-slate-800 w-full text-white resize-none "
                dangerouslySetInnerHTML={{
                  __html: `<p>${result?.replaceAll("###", "<br/></br/>")}</p>`,
                }}
              ></div>
            </>
          ) : null}
          {error !== "" ? (
            <div
              className="min-h-[150px] text-xl p-2 w-full resize-none mt-8 bg-red-500 text-white"
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
