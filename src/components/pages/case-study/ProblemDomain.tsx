import { useContext } from "react";
import { PageNavigationContext } from "@/providers/PageNavigation";
import { ExternalLink } from "@/components/utility/ExternalLink";
import { ImageContentModal } from "@/components/ui/dialog";
import { CodeBlock as CB } from "@/components/utility/CodeBlock";
import { BoldText as BT } from "@/components/utility/BoldText";
import { Cite } from "@/components/utility/Cite";
import { Overview } from "@/components/utility/Overview";
import { SectionInView } from "@/components/utility/SectionInView";
import { AccordianFAQ } from "@/components/utility/AccordianFAQ";

import AutomationSoft from "@/assets/2.1.2.automation-software-dev.png";
import GitHubComponents from "@/assets/2.1.github-components.png";
import GHARunnerNoCache from "@/assets/2.2.1.gha-runner-no-cache.png";
import GHALimitedCache from "@/assets/2.2.2.gha-limited-cache-action.png";
import AltRunnerInfra from "@/assets/2.3.alternative-runner-infrastructure.png";
// import ComparisonChart from "@/assets/2.3.2.comparison-chart.png";
import comparison1 from "@/assets/comparison-1.png";
import comparison2 from "@/assets/comparison-2.png";
import comparison3 from "@/assets/comparison-3.png";
import comparison4 from "@/assets/comparison-4.png";
import comparisonAll from "@/assets/comparison-all.png";

