import { useContext } from "react";
import { PageNavigationContext } from "@/providers/PageNavigation";
import { ImageContentModal } from "@/components/ui/dialog";

import { useInView } from "react-intersection-observer";

// Importing images
import CiCdCircles from "@/assets/2.1.1.ci-cd-simple-circles.png";

const SectionInView = ({
  sectionId,
  onInView,
}: {
  sectionId: string;
  onInView: (id: string) => void;
}) => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.3,
    rootMargin: "0px 0px -60% 0px",
  });

  if (inView) onInView(sectionId);

  return <div ref={ref}></div>;
};

const Design = () => {
  const pageContext = useContext(PageNavigationContext);

  if (!pageContext) {
    throw new Error(
      "make sure to wrap the component in a PageNavigationProvider",
    );
  }

  const { setActiveSubheader, pages, activePage } = pageContext;

  const subheaderIds = pages[activePage].subheaders?.map(
    (subheader) => subheader.id,
  );

  const subheaderNames = pages[activePage].subheaders?.map(
    (subheader) => subheader.name,
  );

  const handleInView = (id: string) => {
    const subheaderIndex = subheaderIds.indexOf(id);
    if (subheaderIndex !== -1) {
      setActiveSubheader(subheaderIndex);
    }
  };

  return (
    <>
      <section id="design-0">
        <SectionInView sectionId="design-0" onInView={handleInView} />
        <h2>{subheaderNames[0]}</h2>
        <p></p>
        <ImageContentModal src={CiCdCircles} alt={"CI/CD process"} />
      </section>
    </>
  );
};

export default Design;
