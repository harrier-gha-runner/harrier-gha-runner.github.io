// import { SiAwslambda } from "react-icons/si";
import { CgFileDocument } from "react-icons/cg";
// import { AiOutlineBlock } from "react-icons/ai";
import { useContext } from "react";
import { PageNavigationContext } from "@/providers/PageNavigation";

import { TextContentModal, ImageContentModal } from "@/components/ui/dialog";
import { useInView } from "react-intersection-observer";

// import { AxiosChart } from "@/components/AxiosChart";
// import { VSCodeChart } from "@/components/VSCodeChart";

// Importing images
import IsolatedVPC from "@/assets/4.1.isolated-vpc-in-users-aws-account.png";
import FleetOfEC2Runners from "@/assets/4.2.fleet-of-ec2-runners-full.png";
import JustInTimeTokenRegistration from "@/assets/4.3.just-in-time-token-registration-of-runner.png";
import TerminationOfEC2Runners from "@/assets/4.4.termination-of-ec2-runners.png";
import S3BucketCacheStore from "@/assets/4.5.s3-bucket-cache-store.png";
import CacheByHarrier from "@/assets/4.6.cache-by-harrier.png";
import HighLevelArchitecture from "@/assets/4.7.high-level.png";
import MinimalWorkflowModification from "@/assets/4.8.minimal-workflow-modification-v1.gif";
import OverallArchitecture from "@/assets/4.overall-architecture.png";
// import QueuedNewRunner from "@/assets/4.1.6.queued-new-runner.png";
import ReuseActiverunner from "@/assets/4.4.reuse-runner.png";
import ApiPlatformIntegration from "@/assets/4.7.api-platform-integration-webhook-json-object.png";
import FasterWorkflowStart from "@/assets/4.2.faster-workflow-start.png";

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

