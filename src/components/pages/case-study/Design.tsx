import { useContext } from "react";
import { PageNavigationContext } from "@/providers/PageNavigation";
import { ImageContentModal } from "@/components/ui/dialog";

import { useInView } from "react-intersection-observer";

// Importing images
// import CiCdCircles from "@/assets/2.1.1.ci-cd-simple-circles.png";
import AlternateInfrastructure from "@/assets/3.harrier-setup-alternative-infrastructure.png";
import HarrierDesignLevelHigh from "@/assets/3.harrier-design-high-level.png";
import VpcIsolation from "@/assets/3.1.vpc-isolation.png";
import WarmPool from "@/assets/3.2.warm-pool-new-runner.png";
import JobSession from "@/assets/3.3.job-session-consistent-runner.png";
import TeminatedRunner from "@/assets/3.4.terminated-runner.png";
import DedicatedCache from "@/assets/3.5.dedicated-cache-storage.png";
import CacheManagement from "@/assets/3.6.cache-management.png";
import ApiIntegration from "@/assets/3.7.api-integration-trsprt.png";

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
        <p>
          The design of a 3rd-party supported DIY option for leveraging cache in
          GHA workflows involved two major pieces of work:
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
        </p>
        <ImageContentModal
          src={HarrierDesignLevelHigh}
          alt={"Harrier Design Level High"}
        />
        <ImageContentModal
          src={AlternateInfrastructure}
          alt={"Alternate Infrastructure"}
        />
      </section>
      <section id="design-1">
        <SectionInView sectionId="design-1" onInView={handleInView} />
        <h2>{subheaderNames[1]}</h2>
        <ImageContentModal src={VpcIsolation} alt={"VPC Isolation"} />
        <p>
          Harrier provides an alternative runner infrastructure within a user’s
          existing cloud account. It is important to ensure that the
          newly-provisioned resources do not impinge upon the functionality or
          compromise the security of the user’s existing cloud resources.
          Therefore, the core runner infrastructure must be placed within a
          virtual private cloud that is dedicated to housing the core
          infrastructure components of the self-hosted runner.
        </p>
      </section>
      <section id="design-2">
        <SectionInView sectionId="design-2" onInView={handleInView} />
        <h2>{subheaderNames[2]}</h2>
        <ImageContentModal src={WarmPool} alt={"Warm Pool"} />
        <p>
          Provisioning a runner within the user’s cloud entails configuring a
          virtual machine (VM) with the GHA self-hosted runner application.
          Given the time required to provision and configure a VM from scratch,
          it is desirable to have pre-configured VMs that can engage with a
          workflow as quickly as possible. To accommodate the need for
          concurrent runners by workflows, it is important to have a fleet of
          VMs that can handle the necessary throughput of workflows. Therefore,
          during its initial setup, Harrier provisions a fleet of VMs which are
          pre-configured with the runner application. Upon successful setup, the
          VMs are placed on standby in a warm pool to optimize cloud resource
          utilization. As each VM is meant for one-time use, the code for
          provisioning VMs is then reused as a “VM factory” to replenish and
          maintain the runner fleet.
        </p>
      </section>
      <section id="design-3">
        <SectionInView sectionId="design-3" onInView={handleInView} />
        <h2>{subheaderNames[3]}</h2>
        <ImageContentModal src={JobSession} alt={"Job Sessions"} />
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
      </section>
      <section id="design-4">
        <SectionInView sectionId="design-4" onInView={handleInView} />
        <h2>{subheaderNames[4]}</h2>
        <ImageContentModal src={TeminatedRunner} alt={"Terminated Runner"} />
        <p>
          To preserve the benefits of GHA’s original ephemeral runner design, a
          VM runner must be fully terminated at the end of each workflow run.
          However, there is no mechanism within GitHub Actions that terminates
          the VM provisioned in the user’s runner infrastructure. Therefore,
          Harrier terminates the VM after receiving a notification that the
          workflow run has completed.
        </p>
      </section>
      <section id="design-5">
        <SectionInView sectionId="design-5" onInView={handleInView} />
        <ImageContentModal src={DedicatedCache} alt={"Dedicated Runner"} />
        <h2>{subheaderNames[5]}</h2>
        <p>
          Alongside the provisioning of its VMs, Harrier provisions a persistent
          data store within the user’s cloud environment. This cache store is
          made accessible to every VM as a mounted local file system so that
          cache files can be conveniently loaded and stored.
        </p>
      </section>
      <section id="design-6">
        <SectionInView sectionId="design-6" onInView={handleInView} />
        <h2>{subheaderNames[6]}</h2>
        <p>
          Since the data store is mounted directly to the local file system, the
          user can leverage caching at any point of the workflow where duplicate
          work is occuring. While caching is now a possibility, there still
          remains the work of designing yaml code to take advantage of that
          cache. Harrier provides users with an out-of-the-box cache strategy to
          help them quickly get started. A typical CI build process requires
          dependency installation, which can take advantage of previously
          created files, presenting itself as an opportunity to cache (source:
          ). Typically, package managers that handle the dependency
          installations will avoid installing pre-existing packages and only
          fetch and install packages as needed. For example, npm, a package
          manager for Node.js, will compare the existing packages saved in the
          node modules folder with the required package inventory list that is
          the package.json file.
        </p>
        <ImageContentModal src={CacheManagement} alt={"Cache Management"} />
        <p>
          After identifying which packages need to actually be installed, npm
          will then first check to see if the packages have been previously
          downloaded and saved in a hidden local cache directory. Only if the
          cache does not exist will npm fetch the package from the npm library
          over the network and then install the dependencies. This highlights
          two areas for caching – 1) use cache, as npm uses ./npm_cache, to
          short circuit the network fetch step and 2) use cache, as npm uses
          ./node_modules directory, to short circuit the actual installation.
          Harrier provides users with the ability to cache the entire file
          structure of existing dependencies, which results in a greater time
          savings during the dependency installation step.
        </p>
      </section>
      <section id="design-7">
        <SectionInView sectionId="design-7" onInView={handleInView} />
        <h2>{subheaderNames[7]}</h2>
        <ImageContentModal src={ApiIntegration} alt={"API Integration"} />
        <p>
          With the alternative runner infrastructure provisioned and configured
          within the user’s cloud environment, integration with the GHA
          ecosystem is necessary. Harrier facilitates connection by deploying a
          REST API configured to receive inbound communications from GitHub.
          Next, Harrier setups a webhook on the user’s GitHub organization with
          the specific REST API endpoint to deliver workflow data. Finally,
          Harrier deploys an events manager that parses the workflow data and
          triggers a VM to start up from the warm pool at the start of the
          workflow and also terminate upon completion of the workflow.{" "}
        </p>
      </section>
      <section id="design-8">
        <SectionInView sectionId="design-8" onInView={handleInView} />
        <h2>{subheaderNames[8]}</h2>
        <p>
          To ease migration from default GHA runners to self-hosted runners and
          minimize workflow disruption, Harrier requires simple one-line
          modifications to existing workflow YAML files. Similarly, Harrier
          allows users to take advantage of the built-in cache strategy through
          simple one-line drop-in changes to existing workflow yaml files.
        </p>
      </section>
    </>
  );
};

export default Design;
