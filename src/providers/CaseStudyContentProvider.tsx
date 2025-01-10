import { useEffect, useState, createContext, ReactNode } from "react";
import slugify from "slugify";
// import introduction from "../assets/content/introduction.md";
import problemDomain from "../assets/content/problem-domain.md";
import design from "../assets/content/design.md";
import implementation from "../assets/content/implementation.md";
import futureWork from "../assets/content/future-work.md";
// import citations from "../assets/content/citations.md";

interface Header {
  level: string;
  name: string;
  id: string;
}

interface Chapter {
  name: string;
  content: string;
  //   tags: string[];
  subheaders: Header[];
}

interface CaseStudyContentContextProps {
  chapters: Chapter[] | null;
}

const CaseStudyContentContext =
  createContext<CaseStudyContentContextProps | null>(null);

const CaseStudyContentProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [chapters, setChapters] = useState<Chapter[] | null>(null);

  useEffect(() => {
    const fetchMarkdown = async () => {
      try {
        const chapterContent = await Promise.all([
          (await fetch(problemDomain)).text(),
          (await fetch(design)).text(),
          (await fetch(implementation)).text(),
          (await fetch(futureWork)).text(),
        ]);

        const allHeaders: Header[] = chapterContent.flatMap((md) => {
          const headerRegex = /^(#{1,6})\s+(.*)$/gm;
          const matches = [...md.matchAll(headerRegex)];
          return matches.map((match) => ({
            level: match[1].length.toString(),
            name: match[2]
              .trim()
              .replace(/\*\*/g, "")
              .replace(/\s*\{#.*/, ""),
            id: slugify(match[2].trim().replace(/\s*\{#.*/, ""), {
              lower: true,
              strict: true,
            }),
          }));
        });

        let contentIndex = 0;
        setChapters(
          allHeaders.reduce((accum: Chapter[], curr: Header) => {
            if (curr.level === "1") {
              accum.push({
                name: curr.name,
                content: chapterContent[contentIndex], //  removeH1Headers(chapterContent[contentIndex]),
                // tags: extractTags(chapterContent[contentIndex]),
                subheaders: [],
              });
              contentIndex++;
            } else if (accum.length > 0) {
              accum[accum.length - 1].subheaders.push(curr);
            }
            return accum;
          }, [] as Chapter[]),
        );
      } catch (err) {
        setError("Failed to load the case study markdown.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMarkdown();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <CaseStudyContentContext.Provider value={{ chapters }}>
      {children}
    </CaseStudyContentContext.Provider>
  );
};

export { CaseStudyContentProvider, CaseStudyContentContext };