const Implementation = () => {
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
      <section id="implementation-0">
        <h2>Harrier Implementation</h2>
        <div className="">
          <div className="">
            <ul>
              <li>
                Harrier is implemented in AWS which provides secure GH
                integration through OIDC standards, with a secrets manager
                function.
              </li>
              <li>
                {" "}
                As the most common runtime environment on GitHub, focusing on
                Node.js offered significant ROI for Harrier’s initial
                implementation.
              </li>
            </ul>
          </div>
          <ImageContentModal
            src={OverallArchitecture}
            alt={"Full Harrier AWS Architecture"}
          />{" "}
          <p>The Right Cloud Platform for Harrier Users</p>
          <ul className="m-0 flex flex-row justify-start space-x-4 p-0">
            <li
              id="aws-cloud-platform"
              className="m-0 inline-block flex-shrink-0 rounded-full border-[0.1rem] border-gray-200 p-0 text-gray-600 hover:border-gray-300 hover:bg-harrierOFFWHITE/50 hover:text-harrierBLACK hover:shadow-sm"
            >
              <TextContentModal
                title="AWS Cloud Platform"
                description="description"
              >
                <>
                  <CgFileDocument size="28" className="text-harrierBLUE" />
                  <span>AWS Cloud Platform</span>
                </>
                We selected AWS as the cloud platform for hosting the user's
                self-hosted runner because it met all our criteria. AWS is the
                most widely adopted cloud platform among developers in 20241.
                AWS offers various configuration options for setting up GitHub
                Actions self-hosted runner infrastructure, tailored with
                different processors, storage, and networking to meet users'
                preferences. It also meets our security criteria, with a Secrets
                Manager function and adopting OIDC standards for secure
                integration with GitHub. Lastly, the AWS combination of API
                Gateway and Lambda is highly effective for managing webhooks,
                which we use to process GitHub Actions workflows. Setting up
                cloud resources securely minimizes a known risk of sensitive
                information exposure when reusing hardware for self-hosted
                runners.2 Harrier provisions servers exclusively for running
                workflows, ensuring they are isolated within a dedicated area of
                the user's AWS environment. These servers are restricted from
                accessing any other parts of the user's infrastructure,
                maintaining a strict separation of resources and data.
              </TextContentModal>
            </li>
            <li
              id="provisioning-infrastructure-programmatically"
              className="m-0 inline-block flex-shrink-0 rounded-full border-[0.1rem] border-gray-200 p-0 text-gray-600 hover:border-gray-300 hover:bg-harrierOFFWHITE/50 hover:text-harrierBLACK hover:shadow-sm"
            >
              <TextContentModal
                title="Provisioning Infrastructure Programmatically"
                description="description"
              >
                <>
                  <CgFileDocument size="28" className="text-harrierBLUE" />
                  <span>Provisioning Infrastructure Programmatically</span>
                </>
                We selected AWS as the cloud platform for hosting the user's
                self-hosted runner because it met all our criteria. AWS is the
                most widely adopted cloud platform among developers in 20241.
                AWS offers various configuration options for setting up GitHub
                Actions self-hosted runner infrastructure, tailored with
                different processors, storage, and networking to meet users'
                preferences. It also meets our security criteria, with a Secrets
                Manager function and adopting OIDC standards for secure
                integration with GitHub. Lastly, the AWS combination of API
                Gateway and Lambda is highly effective for managing webhooks,
                which we use to process GitHub Actions workflows. Setting up
                cloud resources securely minimizes a known risk of sensitive
                information exposure when reusing hardware for self-hosted
                runners.2 Harrier provisions servers exclusively for running
                workflows, ensuring they are isolated within a dedicated area of
                the user's AWS environment. These servers are restricted from
                accessing any other parts of the user's infrastructure,
                maintaining a strict separation of resources and data.
              </TextContentModal>
            </li>
          </ul>
        </div>
      </section>
      <section id="implementation-1">
        <SectionInView sectionId="implementation-1" onInView={handleInView} />
        <h2>{subheaderNames[0]}</h2>
        <ImageContentModal
          src={IsolatedVPC}
          alt={"Isolated VPC in user's AWS account"}
        />
        <p>
          Harrier sets up a dedicated Amazon Virtual Private Cloud (VPC) within
          the user's AWS account to ensure resource isolation and prevent
          Harrier-provisioned VMs from accessing existing resources or
          interfering with existing processes. Given that the self-hosted
          runners require a direct connection with GitHub over the internet, the
          VPC is created with a public subnet that is associated with a route
          table, which routes traffic to a separately provisioned Internet
          Gateway. Incoming traffic into the public subnet is restricted to
          GitHub addresses for security reasons.
        </p>
      </section>

      <section id="implementation-2">
        <SectionInView sectionId="implementation-2" onInView={handleInView} />
        <h2>{subheaderNames[1]}</h2>
        <ImageContentModal
          src={FleetOfEC2Runners}
          alt={"Fleet of EC2 runners"}
        />
        <p>
          Harrier deploys to Amazon’s Elastic Compute Cloud (EC2) service which
          functions as the GHA self-hosted runner, providing the following
          benefits:
          <ul>
            <li>
              Instances are launched on an as-needed basis, making it possible
              to provision on-demand runners.
            </li>
            <li>
              Instances can be stopped when no longer in use, facilitating
              resource optimization.
            </li>
            <li>
              Instances can be terminated after each use, making them truly
              ephemeral.
            </li>
            <li>
              Instances can be customized to run on any operating system using a
              variety of hardware (i.e., CPU, RAM, storage, networking) and
              network configurations.
            </li>
          </ul>
        </p>
        <p>
          These benefits empower users to take full advantage of the intended
          purpose of GitHub’s self-hosted runner feature, which enables users to
          customize their runner setup. Harrier provides users the option to
          choose their desired configuration prior to setting up the alternative
          runner infrastructure.
        </p>
        <p>
          The initial launch or “cold start” of an EC2 instance requires some
          time before a workflow can be picked up and processed. Typically, this
          duration is around 70 to 90 seconds, as determined by testing. The
          setup process involves several steps, including configuring the
          instance’s hardware, installing the operating system, and downloading
          the self-hosted runner application using a bash script.
        </p>
        <p>
          To reduce overall workflow time, Harrier establishes a “warm pool” of
          pre-configured EC2 instances that remain in a stopped state. This
          allows a GitHub Actions request for runners to quickly start a
          pre-configured EC2 instance instead of launching a brand new instance,
          which incurs a lengthy setup time. As a result, workflows can start
          significantly faster; the “warm pool starts” typically take around 30
          seconds or less, depending on the specific hardware configurations.
        </p>
        <ImageContentModal
          src={FasterWorkflowStart}
          alt={"Faster Workflow Start Of An EC2"}
        />
        <p>
          It is important that Harrier maintains a fleet of EC2s to accommodate
          workflows that run multiple jobs in parallel, requiring multiple
          runners to be in use at the same time. The size of the fleet is
          determined by the user prior to setting up the alternative runner
          infrastructure. In order to maintain the fleet size, the code block
          used to provision and launch the EC2s at setup is also used to
          provision replacement EC2s at the time of GHA’s request for a runner,
          as the runner that will be started up to run a workflow will be
          terminated upon completion of the job.
        </p>
        <p>
          <h4>Runner Deployment Method</h4>
        </p>
        <p>
          AWS cloud infrastructure can be customized to deploy GitHub Actions
          runners in various ways. We compared the three most viable methods:
          AWS Lambda, Fargate, and EC2.
        </p>
        <ul className="m-0 flex flex-row justify-start space-x-4 p-0">
          <li
            id="aws-lambda"
            className="m-0 inline-block flex-shrink-0 rounded-full border-[0.1rem] border-gray-200 p-0 text-gray-600 hover:border-gray-300 hover:bg-harrierOFFWHITE/50 hover:text-harrierBLACK hover:shadow-sm"
          >
            <TextContentModal title="AWS Lambda" description="description">
              <>
                <CgFileDocument size="28" className="text-harrierBLUE" />
                <span>AWS Lambda</span>
              </>
              AWS Lambda is a serverless compute service that executes your code
              in response to events while automatically managing the underlying
              compute resources.
              <sup>4</sup>
              However, after thorough research and testing, we have determined
              Lambdas to be unsuitable for deploying self-hosted runners to
              process jobs for most users for two primary reasons: First, Lambda
              functions are designed to process individual events or complete
              single tasks rapidly—typically within one second for most
              production invocations.<sup>5</sup> In contrast, user workflows
              usually consist of multiple steps within a job rather than just
              one isolated task or event. Second, AWS Lambdas can run code for a
              maximum of 900 seconds (15 minutes) before timing out and halting
              execution.<sup>6</sup> This limitation does not allow enough time
              to complete GitHub Actions workflows, which often exceed 15
              minutes. In comparison, GitHub-hosted runners permit each job in a
              workflow to run for up to 6 hours.<sup>7</sup>
            </TextContentModal>
          </li>
        </ul>
      </section>

      <section id="implementation-3">
        <SectionInView sectionId="implementation-3" onInView={handleInView} />
        <h2>{subheaderNames[2]}</h2>
        <p>
          While the GHA self-hosted runner application is installed in a
          pre-configured Harrier EC2, the application must have a GHA runner
          token passed into it as an argument at the time of execution in order
          to register the EC2 with GitHub as an available runner. Harrier
          utilizes Just-in-Time (JIT) tokens to register the EC2s, as the JIT
          tokens are designed to execute only a single job, automatically
          removing the runner from the list of available runners upon
          completion. By requiring a unique token for every workflow run, JIT
          runners minimize the risks associated with long-lived credentials or
          the exposure of sensitive data.
        </p>
        <p>
          Harrier registers the EC2s by first making a GitHub API call to fetch
          the token. At this time, the instance ID of the EC2 is communicated to
          GitHub so that Harrier can link the token, and the associated
          workflow, with the specific EC2 for future processing. The token
          string is then passed into a bash script, which is remotely executed
          on the EC2 instance using AWS Systems Manager (SSM). The script
          executes the self-hosted runner application with the appropriate
          registration parameters and finalizes the connection of the runner to
          GitHub, making it available to receive and run a workflow job.
        </p>
        <ImageContentModal
          src={JustInTimeTokenRegistration}
          alt={"Just-in-time token registration of runner"}
        />
      </section>

      <section id="implementation-4">
        <SectionInView sectionId="implementation-4" onInView={handleInView} />
        <h2>{subheaderNames[3]}</h2>
        <p>
          Harrier runners are ephemeral VMs designed to ensure an isolated and
          clean runtime environment for each workflow job and prevent data
          leakage from one run to the next. As such, the EC2s must be terminated
          upon completion of the workflow run. When a GHA workflow is completed,
          GH generates a webhook notification and sends it to the user’s Amazon
          API Gateway, set up by Harrier (detailed discussion in 4.7). The
          webhook payload contains the instance ID of the EC2 (obtained at the
          time of token registration) that just completed the workflow run,
          which is then passed to an AWS Lambda so that the EC2 can be
          terminated.
        </p>
        <p>
          Harrier enhances the standard termination mechanism by introducing an
          optional delayed termination feature. This allows users to set a grace
          period during which the same EC2 instance can be reused for identical
          workflow runs initiated by the same GitHub Actions user. When a user
          reuses an active runner, the initial workflow start time is reduced to
          10 seconds or less. This optimization is particularly beneficial
          during iterative development sessions, as it minimizes the startup
          configuration time of the EC2 instance for repeated workflow
          executions.
        </p>
        <ImageContentModal
          src={ReuseActiverunner}
          alt={"Timeout Lambda Reuses Active EC2"}
        />
        <p>
          It is important to note that only the exact same workflow job, run by
          the same user, within a small time window is allowed to re-use an EC2
          in order to ensure proper data security. Therefore, Harrier keeps
          track of the workflow data for each EC2 run and compares the data of
          an EC2's previous run with the current runner request to verify that
          only exact matches can reuse a runner during the delay window. When
          using this optional feature, the EC2 instance is terminated only after
          the EC2 remains idle throughout the user-configured grace period.
        </p>
        <ImageContentModal
          src={TerminationOfEC2Runners}
          alt={"Termination of EC2 runners"}
        />
      </section>

      <section id="implementation-5">
        <SectionInView sectionId="implementation-5" onInView={handleInView} />
        <h2>{subheaderNames[4]}</h2>
        <ImageContentModal
          src={S3BucketCacheStore}
          alt={"S3 bucket cache store"}
        />
        <p>
          Setting up the alternative runner infrastructure in the user’s own AWS
          cloud environment enables the provisioning of Harrier’s most critical
          resource – an Amazon Simple Storage Service (S3) bucket to serve as
          the dedicated persistent cache store. The S3 bucket is pre-configured
          with default directories that align with common caching patterns in
          GitHub Actions workflows.
        </p>
        <p>
          Each EC2 instance is automatically pre-configured to access this cache
          store through Mountpoint for Amazon S3, an open source file client for
          mounting an S3 bucket as a local file system, making it convenient to
          transfer cache files back and forth between the EC2 and the S3 bucket.
          The globally unique naming convention of S3 buckets simplifies this
          integration, as Harrier only needs to pass the bucket name as a
          constant during EC2 provisioning to enable the connection.
        </p>
        <p>
          The provisioning and mounting of the S3 bucket to the EC2 allows users
          to configure their workflow yaml file to cache any duplicate work,
          whether it is through user-generated custom steps or publicly
          available actions (e.g. Docker’s build-push-action provides users with
          optional parameters that designate cache endpoints, enabling the
          caching of docker image layers).
        </p>
      </section>

      <section id="implementation-6">
        <SectionInView sectionId="implementation-6" onInView={handleInView} />
        <h2>{subheaderNames[5]}</h2>
        <p>
          During the dependency installation step of a Node.js workflow, the npm
          package manager first inventories currently installed dependencies,
          thus bypassing the installation step for those dependencies. Next, npm
          inventories previously fetched installation files for the dependencies
          that need to be installed, thus bypassing the network fetch step.
          Harrier’s out-of-the-box cache support focuses on short circuiting the
          installation step for maximum time savings. For Node.js projects, this
          is accomplished by caching the entire node_modules directory.
        </p>
        <p>
          During the first run of a project’s workflow through the
          Harrier-provisioned runner infrastructure, the workflow will go
          through a full installation of dependencies as the cache is empty.
          This first run will create a node_modules directory on the EC2 as part
          of the workflow run, allowing Harrier to cache the newly created
          node_modules directory into the S3 bucket. Due to the size of the
          node_modules directory (the directory can be as small as 10MB for
          small projects, but could be 1GB or larger for bigger projects) as
          well as the presence of symlinks (symbolic links), Harrier compresses
          the entire node modules directory into a TAR archive file and saves it
          into the S3 bucket. At this time, a timestamped cache key is also
          created using the checksum hash of the package.json file, with the
          idea that a modification in the package.json file would invalidate the
          cache.
        </p>
        <p>
          After this first run, Harrier provides users with the option to load
          the node_modules directory from the cache, prior to the dependency
          installation step. Unlike GHA’s cache action, Harrier does not
          invalidate the cache at this point even if the package.json file has
          been modified from the previous run, as Harrier is of the opinion that
          any amount of installation short circuiting is preferable to a full
          dependency installation. Once the node_modules directory has been
          loaded, the npm install step will proceed with an incremental
          installation.
        </p>
        <p>
          Only after the dependency installation step has been completed will
          Harrier look to invalidate the cache. If the package.json file has not
          been modified since the previous run, as checked by comparing the
          checksum hash of the package.json file, then there is no need to
          modify the cache and so no further steps are required. However, if the
          package.json file has been modified, then the newly modified
          node_modules directory is compressed into a new TAR file and saved
          into the S3 bucket. The cache-store process ends up overwriting the
          previously cached TAR file since the cache-load process only cares
          about loading the most recent node_modules directory.{" "}
        </p>
        <ImageContentModal src={CacheByHarrier} alt={"Cache by Harrier"} />
        <p>
          Harrier recognizes that different branches may have different
          dependency configurations and thus identifies the cached files by both
          repository name and branch name. Even though each branch has its own
          cache, they most likely share a significant number of common
          dependencies, and Harrier takes advantage of this fact to speed up the
          dependency installation step for a workflow run pertaining to new
          branches. When a workflow is run on a new branch, even though there
          isn’t a cache pertaining to this specific branch, Harrier will load a
          cached node_modules directory from another branch in order to speed up
          the dependencies installation step, ensuring that every workflow run
          of a repository after the first ever workflow can experience faster
          workflow automation through cache.
        </p>
      </section>

      <section id="implementation-7">
        <SectionInView sectionId="implementation-7" onInView={handleInView} />
        <h2>{subheaderNames[6]}</h2>
        <ImageContentModal
          src={ApiPlatformIntegration}
          alt={"API Platform Integration Webhook Event"}
        />
        <p>
          When using GitHub Action default runners, the integration steps
          necessary to transfer the code from the GitHub repository platform to
          the VM runner platform is abstracted away from users. However, when
          using self-hosted runners, it is no longer GitHub’s responsibility to
          ensure that proper communication channels are established between
          GitHub and the alternative runner environment. Therefore, Harrier
          takes on this responsibility so that the integration steps are still
          abstracted away from users, maintaining as much of the same GHA user
          experience as possible.{" "}
        </p>
        <ImageContentModal
          src={HighLevelArchitecture}
          alt={"High Level Architecture"}
        />
        <p>
          Harrier first establishes connectivity between GitHub Actions and the
          user's cloud infrastructure by deploying an AWS API Gateway with an
          HTTP endpoint to receive GitHub webhooks. Then, Harrier configures a
          webhook on the GitHub organization, specified by the user during the
          initial configuration setup, set to trigger on workflow status
          updates. This is accomplished by making a call to GitHub’s REST API
          for creating webhooks and passing in two arguments:, the newly
          established AWS HTTP endpoint and the user’s GitHub Personal Access
          Token that is used for authorization purposes (link to “click here for
          more” to read about how AWS secrets manager is used to protect user’s
          PAT from Harrier). Lastly, Harrier creates an events manager service
          in the form of an AWS Lambda which processes webhook data. When a
          workflow starts, a Lambda selects and activates an available EC2 from
          the warm pool. Upon workflow completion, a different Lambda terminates
          the used runner. In order to maintain the desired fleet size, the
          event manager service handles the provisioning of a new replacement
          EC2 instance to maintain the warm pool and runner fleet.
        </p>
        <p className="callout">
          <p>What is a webhook?</p>A webhook is a lightweight, event-driven
          communication that automatically sends data between applications via
          HTTP21. When a workflow runs on GitHub Actions, a webhook event is
          triggered to send data to the Harrier app hosted on the user's AWS
          environment. This webhook transmits information about the workflow run
          as a JSON object, which includes an "action" property specifying the
          event type, such as "queued" or "completed."
        </p>
      </section>

      <section id="implementation-8">
        <SectionInView sectionId="implementation-8" onInView={handleInView} />
        <h2>{subheaderNames[7]}</h2>
        <div className="h-[100px] overflow-hidden">
          <ImageContentModal
            src={MinimalWorkflowModification}
            alt={"minimal workflow modification"}
          />
        </div>
        <p>
          The last critical piece of the Harrier design is lowering the barrier
          to accessing and utilizing cache provided by the alternative runner
          infrastructure. This is accomplished by first making it easy to divert
          the workflow from the default GHA runner to the alternative runner and
          then making it easy to take advantage of the out-of-the-box cache
          solution.
        </p>
        <p>
          In order to begin running workflows on the newly provisioned
          self-hosted runners, users have to simply change the `runs-on` value
          in the YAML file of the workflow to “self-hosted”. Harrier uses the
          “self-hosted” label instead of a custom label such as “harrier-runner”
          to emphasize the fact that the entire alternative runner
          infrastructure is hosted and managed by the user.
        </p>
        <p>
          Harrier also provides a simple mechanism for using the out-of-the-box
          solution for caching dependencies through two public actions on the
          GitHub Actions Marketplace: `harrier-cache-load` and
          `harrier-cache-store`. Users have to simply drop in these one-line
          steps before and after the dependency installation step in their
          workflow in order to experience faster workflow build speeds.
        </p>
        <ImageContentModal
          src={MinimalWorkflowModification}
          alt={"minimal workflow modification"}
        />
        <p>Example:</p>
        <pre className="overflow-auto rounded border border-gray-300 bg-white p-4 font-mono text-sm text-gray-900">
          <code>
            <span className="font-mono text-blue-600">
              jobs:
              <br />
              &nbsp;&nbsp;build:
              <br />
              <span className="block bg-red-200 px-1 font-mono text-red-900">
                -&nbsp;&nbsp;runs-on: ubuntu-latest
              </span>
              <br />
              <span className="block bg-green-200 px-1 font-mono text-green-900">
                +&nbsp;&nbsp;runs-on: self-hosted
                <br />
                +&nbsp;&nbsp;&nbsp;&nbsp;env:
                <br />
                +&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;REPO_NAME: ${"{{"}
                github.event.repository.name{"}}"} <br />
                +&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;AWS_REGION: ${"{{"}
                github.event.inputs.region{"}}"} <br />
                +&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CACHE_BUCKET: harrier-s3-${"{{"}
                github.repository_owner{"}}"} <br />
                +&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DOCKER_IMAGE: ${"{{"}
                secrets.DOCKERHUB_USERNAME{"}}"} /${"{{"}
                github.event.repository.name{"}}"} <br />
              </span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;steps:
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- name: Checkout the repo
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;uses:
              actions/checkout@v4
              <br />
              <br />
              <span className="block bg-green-200 px-1 font-mono text-green-900">
                +&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- name: Load Cache with Harrier
                <br />
                +&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;uses:
                harrier-gha-runner/harrier-cache-load@main
              </span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- name: Install Dependencies
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;run: npm install
              <br />
              <br />
              <span className="block bg-green-200 px-1 font-mono text-green-900">
                +&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- name: Store Cache with Harrier
                <br />
                +&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;uses:
                harrier-gha-runner/harrier-cache-store@main
              </span>
            </span>
          </code>
        </pre>
      </section>

      <section id="implementation-9">
        <SectionInView sectionId="implementation-9" onInView={handleInView} />
        <h2>{subheaderNames[8]}</h2>
        <ImageContentModal
          src={OverallArchitecture}
          alt={"Overall architecture"}
        />
        <p>
          Here is a diagram that outlines the overall system architecture
          created by the Harrier agent within the user’s cloud account.
        </p>
      </section>

      {/* <section id="implementation-10">
        <SectionInView sectionId="implementation-10" onInView={handleInView} />
        <h2>{subheaderNames[9]}</h2>
        <p>[ COMING SOON ]</p>
      </section>
      <section id="implementation-11">
        <SectionInView sectionId="implementation-11" onInView={handleInView} />
        <h2>{subheaderNames[10]}</h2>
        <div className="flex w-full items-center justify-center border-2 md:w-1/2">
          <VSCodeChart />
        </div>

        <div className="flex w-full items-center justify-center border-2 md:w-1/2">
          <AxiosChart />
        </div>
      </section> */}
      <section id="implementation-12">
        <SectionInView sectionId="implementation-12" onInView={handleInView} />
        <h2>{subheaderNames[11]}</h2>
        <p id="sources4">
          4. AWS Lambda Features: https://aws.amazon.com/lambda/features/ <br />
          5. AWS Lambda FAQ
          https://docs.aws.amazon.com/lambda/latest/dg/event-driven-faq.html
          <br />
          6. Lambda Timeout:
          https://docs.aws.amazon.com/lambda/latest/dg/configuration-timeout.html
          <br />
          7. GitHub Actions Limits:
          https://docs.github.com/en/actions/administering-github-actions/usage-limits-billing-and-administration
        </p>
      </section>
    </>
  );
};
export default Implementation;
