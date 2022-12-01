import { Configuration, OpenAIApi } from "openai";

type HomeboxProps = {
  colorOne: string;
  colorTwo: string;
  title: string;
  description: string;
  link: string;
  no: number;
};

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
});

export const openai = new OpenAIApi(configuration);

export const options = [
  "Fast and intelligent responses",
  "Very fast but not so intelligent responses",
  "Slow but highly intelligent responses",
];
export const homeboxes: HomeboxProps[] = [
  {
    colorTwo: "#00c6ff",
    colorOne: "#0072ff",
    description: "Essay Writer.",
    title: "Write an essay based on a given topic.",
    link: "/essay",
    no: 1,
  },
  {
    colorOne: "#83a4d4",
    colorTwo: "#b6fbff",
    description: "Grammar correction.",
    title: "Corrects sentences into standard English.",
    link: "/grammar",
    no: 2,
  },
  {
    colorOne: "#00c6ff",
    colorTwo: "#0072ff",
    description: "Question and Answer",
    title: "Generate simple answers to given questions.",
    link: "/answers",
    no: 3,
  },
  {
    colorOne: "#6441A5",
    colorTwo: "#2a0845",
    description: "Create An Outline",
    title: "Generate an outline for a research topic.",
    link: "/outline",
    no: 4,
  },
  {
    colorOne: "#136a8a",
    colorTwo: "#267871",
    description: "Quickdraw",
    title: "Quickly get study points on any particular topic. ",
    link: "/quickdraw",
    no: 5,
  },
  {
    colorOne: "#ffb347",
    colorTwo: "#ffcc33",
    description: "Summarize Text",
    title: "Generated a TLDR from a given set of text.",
    link: "/summarize",
    no: 6,
  },
  {
    colorOne: "#d3959b",
    colorTwo: "#bfe6ba",
    description: "Extract Keywords ",
    title: "Extract keywords from a block of text.",
    link: "/extract",
    no: 7,
  },
  {
    colorOne: "#24fe41",
    colorTwo: "#fdfc47",
    description: "Make text simpler.",
    title: "Translates difficult text into simpler concepts.",
    link: "/simple-text",
    no: 8,
  },
];
