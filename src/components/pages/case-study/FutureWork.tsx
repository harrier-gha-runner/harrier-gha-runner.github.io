import { useContext } from "react";
import { PageNavigationContext } from "@/providers/PageNavigation";
import { Overview } from "@/components/utility/Overview";
import { CodeBlock as CB } from "@/components/utility/CodeBlock";
import { SectionInView } from "@/components/utility/SectionInView";

export const FutureWork = () => {
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
      <Overview title="Towards a Refinement of Hypotheses">
        <p>
          Harrier is has validated many aspects of its three primary hypotheses:
        </p>
        <ul>
          <li>
            Providing a dedicated cache storage will enable users to optimize
            their workflows with caching strategies
          </li>
          <li>
            Self-hosted runners provisioned on a users own cloud platform can
            easily match the baseline performance of GitHub's default VM runners
          </li>
          <li>
            Running a GitHub Actions workflow using self-hosted runners is as
            simple as registering a VM with the self-hosted runner token
          </li>
        </ul>
        <p>
          However, the development process has highlighted complexities within
          GHA that were not taken into consideration for the current prototype,
          illuminating a roadmap for future exploration.
        </p>
      </Overview>
      <section id="future-work-1">
        <SectionInView sectionId="future-work-1" onInView={handleInView} />
        <h2>{subheaderNames[0]}</h2>
        <p>
          Harrier assumed that the root cause for the lack of caching
          capabilities within GHA was due to GHA's initial VM architecture
          design of ephemeral runners without data persistence. This assumption
          seems to be validated by GHA's own cache workaround:
          <CB copy={false}>actions/cache</CB> as well as by other 3rd-party
          solutions. However, Harrier's hypothesis that the act of providing a
          dedicated cache storage through an alternative runner infrastructure
          would enable users to optimize their workflows may have overlooked the
          importance of human-centered design in devising a meaningful solution.
        </p>
        <p>
          Harrier's dedicated S3 bucket for persistent cache storage made
          caching a possibility. However, given the complexities of how a
          workflow executes a CI build, caching only became a reality once
          Harrier shouldered the work of identifying the proper cache sequence,
          implementing requisite cache management, and abstracting away the
          entire algorithm through public GHA actions that users can simply drop
          in to their existing workflows.
        </p>
        <p>
          Looking forward, the opportunities for exploration should focus around
          making the provisioned alternative VM architecture usable to the user
          with minimal disruption to existing workflows. This effort would
          include:
        </p>
        <ul>
          <li>
            Identify additional cacheable data commonly present in GHA workflows
            (i.e. fetched <CB copy={false}>npm_cache</CB> packages above and
            beyond <CB copy={false}>node_modules</CB> directory files, docker
            layers, etc.)
          </li>
          <li>
            Generalize the Harrier cache actions to accept arguments that
            identify the cacheable data and the respective cache management
            strategy
          </li>
        </ul>
      </section>
      <section id="future-work-2">
        <SectionInView sectionId="future-work-2" onInView={handleInView} />
        <h2>{subheaderNames[1]}</h2>
        <p>
          Harrier assumed that the baseline workflow runtime performance,
          without using cache, was directly correlated to the hardware specs of
          the VM runner. Under this assumption, Harrier was designed to provide
          users with AWS EC2s with CPU and memory specs that are equal to or
          better than GHA VMs, with the only major consideration placed on
          pricing considerations.
        </p>
        <p>
          During testing, the actual execution time of the workflow between
          Harrier-provisioned runners and GHA default runners were comparable,
          with a slight trend towards Harrier runners being a bit faster due to
          AWS offering slightly cheaper compute power, all things equal.
          However, the overall runtime of the workflow was oftentimes faster on
          GHA default runners due to an unforeseen factor – bootup time of AWS
          EC2s required for getting the VM runner ready to receive and execute a
          workflow. The initial Harrier hypothesis that led to the decision of
          focusing on hardware specs overlooked the likelihood of GHA having a
          complex backend setup that can almost instantaneously match a new
          workflow with a runner.
        </p>
        <p>
          Looking forward, the opportunities for exploration should focus around
          making a configured VM runner available for use as quickly as possible
          so that the user can experience real time savings. This effort would
          include:
        </p>
        <ul>
          <li>
            Understand the GHA VM provisioning protocol to re-imagine the
            Harrier provisioning protocol with industry best practices
          </li>
          <li>
            Optimize the EC2 configuration and startup steps so that the
            time-to-availability for a Harrier-provisioned runner matches as
            closely as possible that of a GHA default runner
          </li>
        </ul>
      </section>
      <section id="future-work-3">
        <SectionInView sectionId="future-work-3" onInView={handleInView} />
        <h2>{subheaderNames[2]}</h2>
        <p>
          Harrier assumed that replacing a GHA default runner with a self-hosted
          runner would be as simple as executing the GHA self-hosted runner
          application on the alternative runner and registering it with the
          appropriate self-hosted runner token provided by GitHub. This
          assumption is easily validated when running a simple GHA workflow that
          requires just one runner. However, additional testing revealed that
          this simplistic understanding of GHA self-hosted runners does not
          adequately serve the needs of more complex workflows.
        </p>
        <p>
          GHA workflows are designed to handle complex automation needs such as
          job concurrency, which serves an important role of optimizing runtime
          performance. When there is a need to test out variations of a
          workflow, the matrix strategy can initiate multiple job runs that are
          based on a combination of variables. When there are multiple jobs that
          do not rely on one another, parallel execution can initiate each job
          run on separate VMs to achieve faster workflow completion. When
          testing Harrier with these types of complex workflows, it was observed
          that not all workflow jobs are picked up by Harrier-provisioned
          runners, ultimately leading to a failed workflow run.
        </p>
        <p>
          Looking forward, the opportunities for exploration should focus around
          properly integrating with GHA's runner request mechanism to ensure
          that all workflow jobs are executed. This effort would include:
        </p>
        <ul>
          <li>
            Understand the GHA runner request protocol to ensure that the
            Harrier self-hosted runner registration algorithm properly
            integrates with GHA needs
          </li>
          <li>
            Optimize the Harrier warm pool strategy to dynamically accommodate
            the quantity of runners demanded by GHA workflows
          </li>
        </ul>
      </section>
    </>
  );
};
