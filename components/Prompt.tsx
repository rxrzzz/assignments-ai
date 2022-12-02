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
      <div className="flex items-center">
        <div
          className="md:h-[110px] md:w-[110px] w-[60px] h-[60px] rounded-full mb-4 mr-6 flex items-center justify-center"
          style={{
            background: `radial-gradient(circle, white 0%, white 0%, ${colorOne} 100%)`,
          }}
        >
          <h1 className="md:text-4xl text-2xl font-bold">{no}</h1>
        </div>
        <div>
          <div className=" max-w-[500px]">
            <h1 className="lg:text-3xl text-2xl font-bold">{description}</h1>
            <p className="md:text-xl text-md">{title}</p>
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-xl md:text-2xl mt-5 font-bold opacity-80">
          Example Prompt:
        </h1>
        <p className="mb-4  md:mt-2 text-lg md:text-xl">{`"${examplePrompt}"`}</p>
      </div>
      <div>
        <h1 className="text-xl md:text-2xl mt-5 font-bold opacity-80">
          Example Response:
        </h1>
        <p className="mb-4  md:mt-2 text-lg md:text-xl">{`"${exampleAnswer}"`}</p>
      </div>
    </>
  );
};
