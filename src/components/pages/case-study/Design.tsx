import { useContext } from "react";
import { PageNavigationContext } from "@/providers/PageNavigation";
import { ImageContentModal } from "@/components/ui/dialog";
import { BoldText as BT } from "@/components/utility/BoldText";
import { CodeBlock as CB } from "@/components/utility/CodeBlock";
import { SectionInView } from "@/components/utility/SectionInView";

import VpcIsolation from "@/assets/3.1.vpc-isolation.png";
import WarmPool from "@/assets/3.2.warm-pool-new-runner.png";
import JobSession from "@/assets/3.3.job-session-consistent-runner.png";
import TeminatedRunner from "@/assets/3.4.terminated-runner.png";
import DedicatedCache from "@/assets/3.5.dedicated-cache-storage.png";
import CacheManagement from "@/assets/3.6.cache-management.png";
import ApiIntegration from "@/assets/3.7.api-integration-trsprt.png";
import { Overview } from "@/components/utility/Overview";
import { AccordianFAQ } from "@/components/utility/AccordianFAQ";
// import CiCdCircles from "@/assets/2.1.1.ci-cd-simple-circles.png";
// import AlternateInfrastructure from "@/assets/3.harrier-setup-alternative-infrastructure.png";
// import HarrierDesignLevelHigh from "@/assets/3.harrier-design-high-level.png";

