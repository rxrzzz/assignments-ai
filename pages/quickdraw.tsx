import { RadioGroup } from "@headlessui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { homeboxes, openai } from "../utils";

export default function QuickDraw() {
  const { pathname } = useRouter();
  const pageProps = homeboxes.find((homebox) => homebox.link === pathname)!;
  const [option, setOption] = useState("text-ada-001");

  const [prompt, setPrompt] = useState<string | undefined>("");
  const [result, setResult] = useState<string | undefined>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function summarizeData() {
    setLoading(true);
    await openai
      .createCompletion({
        model: option,
        prompt: `What are the key things I should know when studying about ${prompt}?. List them out.`,
        max_tokens: 1200,
        temperature: 0,
      })
      .then((response) => {
        const { data } = response;
        setResult(data.choices[0].text);
        setLoading(false);
      })
      .catch((err) => {
        setError("An error occured. Please wait for a minute and then retry.");
      });
  }

  return (
    <main className="min-h-screen bg-slate-900 font-alpino text-white">
      <div className="max-w-[1200px] py-16 flex justify-between mx-auto flex-wrap">
        <div className="lg:w-5/12 w-11/12 mx-auto">
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
                <p className="md:text-xl text-md">{pageProps.title}</p>
              </div>
            </div>
          </div>
          <div>
            <h1 className="font-medium text-lg mt-5">Example Prompt</h1>
            <p className="mb-4">Germany.</p>
          </div>
          <div>
            <h1 className="font-medium text-lg">Example Response</h1>
            <p className="mb-4 border p-2 mt-2">
              1. Germany is a country in Europe that is known for its
              engineering and engineering interests. 2. Germany is also known
              for its military might, with the country having an army of over 1
              million soldiers and sailors. 3. Germany is also known for its
              culture, with a wide variety of cultures represented in the
              country art and literature. 4. Germany is also known for its food,
              with many different types of dishes being available in a variety
              of shapes and flavors. 5. Germany is also known for its music,
              with the country having a number of popular artists to choose
              from.
            </p>
          </div>
          <div>
            <RadioGroup
              value={option}
              onChange={setOption}
              className="my-8 text-xl text-white"
            >
              <RadioGroup.Label className="text-2xl font-bold ">
                Response Options:
              </RadioGroup.Label>
              <div className="grid grid-cols-3">
                <RadioGroup.Option
                  className="my-4 cursor-pointer  max-w-[400px] mt-4"
                  value="text-ada-001"
                >
                  {({ checked }) => (
                    <span
                      style={{
                        backgroundColor: checked ? pageProps.colorOne : "",
                      }}
                      className="font-medium"
                    >
                      Very fast / Less intelligent
                    </span>
                  )}
                </RadioGroup.Option>
                <RadioGroup.Option
                  className="my-4 cursor-pointer  max-w-[400px]"
                  value="Moderately fast and pretty intelligent responses"
                >
                  {({ checked }) => (
                    <span
                      style={{
                        backgroundColor: checked ? pageProps.colorOne : "",
                      }}
                      className="font-medium"
                    >
                      Fast / Slightly Intelligent
                    </span>
                  )}
                </RadioGroup.Option>
                <RadioGroup.Option
                  className="my-4 cursor-pointer  max-w-[400px]"
                  value="text-davinci-003"
                >
                  {({ checked }) => (
                    <span
                      style={{
                        backgroundColor: checked ? pageProps.colorOne : "",
                      }}
                      className="font-medium"
                    >
                      Slow / Highly Intelligent.
                    </span>
                  )}
                </RadioGroup.Option>
              </div>
            </RadioGroup>
          </div>
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
        </div>
        <div className="lg:w-5/12 w-11/12 mx-auto">
          <h1 className="text-3xl font-bold mt-16">Response</h1>
          {result !== "" ? (
            <div
              className="min-h-[150px] text-xl p-2 bg-slate-800 w-full text-white resize-none mt-8"
              dangerouslySetInnerHTML={{
                __html: `<p>${result}</p>`,
              }}
            ></div>
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
