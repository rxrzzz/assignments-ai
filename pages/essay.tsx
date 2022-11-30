import { useRouter } from "next/router";
import { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Options } from "../components/options";
import { homeboxes, openai } from "../utils";

export default function Essay() {
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

  async function writeEssay() {
    setLoading(true);
    await openai
      .createCompletion({
        model: option,
        prompt:
          "I am a highly intelligent article writing bot. I have a lot of knowledge on social commentary, literature, biology, physics, chemistry, religion, history, law, medicine, engineering, human psychology and computer science." +
          "\n" +
          `Q: Write an article on ${prompt}`,
        max_tokens: 4000,
        temperature: 1,
      })
      .then((response) => {
        const { data } = response;
        setResult(data.choices[0].text);
        setLoading(false);
        setError("")
      })
      .catch((err) => {
        setError(
            "An error occured. Please wait for a minute and then retry or choose another response type."
          );
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
            <p className="mb-4 border p-2 mt-2">Road accidents</p>
          </div>
          <div>
            <h1 className="font-medium text-lg">Example Response</h1>
            <p className="mb-4 border p-2 mt-2">
              Road safety is a significant global concern. Each year, millions
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
              it. 😶)
            </p>
          </div>
          <Options
            color={pageProps.colorOne}
            option={option}
            setOption={changeOption}
          />
          <textarea
            placeholder="Enter the text you want to generate a simplified version for here."
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
              __html: `<p className="bg-red-500">${error}</p>`,
            }}
          ></div>
          ) : null}
        </div>
      </div>
    </main>
  );
}
