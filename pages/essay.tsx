import { useRouter } from "next/router";
import { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Prompt } from "../components/Prompt";
import { homeboxes, openai } from "../utils";

export default function Essay() {
  const { pathname } = useRouter();
  const pageProps = homeboxes.find((homebox) => homebox.link === pathname)!;

  const [prompt, setPrompt] = useState<string | undefined>("");
  const [result, setResult] = useState<string | undefined>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function writeEssay() {
    setLoading(true);
    await openai
      .createCompletion({
        model: "text-davinci-003",
        prompt:
          "I am a highly intelligent article writing bot. I have a lot of knowledge on social commentary, literature, biology, physics, chemistry, religion, history, law, medicine, engineering, human psychology and computer science." +
          "\n" +
          `Q: Write an article on ${prompt}, seperating every 3 sentences with \"###\"`,
        max_tokens: 4000,
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
      className=" font-alpino "
      style={{
        background: `linear-gradient(to bottom, ${pageProps.colorOne} 1%, #eee 10%, #eee 100%)`,
      }}
    >
      <div className="max-w-[1600px] py-16 flex justify-between mx-auto flex-wrap w-[95%] ">
        <div className="lg:w-5/12 w-11/12 mx-auto sticky top-0">
          <Navbar color={pageProps.colorOne} />
          <Prompt
            colorOne={pageProps.colorOne}
            description={pageProps.description}
            examplePrompt="Road accidents."
            exampleAnswer="Road safety is a significant global concern. Each year, millions
            of people are killed or injured in road accidents. With the rise
            of motor vehicles, road use has become increasingly complex and
            unpredictable, leading to a rise in serious traffic accidents.
            Road accidents can be caused by a variety of factors, including
            driving under the influence of alcohol or drugs, not following the
            rules of the road, not using a seat belt, and other reckless or
            careless behaviors. Poor road and traffic management, inadequate
            lighting on rural roads, poor road surface quality, and dangerous
            driving practices such as overtaking or speeding can also cause a
            high frequency of road accidents. (It is really long. Shortened
            it. 😶)"
            no={pageProps.no}
            title={pageProps.title}
          />
          <textarea
            placeholder="Enter the text you want the topic you want an essay on here."
            className="min-h-[150px] text-xl p-2 bg-slate-800 w-full text-white resize-none"
            onChange={(e) => setPrompt(e.target.value)}
          ></textarea>
          {!loading ? (
            <button
              onClick={writeEssay}
              style={{ backgroundColor: pageProps.colorOne }}
              className=" text-white px-2 py-1 text-xl mt-4 rounded-sm"
            >
              Write Essay
            </button>
          ) : (
            <button
              onClick={writeEssay}
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
                    result!.replaceAll("###", "")
                  )
                }
                className="mb-3 self-end mt-8 p-2 text-white font-medium"
                style={{ backgroundColor: pageProps.colorOne }}
              >
                Copy Text
              </button>
              <div
                className="min-h-[150px] text-xl p-2 bg-slate-800 w-full text-white resize-none "
                dangerouslySetInnerHTML={{
                  __html: `<p>${result?.replaceAll("###", "<br/><br/>")}</p>`,
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
