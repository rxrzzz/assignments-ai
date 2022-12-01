type PromptProps = {
  colorOne: string;
  no: number;
  description: string;
  title: string;
  examplePrompt: string;
  exampleAnswer: string;
};

export const Prompt = ({
  colorOne,
  description,
  exampleAnswer,
  examplePrompt,
  no,
  title,
}: PromptProps) => {
  return (
    <>
      <div className="flex">
        <div
          style={{ backgroundColor: colorOne }}
          className="lg:h-[110px] lg:w-[110px] h-[100px] w-[100px]
   rounded-sm text-white text-6xl flex items-center shadow-md
   mr-6
    justify-center"
        >
          <h1>{no}</h1>
        </div>
        <div>
          <div className="text-white max-w-[280px]">
            <h1 className="lg:text-5xl md:text-5xl text-4xl font-bold">
              {description}
            </h1>
            <p className="md:text-xl text-md mt-2">{title}</p>
          </div>
        </div>
      </div>
      <div>
        <h1 className="font-medium text-lg mt-5">Example Prompt</h1>
        <p className="mb-4 border p-2 mt-2">{examplePrompt}</p>
      </div>
      <div>
        <h1 className="font-medium text-lg">Example Response</h1>
        <p className="mb-4 border p-2 mt-2">{exampleAnswer}</p>
      </div>
    </>
  );
};