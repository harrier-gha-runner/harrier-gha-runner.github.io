import { useState, useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";

const useSectionsInView = (sections: string[]) => {
  const [someState, setSomeState] = useState<string>("");

  // Manually call useInView for each section
  const section0 = useInView({ threshold: 0, rootMargin: "0px 0px -50% 0px" });
  const section1 = useInView({ threshold: 0, rootMargin: "0px 0px -50% 0px" });
  const section2 = useInView({ threshold: 0, rootMargin: "0px 0px -50% 0px" });
  const section3 = useInView({ threshold: 0, rootMargin: "0px 0px -50% 0px" });

  // Collect all refs in an array
  const sectionRefs = useMemo(
    () => [section0, section1, section2, section3],
    [section0, section1, section2, section3],
  );

  // Update the state when any section is in view
  useEffect(() => {
    sectionRefs.forEach((section, index) => {
      if (section.inView) {
        setSomeState(sections[index]); // Set state to the ID of the section that is in view
      }
    });
  }, [sectionRefs, sections]);

  return { sectionRefs, someState };
};

export { useSectionsInView };
