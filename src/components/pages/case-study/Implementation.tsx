// import { SiAwslambda } from "react-icons/si";
import { CgFileDocument } from "react-icons/cg";
// import { AiOutlineBlock } from "react-icons/ai";
import { useContext } from "react";
import { PageNavigationContext } from "@/providers/PageNavigation";

import { TextContentModal, ImageContentModal } from "@/components/ui/dialog";
import { useInView } from "react-intersection-observer";

// Importing images
import IsolatedVPC from "@/assets/4.1.isolated-vpc-in-users-aws-account.png";
import FleetOfEC2Runners from "@/assets/4.2.fleet-of-ec2-runners.png";
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
import JITRunnerToken from "@/assets/4.1.5.2.just-in-time-runner-token.png";
import SingleUse from "@/assets/4.1.5.2.single-use-runner.png";
import ThreeLambdas from "@/assets/4.1.7.three-lambdas.png";

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
        <SectionInView sectionId="implementation-0" onInView={handleInView} />
        <div className="">
          <div className="">
            <p>
              Specific scope of Harrier implementation:
              <ul>
                <li>
                  Harrier is implemented in AWS which provides secure GH
                  integration through OIDC standards, with a secrets manager
                  function.
                </li>
                <li>
                  As the most common runtime environment on GitHub, focusing on
                  Node.js offered significant ROI for Harrier’s initial
                  implementation.
                </li>
              </ul>
            </p>
          </div>
          <ImageContentModal
            src={OverallArchitecture}
            alt={"Full Harrier AWS Architecture"}
          />{" "}
          <h4 className="text-center">
            The Right Cloud Platform for Harrier Users
          </h4>
          <ul className="m-0 flex flex-row justify-center space-x-4 p-0">
            <li
              id="aws-cloud-platform"
              className="m-0 inline-block flex-shrink-0 rounded-full border-[0.1rem] border-gray-200 p-0 text-gray-600 hover:border-gray-300 hover:bg-harrierOFFWHITE/50 hover:text-harrierBLACK hover:shadow-sm"
            >
              <TextContentModal
                title="AWS Cloud Platform"
                description="AWS Cloud Platform"
              >
                <>
                  <CgFileDocument size="28" className="text-harrierBLUE" />
                  <span>AWS Cloud Platform</span>
                </>
                <p>
                  We selected AWS as the cloud platform for hosting the user's
                  self-hosted runner because it met all our criteria. AWS is the
                  most widely adopted cloud platform among developers in 2024
                  <sup>1</sup>. AWS offers various configuration options for
                  setting up GitHub Actions self-hosted runner infrastructure,
                  tailored with different processors, storage, and networking to
                  meet users' preferences. It also meets our security criteria,
                  with a Secrets Manager function and adopting OIDC standards
                  for secure integration with GitHub. Lastly, the AWS
                  combination of API Gateway and Lambda is highly effective for
                  managing webhooks, which we use to process GitHub Actions
                  workflows.
                </p>
                <br />
                <p>
                  Setting up cloud resources securely minimizes a known risk of
                  sensitive information exposure when reusing hardware for
                  self-hosted runners.<sup>2</sup> Harrier provisions servers
                  exclusively for running workflows, ensuring they are isolated
                  within a dedicated area of the user's AWS environment. These
                  servers are restricted from accessing any other parts of the
                  user's infrastructure, maintaining a strict separation of
                  resources and data.
                </p>
              </TextContentModal>
            </li>
            <li
              id="provisioning-infrastructure-programmatically"
              className="m-0 inline-block flex-shrink-0 rounded-full border-[0.1rem] border-gray-200 p-0 text-gray-600 hover:border-gray-300 hover:bg-harrierOFFWHITE/50 hover:text-harrierBLACK hover:shadow-sm"
            >
              <TextContentModal
                title="Provisioning Infrastructure Programmatically"
                description="Provisioning Infrastructure Programmatically"
              >
                <>
                  <CgFileDocument size="28" className="text-harrierBLUE" />
                  <span>Provisioning Infrastructure Programmatically</span>
                </>
                <p>
                  We chose the AWS Software Development Kit (SDK for JavaScript
                  v3) to provision and manage the user's cloud infrastructure
                  and handle application installation on the user's AWS account.
                  The SDK is designed for developing and deploying applications,
                  offers excellent TypeScript support, and simplifies the
                  process of calling AWS services using JavaScript.
                </p>
                <br />
                <p>
                  AWS also offers the Cloud Development Kit (CDK), an
                  infrastructure-as-code tool that allows developers to define
                  AWS resources using code.
                  <sup>3</sup> However, in practice, SDK provided us with more
                  precise control over the resources and simplified our
                  interactions with them during runtime than CDK did.
                </p>
              </TextContentModal>
            </li>
          </ul>
        </div>
      </section>

      <section id="implementation-1">
        <SectionInView sectionId="implementation-1" onInView={handleInView} />
        <h2>{subheaderNames[1]}</h2>
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

        <ul className="m-0 flex flex-row justify-center space-x-4 p-0">
          <li
            id="vpc-and-public-subnet"
            className="m-0 inline-block flex-shrink-0 rounded-full border-[0.1rem] border-gray-200 p-0 text-gray-600 hover:border-gray-300 hover:bg-harrierOFFWHITE/50 hover:text-harrierBLACK hover:shadow-sm"
          >
            <TextContentModal
              title="VPC and Public Subnet"
              description="VPC and Public Subnet"
            >
              <>
                <CgFileDocument size="28" className="text-harrierBLUE" />
                <span>VPC and Public Subnet</span>
              </>
              <p>
                AWS recommends using separate VPCs to isolate infrastructure by
                workload or organizational entity.<sup>15</sup> Harrier EC2
                runners require direct internet access to download software,
                send API requests to GitHub, and process GitHub Actions
                workflows. Internet access was also needed for any delivery and
                deployment functionality in user workflows, like saving
                artifacts to Docker Hub.
              </p>
              <br />

              <p>
                Harrier sets up a VPC, which includes a public subnet and an
                internet gateway, within the user's AWS account. The internet
                gateway allows internet access for the EC2s. Traffic from the
                internet gateway is routed to the public subnet using the routes
                in the routing table.
              </p>
            </TextContentModal>
          </li>
        </ul>
      </section>

      <section id="implementation-2">
        <SectionInView sectionId="implementation-2" onInView={handleInView} />
        <h2>{subheaderNames[2]}</h2>
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
          <h4 className="text-center">Runner Deployment Method</h4>
        </p>
        <p>
          AWS cloud infrastructure can be customized to deploy GitHub Actions
          runners in various ways. We compared the three most viable methods:
        </p>
        <ul className="m-0 flex flex-row justify-center space-x-4 p-0">
          <li
            id="aws-lambda"
            className="m-0 inline-block flex-shrink-0 rounded-full border-[0.1rem] border-gray-200 p-0 text-gray-600 hover:border-gray-300 hover:bg-harrierOFFWHITE/50 hover:text-harrierBLACK hover:shadow-sm"
          >
            <TextContentModal title="AWS Lambda" description="AWS Lambda">
              <>
                <CgFileDocument size="28" className="text-harrierBLUE" />
                <span>AWS Lambda</span>
              </>
              <p>
                AWS Lambda is a serverless compute service that executes your
                code in response to events while automatically managing the
                underlying compute resources.<sup>4</sup> However, after
                thorough research and testing, we have determined Lambdas to be
                unsuitable for deploying self-hosted runners to process jobs for
                most users for two primary reasons:{" "}
              </p>
              <br />
              <p>
                First, Lambda functions are designed to process individual
                events or complete single tasks rapidly—typically within one
                second for most production invocations.<sup>5</sup> In contrast,
                user workflows usually consist of multiple steps within a job
                rather than just one isolated task or event.
              </p>
              <br />
              <p>
                Second, AWS Lambdas can run code for a maximum of 900 seconds
                (15 minutes) before timing out and halting execution.
                <sup>6</sup> This limitation does not allow enough time to
                complete GitHub Actions workflows, which often exceed 15
                minutes. In comparison, GitHub-hosted runners permit each job in
                a workflow to run for up to 6 hours.<sup>7</sup>
              </p>
            </TextContentModal>
          </li>
          <li
            id="aws-fargate"
            className="m-0 inline-block flex-shrink-0 rounded-full border-[0.1rem] border-gray-200 p-0 text-gray-600 hover:border-gray-300 hover:bg-harrierOFFWHITE/50 hover:text-harrierBLACK hover:shadow-sm"
          >
            <TextContentModal title="AWS Fargate" description="AWS Fargate">
              <>
                <CgFileDocument size="28" className="text-harrierBLUE" />
                <span>AWS Fargate</span>
              </>
              <p>
                AWS Fargate is a technology that provides on-demand,
                appropriately sized compute capacity for containerized
                applications.<sup>8</sup> We considered using Fargate to deploy
                self-hosted runners due to its desirable features, including
                ease of setup and configuration and a reasonable
                price-performance ratio. We compared the suitability of Fargate
                to EC2 where relevant.
              </p>
              <br />
              <p>
                Fargate has a slower initial response time than EC2. This makes
                Fargate less suitable for providing faster workflow run times.
                Users report that Fargate initialization times range from
                approximately 30 seconds to several minutes. In contrast, EC2
                instances, when configured within a warm pool, can achieve a
                complete restart in an average of just 20 seconds.<sup>11</sup>
              </p>
              <br />
              <p>
                Fargate offers processor configuration options, such as the
                number of CPUs and the amount of RAM. However, it does not allow
                users to select specific CPU processors and may not always
                support the latest hardware, both of which are important for
                Harrier to provide a range of user options. In contrast, AWS EC2
                instances provide access to the most current and powerful CPUs,
                allowing the user to specify the exact processor type required
                for their workloads.
              </p>
              <br />
              <p>
                {" "}
                Many developers also reported that Fargate can be more expensive
                for high compute usage compared to EC2.<sup>9</sup> The cost
                difference largely depends on how each solution is implemented,
                but overall, Fargate tends to be pricier than EC2.<sup>10</sup>
              </p>
            </TextContentModal>
          </li>

          <li
            id="aws-ec2"
            className="m-0 inline-block flex-shrink-0 rounded-full border-[0.1rem] border-gray-200 p-0 text-gray-600 hover:border-gray-300 hover:bg-harrierOFFWHITE/50 hover:text-harrierBLACK hover:shadow-sm"
          >
            <TextContentModal title="AWS EC2" description="AWS EC2">
              <>
                <CgFileDocument size="28" className="text-harrierBLUE" />
                <span>AWS EC2</span>
              </>
              <p>
                Amazon Elastic Compute Cloud (Amazon EC2) is a web service that
                provides secure and resizable compute capacity in the cloud.
                <sup>12</sup> When an instance is launched on AWS, a root volume
                is created and contains the image used to boot the instance.
                Each instance has a single root volume, and AWS recommends using
                Elastic Block Storage (EBS) for fast launch and persistent
                storage. EBS is a scalable, high-performance block storage
                resource to store files or install applications.<sup>13</sup>
              </p>
              <br />
              <p>
                Initially, we noticed that the full startup time for an EC2
                instance ranged from 2 to 5 minutes, which is too long to wait
                before starting a workflow. To address this cold startup issue,
                we created a "warm pool" of EC2 instances on AWS. According to
                AWS documentation, a warm pool consists of "a pool of
                pre-initialized EC2 instances that sit alongside an Auto Scaling
                group." However, Auto Scaling groups can respond slowly to
                incoming requests, sometimes taking over 60 seconds. To improve
                responsiveness for Harrier, we automatically manage the state of
                EC2 instances using AWS Lambda functions, which can react to
                requests in less than 1 second.
              </p>
              <br />
              <p>
                EC2 instances in the warm pool can be in one of three states:
                Running, Stopped, or Hibernated.
              </p>
              <br />
              <p>
                Maintaining instances in either a stopped or hibernated state is
                an effective way to minimize cloud costs for users since they
                only incur charges associated with the attached EBS volumes and
                IP addresses.<sup>14</sup>
              </p>
              <br />
              <p>
                We tested hibernating instances but encountered unreliable and
                unpredictable results. Sometimes, hibernating EC2 instances
                would not shut down properly and required a reboot, taking about
                4 to 5 minutes. Additionally, hibernation is not supported on
                all instance types, which could diminish the level of
                configurability available to Harrier users.
              </p>
              <br />
              <p>
                In contrast, we did not experience issues with stopping and
                restarting stopped instances. These instances can be quickly
                restarted to process a workflow, with our EC2 instances
                transitioning from stopped to running in approximately 15
                seconds. In addition, when an EBS-backed instance is stopped,
                that instance retains any associated Elastic IP addresses and
                attached EBS volumes, including the data on those volumes.
              </p>
              <br />
            </TextContentModal>
          </li>
        </ul>
        <br />
        <h4 className="text-center">
          Setting up the Environment for Deployment
        </h4>

        <ul className="m-0 flex flex-row justify-center space-x-4 p-0">
          <li
            id="one-or-multiple-available-runners"
            className="m-0 inline-block flex-shrink-0 rounded-full border-[0.1rem] border-gray-200 p-0 text-gray-600 hover:border-gray-300 hover:bg-harrierOFFWHITE/50 hover:text-harrierBLACK hover:shadow-sm"
          >
            <TextContentModal
              title="One or Multiple Available Runners"
              description="One or Multiple Available Runners"
            >
              <>
                <CgFileDocument size="28" className="text-harrierBLUE" />
                <span>One or Multiple Available Runners</span>
              </>
              <p>
                By default, GitHub Actions maximizes the number of jobs that run
                in parallel based on the availability of runners. This feature
                allows individual users and multiple users or teams to execute
                multiple workflows or a single workflow with several jobs
                concurrently. Harrier achieved a similar effect by providing
                users with a fleet of additional runners.
              </p>
              <br />
              <p>
                Since stopped instances incur only minimal charges, the cost of
                adding more stopped instances is a reasonable trade-off for
                individuals or teams wanting to run workflows in parallel.
                Harrier setup defaults to provisioning ten EC2 instances on the
                user's AWS account, however, users can easily adjust the number
                during setup.
              </p>
            </TextContentModal>
          </li>
          <li
            id="operating-system"
            className="m-0 inline-block flex-shrink-0 rounded-full border-[0.1rem] border-gray-200 p-0 text-gray-600 hover:border-gray-300 hover:bg-harrierOFFWHITE/50 hover:text-harrierBLACK hover:shadow-sm"
          >
            <TextContentModal
              title="Operating System"
              description="Operating System"
            >
              <>
                <CgFileDocument size="28" className="text-harrierBLUE" />
                <span>Operating System</span>
              </>
              <p>
                GitHub Actions-hosted runners use Ubuntu 22.04, which, at the
                time of Harrier implementation, is the version referenced by the
                "ubuntu-latest” value of the "runs-on” key of workflow YAML
                files.<sup>16</sup>
              </p>
              <br />
              <p>
                We considered Amazon Linux an operating system option because
                Amazon promotes it as having the latest AWS features and being
                optimized for Amazon EC2 instances. However, after testing it,
                we found that using Amazon Linux required significant
                modifications to user workflows. For example, many processes
                that work in Ubuntu, such as using `apt-get,` do not function in
                Amazon Linux, which relies on alternative package managers like
                `yum/dnf.` Although there are workarounds, we wanted to
                prioritize a low-friction user experience when migrating from a
                GitHub-hosted runner.
              </p>
              <br />
              <p>
                Harrier sets up each new EC2 instance with an image running the
                Ubuntu 22.04 operating system.
              </p>
            </TextContentModal>
          </li>

          <li
            id="preparing-the-ec2"
            className="m-0 inline-block flex-shrink-0 rounded-full border-[0.1rem] border-gray-200 p-0 text-gray-600 hover:border-gray-300 hover:bg-harrierOFFWHITE/50 hover:text-harrierBLACK hover:shadow-sm"
          >
            <TextContentModal
              title="Preparing the EC2 with Applications"
              description="Preparing the EC2 with Applications"
            >
              <>
                <CgFileDocument size="28" className="text-harrierBLUE" />
                <span>Preparing the EC2 with Applications</span>
              </>
              <p>
                To prepare the runner to process workflows, the Harrier setup
                process automatically installs applications on the EC2 instance
                EBS volume, such as the GitHub self-hosted runner application
                itself, Docker Engine, and build-essential software tools.
              </p>
              <br />

              <p>
                The GHA self-hosted runner application is downloaded and
                installed once on each EC2 instance. For the runner to process
                any workflows, it needs to be registered and configured with
                GitHub, which requires a token from GitHub Actions.
              </p>
            </TextContentModal>
          </li>
        </ul>
      </section>

      <section id="implementation-3">
        <SectionInView sectionId="implementation-3" onInView={handleInView} />
        <h2>{subheaderNames[3]}</h2>
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

        <h4 className="text-center">
          Configuring a Self-Hosted GitHub Actions Runner
        </h4>

        <ul className="m-0 flex flex-row justify-center space-x-4 p-0">
          <li
            id="self-hosted-runner-at-org-level"
            className="m-0 inline-block flex-shrink-0 rounded-full border-[0.1rem] border-gray-200 p-0 text-gray-600 hover:border-gray-300 hover:bg-harrierOFFWHITE/50 hover:text-harrierBLACK hover:shadow-sm"
          >
            <TextContentModal
              title="Self-hosted Runner at the Organization Level"
              description="Self-hosted Runner at the Organization Level"
            >
              <>
                <CgFileDocument size="28" className="text-harrierBLUE" />
                <span>Self-hosted Runner at the Organization Level</span>
              </>
              <p>
                GitHub allows you to register self-hosted runners at the
                organization, repository, or enterprise levels. We decided to
                add the self-hosted runner at the organization level because it
                makes it accessible to multiple repositories and enables easier
                management of the runners in a single location.<sup>17</sup>
              </p>
              <br />
            </TextContentModal>
          </li>
          <li
            id="accessing-the-gitHub-api"
            className="m-0 inline-block flex-shrink-0 rounded-full border-[0.1rem] border-gray-200 p-0 text-gray-600 hover:border-gray-300 hover:bg-harrierOFFWHITE/50 hover:text-harrierBLACK hover:shadow-sm"
          >
            <TextContentModal
              title="Accessing the GitHub API for Runner Setup"
              description="Accessing the GitHub API for Runner Setup"
            >
              <>
                <CgFileDocument size="28" className="text-harrierBLUE" />
                <span>Accessing the GitHub API for Runner Setup</span>
              </>
              <p>
                GitHub has a REST API to register, view, and delete self-hosted
                runners in GitHub Actions. A GitHub Personal Access Token is
                required to access the GitHub API programmatically. The user can
                create a Personal Access Token (PAT), scoped to allow requesting
                self-hosted runner tokens and also setting up webhooks.{" "}
              </p>
            </TextContentModal>
          </li>
        </ul>
        <br />
        <ul className="m-0 flex flex-row justify-center space-x-4 p-0">
          <li
            id="automating-runner-registration"
            className="m-0 inline-block flex-shrink-0 rounded-full border-[0.1rem] border-gray-200 p-0 text-gray-600 hover:border-gray-300 hover:bg-harrierOFFWHITE/50 hover:text-harrierBLACK hover:shadow-sm"
          >
            <TextContentModal
              title="Automating Runner Registration with the GitHub API"
              description="Automating Runner Registration with the GitHub API"
            >
              <>
                <CgFileDocument size="28" className="text-harrierBLUE" />
                <span>Automating Runner Registration with the GitHub API</span>
              </>
              <p>
                Harrier automatically downloads the GitHub self-hosted runner
                application, which has all the necessary files to set up and run
                the runner.<sup>18</sup>
              </p>
              <br />
              <p>
                Harrier setup also requests the GitHub API to create a
                registration token for the user's organization. The API responds
                with a token and an expiration date.
              </p>
              <br />
              <p>
                Once extracted, the token is passed to the GitHub self-hosted
                runner configuration script to register the runner with the
                user's GitHub organization. Once registered, the self-hosted
                runner is now authorized and ready to process workflow jobs
                originating from that organization.
              </p>
            </TextContentModal>
          </li>
        </ul>
        <br />
        <h4 className="text-center">Just-in-Time (JIT) Runners</h4>

        <ul className="m-0 flex flex-row justify-center space-x-4 p-0">
          <li
            id="what-are-jit-runners"
            className="m-0 inline-block flex-shrink-0 rounded-full border-[0.1rem] border-gray-200 p-0 text-gray-600 hover:border-gray-300 hover:bg-harrierOFFWHITE/50 hover:text-harrierBLACK hover:shadow-sm"
          >
            <TextContentModal
              title="What Are JIT Runners"
              description="What Are JIT Runners"
            >
              <>
                <CgFileDocument size="28" className="text-harrierBLUE" />
                <span>What Are JIT Runners</span>
              </>
              <p>
                In mid-2023, GitHub introduced Just-In-Time (JIT) runners, a
                feature that allows users to create ephemeral self-hosted
                runners via the REST API. With JIT runners, each workflow run
                utilizes a newly instantiated runner, which enhances both
                security and availability.<sup>20</sup>
              </p>
            </TextContentModal>
          </li>

          <li
            id="using-jit-runners-in-harrier"
            className="m-0 inline-block flex-shrink-0 rounded-full border-[0.1rem] border-gray-200 p-0 text-gray-600 hover:border-gray-300 hover:bg-harrierOFFWHITE/50 hover:text-harrierBLACK hover:shadow-sm"
          >
            <TextContentModal
              title="Using JIT Runners in Harrier"
              description="Using JIT Runners in Harrier"
            >
              <>
                <CgFileDocument size="28" className="text-harrierBLUE" />
                <span>Using JIT Runners in Harrier</span>
              </>
              <p>
                When a new JIT runner is registered, it is added to the GitHub
                Actions list of runners for the user’s organization. Initially,
                the runner appears as "Offline" on GitHub until the self-hosted
                runner application on the EC2 instance is fully set up to handle
                incoming workflow runs. Once configured, the runner's status
                changes to "Idle," signaling GitHub to route queued workflow
                runs to it.
              </p>
              <br />
              <img
                className="w-1/2 place-self-center"
                src={JITRunnerToken}
                alt="JIT Runner Token"
              />
              <br />
              <p>
                JIT runners are designed to execute a single job. After
                completing the workflow job, the runner shuts down and is
                automatically removed from the organization's list of
                self-hosted runners on GitHub.
              </p>
              <br />
              <img
                className="w-1/3 place-self-center"
                src={SingleUse}
                alt="Single Use"
              />
              <br />
              <p>
                Harrier users benefit from the enhanced security of JIT runners.
                By requiring a unique token for every workflow run, JIT runners
                minimize the risks associated with long-lived credentials or the
                exposure of sensitive data.
              </p>
              <br />
              <p>
                JIT runners also ensure high availability. Since a new runner is
                provisioned for each workflow, users are guaranteed a
                ready-to-use runner whenever a workflow is triggered. Unlike
                persistent runners, which GitHub may remove after 14 days of
                inactivity—potentially causing workflow failures—JIT runners
                eliminate the need to reconfigure expired runners. This
                simplifies operations and reduces the risk of downtime.
              </p>
            </TextContentModal>
          </li>
        </ul>
      </section>

      <section id="implementation-4">
        <SectionInView sectionId="implementation-4" onInView={handleInView} />
        <h2>{subheaderNames[4]}</h2>
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
        <h2>{subheaderNames[5]}</h2>
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

        <ul className="m-0 flex flex-row justify-center space-x-4 p-0">
          <li
            id="aws-s3"
            className="m-0 inline-block flex-shrink-0 rounded-full border-[0.1rem] border-gray-200 p-0 text-gray-600 hover:border-gray-300 hover:bg-harrierOFFWHITE/50 hover:text-harrierBLACK hover:shadow-sm"
          >
            <TextContentModal title="What is AWS S3?" description="AWS S3">
              <>
                <CgFileDocument size="28" className="text-harrierBLUE" />
                <span>What is AWS S3?</span>
              </>
              <p>
                Simple Storage Service (S3) is an object storage service for
                users to store, manage, analyze, and protect any amount of data
                for virtually any use case.<sup>23</sup>
              </p>
              <br />
              <p>
                Harrier provisions a single S3 bucket that is shared across all
                users and workflows within the organization. The bucket is used
                to store the current status of EC2 instances as well as cache
                artifacts generated from workflow runs. Harrier uses Mountpoint,
                an open-source file client, used to manage S3s using standard
                Linux file system operations.
              </p>
            </TextContentModal>
          </li>
        </ul>
      </section>

      <section id="implementation-6">
        <SectionInView sectionId="implementation-6" onInView={handleInView} />
        <h2>{subheaderNames[6]}</h2>
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
        <h2>{subheaderNames[7]}</h2>
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
        <h2>{subheaderNames[8]}</h2>
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
        <h2>{subheaderNames[9]}</h2>
        <p>
          Here is a diagram that outlines the overall system architecture
          created by the Harrier agent within the user’s cloud account.
        </p>
        <br />

        <div className="scale-125 place-content-center">
          <ImageContentModal
            src={OverallArchitecture}
            alt={"Overall architecture"}
          />
        </div>
        <br />
        <br />
        <p className="text-center font-bold">
          Harrier uses three AWS Lambdas: the Workflow Lambda, the Timeout
          Lambda, and the Cache Eviction Lambda
        </p>
        <div className="place-self-center">
          <ImageContentModal src={ThreeLambdas} alt={"Three Lambdas"} />
        </div>

        <ul className="m-0 flex flex-row justify-center space-x-4 p-0">
          <li
            id="workflow-and-timeout-lambdas"
            className="m-0 inline-block flex-shrink-0 rounded-full border-[0.1rem] border-gray-200 p-0 text-gray-600 hover:border-gray-300 hover:bg-harrierOFFWHITE/50 hover:text-harrierBLACK hover:shadow-sm"
          >
            <TextContentModal
              title="The Workflow Lambda and Timeout Lambda"
              description="The Workflow Lambda and Timeout Lambda"
            >
              <>
                <CgFileDocument size="28" className="text-harrierBLUE" />
                <span>The Workflow Lambda and Timeout Lambda</span>
              </>
              <p>
                GitHub sends a single HTTP POST request to the user's AWS each
                time a new workflow is run. The API Gateway receives this
                request and invokes the Harrier Workflow Lambda.
              </p>
              <br />
              <p>
                The Harrier Workflow Lambda code was designed to capture
                requests from GitHub via the API Gateway and parse the
                information based on the "action” property of the Request
                object, which can have a value of "completed," "queued," or
                "in-progress."
              </p>
              <br />
              <p>
                In addition, there is also a "ping” request, identified by its
                unique “zen" property, which is sent out by GitHub each time a
                new webhook is created. The Workflow Lambda sends a response to
                GitHub with a 200 status, indicating a request has been received
                successfully.
              </p>
              <br />
              <strong>EC2 Status</strong>
              <p>
                Harrier uses the AWS SDK to retrieve details about EC2
                instances, including their state and ID, to efficiently manage
                resources for running workflows. EC2 instances are categorized
                into "Running" or "Stopped" states. Harrier further refines the
                "Running" state into "busy" for instances currently processing
                workflows and "idle" for those ready to accept new workflows.
              </p>
              <br />
              <p>
                The Workflow Lambda tracks and updates the status of EC2
                instances by maintaining JSON objects in the user’s S3. When a
                workflow is initiated on GitHub, the Lambda evaluates available
                EC2s by looking for an “idle” instance. It attempts to restart
                an “offline” instance if none are available. If neither is
                possible, the workflow remains queued until an instance becomes
                available.
              </p>
              <br />
              <p>
                To prepare an instance for a new workflow, the Workflow Lambda
                sets up the runtime environment by mounting an S3 for caching,
                retrieving a JIT self-hosted runner token from the GitHub API,
                and executing the runner application.
              </p>
              <br />
              <p>
                Once a workflow is completed, GitHub sends a "completed" event
                to the API Gateway, which triggers the Timeout Lambda. This
                function enforces a user-defined delay to keep the instance
                running temporarily, allowing for efficient handling of
                potential quick reruns. If the instance remains idle at the end
                of the timeout period, it is terminated.
              </p>
            </TextContentModal>
          </li>

          <li
            id="cache-eviction-lambda"
            className="m-0 inline-block flex-shrink-0 rounded-full border-[0.1rem] border-gray-200 p-0 text-gray-600 hover:border-gray-300 hover:bg-harrierOFFWHITE/50 hover:text-harrierBLACK hover:shadow-sm"
          >
            <TextContentModal
              title="The Cache Eviction Lambda"
              description="The Cache Eviction Lambda"
            >
              <>
                <CgFileDocument size="28" className="text-harrierBLUE" />
                <span>The Cache Eviction Lambda</span>
              </>
              <p>
                The Cache Eviction Lambda is triggered by an EventBridge
                Scheduler. By default, the scheduler triggers the Lambda every
                night at 3:00 AM, a time chosen to minimize interference with
                workflow activity. The Lambda scans the user’s S3 and deletes
                cache files that have not been accessed in the past 72 hours.{" "}
              </p>
            </TextContentModal>
          </li>
        </ul>
      </section>

      <section id="implementation-10">
        <SectionInView sectionId="implementation-10" onInView={handleInView} />
        <h2>{subheaderNames[10]}</h2>
        <p>
          To begin, the user must follow the steps in the Harrier Installation
          Guide to configure the required settings in AWS and GitHub. This
          includes creating IAM roles, setting up secrets, establishing identity
          providers in AWS, and generating a personal access token in GitHub.
        </p>
        <p>
          Once these configurations are complete, the user can interact with the
          Harrier frontend to specify their preferences, such as the AWS region
          and EC2 instance types. They will then receive a setup.yml file, which
          can be executed as a workflow action in any repository within their
          GitHub organization to deploy Harrier.
        </p>
        <p>
          The setup.yml file initializes the Harrier system on AWS. It automates
          preparatory tasks, such as setting up Node.js and configuring AWS
          credentials with the user's designated IAM role. Once the groundwork
          is complete, the workflow invokes a custom action called Harrier
          Setup, which handles the deployment of the required infrastructure
          using code from the action repository.
        </p>
      </section>
      <section id="implementation-11">
        <SectionInView sectionId="implementation-11" onInView={handleInView} />
        <h2>{subheaderNames[11]}</h2>
        <p>[ COMING SOON ]</p>
      </section>
      <section id="implementation-12">
        <SectionInView sectionId="implementation-12" onInView={handleInView} />
        <h2>{subheaderNames[12]}</h2>

        <ol>
          <li>
            <a href="https://survey.stackoverflow.co/2024/technology">
              2024 Developer Survey:
              https://survey.stackoverflow.co/2024/technology
            </a>
          </li>
          <li>
            <a href="https://docs.github.com/en/actions/security-for-github-actions/security-guides/security-hardening-for-github-actions">
              Security Hardening for GitHub Actions:
              https://docs.github.com/en/actions/security-for-github-actions/security-guides/security-hardening-for-github-actions
            </a>
          </li>
          <li>
            <a href="https://www.pluralsight.com/resources/blog/tech-operations/what-is-aws-cdk-cloud-development">
              SDK vs CDK:
              https://www.pluralsight.com/resources/blog/tech-operations/what-is-aws-cdk-cloud-development
            </a>
          </li>
          <li>
            <a href="https://aws.amazon.com/lambda/features/">
              AWS Lambda Features: https://aws.amazon.com/lambda/features/
            </a>
          </li>
          <li>
            <a href="https://docs.aws.amazon.com/lambda/latest/dg/event-driven-faq.html">
              AWS Lambda FAQ:
              https://docs.aws.amazon.com/lambda/latest/dg/event-driven-faq.html
            </a>
          </li>
          <li>
            <a href="https://docs.aws.amazon.com/lambda/latest/dg/configuration-timeout.html">
              Lambda Timeout:
              https://docs.aws.amazon.com/lambda/latest/dg/configuration-timeout.html
            </a>
          </li>
          <li>
            <a href="https://docs.github.com/en/actions/administering-github-actions/usage-limits-billing-and-administration">
              GitHub Actions Limits:
              https://docs.github.com/en/actions/administering-github-actions/usage-limits-billing-and-administration
            </a>
          </li>
          <li>
            <a href="https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html">
              AWS Fargate:
              https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html
            </a>
          </li>
          <li>
            <a href="https://www.reddit.com/r/aws/comments/165wkns/ecs_fargate_vs_ec2/">
              Reddit EC2 vs Fargate:
              https://www.reddit.com/r/aws/comments/165wkns/ecs_fargate_vs_ec2/
            </a>
          </li>
          <li>
            <a href="https://www.warpbuild.com/blog/self-hosting-github-actions#self-hosting-github-actions-runners-on-aws-a-comprehensive-guide">
              Deploying self-hosted runners on AWS:
              https://www.warpbuild.com/blog/self-hosting-github-actions#self-hosting-github-actions-runners-on-aws-a-comprehensive-guide
            </a>
          </li>
          <li>
            <a href="https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-warm-pools.html">
              EC2 Warm Pools:
              https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-warm-pools.html
            </a>
          </li>
          <li>
            <a href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html">
              What is EC2:
              https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html
            </a>
          </li>
          <li>
            <a href="https://aws.amazon.com/ebs/">
              What is EBS: https://aws.amazon.com/ebs/
            </a>
          </li>
          <li>
            <a href="https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-warm-pools.html">
              EC2 Warm Pools:
              https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-warm-pools.html
            </a>
          </li>
          <li>
            <a href="https://docs.aws.amazon.com/vpc/latest/userguide/infrastructure-security.html">
              VPC Isolation:
              https://docs.aws.amazon.com/vpc/latest/userguide/infrastructure-security.html
            </a>
          </li>
          <li>
            <a href="https://github.blog/changelog/2024-09-25-actions-new-images-and-ubuntu-latest-changes/">
              Ubuntu Latest to 24.04 in 2024:
              https://github.blog/changelog/2024-09-25-actions-new-images-and-ubuntu-latest-changes/
            </a>
          </li>
          <li>
            <a href="https://docs.github.com/en/actions/hosting-your-own-runners/managing-self-hosted-runners/about-self-hosted-runners">
              About GHA self-hosted runners:
              https://docs.github.com/en/actions/hosting-your-own-runners/managing-self-hosted-runners/about-self-hosted-runners
            </a>
          </li>
          <li>
            <a href="https://docs.github.com/en/rest/actions/self-hosted-runners">
              GitHub Self-hosted runner REST docs:
              https://docs.github.com/en/rest/actions/self-hosted-runners
            </a>
          </li>
          <li>
            <a href="https://github.blog/changelog/2023-06-02-github-actions-just-in-time-self-hosted-runners/">
              GitHub Blog Intro for JIT Runners:
              https://github.blog/changelog/2023-06-02-github-actions-just-in-time-self-hosted-runners/
            </a>
          </li>
          <li>
            <a href="https://docs.github.com/en/actions/hosting-your-own-runners/managing-self-hosted-runners/removing-self-hosted-runners">
              Removing Self-hosted Runners:
              https://docs.github.com/en/actions/hosting-your-own-runners/managing-self-hosted-runners/removing-self-hosted-runners
            </a>
          </li>
          <li>
            <a href="https://www.redhat.com/en/topics/automation/what-is-a-webhook">
              What is a Webhook:
              https://www.redhat.com/en/topics/automation/what-is-a-webhook
            </a>
          </li>
          <li>
            <a href="https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html">
              AWS API Gateway:
              https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html
            </a>
          </li>
          <li>
            <a href="https://aws.amazon.com/s3">
              AWS S3: https://aws.amazon.com/s3
            </a>
          </li>
          <li>
            <a href="https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/using-pre-written-building-blocks-in-your-workflow">
              Pre-written Actions in Workflows:
              https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/using-pre-written-building-blocks-in-your-workflow
            </a>
          </li>
          <li>
            <a href="https://docs.github.com/en/actions/sharing-automations/creating-actions/publishing-actions-in-github-marketplace">
              Publishing in Actions Marketplace:
              https://docs.github.com/en/actions/sharing-automations/creating-actions/publishing-actions-in-github-marketplace
            </a>
          </li>
          <li>
            <a href="https://www.docker.com/resources/what-container/">
              Docker container: https://www.docker.com/resources/what-container/
            </a>
          </li>
          <li>
            <a href="https://depot.dev/blog/faster-builds-with-docker-caching">
              Docker Layer Caching:
              https://depot.dev/blog/faster-builds-with-docker-caching
            </a>
          </li>
          <li>
            <a href="https://www.atlassian.com/devops/what-is-devops/agile-vs-devops">
              Devops vs. Agile:
              https://www.atlassian.com/devops/what-is-devops/agile-vs-devops
            </a>
          </li>
          <li>
            <a href="https://www.geeksforgeeks.org/what-is-workflow/">
              What is a workflow?:
              https://www.geeksforgeeks.org/what-is-workflow/
            </a>
          </li>
          <li>
            <a href="https://kestra.io/blogs/2023-12-01-yaml-pitfalls">
              YAML Pitfalls: https://kestra.io/blogs/2023-12-01-yaml-pitfalls
            </a>
          </li>
          <li>
            <a href="https://github.blog/engineering/experiment-the-hidden-costs-of-waiting-on-slow-build-times/">
              Experiment: The hidden costs of waiting on slow build times:
              https://github.blog/engineering/experiment-the-hidden-costs-of-waiting-on-slow-build-times/
            </a>
          </li>
          <li>
            <a href="https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/caching-dependencies-to-speed-up-workflows#usage-limits-and-eviction-policy">
              GitHub Action Docs - Usage limits and eviction policy:
              https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/caching-dependencies-to-speed-up-workflows#usage-limits-and-eviction-policy
            </a>
          </li>
          <li>
            <a href="https://news.ycombinator.com/item?id=39956327">
              Hacker News - Cache is King:
              https://news.ycombinator.com/item?id=39956327
            </a>
          </li>
          <li>
            <a href="https://bitrise.io/blog/post/ci-cd-caching-with-bitrise-what-is-cache-and-why-you-should-care-about-caching">
              CI/CD caching with Bitrise:
              https://bitrise.io/blog/post/ci-cd-caching-with-bitrise-what-is-cache-and-why-you-should-care-about-caching
            </a>
          </li>
          <li>
            <a href="https://www.atlassian.com/git/tutorials/monorepos">
              Atlassian - Monorepos:
              https://www.atlassian.com/git/tutorials/monorepos
            </a>
          </li>
          <li>
            <a href="https://news.ycombinator.com/item?id=28460342">
              Y-Combinator community post:
              https://news.ycombinator.com/item?id=28460342
            </a>
          </li>
        </ol>
      </section>
    </>
  );
};
export default Implementation;

<a href="LINK1">TEXT1 Developer Survey: LINK1</a>;