export const ProblemDomain = () => {
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
      <Overview title="GitHub Actions: Cornerstone of modern software development">
        <span>
          <ul>
            <li>
              <BT>GHA empowers developers and teams.</BT> With CI/CD workflows
              as its primary function GHA streamlines processes from development
              to production.
            </li>
            <li>
              <BT>GHA has widespread adoption.</BT> GHA is a go-to choice for
              automation for its ease of use, flexibility, and ability to run
              workflows directly from within the GitHub repo.
            </li>
            <li>
              <BT>
                GHA optimization can have substantial impact on productivity.
              </BT>{" "}
              Identifying and addressing friction points within GHA leads to
              increased efficiency and effectiveness, making it a strategic
              priority for Harrier.
            </li>
          </ul>
        </span>
      </Overview>
      <section id="problem-domain-0">
        <SectionInView sectionId="problem-domain-0" onInView={handleInView} />
        <h2>{subheaderNames[0]}</h2>

        <p>
          Modern software development is a complex endeavor performed by large
          teams of experts, which require a great deal of communication and
          integration to ensure high-quality products. To deliver software
          successfully, it is important to have as much alignment between teams
          throughout the entire development process. DevOps is a philosophy and
          culture that enables agile development while supporting collaboration,
          automation, and continuous improvement.
          <Cite
            num={1}
            href="https://survey.stackoverflow.co/2024/technology"
            label="2024 Developer Survey"
          />
          One of the key components of DevOps is Continuous Integration and
          Continuous Delivery/Deployment (CI/CD).
        </p>
        {/* <ImageContentModal src={CiCdCircles} alt={"CI/CD process"} /> */}
        <p>
          Continuous Integration (CI) centers around integrating code changes
          from multiple developers into a shared repository, as frequently as
          possible.
          <Cite
            num={2}
            label="What is Continuous Integration?"
            href="https://codefresh.io/learn/continuous-integration/"
          />
          The desired impact of this practice is to stabilize the code base by
          discovering and resolving issues as early as possible in the
          development lifecycle. The output of CI is tested high-quality code
          that can be deployed to a staging or production environment.
        </p>
        <p>
          Continuous Delivery (CD) utilizes the artifacts created by the CI
          process and ensures that the software is always in a releasable state
          by subjecting the code to rigorous tests and checks in a staging
          environment so that it is production ready.
          <Cite
            num={3}
            label="What is Continuous Delivery?"
            href="https://codefresh.io/learn/continuous-delivery/"
          />
          Continuous Deployment is an advancement from CD that removes human
          intervention from the deployment process with the addition of
          automated acceptance testing as the final step of the release cycle.{" "}
          <Cite
            num={4}
            label="CI/CD: Continuous Integration and Continuous Delivery"
            href="https://www.geeksforgeeks.org/ci-cd-continuous-integration-and-continuous-delivery/"
          />
        </p>
        <p>
          By automating the software development and release processes, CI/CD
          enables teams to streamline their workflows and enjoy the following
          benefits:{" "}
          <Cite
            num={5}
            label="CI vs. CD: Differences, Similarities, and Best Practices"
            href="https://codefresh.io/learn/ci-cd/ci-vs-cd-differences-similarities-and-best-practices/"
          />
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
      <section id="problem-domain-1">
        <SectionInView sectionId="problem-domain-1" onInView={handleInView} />
        <h2>{subheaderNames[1]}</h2>
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
          Within software development, a <BT>workflow</BT> as a concept is a
          defined sequence of automated steps and processes that coordinate
          tasks, tools, and resources.
          <Cite
            num={6}
            label="What is a workflow?"
            href="https://www.geeksforgeeks.org/what-is-workflow/"
          />
          Workflows are designed to minimize or completely eliminate bottlenecks
          and improve the speed and quality of software delivery, therefore
          decreasing the need for human intervention and enhancing overall
          developer productivity.
        </p>{" "}
        <p>
          GitHub Actions (GHA) lets developers automate workflows directly from
          their code repositories. Within GHA, workflows are YAML-based
          configuration files that define automated processes triggered by
          events like code commits, pull requests, or other user-triggered
          events.
        </p>
        <p>
          As of 2023, <BT>over 100 million users</BT> are using GitHub globally
          to manage over 400 million code base repositories and coordinate their
          software development activities. With over 200 million repositories
          with actively deployed workflow automations,
          {/* TODO: jesse can find this source?  I can't seem to find it*/}
          <Cite num={7} label="57% number/proliferation?" href="#" />
          GHA has established itself in just over five years since launch as an
          indispensable tool for software development.
        </p>
      </section>
      <section id="problem-domain-2">
        <SectionInView sectionId="problem-domain-2" onInView={handleInView} />
        <h2>{subheaderNames[2]}</h2>
        <p>
          Given that GitHub Actions was designed to provide native CI/CD
          automation support, GitHub workflows are almost entirely related to
          CI/CD processes.
          <Cite num={8} label="github launch deck" href="" />
          {/* TODO: where was  */}
          Through GHA, one can automate tasks such as linting tests before a
          project build, the actual build process, unit tests performed after a
          build, auto deploy, just to name a few.
        </p>
        <p>
          However, GHA as a CI/CD tool is not without its limitations
          {/* TODO: what was this in reference to?  Original source was "reddit"*/}
          <Cite num={9} label="Reddit" href="" />
          Areas where some consider it falling short are:
          <ul>
            <li>
              Limited visibility of workflow artifacts & robust artifact
              management
            </li>
            <li>Limited tooling for debugging workflows</li>
            <li>
              Limited support for event-based workflow triggers originating
              outside of GitHub itself (send a <CB>respository_dispatch</CB>{" "}
              event via the GitHub API)
            </li>
            <li>Performance ceiling for enterprise-level workflows</li>
            <li>
              YAML-based workflow configuration
              <Cite
                num={10}
                label="YAML pitfalls"
                href="https://kestra.io/blogs/2023-12-01-yaml-pitfalls "
              />
            </li>
          </ul>
        </p>
        <p>
          The above limitations may lead a developer or organization to consider
          alternative approaches to address their specific CI/CD needs.
        </p>
        <p>
          One approach is to consider alternative open-source DIY solutions,
          such as Jenkins or Red Hat's Ansible. Such approaches allow for a
          greater degree of control and customizability at the cost of
          considerable ramp-up investment, introducing cross-platform
          integration complexity, and shouldering the responsibility for
          maintenance.
        </p>
        <p>
          To alleviate the efforts required by taking a DIY approach, another
          approach is to consider 3rd-party managed CI/CD services, such as{" "}
          <ExternalLink
            href="https://www.travis-ci.com/"
            children="Travis CI"
          />{" "}
          or <ExternalLink href="https://circleci.com/" children="Circle CI" />.
          These subscription-based solutions involve minimal setup, strong
          performance optimizations, and seamless scaling on managed
          infrastructure. Compelling as they are, taking this approach isn't
          optimal for specific users as it comes at the cost of exposing code to
          an external source and being locked within the 3rd party provider's
          platform.{" "}
        </p>
        <p>
          Despite the advantages the above alternative approaches provide, still
          many developers and teams opt to stay within the GHA ecosystem for the
          following reasons:
        </p>
        <ul>
          <li>
            Native integration between code base and workflow automation tools
          </li>
          <li>Zero responsibility for infrastructure management by the user</li>
          <li>
            Access to open-sourced marketplace for various automation
            customization and innovation
          </li>
        </ul>
        <p>
          GitHub Actions strikes a balance, offering flexible, GitHub-centric
          workflows with easy setup and scalable performance. In addition, with
          the GHA Marketplace being a welcoming environment for collaboration,
          GitHub Actions presents itself as an ecosystem where teams like us can
          explore various ways to make a contribution.
        </p>
      </section>
      <br />
      <Overview title="GHA often cited as the cause of slower than desirable CI builds">
        <span>
          <ul>
            <li>
              <BT>
                Speed is a critical factor in unlocking full benefits of CI/CD.
              </BT>
              Faster automation equates to rapid feedback, and faster feedback
              leads to more agile and efficient development.
            </li>
            <li>
              <BT>Speed also impacts developer productivity.</BT> Unnecessary
              idle time and context switching leads to longer and less effective
              development.
            </li>
            <li>
              <BT>
                GHA's cloud infrastructure design prohibits effective caching.
              </BT>{" "}
              Caching, a primary workaround for accelerating workflows, is
              difficult in GHA's ephemeral VM architecture.
            </li>
          </ul>
        </span>
      </Overview>
      <section id="problem-domain-3">
        <SectionInView sectionId="problem-domain-3" onInView={handleInView} />
        <h2>{subheaderNames[3]}</h2>
        <p>
          GitHub Action's automated workflows are executed on servers that are
          called runners. GitHub provides default runners as a service in order
          to abstract away the process of provisioning and setting up a server,
          thus freeing up the user to focus on the details of the workflow.{" "}
        </p>
        <p>
          Given the need to provide over 100 million GitHub users with a clean
          runtime environment and minimize the risk of data leakage between jobs
          or users, GitHub leverages its parent company Microsoft's Azure cloud
          platform. To address isolation and security concerns, GitHub
          provisions brand new virtual machines (VMs) for each job specified in
          workflow files, which are promptly destroyed after job completion.
          <ImageContentModal
            src={GitHubComponents}
            alt={"GitHub Actions components"}
          />
        </p>
        <AccordianFAQ
          faqs={[
            {
              question: "What is Caching?",
              answer: (
                <>
                  Caching is a data-management method that reuses previously
                  created information rather than creating it again.{" "}
                  <Cite
                    num={11}
                    label="Why you should care about caching"
                    href="https://bitrise.io/blog/post/ci-cd-caching-with-bitrise-what-is-cache-and-why-you-should-care-about-caching"
                  />
                  For a highly iterative and repetitive process such as code
                  integration where each integration may represent only a small
                  change in the code base, computations run quicker when the
                  need to create the same thing over and over is eliminated.
                  Caching is made possible by storing the cache data in a
                  temporary storage so that it can be accessed in the future.
                </>
              ),
            },
          ]}
        />

        <p>
          One of the most significant impacts of GitHub's runner infrastructure
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
      <section id="problem-domain-4">
        <SectionInView sectionId="problem-domain-4" onInView={handleInView} />
        <h2>{subheaderNames[4]}</h2>
        <p>
          The limitations around CI build speed within GHA were significant
          enough to warrant GitHub itself taking action. Within a couple years
          after launch, GitHub Actions introduced a paid-tier offering featuring
          more powerful machines to help address CI build speed concerns. In
          addition, they also released and incrementally improved a
          much-demanded native cache solution on the GHA Marketplace,{" "}
          <ExternalLink
            href="https://github.com/actions/cache"
            children="actions/cache."
          />{" "}
        </p>
        <ImageContentModal
          src={GHALimitedCache}
          alt={"GitHub runner limited cache via cache action"}
        />

        <p>
          GitHub's cache feature seeks to enhance overall workflow efficiency by
          storing and reusing dependencies and files produced from workflow run
          operations. Key features include:
        </p>
        <ul>
          <li>Seamless integration with existing workflow files.</li>
          <li>
            Preset cache eviction strategy with no option for further
            customization and 7 day automatic deletion.
          </li>
          <li>10 GB cache data storage per repository.</li>
        </ul>
        <p>
          This native cache solution satisfied some users, but for others, the
          solution proved woefully inadequate. To better understand this second
          category, let's use an example.
        </p>
        <p>
          Developers working on complex mono-repo-codebases that contain
          multiple, often unrelated, logical projects within the same repository
          (such as an IOS client, a web application, and other components that
          may or may not share dependencies) can quickly encounter significant
          challenges with GitHub Actions' caching limitations.
          <Cite
            num={12}
            label="Monorepos"
            href="https://www.atlassian.com/git/tutorials/monorepos"
          />
          Due to the tendency of <CB copy={false}>node_modules</CB> directories
          and large Docker image artifacts to exceed 10 GB, the limited
          repository cache — coupled with its age-based eviction strategy
          becomes a significant constraint.
          <Cite
            num={13}
            label="GitHub Actions limitations and gotchas"
            href="https://news.ycombinator.com/item?id=28460342"
          />
          This storage pressure creates an immediate performance bottleneck,
          forcing teams to constantly juggle and optimize their dependency
          management strategies.
        </p>
        <p>
          The introduction of multiple branches further complicates cache
          resource utilization and limits the efficacy of cache generally. Each
          branch, with potentially unique dependencies and workflow
          configurations, competes for limited cache space
          <Cite
            num={14}
            label="Usage limits and eviction policy"
            href="https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/caching-dependencies-to-speed-up-workflows#usage-limits-and-eviction-policy"
          />
          —creating an environment where a single feature branch's large
          dependency update could unexpectedly evict critical cached artifacts
          that the main branch's builds rely upon. This volatility renders cache
          utilization unpredictable, turning what was originally intended as a
          performance enhancement strategy into a fragile and, at times,
          unreliable build speed optimization strategy. What emerges is a
          complex challenge where intelligent cache management becomes as
          crucial as the software development cycle it seeks to streamline.
        </p>
        <p>
          Considering the limitations of <CB copy={false}>actions/cache</CB> and
          the healthy demand for faster CI builds, cache within GHA is a great
          area for exploring alternative solutions.
        </p>
      </section>
      <br />
      <Overview title="Self-hosted runners with storage enable caching in GHA">
        <span>
          <ul>
            <li>
              <BT>
                GitHub enables users to create alternative GHA runner
                infrastructures.
              </BT>{" "}
              GHA Self-Hosted Runner feature allows users to reimagine the GHA
              CI build environment.
            </li>
            <li>
              <BT>
                Significant investment being made in solutions using GHA
                self-hosted runners.
              </BT>{" "}
              Vendors are offering to offload self-hosted runner provisioning
              and management from users.
            </li>
            <li>
              <BT>Opportunity for a cheaper, minimal effort DIY solution.</BT>{" "}
              Demand for solutions that rely less on 3rd party SaaS providers,
              decreasing code exposure, with minimal administrative overhead.
            </li>
          </ul>
        </span>
      </Overview>

      <AccordianFAQ
        faqs={[
          {
            question: "What is a self-hosted runner?",
            answer: (
              <>
                <p>
                  GitHub recognized the demand for exploring higher degrees of
                  runner customization than what could be provided with the
                  out-of-the-box runner configurations and released a
                  Self-Hosted Runner feature soon after launching GitHub
                  Actions. This feature allows users to configure their own
                  infrastructure by downloading and installing GitHub’s runner
                  application, which installs the necessary software to connect
                  and execute GitHub Actions workflows. The self-hosted runner
                  solution provides users with greater control and
                  customizability necessary to meet specific CI build
                  requirements, such as utilizing machines with higher CPU or
                  memory specifications, installing proprietary software, or
                  accessing resources within a private network. For users who
                  really want to remain in the GitHub Actions ecosystem,
                  self-hosted runners can be utilized as a key component to
                  their CI build performance optimization strategies.
                </p>
              </>
            ),
          },
        ]}
      />
      <section id="problem-domain-5">
        <SectionInView sectionId="problem-domain-5" onInView={handleInView} />
        <h2>{subheaderNames[5]}</h2>

        <ImageContentModal
          src={AltRunnerInfra}
          alt={"Alternative infrastructure for self-hosted runner"}
        />
        <span>
          There are numerous benefits to provisioning an alternative runner
          infrastructure for GHA workflows on a major cloud platform rather than
          an on-premises server or even one's local machine:
          <ul>
            <li>Pay-as-you-go pricing model</li>
            <li>Trusted security and compliance</li>
            <li>Vendor-supported infrastructure management</li>
          </ul>
        </span>
        <div className="sm:clearfix">
          <img
            src={comparison1}
            alt="Comparison 1"
            className="h-28 w-auto sm:float-left sm:mb-2 sm:mr-5 sm:mt-2"
          />
          <p>
            As mentioned previously, Github provides a free, DIY solution to
            create an alternative runner infrastructure in the form of the GH
            self-hosted runner feature. Users who choose to implement this
            feature for themselves can access all the benefits provided by the
            GHA ecosystem while retaining the capability to fully customize the
            runner infrastructure on their preferred server environment.
          </p>
        </div>
        <p>
          This can be an attractive option for many teams and solo developers
          who have the time for a side project and the energy to dig deeper into
          the inner workings of GHA runners, as evidenced by the many case
          studies and walkthroughs published online
          <Cite
            num={15}
            label="EC2 self-hosted runners"
            href="https://getunblocked.com/blog/ec2-self-hosted-runners/"
          />
          as well as the how-to guides{" "}
          <Cite
            num={16}
            label="Configuring GitHub Self-hosted runner"
            href="https://medium.com/@gauravkachariya/configuring-github-self-hosted-runner-on-ec2-a-step-by-step-guide-2449326c0f7b"
          />
          that have racked up tens of thousand of views.
        </p>
        <p>
          Taking this approach comes with tradeoffs. For one, developers must
          invest their time and energy to learn how to design, deploy, and
          utilize their alternative runner infrastructure. They also shoulder
          the burden (to a certain degree) of using, managing, and maintaining
          their alternative runner infrastructure's components. Additionally,
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
        <div className="sm:clearfix">
          <img
            src={comparison2}
            alt="Comparison 2"
            className="h-28 w-auto sm:float-left sm:mb-2 sm:mr-5 sm:mt-2"
          />
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
        </div>

        <p>
          An example of such a 3rd-party provider is{" "}
          <ExternalLink
            href="https://buildjet.com/for-github-actions"
            children="BuildJet"
          />
          , a hardware-first solution. BuildJet started off by providing users
          with superior physical runner infrastructure for running GHA
          workflows. Over time they recognized the need for a complementary
          cache optimization solution and thus expanded their service offering
          to be more of a hybrid hardware and software solution.
        </p>
        <p>
          Another example is{" "}
          <ExternalLink href="https://depot.dev/" children="Depot" />, a company
          that started off as a remote container service for building Docker
          images. They too realized the opportunity for expanding into general
          CI/CD builds and leveraged their software optimization expertise to
          provide users with alternative GHA runner infrastructures.
        </p>
        <p>
          In addition to a financial tradeoff for using these 3rd-party
          solutions, users are faced with an unknown data security risk as they
          are now forced to check out their code into a 3rd-party owned
          infrastructure with zero to minimal transparency on the provider's
          data management practices. Beyond having to trust blindly, over time
          users may become too dependent on the vendors, making it difficult
          and/or costly to switch to new platforms should their needs change in
          the future.
        </p>
        <div className="sm:clearfix">
          <img
            src={comparison3}
            alt="Comparison 3"
            className="h-28 w-auto sm:float-left sm:mb-2 sm:mr-5 sm:mt-2"
          />
          <p>
            Given the tradeoffs posed by established 3rd-party solutions,
            efforts are being made to bring some degree of control back into the
            users' hands. One such example is{" "}
            <ExternalLink href="https://runs-on.com/" children="RunsOn" />, a
            project developed by one individual to specifically address the
            security risks of exposing code and secrets to a 3rd-party. RunsOn
            aims to be a drop-in replacement for GHA default runners, which are
            provisioned in the user's own AWS account.
          </p>
        </div>
        <p>
          In a solution such as RunsOn, moving the infrastructure hosting task
          back to the user resolves some of the data security risks that arise
          from checking out code into a 3rd-party environment. However, users
          still have to trust a partially closed-source component to execute
          within their AWS account to manage, monitor, and maintain the runners.
          While RunsOn is not a centrally-managed external orchestrator, it
          employs an{" "}
          <ExternalLink
            href="https://runs-on.com/security/#runson-agent-ec2-instance"
            children="agent"
          />{" "}
          on the EC2 instances it provisions to send telemetry data back to an
          API endpoint managed by RunsOn. This agent can be disabled with the{" "}
          <ExternalLink
            href="https://runs-on.com/pricing/"
            children="Sponsorship License"
          />
          . Finally, this means you now need to manage subscriptions for two
          vendors instead of one: RunsOn and AWS.
        </p>
        <p>
          Although these DIY approaches have tradeoffs, they meet the needs of
          many users. However, some users still require a customizable, secure
          GHA self-hosted runner setup without wanting to invest the time or the
          money in setting up an alternative solution themselves.
        </p>
        <p>
          It is in this specific use case that Harrier sees an opportunity for
          contribution.
        </p>
      </section>
      <section id="problem-domain-6">
        <SectionInView sectionId="problem-domain-6" onInView={handleInView} />

        <h2>{subheaderNames[6]}</h2>
        <div className="sm:clearfix">
          <img
            src={comparison4}
            alt="Comparison 4"
            className="h-28 w-auto sm:float-left sm:mb-2 sm:mr-5 sm:mt-2"
          />
          <p>
            GitHub Actions users want to experience faster workflow automation
            through accelerated CI builds. However, they cannot afford a
            security risk and are willing to pay a modest amount of money for a
            solution that meets their needs.
          </p>
        </div>
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
        <ImageContentModal src={comparisonAll} alt="Comparison all" />
      </section>
    </>
  );
};
