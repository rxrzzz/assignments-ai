type HomeboxProps = {
  colorOne: string;
  colorTwo: string;
  title: string;
  description: string;
};

export const homeboxes: HomeboxProps[] = [
  {
    colorOne: "#136a8a",
    colorTwo: "#267871",
    description: "Create Study Notes",
    title: "Provide a topic and get study notes.",
  },
  {
    colorOne: "#6441A5",
    colorTwo: "#2a0845",
    description: "Create An Outline",
    title: "Generate an outline for a research topic.",
  },
  {
    colorOne: "#ffb347",
    colorTwo: "#ffcc33",
    description: "Summarize Text",
    title: "Generated a TLDR from a given set of text.",
  },
  {
    colorOne: "#d3959b",
    colorTwo: "#bfe6ba",
    description: "Extract Keywords ",
    title: "Extract keywords from a block of text.",
  },
  {
    colorOne: "#121212",
    colorTwo: "#abbaab",
    description: "Translate English",
    title: "Translate English text to French, Spanish and Japanese.",
  },
  {
    colorOne: "#24fe41",
    colorTwo: "#fdfc47",
    description: "Make text simpler.",
    title: "Translates difficult text into simpler concepts.",
  },
  {
    colorOne: "#83a4d4",
    colorTwo: "#b6fbff",
    description: "Grammar correction.",
    title: "Corrects sentences into standard English.",
  },
  {
    colorOne: "#00c6ff",
    colorTwo: "#0072ff",
    description: "Questions and Answer",
    title: "Generate simple answers to given questions.",
  },
];
