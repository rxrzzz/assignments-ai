import { RadioGroup } from "@headlessui/react";

type OptionProp = {
  option: string;
  setOption: (option: string) => void;
  color: string;
};

export const Options = ({ option, setOption, color }: OptionProp) => {
  return (
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
                  backgroundColor: checked ? color : "",
                }}
                className="font-medium"
              >
                Very fast / Less intelligent
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
                  backgroundColor: checked ? color : "",
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
  );
};
