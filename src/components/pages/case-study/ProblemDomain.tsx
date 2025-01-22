import { useContext } from "react";
import { PageNavigationContext } from "@/providers/PageNavigation";
import { ImageContentModal } from "@/components/ui/dialog";

import { useInView } from "react-intersection-observer";

// Importing images
import CiCdCircles from "@/assets/2.1.1.ci-cd-simple-circles.png";
import AutomationSoft from "@/assets/2.1.2.automation-software-dev.png";
import GitHubComponents from "@/assets/2.1.github-components.png";
import GHARunnerNoCache from "@/assets/2.2.1.gha-runner-no-cache.png";
import GHALimitedCache from "@/assets/2.2.2.gha-limited-cache-action.png";
import AltRunnerInfra from "@/assets/2.3.alternative-runner-infrastructure.png";

const SuperscriptExample = ({ sourceID }: { sourceID: string }) => {
  return (
    <sup
      className="cursor-pointer align-super text-xs font-normal hover:text-harrierBLUE"
      onClick={() => console.log("open modal!")}
    >
      {sourceID}
    </sup>
  );
};

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

const ProblemDomain = () => {
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
      <div>
        <p>
          some claim 5<sup className="align-super text-xs">2</sup>
        </p>
      </div>
      <section id="problem-domain-2-1">
        <h2>{subheaderNames[0]}</h2>
        <p className="callout">
          <p>Overview:</p>
          <ul>
            <li>
              <strong>
                GitHub Actions (GHA) as a cornerstone of modern software
                development.
              </strong>
              GitHub Actions empowers developers and teams to streamline their
              CI/CD workflows as its primary function.
            </li>
            <li>
              Given GHA's widespread adoption, identifying and addressing
              friction points within its workflows can have a substantial impact
              on the day-to-day experience and overall productivity of
              developers.
              <ul>
                <li>
                  By improving GHA itself, teams can work more efficiently and
                  reduce delays in the CI/CD process.
                </li>
              </ul>
            </li>
            <li>
              For this reason, finding opportunities for optimizing GHA
              workflows became a strategic priority for the Harrier team—because
              even small performance improvements at this stage can have
              compounding effects across the entire development pipeline.
            </li>
          </ul>
        </p>
      </section>
      <section>
        <h2>CI/CD and DevOps: The Backbone of Modern Software Development</h2>
        <p>
          Modern software development is a complex endeavor performed by large
          teams of experts, which require a great deal of communication and
          integration to ensure high-quality products. To deliver software
          successfully, it is important to have as much alignment between teams
          throughout the entire development process. DevOps is a philosophy and
          culture that enables agile development while supporting collaboration,
          automation, and continuous improvement.
          <SuperscriptExample sourceID="28" /> One of the key components of
          DevOps is Continuous Integration and Continuous Delivery/Deployment
          (CI/CD).
        </p>
        <ImageContentModal src={CiCdCircles} alt={"CI/CD process"} />
        <p>
          Continuous Integration (CI) centers around integrating code changes
          from multiple developers into a shared repository, as frequently as
          possible (source: codefresh). The desired impact of this practice is
          to stabilize the code base by discovering and resolving issues as
          early as possible in the development lifecycle. The output of CI is
          tested high-quality code that can be deployed to a staging or
          production environment.
        </p>
        <p>
          Continuous Delivery (CD) utilizes the artifacts created by the CI
          process and ensures that the software is always in a releasable state
          by subjecting the code to rigorous tests and checks in a staging
          environment so that it is production ready (source: codefresh).
          Continuous Deployment is an advancement from CD that removes human
          intervention from the deployment process with the addition of
          automated acceptance testing as the final step of the release cycle
          (source: geeksforgeeks).
        </p>
        <p>
          By automating the software development and release processes, CI/CD
          enables teams to streamline their workflows and enjoy the following
          benefits (source: Codefresh):
          <ul>
            <li>Early detection of issues</li>
            <li>Improved team collaboration</li>
            <li>Faster release cycles and rapid releases</li>
            <li>Reduced risk of failed deployments</li>
            <li>Improved and faster user feedback</li>
          </ul>
        </p>
        <p>
          These benefits help establish a more stable and efficient development
          environment. As software development grows increasingly complex, the
          automation and reliability CI/CD provides will continue to be
          indispensable for maintaining efficiency, minimizing errors, and
          enabling rapid iteration. These practices are not just trends; they
          are enduring pillars of the DevOps philosophy, ensuring developers can
          focus more on innovation and less on manual or repetitive tasks.
        </p>
      </section>
      <section>
        <h2>GHA Workflow Automation</h2>
        <p>
          Automation is the implementation of tasks or processes without human
          intervention, enabling increased efficiency and productivity. It
          involves streamlining repetitive, time-consuming, or error-prone
          tasks, freeing up developers to focus on higher value activities and
          ultimately leading to higher quality outcomes.
        </p>
        <ImageContentModal
          src={AutomationSoft}
          alt={"Automated processes for higher quality outcomes"}
        />
        <p>
          Within software development, a <strong>workflow</strong> as a concept
          is a defined sequence of automated steps and processes that coordinate
          tasks, tools, and resources.29 Workflows are designed to minimize or
          completely eliminate bottlenecks and improve the speed and quality of
          software delivery, therefore decreasing the need for human
          intervention and enhancing overall developer productivity.
        </p>{" "}
        <p>
          GitHub Actions (GHA) lets developers automate workflows directly from
          their code repositories. Within GHA, workflows are YAML-based
          configuration files that define automated processes triggered by
          events like code commits, pull requests, or other user-triggered
          events.
        </p>
        <p>
          As of 2023, <strong>over 100 million users</strong> are using GitHub
          globally to manage over 400 million code base repositories and
          coordinate their software development activities. With over 200
          million repositories with actively deployed workflow automations
          (source for 57.8% of GH using GHA), GHA has established itself in just
          over five years since launch as an indispensable tool for software
          development. (source: github pr post)
        </p>
      </section>
      <section>
        <h2>GHA and CI/CD automation</h2>
        <p>
          Given that GitHub Actions was designed to provide native CI/CD
          automation support, GitHub workflows are almost entirely related to
          CI/CD processes (source: github launch deck). Through GHA, one can
          automate tasks such as linting tests before a project build, the
          actual build process, unit tests performed after a build, auto deploy,
          just to name a few.
        </p>
        <p>
          However, GHA as a CI/CD tool is not without its limitations (source:
          reddit.) Areas where some consider it falling short are:
          <ul>
            <li>
              Limited visibility of workflow artifacts & robust artifact
              management.
            </li>
            <li>Limited tooling for debugging workflows.</li>
            <li>
              Limited support for event-based workflow triggers originating
              outside of GitHub itself. (send a “respository_dispatch” event via
              the GitHub API)
            </li>
            <li>Performance ceiling for enterprise-level workflows.</li>
            <li>YAML-based workflow configuration.30</li>
          </ul>
        </p>
        <p>
          The above limitations may lead a developer or organization to consider
          alternative approaches to address their specific CI/CD needs.
        </p>
        <p>
          One approach is to consider alternative open-source DIY solutions,
          such as Jenkins or Red Hat’s Ansible. Such approaches allow for a
          greater degree of control and customizability at the cost of
          considerable ramp-up investment, introducing cross-platform
          integration complexity, and shouldering the responsibility for
          maintenance.
        </p>
        <p>
          To alleviate the efforts required by taking a DIY approach, another
          approach is to consider 3rd-party managed CI/CD services, such as
          Travis CI or Circle CI. These subscription-based solutions involve
          minimal setup, strong performance optimizations, and seamless scaling
          on managed infrastructure. Compelling as they are, taking this
          approach isn’t optimal for specific users as it comes at the cost of
          exposing code to an external source and being locked within the 3rd
          party provider’s platform.{" "}
        </p>
        <p>
          Despite the advantages the above alternative approaches provide, still
          many developers and teams opt to stay within the GHA ecosystem for the
          following reasons:
          <ul>
            <li>
              Native integration between code base and workflow automation tools
            </li>
            <li>
              Zero responsibility for infrastructure management by the user
            </li>
            <li>
              Access to open-sourced marketplace for various automation
              customization and innovation
            </li>
          </ul>
        </p>
        <p>
          GitHub Actions strikes a balance, offering flexible, GitHub-centric
          workflows with easy setup and scalable performance. In addition, with
          the GHA Marketplace being a welcoming environment for collaboration,
          GitHub Actions presents itself as an ecosystem where teams like us can
          explore various ways to make a contribution.
        </p>
      </section>
      <section id="problem-domain-2-2">
        <SectionInView sectionId="problem-domain-2-2" onInView={handleInView} />
        <h2>{subheaderNames[1]}</h2>
        <p className="overview">
          <p>Overview:</p>
          <ul>
            <li>
              Speed of automation is a critical factor in unlocking the full
              benefits of CI/CD
              <ul>
                <li>
                  faster automation processes equate to rapid feedback loops,
                  and faster the feedback, the more agile and efficient the
                  development workflow.
                </li>
                <li>
                  Faster automation can dramatically reduce developer context
                  switching and idle time31, transforming waiting periods into
                  productive coding opportunities.
                </li>
              </ul>
            </li>
            <li>
              Despite the numerous benefits of utilizing GHA as a CI/CD tool,
              GHA itself is often cited as the cause of slower than desirable CI
              builds
              <ul>
                <li>
                  numerous GitHub Issues and GitHub feature requests (link to
                  GitHub’s own Issues page filtered ) related to slow CI builds
                  submitted by GHA users
                </li>
                <li>
                  significant investment being made within the tech sector on
                  products and services that accelerate GHA workflows.
                </li>
              </ul>
            </li>
          </ul>
        </p>
      </section>
      <section>
        <h2>Unpacking GHA’s original design</h2>
        <p>
          GitHub Action’s automated workflows are executed on servers that are
          called runners. GitHub provides default runners as a service in order
          to abstract away the process of provisioning and setting up a server,
          thus freeing up the user to focus on the details of the workflow.{" "}
        </p>
        <p>
          Given the need to provide over 100 million GitHub users with a clean
          runtime environment and minimize the risk of data leakage between jobs
          or users, GitHub leverages the Microsoft Azure cloud platform (since
          GitHub is a Microsoft company). To address isolation and security
          concerns, GitHub provisions brand new virtual machines (VMs) for each
          job specified in workflow files, which are promptly destroyed after
          job completion.
          <ImageContentModal
            src={GitHubComponents}
            alt={"GitHub Actions components"}
          />
        </p>
        <p className="callout">
          <p>What is caching?</p>
          Caching is a data-management method that reuses previously created
          information (i.e. cache) rather than creating it again.34 For a highly
          iterative and repetitive process such as code integration where each
          integration may represent only a small change in the code base,
          computations run quicker when the need to create the same thing over
          and over is eliminated. Caching is made possible by storing the cache
          data in a temporary storage so that it can be accessed in the future.
        </p>
        <p>
          One of the most significant impacts of GitHub’s runner infrastructure
          on CI build speed is that it severely limits the use of caching
          throughout the workflow execution. The destruction of the VM
          immediately after job completion necessitates the cache to be placed
          in a persistent storage outside of the VM. However, GitHub did not
          provide such a storage option at the outset, making it extremely
          difficult for users to take advantage of caching in their CI builds.
        </p>
        <ImageContentModal
          src={GHARunnerNoCache}
          alt={"GitHub runner with no persistent storage for cache"}
        />

        <p>
          In addition to the limitation presented by the runner infrastructure
          design, GitHub only provides limited runner infrastructure hardware
          options that prevent users from forcing through faster builds by means
          of vertical scaling.
        </p>
      </section>
      <section>
        <h2>Limitations of GHA Cache Action</h2>
        <p>
          The limitations around CI build speed within GHA were significant
          enough to warrant GitHub itself taking action. Within a couple years
          after launch, GitHub Actions introduced a paid-tier offering featuring
          more powerful machines to help address CI build speed concerns. In
          addition, they also released and incrementally improved a
          much-demanded native cache solution on the GHA Marketplace,
          actions/cache.
        </p>
        <ImageContentModal
          src={GHALimitedCache}
          alt={"GitHub runner limited cache via cache action"}
        />

        <p>
          GitHub’s cache feature seeks to enhance overall workflow efficiency by
          storing and reusing dependencies and files produced from workflow run
          operations. Key features include:
          <ul>
            <li>Seamless integration with existing workflow files.</li>
            <li>
              Preset cache eviction strategy with no option for further
              customization and 7 day automatic deletion.
            </li>
            <li>10 GB cache data storage per repository.</li>
          </ul>
        </p>
        <p>
          This native cache solution satisfied some users, but for others, the
          solution proved woefully inadequate. To better understand this second
          category, let’s use an example.
        </p>
        <p>
          Developers working on complex mono-repo–codebases that contain
          multiple, often unrelated, logical projects within the same repository
          (such as an IOS client, a web application, and other components that
          may or may not share dependencies)35–can quickly encounter significant
          challenges with GitHub Actions' caching limitations.36 Due to the
          tendency of node_modules directories and large Docker image artifacts
          to exceed 10 GB, the limited repository cache — coupled with its
          age-based eviction strategy becomes a significant constraint. This
          storage pressure creates an immediate performance bottleneck, forcing
          teams to constantly juggle and optimize their dependency management
          strategies.
        </p>
        <p>
          The introduction of multiple branches further complicates cache
          resource utilization and limits the efficacy of cache generally. Each
          branch, with potentially unique dependencies and workflow
          configurations, competes for limited cache space32—creating an
          environment where a single feature branch's large dependency update
          could unexpectedly evict critical cached artifacts that the main
          branch’s builds rely upon. This volatility renders cache utilization
          unpredictable, turning what was originally intended as a performance
          enhancement strategy into a fragile and, at times, unreliable build
          speed optimization strategy. What emerges is a complex challenge where
          intelligent cache management becomes as crucial as the software
          development cycle it seeks to streamline.
        </p>
        <p>
          Considering the limitations of actions/cache and the healthy demand
          for faster CI builds, cache within GHA is a great area for exploring
          alternative solutions.
        </p>
      </section>
      <section id="problem-domain-2-3">
        <SectionInView sectionId="problem-domain-2-3" onInView={handleInView} />
        <h2>{subheaderNames[2]}</h2>
        <p className="overview">
          <p>Overview:</p>
          <ul>
            <li>
              DIY solutions to get around the caching challenge posed by GHA’s
              infrastructure limitations accomplished by provisioning an
              alternative runner infrastructure with storage designed into the
              systems architecture
              <ul>
                <li>
                  For those exploring innovative DIY solutions to get around the
                  caching challenge posed by GHA’s infrastructure limitations, a
                  possible solution is provisioning an alternative runner
                  infrastructure with large storage discs which allows users to
                  reimagine the GHA CI build environment using persistent cache
                  storage.33
                </li>
              </ul>
            </li>
            <li>
              GitHub enables users to create alternative runner infrastructures
              using their own Self-Hosted Runner feature
            </li>
            <li>
              On-demand self-hosted runners on a managed cloud infrastructure
              would best meet the needs for resource optimization and minimal
              administrative overhead
              <ul>
                <li>
                  The <strong>Self-Hosted Runner</strong> feature can be
                  deployed on a local machine, on-premises server, or even on a
                  cloud infrastructure.{" "}
                </li>
              </ul>
            </li>
          </ul>
        </p>
        <ImageContentModal
          src={AltRunnerInfra}
          alt={"Alternative infrastructure for self-hosted runner"}
        />

        <p className="callout">
          <p>What is a self-hosted runner?</p>
          <ul>
            <li>
              GitHub recognized the user demand for exploring higher degrees of
              runner customization than what can be provided by the
              out-of-the-box configurations and released a Self-Hosted Runner
              feature soon after launching GHA. The self-hosted runner solution
              was meant to provide users with greater control and
              customizability that they wanted while allowing GitHub to offload
              the responsibility for maintaining these one-off infrastructures
              to the users themselves. For those users who really want to remain
              in the GHA ecosystem, self-hosted runners can be utilized as a key
              component to their CI build performance optimization strategies.
            </li>
            <li>
              GitHub’s Self-Hosted Runner feature allows users to configure
              their own infrastructure by downloading and installing GH’s runner
              application, which installs the necessary software to connect and
              execute GHA workflows. Through this application, the user can
              optimize their hardware, operating system, and software
              environment to meet specific CI build requirements. For example,
              it is now possible to utilize machines with higher CPU or memory
              specifications, install proprietary software, or access resources
              within a private network.
            </li>
          </ul>
        </p>
      </section>
      <section>
        <h2>Implementation Options for self-hosted runners</h2>
        <p>
          There are numerous benefits to provisioning an alternative runner
          infrastructure for GHA workflows on a major cloud platform rather than
          an on-premises server or even one’s local machine:
          <ul>
            <li>Pay-as-you-go pricing model</li>
            <li>Trusted security and compliance</li>
            <li>Vendor-supported infrastructure management</li>
          </ul>
        </p>
        <p>
          As mentioned previously, Github provides a free, DIY solution to
          create an alternative runner infrastructure in the form of the GH
          self-hosted runner feature. Users who choose to implement this feature
          for themselves can access all the benefits provided by the GHA
          ecosystem while retaining the capability to fully customize the runner
          infrastructure on their preferred server environment.
        </p>
        <p>
          This can be an attractive option for many teams and solo developers
          who have the time for a side project and the energy to dig deeper into
          the inner workings of GHA runners, as evidenced by the many case
          studies published online (sources) as well as the how-to guides
          (source) that have racked up tens of thousand of views.
        </p>
        <p>
          Taking this approach comes with tradeoffs. For one, developers must
          invest their time and energy to learn how to design, deploy, and
          utilize their alternative runner infrastructure. They also shoulder
          the burden (to a certain degree) of using, managing, and maintaining
          their alternative runner infrastructure’s components. Additionally,
          there is the opportunity cost of starting down this road, investing
          significant time, and never actually realizing any benefits.
        </p>
        <p>
          For organizations or teams who already have on-premises servers with
          compute resources to spare and dedicated operations teams to manage
          the infrastructure overhead, perhaps using their hardware as dedicated
          GHA runners may be a great option. However, for others, the desire for
          resource optimization and minimal administrative overhead leads to the
          conclusion that on-demand runners on a managed cloud infrastructure
          would best serve the needs of a GHA runner.
        </p>
        <p>
          A simple workaround to avoid the tradeoffs of a DIY approach is to
          subscribe to a 3rd-party solution with expertise in delivering
          alternative runner solutions to users. Many of these 3rd-party
          providers take on the full responsibility of provisioning the
          alternative runner infrastructure on their own server environment,
          which they manage and maintain on behalf of the user. The user
          typically pays a subscription fee to conveniently access and
          experience the benefits of a customized runner infrastructure.
        </p>
        <p>
          An example of such a 3rd-party provider is BuildJet (link)., a
          hardware-first solution. BuildJet started off by providing users with
          superior physical runner infrastructure for running GHA workflows.
          Over time they recognized the need for a complementary cache
          optimization solution and thus expanded their service offering to be
          more of a hybrid hardware and software solution.
        </p>
        <p>
          Another example is Depot (https://depot.dev/), a company that started
          off as a remote container service for building Docker images. They too
          realized the opportunity for expanding into general CI/CD builds and
          leveraged their software optimization expertise to provide users with
          alternative GHA runner infrastructures.
        </p>
        <p>
          In addition to a financial tradeoff for using these 3rd-party
          solutions, users are faced with an unknown data security risk as they
          are now forced to check out their code into a 3rd-party owned
          infrastructure with zero to minimal transparency on the provider’s
          data management practices. Beyond having to trust blindly, over time
          users may become too dependent on the vendors, making it difficult
          and/or costly to switch to new platforms should their needs change in
          the future.
        </p>
        <p>
          Given the tradeoffs posed by established 3rd-party solutions, efforts
          are being made to bring some degree of control back into the users’
          hands. One such example is Runs-On (link), a project developed by one
          individual to specifically address the security risks of exposing code
          and secrets to a 3rd-party. Runs-On aims to be a drop-in replacement
          for GHA default runners, which are provisioned in the user’s own AWS
          account.
        </p>
        <p>
          In a solution such as Runs-On, moving the infrastructure hosting task
          back to the user resolves some of the data security risks that arise
          from checking out code into a 3rd-party environment. However, it is
          not a complete solution as users have to provide Runs-On with access
          to their AWS accounts in order for Runs-On to manage, monitor, and
          maintain the runners, thus creating a new security concern. In
          addition, a solution like Runs-On creates additional overhead for
          users in that users now have to manage their subscription to two
          separate services, Runs-On and AWS.
        </p>
        <p>
          Although these DIY approaches have significant tradeoffs, they meet
          the needs of many users. However, some users still require a
          customizable, secure GHA self-hosted runner setup without wanting to
          invest the time or the money in setting up an alternative solution
          themselves.
        </p>
        <p>
          It is in this specific use case that Harrier sees an opportunity for
          contribution.
        </p>
      </section>
      <section>
        <h2>Opportunity for 3rd-Party-Supported DIY</h2>
        <p>
          GitHub Actions users want to experience faster workflow automation
          through accelerated CI builds. However, they cannot afford to put
          their code and secrets at risk and are willing to pay a modest amount
          of money for a solution that meets their needs.
        </p>
        <p>
          To meet the need for customizable, secure GHA self-hosted runner
          setups, Harrier offers a 3rd-party supported DIY solution. This
          service was designed by experts to provision an alternative runner
          infrastructure in the user's cloud platform, with minimal maintenance
          required by the user. Harrier's setup agent configures GHA runners
          quickly and automatically, while requiring only permission to access
          cloud resources and no access to code or secrets. The tool is free,
          with users paying only for used cloud resources on a pay-as-you-go
          model. As an open-source solution, users can see every step of the
          provisioning process, gaining intimate knowledge of their
          infrastructure.
        </p>
      </section>
    </>
  );
};

export default ProblemDomain;
