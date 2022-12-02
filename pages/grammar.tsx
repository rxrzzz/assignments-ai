import { useRouter } from "next/router";
import { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Options } from "../components/options";
import { Prompt } from "../components/Prompt";
import { homeboxes, openai } from "../utils";

export default function Grammar() {
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

  async function simplifyTextData() {
    setLoading(true);
    await openai
      .createCompletion({
        model: "text-davinci-003",
        prompt:
          "I'm a highly intelligent bot with profound profeciency in fixing spelling or grammatical mistakes in English words or sentences." +
          "\n" +
          "Correct this to standard English:" +
          "\n" +
          `${prompt}`,
        max_tokens: 1000,
        temperature: 0,
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
            exampleAnswer="I do not have sense."
            examplePrompt="I is not have sense."
            no={pageProps.no}
            title={pageProps.title}
          />

          <textarea
            placeholder="Enter the text you want to generate a gramatically correct version for here."
            className="min-h-[150px] text-xl p-2 bg-slate-800 w-full text-white resize-none"
            onChange={(e) => setPrompt(e.target.value)}
          ></textarea>
          {!loading ? (
            <button
              onClick={simplifyTextData}
              style={{ backgroundColor: pageProps.colorOne }}
              className=" text-white px-2 py-1 text-xl mt-4 rounded-sm"
            >
              Correct Text
            </button>
          ) : (
            <button
              onClick={simplifyTextData}
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
