export const caseStudyStructure = [
  { number: "00", title: "Introduction", id: "introduction", purpose: "What is it, what did you own, and what was the scope?" },
  { number: "01", title: "The Opportunity", id: "the-opportunity", purpose: "What problem or opportunity shaped the project?" },
  { number: "02", title: "Defining the Product", id: "defining-the-product", purpose: "How did you organize the experience and set its boundaries?" },
  { number: "03", title: "Designing the Experience", id: "designing-the-experience", purpose: "Which decisions shaped the interactions, and why?" },
  { number: "04", title: "Designing the System", id: "designing-the-system", purpose: "Which patterns and iterations make the work consistent?" },
  { number: "05", title: "The Product", id: "the-product", purpose: "How does the complete experience work?" },
  { number: "06", title: "Reflection", id: "reflection", purpose: "What did you learn, what is supported by evidence, and what comes next?" },
] as const;

export function parseCaseStudy(source: string) {
  const headings = Array.from(source.matchAll(/^## (\d{2}) \/ (.+)\r?$/gm));
  if (headings.length !== caseStudyStructure.length || source.slice(0, headings[0]?.index).trim()) {
    throw new Error("Case studies must contain exactly the seven sections defined in structure.ts, starting with 00 / Introduction.");
  }
  return caseStudyStructure.map((section, index) => {
    const heading = headings[index];
    if (heading[1] !== section.number || heading[2].trim() !== section.title) {
      throw new Error(`Expected section ${section.number} / ${section.title}.`);
    }
    const body = source.slice((heading.index ?? 0) + heading[0].length, headings[index + 1]?.index ?? source.length).trim();
    if (!body) throw new Error(`Section ${section.title} cannot be empty.`);
    return { ...section, body };
  });
}