export const Design = () => {
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
      <Overview title="Alternative GHA runner infrastructure in user's own cloud">
        <span>
          <ul>
            <li>
              <BT>Harrier as an automated deployment tool.</BT> Harrier is a
              3rd-party supported DIY option for leveraging cache in GHA
              workflows.
            </li>
            <li>
              <BT>More than just a GHA-registered VM.</BT> Harrier provisions
              and configures an entire fleet of VMs and a dedicated persistent
              cache store, with automated runner management.
            </li>
            <li>
              <BT>
                Seamless integration with minimal impact on existing workflows.
              </BT>{" "}
              Harrier manages the platform integration and facilitates access to
              and utilization of new runner infrastructure.
            </li>
          </ul>
        </span>

        {/* <ImageContentModal
          src={HarrierDesignLevelHigh}
          alt={"Harrier Design Level High"}
        />
        <p>
          The design of a 3rd-party supported DIY option for leveraging cache in
          GHA workflows involved two major pieces of work:
        </p>
        <ul>
          <li>
            Provision and configure an alternative GHA runner infrastructure
            with a dedicated persistent cache store into the user’s own cloud
            environment.
          </li>
          <li>
            Facilitate the user’s access to and utilization of the newly
            provisioned alternative runner infrastructure.
          </li>
        </ul>
        <ImageContentModal
          src={AlternateInfrastructure}
          alt={"Alternate Infrastructure"}

        /> */}
      </Overview>
      <section id="design-0">
        <SectionInView sectionId="design-0" onInView={handleInView} />
        <h2>{subheaderNames[0]}</h2>

        <p>
          Harrier provides an alternative runner infrastructure within a user's
          existing cloud account. It is important to ensure that the
          newly-provisioned resources do not impinge upon the functionality or
          compromise the security of the user's existing cloud resources.
          Therefore, the core runner infrastructure must be placed within a
          virtual private cloud that is dedicated to housing the core
          infrastructure components of the self-hosted runner.
        </p>
        <ImageContentModal src={VpcIsolation} alt={"VPC Isolation"} />
      </section>
      <section id="design-1">
        <SectionInView sectionId="design-1" onInView={handleInView} />
        <h2>{subheaderNames[1]}</h2>

        <p>
          Provisioning a runner within the user's cloud entails configuring a
          virtual machine with the GHA self-hosted runner application. Given the
          time required to provision and configure a VM from scratch, it is
          desirable to have pre-configured VMs that can engage with a workflow
          as quickly as possible. To accommodate the need for concurrent runners
          by workflows, it is important to have a fleet of VMs that can handle
          the necessary throughput of workflows. Therefore, during its initial
          setup, Harrier provisions a fleet of VMs which are pre-configured with
          the runner application. Upon successful setup, the VMs are placed on
          standby in a warm pool to optimize cloud resource utilization. As each
          VM is meant for one-time use, the code for provisioning VMs is then
          reused as a “VM factory” to replenish and maintain the runner fleet.
        </p>
        <ImageContentModal src={WarmPool} alt={"Warm Pool"} />
      </section>
      <section id="design-2">
        <SectionInView sectionId="design-2" onInView={handleInView} />
        <h2>{subheaderNames[2]}</h2>
        <p>
          A provisioned VM runner must be registered with GitHub so that it is
          visible to GHA as an available runner. There are two forms of runner
          registration – static or dynamic. A VM registered statically is a
          persistent runner that can be utilized by multiple workflows.
          Conversely, dynamic registration–also known as a Just-in-Time (JIT)
          token registration– is meant to register a VM as a single-use entity.
          Given this information, Harrier utilizes JIT registration to
          dynamically obtain a token at the time of the initial workflow
          dispatch.
        </p>
        <ImageContentModal src={JobSession} alt={"Job Sessions"} />
      </section>
      <section id="design-3">
        <SectionInView sectionId="design-3" onInView={handleInView} />
        <h2>{subheaderNames[3]}</h2>
        <p>
          To preserve the benefits of GHA's original ephemeral runner design, a
          VM runner must be fully terminated at the end of each workflow run.
          However, there is no mechanism within GitHub Actions that terminates
          the VM provisioned in the user's runner infrastructure. Therefore,
          Harrier terminates the VM after receiving a notification that the
          workflow run has completed.
        </p>
        <ImageContentModal src={TeminatedRunner} alt={"Terminated Runner"} />
      </section>
      <section id="design-4">
        <SectionInView sectionId="design-4" onInView={handleInView} />

        <h2>{subheaderNames[4]}</h2>
        <p>
          Alongside the provisioning of its VMs, Harrier provisions a persistent
          data store within the user's cloud environment. This cache store is
          made accessible to every VM as a mounted local file system so that
          cache files can be conveniently loaded and stored.
        </p>
        <ImageContentModal src={DedicatedCache} alt={"Dedicated Runner"} />
      </section>
      <section id="design-5">
        <SectionInView sectionId="design-5" onInView={handleInView} />
        <h2>{subheaderNames[5]}</h2>
        <AccordianFAQ
          faqs={[
            {
              question: "How does GitHub Actions cache dependencies?",
              answer: (
                <>
                  GitHub's cache action creates and restores a cache identified
                  by a unique key. When the cache that exactly matches the key,
                  considered a cache hit, the action restores the cached files.
                  However, on a cache miss, the workflow continues without the
                  restored cache and instead creates a new cache if the job
                  completes successfully. When it comes to caching dependencies,
                  GitHub's cache action defaults to caching the fetched package
                  files that are typically stored in `~/.npm` on Linux/macOS
                  rather than caching the entire{" "}
                  <CB copy={false}>node_modules</CB>directory. The design of
                  Harrier's cache action differs from GitHub in that the cache
                  is restored even without a cache hit, as long as there is a
                  cache that matches the project. This will allow workflows to
                  take advantage of cache more frequently than with GitHub's
                  cache action. In addition, Harrier's cache stores the entire{" "}
                  <CB copy={false}>node_modules</CB>directory in its cache
                  store, leading to a greater degree of short circuiting of the
                  dependency installation process and thus saving more time.
                </>
              ),
            },
          ]}
        />
        <p>
          Since the data store is mounted directly to the local file system, the
          user can leverage caching at any point of the workflow where duplicate
          work is occuring. While caching is now a possibility, there still
          remains the work of designing yaml code to take advantage of that
          cache. Harrier provides users with an out-of-the-box cache strategy to
          help them quickly get started. A typical CI build process requires
          dependency installation, which can take advantage of previously
          created files, presenting itself as an opportunity to cache.
          Typically, package managers that handle the dependency installations
          will avoid installing pre-existing packages and only fetch and install
          packages as needed. For example, <CB copy={false}>npm</CB>, a package
          manager for Node.js, will compare the existing packages saved in the{" "}
          <CB copy={false}>node_modules</CB> folder with the required package
          inventory list that is the package.json file.
        </p>
        <ImageContentModal src={CacheManagement} alt={"Cache Management"} />
        <span>
          After identifying which packages need to actually be installed, npm
          will then first check to see if the packages have been previously
          downloaded and saved in a hidden local cache directory. Only if the
          cache does not exist will npm fetch the package from the npm library
          over the network and then install the dependencies. This highlights
          two areas for caching:{" "}
          <ol>
            <li>
              use cache, as npm uses <CB copy={false}>./npm_cache</CB>, to short
              circuit the network fetch step
            </li>
            <li>
              use cache, as npm uses <CB copy={false}>./node_modules</CB>{" "}
              directory, to short circuit the actual installation.
            </li>
          </ol>
          Harrier provides users with the ability to cache the entire file
          structure of existing dependencies, which results in a greater time
          savings during the dependency installation step.
        </span>
      </section>
      <section id="design-6">
        <SectionInView sectionId="design-6" onInView={handleInView} />
        <h2>{subheaderNames[6]}</h2>

        <p>
          With the alternative runner infrastructure provisioned and configured
          within the user's cloud environment, integration with the GHA
          ecosystem is necessary. Harrier facilitates connection by deploying a
          REST API configured to receive inbound communications from GitHub.
          Next, Harrier setups a webhook on the user's GitHub organization with
          the specific REST API endpoint to deliver workflow data. Finally,
          Harrier deploys an events manager that parses the workflow data and
          triggers a VM to start up from the warm pool at the start of the
          workflow and also terminate upon completion of the workflow.{" "}
        </p>
        <ImageContentModal src={ApiIntegration} alt={"API Integration"} />
      </section>
      <section id="design-7">
        <SectionInView sectionId="design-7" onInView={handleInView} />

        <h2>{subheaderNames[7]}</h2>
        <p>
          To ease migration from default GHA runners to self-hosted runners and
          minimize workflow disruption, Harrier requires simple one-line
          modifications to existing workflow YAML files.
        </p>
        <p>
          Similarly, Harrier allows users to take advantage of the built-in
          cache strategy by simply adding a few lines to existing workflow yaml
          files.
        </p>
        <p>Example:</p>
        <pre className="w-1/2 rounded border border-gray-300 bg-white p-4 font-mono text-sm text-gray-900">
          <code>
            <span className="font-mono text-blue-600">...</span>
            <br />
            <br />
            <span className="font-mono text-blue-600">
              jobs:
              <br />
              &nbsp;&nbsp;build:
              <br />
              <span className="block bg-red-200 px-1 font-mono text-red-900">
                -&nbsp;&nbsp;runs-on: ubuntu-latest
              </span>
              <span className="block bg-green-200 px-1 font-mono text-green-900">
                +&nbsp;&nbsp;runs-on: self-hosted
              </span>
              <br />
              <span className="font-mono text-blue-600">...</span>
              <br />
            </span>
          </code>
        </pre>
      </section>
      {/* <img src={HarrierColor} alt="Harrier Blue Logo" className="h-28 w-auto" /> */}
    </>
  );
};
