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
        <RadioGroup.Label
          className="text-xl font-medium underline"
          style={{ textDecorationColor: color }}
        >
          Response Options:
        </RadioGroup.Label>
        <div className="grid grid-cols-1  gap-1">
          <RadioGroup.Option
            className=" cursor-pointer   max-w-[400px] mt-4"
            value="text-ada-001"
          >
            {({ checked }) => (
              <span
                style={{
                  backgroundColor: checked ? color : "",
                }}
                className="text-md p-1 rounded-sm"
              >
                fast / less intelligent.
              </span>
            )}
          </RadioGroup.Option>
          <RadioGroup.Option
            className=" cursor-pointer   max-w-[400px]"
            value="text-curie-001"
          >
            {({ checked }) => (
              <span
                style={{
                  backgroundColor: checked ? color : "",
                }}
                className="text-md p-1 rounded-sm"
              >
                moderate / slightly intelligent.
              </span>
            )}
          </RadioGroup.Option>
          <RadioGroup.Option
            className=" cursor-pointer  max-w-[400px]"
            value="text-davinci-003"
          >
            {({ checked }) => (
              <span
                style={{
                  backgroundColor: checked ? color : "",
                }}
                className="text-md p-1 rounded-sm"
              >
                slow / highly intelligent.
              </span>
            )}
          </RadioGroup.Option>
        </div>
      </RadioGroup>
    </div>
  );
};
