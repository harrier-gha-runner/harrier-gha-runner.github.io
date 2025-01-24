import { useContext } from "react";
import { PageNavigationContext } from "@/providers/PageNavigation";

import { CodeBlock } from "@/components/utility/CodeBlock";
import { BoldText as BT } from "@/components/utility/BoldText";
import { Overview } from "@/components/utility/Overview";
import { TextContentModal, ImageContentModal } from "@/components/ui/dialog";

import { SectionInView } from "@/components/utility/SectionInView";

// import { AxiosChart } from "@/components/AxiosChart";
// import { VSCodeChart } from "@/components/VSCodeChart";

// Importing images
import IsolatedVPC from "@/assets/4.1.isolated-vpc-in-users-aws-account.png";
import FleetOfEC2Runners from "@/assets/4.2.fleet-of-ec2-runners.png";
import JustInTimeTokenRegistration from "@/assets/4.3.just-in-time-token-registration-of-runner.png";
import TerminationOfEC2Runners from "@/assets/4.4.termination-of-ec2-runners.png";
import S3BucketCacheStore from "@/assets/4.5.s3-bucket-cache-store.png";
import CacheByHarrier from "@/assets/4.6.cache-by-harrier.png";
import HighLevelArchitecture from "@/assets/4.7.high-level.png";
import OverallArchitecture from "@/assets/4.overall-architecture.png";
import ReuseActiverunner from "@/assets/4.4.reuse-runner.png";
import ApiPlatformIntegration from "@/assets/4.7.api-platform-integration-webhook-json-object.png";
import FasterWorkflowStart from "@/assets/4.2.faster-workflow-start.png";

import MinimalWorkflowModification from "@/assets/4.8.minimal-workflow-modification-v1.gif";
import QueuedNewRunner from "@/assets/4.1.6.queued-new-runner.png";
import JITRunnerToken from "@/assets/4.1.5.2.just-in-time-runner-token.png";
import SingleUse from "@/assets/4.1.5.2.single-use-runner.png";
import ThreeLambdas from "@/assets/4.1.7.three-lambdas.png";
import WebhookSetup from "@/assets/4.1.6.webhook-setup.png";
import WebhookJSONExample from "@/assets/4.1.6.json-object-code-example.png";

export const Implementation = () => {
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
      <Overview title="Prototyped using AWS, focused on Node.js projects">
        <span>
          <ul>
            <li>
              <BT>Prioritizing data security. </BT>AWS provides secure GitHub
              integration through OIDC standards and protects user secrets using
              their trusted AWS Secrets Manager.
            </li>
            <li>
              <BT>Building for a wide scope of use.</BT> JavaScript, often
              paired with Node.js for server-side code, is one of the most
              prevalent languages and runtime environments on GitHub.
            </li>
          </ul>
        </span>
      </Overview>
      {/* <section id="implementation-0">
        <h2>Harrier Implementation</h2>
        <div className="">
          <ul>
            <li>
              Harrier is implemented in AWS which provides secure GH integration
              through OIDC standards, with a secrets manager function.
            </li>
            <li>
              As the most common runtime environment on GitHub, focusing on
              Node.js offered significant ROI for Harrier's initial
              implementation.
            </li>
          </ul>
        </div>

        <h4 className="text-center">
          The Right Cloud Platform for Harrier Users
        </h4>
        <ul className="m-0 space-x-4 p-0 text-center">
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
      </section> */}

      <section id="implementation-0">
        <SectionInView sectionId="implementation-0" onInView={handleInView} />
        <h2>{subheaderNames[0]}</h2>
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
        <ImageContentModal
          src={IsolatedVPC}
          alt={"Isolated VPC in user's AWS account"}
        />
        <ul className="space-x-4 p-0 text-center">
          <li id="why-use-a-vpc" className="modal-item">
            <TextContentModal title="Why use a VPC?">
              <p>
                A Virtual Private Cloud is a private, isolated network within a
                cloud platform that allows users to launch and manage resources,
                such as virtual machines (VMs) and storage, in a secure and
                customizable environment. Users can define their own IP address
                range, create subnets, configure route tables, and set up
                firewalls to control access to the cloud resources. A VPC
                provides full control over network settings, making it easier to
                secure and manage the communication between provisioned
                resources and with the outside world. By provisioning VMs within
                a dedicated VPC, Harrier ensures that the self-hosted runner
                infrastructure can only be accessed by GitHub while also
                isolating the VMs from the users' other resources as well as
                from other AWS accounts.
              </p>
              <br />
              <p>
                By provisioning VMs within a dedicated VPC, Harrier ensures that
                the self-hosted runner infrastructure can only be accessed by
                GitHub while also isolating the VMs from the users' other
                resources as well as from other AWS accounts.
              </p>
            </TextContentModal>
          </li>
          <li id="why-only-a-public-subnet" className="modal-item">
            <TextContentModal title="Why only use a public subnet?">
              <p>
                A subnet is a smaller, more manageable division of an IP
                network. In the context of AWS VPC, a subnet is a segment of the
                IP address range that is defined for the VPC, which is specified
                using CIDR (Classless Inter-Domain Routing) notation (e.g.,
                10.0.0.0/16). This range represents the entire VPC, which can
                then be divided into smaller subnets by allocating portions of
                the address range to different subnets.
              </p>
              <br />
              <p>
                A subnet can be either public or private, depending on whether
                it is configured to allow direct access to the internet or
                whether it is isolated from the internet. Public subnets are
                typically used for resources such as web servers or load
                balancers. Private subnets are used for sensitive resources that
                should not be exposed to the internet, such as databases,
                application servers, and backend services.
              </p>
              <br />
              <p>
                Even though the self-hosted runners will have access to
                potentially sensitive data, they also need to communicate with
                GitHub to register themselves as available runners and have the
                codebase downloaded onto them. The optimal solution architecture
                may have been to explore the use of a bastion host to act as a
                secure gateway between a private subnet in the VPC and GitHub,
                which would have addressed the security concerns, but at a cost
                of additional complexity and development efforts. Given that the
                self-hosted runners are designed to be ephemeral, fully
                terminated after completion of a workflow run, it was deemed
                safe enough to only use a public subnet for the first iteration
                of Harrier.
              </p>
            </TextContentModal>
          </li>
        </ul>
      </section>

      <section id="implementation-1">
        <SectionInView sectionId="implementation-1" onInView={handleInView} />
        <h2>{subheaderNames[1]}</h2>
        <p>
          Harrier deploys to Amazon's Elastic Compute Cloud (EC2) service which
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
        <ImageContentModal
          src={FleetOfEC2Runners}
          alt={"Fleet of EC2 runners"}
        />
        <p>
          These benefits empower users to take full advantage of the intended
          purpose of GitHub's self-hosted runner feature, which enables users to
          customize their runner setup. Harrier provides users the option to
          choose their desired configuration prior to setting up the alternative
          runner infrastructure.
        </p>
        <p>
          The initial launch or “cold start” of an EC2 instance requires some
          time before a workflow can be picked up and processed. Typically, this
          duration is around 70 to 90 seconds, as determined by testing. The
          setup process involves several steps, including configuring the
          instance's hardware, installing the operating system, and downloading
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
          provision replacement EC2s at the time of GHA's request for a runner,
          as the runner that will be started up to run a workflow will be
          terminated upon completion of the job.
        </p>
        {/* <p>
          <h4 className="text-center">Runner Deployment Method</h4>
        </p>
        <p>
          AWS cloud infrastructure can be customized to deploy GitHub Actions
          runners in various ways. We compared the three most viable methods:
        </p> */}
        <ul className="space-x-4 p-0 text-center">
          <li id="why-ec2-over-fargate-or-lambda" className="modal-item">
            <TextContentModal title="Why EC2 over Fargate or Lambda?">
              <p>
                AWS provides a variety of cloud compute options besides the EC2,
                namely AWS Fargate and AWS Lambda.{" "}
              </p>
              <br />
              <p>
                AWS Fargate is a serverless compute engine specifically designed
                to run containers without having to manage the underlying
                infrastructure, typically used as part of the Amazon Elastic
                Container Service (ECS) and Elastic Kubernetes Service (EKS).
              </p>
              <br />
              <p>
                AWS Lambda is a serverless compute service that runs code in
                response to event triggers. Users upload the function code,
                define the relevant triggers, and the Lambda service handles the
                provisioning, execution, scaling, and infrastructure management
                automatically.
              </p>
              <br />
              <p>
                Even though the idea of “serverless” seems desirable with its
                minimal infrastructure management responsibilities that would be
                placed on the user, neither AWS Fargate nor AWS Lambda are
                actually a good option as a GHA self-hosted runner.
              </p>
              <br />
              <p>
                The GHA self-hosted runner application needs to be executed at
                the command line, which would then register the server with
                GitHub and prepare it to receive the codebase, requisite data,
                and automation instructions from GHA, thus setting up for the
                workflow to run its course . It is possible to encapsulate this
                entire process to occur within a container, but the added layer
                of complexity fights against the need for speed, eliminating the
                AWS Fargate as a possible runner option.
              </p>
              <br />
              <p>
                As described above, a self-hosted runner is more than just an
                application that needs to be executed. The runner is the server
                onto which the codebase is checked out, automation executed,
                with artifacts created as needed. The AWS Lambda does not have
                the capability to serve in this capacity.
              </p>
              <br />
              <p>
                Therefore, Harrier chose to use Amazon EC2 instances to provide
                the level of control and persistence necessary for the
                provisioned runner VM to function properly as a GHA self-hosted
                runner.
              </p>
            </TextContentModal>
          </li>
        </ul>
        <ul className="space-x-4 p-0 text-center">
          <li id="is-a-warm-pool-start-fast-enough" className="modal-item">
            <TextContentModal title="Is a warm pool start fast enough?">
              <p>
                {" "}
                Yes, the “warm pool” strategy significantly reduces the startup
                time of the EC2 in comparison to a “cold start”. However, that
                does not immediately dismiss the concerns around startup latency
                when comparing Harrier runners to the near-instant availability
                of GitHub's default VM runners.
              </p>
              <br />

              <p>
                Regardless of startup time, it is agreed upon by engineers that
                a workflow is almost always faster with caching than without
                caching. However, the key time metric is actually not about how
                long it takes to execute the workflow step related to the
                caching mechanism, but instead how much time the entire workflow
                process, from start to finish, takes away from an engineer's
                productivity. As such, all other speeds held equal, the key
                concern for Harrier is whether the decrease in workflow
                execution time is greater than the increase in startup time of a
                VM, in which case the user would perceive an overall decrease in
                workflow runtime.
              </p>
              <br />
              <p>
                For CI builds with a significantly large set of dependencies,
                the time savings through cache is meaningful enough that even
                the 70 to 90 second cold start time of the EC2 would be rendered
                inconsequential. As the number of dependencies decrease, for
                example when looking at a project that has a full dependency
                installation step that takes less than a minute, the cold start
                time of a Harrier VM runner would actually increase the overall
                workflow runtime.
              </p>
              <br />
              <p>
                Therefore, the “warm pool” strategy was implemented to broaden
                the use case of Harrier to ensure that Harrier runners can
                deliver meaningful workflow speed improvements to a wider range
                of projects rather than those with large dependency sets.
              </p>
            </TextContentModal>
          </li>
          <li id="isnt-maintaining-a-warmpool-expensive" className="modal-item">
            <TextContentModal title="Isn't maintaining a warm pool expensive?">
              <p>
                A core tenet of Harrier is to optimize the provisioning of cloud
                resources so that users do not pay for anything that is not used
                and/or useful for their needs. As such, the first approach taken
                for provisioning self-hosted runners was to spin up a brand new
                EC2 upon receiving the workflow event trigger. The biggest
                challenge with this approach was the undesirably long startup
                time of the EC2 as the new VM was provisioned, configured, and
                had all the necessary applications installed.{" "}
              </p>
              <br />
              <p>
                The current workaround to shorten the startup time of the VM
                runner is to use a “warm pool” strategy, where a fleet of VMs
                are provisioned, pre-configured, and left in a “standby” mode so
                that the startup time experienced by a user would only encompass
                the time required to simply power up and request a GHA runner
                token. This is accomplished by first launching an EC2 instance,
                which actually boots from an Amazon Elastic Block Store (EBS)
                volume as its virtual hard disk. The operating system of the EC2
                is installed on the EBS, along with all the applications
                necessary to support a GHA workflow. Once the EC2 VM is ready to
                receive a workflow, the EC2 instance is “stopped” and the
                compute resource of the VM is terminated while leaving the EBS
                instact with the data preserved. Because the EBS, with all the
                pre-configured and pre-installed data, continues to exist,
                starting an EC2 using this EBS would stand up the VM to a ready
                state much quicker than a cold start.
              </p>
              <br />
              <p>
                The downside of this “warm pool” strategy is that there needs to
                be a fleet of EBSs constantly deployed and on standby within a
                user's AWS account. Fortunately, a Harrier-deployed EBS costs a
                user well under $0.50 per month. Despite Harrier's desire to
                only provision and deploy resources on an as-needed basis, it
                was determined that a Harrier user who is already committed to
                the AWS pay-as-you-go pricing model for their self-hosted
                runners would not be deterred by a few dollars per month
                additional charge that would significantly reduce the start time
                of each workflow.
              </p>
            </TextContentModal>
          </li>
        </ul>

        {/* 
        <h4 className="text-center">
          Setting up the Environment for Deployment
        </h4>

        <ul className="m-0 space-x-4 p-0 text-center">
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
        </ul> */}
      </section>

      <section id="implementation-2">
        <SectionInView sectionId="implementation-2" onInView={handleInView} />
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
        <ul className="space-x-4 p-0 text-center">
          <li
            id="what-are-the-risks-of-a-persistent-token"
            className="modal-item"
          >
            <TextContentModal title="What are the risks of a persistent token?">
              <p>
                Persistent GHA self-hosted runner tokens, once created, remain
                valid indefinitely until manually revoked. This means that an
                attacker has an increased window of opportunity to exploit the
                runner across multiple jobs or workflows to potentially run
                malicious code in the context of the user’s repositories.
              </p>
              <br />
              <p>
                To mitigate the security risk, GitHub offers users a
                just-in-time (JIT) token that is valid only for a short window
                of time. The JIT token can be used with only one job and will be
                automatically removed once the job is completed. The ephemeral
                nature of the JIT token minimizes the window of opportunity for
                exploitation and decreases the risk posed by leaked or stolen
                tokens.
              </p>
            </TextContentModal>
          </li>
          <li id="why-use-ssm" className="modal-item">
            <TextContentModal title="Why use SSM?">
              <p>
                AWS SDK’s EC2 client is a powerful tool that provides Harrier
                with access to every aspect of the EC2’s operations, and most of
                Harrier’s self-hosted runner fleet management is conducted
                through the EC2 client. During the pre-configuration step of the
                Harrier runner fleet, the SDK EC2 client’s LAUNCHINSTANCE
                command is used to automate the VM configuration along with the
                installation of all necessary applications by passing in a bash
                script as an argument to the SDK command. Unfortunately, this
                feature to pass in a bash script as an argument is not available
                for the STARTINSTANCE command, which is the only command
                available to start an EC2 runner from the warm pool.
              </p>
              <br />
              <p>
                Even though it is possible to SSH into the EC2 and execute to
                final runner configuration using the just-in-time token,
                Harrier’s design subscribes to AWS Systems Manager (SSM) in
                order to leverage proven services rather than implementing
                custom code. SSM is a comprehensive management service that
                allows users to automate and streamline administrative tasks for
                AWS resources, a perfect match for the circumstances. At the
                risk of adding complexity to the overall runner infrastructure,
                Harrier opted to subscribe to this additional service in order
                to better optimize the startup time of the self-hosted runner.
              </p>
              <br />
              <p></p>
              <br />
              <p></p>
              <br />
              <p></p>
              <br />
              <p></p>
              <br />
              <p></p>
              <br />
            </TextContentModal>
          </li>
        </ul>
        {/* 
        <h4 className="text-center">
          Configuring a Self-Hosted GitHub Actions Runner
        </h4>

        <ul className="m-0 space-x-4 p-0 text-center">
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
        <ul className="m-0 space-x-4 p-0 text-center">
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

        <ul className="m-0 space-x-4 p-0 text-center">
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
                Actions list of runners for the user's organization. Initially,
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
        </ul> */}
      </section>

      <section id="implementation-3">
        <SectionInView sectionId="implementation-3" onInView={handleInView} />
        <h2>{subheaderNames[3]}</h2>
        <p>
          Harrier runners are ephemeral VMs designed to ensure an isolated and
          clean runtime environment for each workflow job and prevent data
          leakage from one run to the next. As such, the EC2s must be terminated
          upon completion of the workflow run. When a GHA workflow is completed,
          GH generates a webhook notification and sends it to the user's Amazon
          API Gateway, set up by Harrier (discussed at length in{" "}
          <BT>API Platform Integration section</BT>). The webhook payload
          contains the instance ID of the EC2 (obtained at the time of token
          registration) that just completed the workflow run, which is then
          passed to an AWS Lambda so that the EC2 can be terminated.
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
        <ul className="space-x-4 p-0 text-center">
          <li
            id="what-are-the-risks-of-reusing-a-runner"
            className="modal-item"
          >
            <TextContentModal title="What are the risks for reusing a runner?">
              <p>
                Harrier’s design intent is to mimic the advantages of GHA as
                much as possible while accelerating workflows. One of the
                biggest advantages of GHA is the ephemeral nature of the default
                runners, as the use-only-once feature of the VMs provide users
                with a clean runtime environment that results in predictable
                behaviors while also deleting build artifacts after each run to
                minimize security risks.
              </p>
              <br />
              <p>
                If a runner is reused for multiple jobs, the environment (e.g.,
                installed dependencies, libraries, configurations) may drift
                from the original state, which could lead to inconsistent
                behavior. Resetting the runner after each run with an automated
                cleanup job may alleviate the issue, but it is difficult to
                guarantee that all possible state changes from a workflow will
                be captured and reset.
              </p>
              <br />
              <p>
                In addition to environment drift, unintended data persistence
                becomes a cause for concern when reusing runners. Not only is it
                possible for attackers to access sensitive data left behind
                after a run, leaked runner tokens may compromise the VM instance
                itself to malicious actions.
              </p>
            </TextContentModal>
          </li>
          <li
            id="what-are-the-exact-criteria-for-reusing-a-runner"
            className="modal-item"
          >
            <TextContentModal title="What are the exact criteria for reusing a runner?">
              <p>
                It would be ideal for Harrier to only provision new VMs when a
                runner is requested. However, such a design makes it difficult
                to mimic another of GHA’s advantages where a runner request
                results in a near instantaneous provisioning of the default
                runner.
              </p>
              <br />
              <p>
                Given that Harrier’s design intent is to not only mimic the
                advantages of GHA, but also to accelerate workflows, the Harrier
                runner infrastructure management has been optimized to reuse
                runners when possible, which would result in faster workflow
                start times.
              </p>
              <br />
              <p>
                Due to the potential negative impacts of reusing runners,
                Harrier identified one scenario where the environment drift
                would have minimal consequences and the exposure for malicious
                attacks is minimized – a very specific use case of rapid
                development/debugging where the developer would be running CI
                builds constantly to test out iterative code changes. In this
                scenario, The runner would be used to execute the exact same job
                over and over, where any environment state changes from a
                previous run would have minimal impact on the workflow. In
                addition, the rapid back-to-back workflow runs would mean that
                the runner is only exposed for a brief moment, minimizing
                opportunities for attacks.{" "}
              </p>
            </TextContentModal>
          </li>
        </ul>
      </section>

      <section id="implementation-4">
        <SectionInView sectionId="implementation-4" onInView={handleInView} />
        <h2>{subheaderNames[4]}</h2>
        <p>
          Setting up the alternative runner infrastructure in the user's own AWS
          cloud environment enables the provisioning of Harrier's most critical
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
          available actions (e.g. Docker's build-push-action provides users with
          optional parameters that designate cache endpoints, enabling the
          caching of docker image layers).
        </p>
        <ImageContentModal
          src={S3BucketCacheStore}
          alt={"S3 bucket cache store"}
        />
        <ul className="space-x-4 p-0 text-center">
          <li id="why-s3-over-elasticache" className="modal-item">
            <TextContentModal title="Why S3 over ElastiCache?">
              <p>
                Harrier chose to use the Amazon S3 bucket over other options for
                its cost effectiveness and its scalability. Other storage
                options they were considered are: Amazon EFS: This is a fully
                managed file storage service that can be mounted to multiple EC2
                instances simultaneously. Even though the EFS is designed to be
                a sharable and scalable data storage, optimal for use as a
                persistent cache for an alternative GHA runner infrastructure,
                the performance boost is beyond Harrier’s needs and it comes at
                a higher cost than the S3. Amazon DynamoDB: This is a fully
                managed, NoSQL key-value and document database that serves as a
                great option for caching structured data with very low latency.
                Unfortunately, DynamoDB is not optimized for storing large
                objects, making it a sub-optimal choice as Harrier looks to
                extend the caching capabilities beyond installation dependencies
                and into build artifacts. Amazon ElastiCache: This is a fully
                managed caching service that is used for fast, in-memory caching
                of data. Even though cache speed is a design consideration for
                Harrier, the performance of ElastiCache is beyond the
                requirements for a GHA workflow cache. More importantly,
                ElastiCache is limited by memory size, making it impractical for
                large build artifacts.
              </p>

              <br />
              <p>
                The S3 bucket, as an object storage service that offers high
                availability and scalability for large volumes of unstructured
                data like build artifacts, serves as a better option than
                DynamoDB or ElastiCache for providing options to cache a broader
                set of data. And with a lower price point than the EFS, S3
                became the go-to option for Harrier.
              </p>
            </TextContentModal>
          </li>
          <li id="are-there-risks-from-mounting-the-s3" className="modal-item">
            <TextContentModal title="Are there any risks from mounting the S3?">
              <p>
                Harrier recognizes that there are risks with any data transfer
                configuration options. In mounting the S3 bucket as a file
                system to the EC2 runner instance, two primary challenges come
                in the form of data access and data exposure.{" "}
              </p>
              <br />
              <p>
                Given that the S3 bucket is used as the one and only central
                data store, the S3 houses data that go beyond what any one
                workflow may require. Without proper permissions, an EC2 runner
                may have access to data that it shouldn’t or the S3 may give
                unnecessary access to sensitive data. The narrowing of
                permissions is an implementation task that Harrier has taken
                quite seriously, and sees it as an on-going effort to maintain
                the strictest of data access policies over time.
              </p>
              <br />
              <p>
                Beyond data access, mounting the S3 onto an EC2 instance
                provisioned in a public subnet with direct internet access
                exposes sensitive data to potential attacks. Fortunately,
                Harrier’s ephemeral runners registered using Just-In-Time (JIT)
                tokens minimizes the data exposure risk.
              </p>
            </TextContentModal>
          </li>
        </ul>
        {/* <ul className="m-0 space-x-4 p-0 text-center">
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
        </ul> */}
      </section>
      {/*         <ul className="space-x-4 p-0 text-center">
          <li id="" className="modal-item">
            <TextContentModal title="">
              <p></p>
              <br />
              <p></p>
              <br />
              <p></p>
              <br />
              <p></p>
              <br />
              <p></p>
              <br />
              <p></p>
              <br />
              <p></p>
              <br />
            </TextContentModal>
          </li>
        </ul> */}
      <section id="implementation-5">
        <SectionInView sectionId="implementation-5" onInView={handleInView} />
        <h2>{subheaderNames[5]}</h2>
        <p>
          During the dependency installation step of a Node.js workflow, the npm
          package manager first inventories currently installed dependencies,
          thus bypassing the installation step for those dependencies. Next, npm
          inventories previously fetched installation files for the dependencies
          that need to be installed, thus bypassing the network fetch step.
          Harrier's out-of-the-box cache support focuses on short circuiting the
          installation step for maximum time savings. For Node.js projects, this
          is accomplished by caching the entire node_modules directory.
        </p>
        <p>
          During the first run of a project's workflow through the
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
          installation step. Unlike GHA's cache action, Harrier does not
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
          isn't a cache pertaining to this specific branch, Harrier will load a
          cached node_modules directory from another branch in order to speed up
          the dependencies installation step, ensuring that every workflow run
          of a repository after the first ever workflow can experience faster
          workflow automation through cache.
        </p>
        <ul className="space-x-4 p-0 text-center">
          <li id="why-only-cache-dependencies" className="modal-item">
            <TextContentModal title="Why only cache dependency files?">
              <p>
                With the provisioning of the persistent cache store, Harrier
                users now enjoy the possibility of caching data between builds
                and workflow runs to improve efficiency and speed by avoiding
                the need to re-fetch or re-compute expensive or time-consuming
                tasks. The data most commonly cached in a CI/CD workflow relate
                to dependencies that do not change frequently, but the following
                data, to name just a few, are also cacheable with Harrier’s
                cache storage: Build artifacts - If the build process involves
                compiling source code into binaries or other artifacts (e.g.,
                .tar, .jar, .apk, .exe), these artifacts can be cached to avoid
                recompiling them on every run. Package manager cache - Package
                managers often cache downloaded dependencies to prevent
                re-downloading packages that haven’t changed. These downloaded
                files can be cached to avoid unnecessary fetch operations.
                Docker layers - Docker builds an image by generating a Docker
                layer for each Docker command, with each layer contributing to
                the overall contents and configuration of the image. Layer
                caching drastically reduces build time and is recommended
                whenever possible. Static assets - In web development, caching
                build assets like JavaScript bundles, CSS files, images, etc.,
                can be a time saver, especially for frontend frameworks like
                React, Vue, or Angular.
              </p>
              <br />
              <p>
                The above data types are all computed or fetched with specific
                workflow steps, and unfortunately, there is no one-size-fits-all
                caching algorithm that can support the caching needs across the
                board. With the intent of delivering a proof of concept around
                the benefits of caching within GHA workflows, Harrier made the
                decision to focus on first caching the dependency files to make
                the alternative runner infrastructure provide value to a wider
                range of CI build workflows.
              </p>
            </TextContentModal>
          </li>
          <li id="why-use-tar" className="modal-item">
            <TextContentModal title="Why use TAR?">
              <p>
                Caching the node_modules directory is surprisingly challenging
                for three primary reasons.
              </p>
              <br />
              <p>
                First, the node_modules directory can contain a huge number of
                files even for relatively simple projects due not only to the
                primary dependencies, but also the sub-dependencies involved. A
                typical node_modules directory can contain tens of thousands of
                small files, making it difficult to efficiently cache the
                directory as is, necessitating some form of compression.
              </p>
              <br />
              <p>
                Second, the node_modules directory often has a deeply nested
                directory structure due to the way dependencies are resolved,
                with each sub-package within node_modules having its own
                dependencies. The more deeply nested the structure, the harder
                it is to compress, especially if file path lengths start to
                exceed operating system limits.
              </p>
              <br />
              <p>
                Lastly, many node_modules directories contain symlinks (symbolic
                links), which are special file types that point to another file
                or directory in other locations of the file system. If the
                symlinks are not handled properly during compression, the
                archive may store only the symlink itself (i.e., the pointer)
                instead of the actual files that the symlink refers to.
              </p>
              <br />
              <p>
                Initial research suggested using the command-line tool rsync to
                synchronize and transfer the node_modules directory during the
                caching process. However, testing revealed that using rsync as
                the caching tool took too much time, longer than the entire
                workflow runtime on a GHA default runner. After searching for an
                alternative tool, Harrier settled on using tar compression,
                which is capable of handling symlinks, special files, and
                directories, to cache the node_modules folder.
              </p>
            </TextContentModal>
          </li>
        </ul>
        {/* <h4 className="text-center">More Harrier Caching Information</h4>
        <ul className="m-0 space-x-4 p-0 text-center">
          <li
            id="github-actions"
            className="m-0 inline-block flex-shrink-0 rounded-full border-[0.1rem] border-gray-200 p-0 text-gray-600 hover:border-gray-300 hover:bg-harrierOFFWHITE/50 hover:text-harrierBLACK hover:shadow-sm"
          >
            <TextContentModal
              title='GitHub "Actions"'
              description='GitHub "Actions"'
            >
              <>
                <CgFileDocument size="28" className="text-harrierBLUE" />
                <span>GitHub "Actions"</span>
              </>
              <p>
                GitHub Actions allows users to use pre-written building blocks,
                which GitHub documentation somewhat confusingly refers to as
                "actions" in workflows. An action in this context is a
                pre-defined, reusable set of jobs or code that perform specific
                tasks within a workflow.<sup>24</sup>
              </p>
              <br />
              <p>
                Harrier uses three public actions published on the GitHub
                Marketplace, a central location, for availability and
                transparency:
              </p>
              <ul>
                <li>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;• harrier-cache-load
                </li>
                <li>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;• harrier-cache-store
                </li>
                <li>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;• harrier-runner-setup
                </li>
              </ul>
            </TextContentModal>
          </li>

          <li
            id="dependency-cache-loading-and-storing"
            className="m-0 inline-block flex-shrink-0 rounded-full border-[0.1rem] border-gray-200 p-0 text-gray-600 hover:border-gray-300 hover:bg-harrierOFFWHITE/50 hover:text-harrierBLACK hover:shadow-sm"
          >
            <TextContentModal
              title="Dependency Cache Loading and Storing"
              description="Dependency Cache Loading and Storing"
            >
              <>
                <CgFileDocument size="28" className="text-harrierBLUE" />
                <span>Dependency Cache Loading and Storing</span>
              </>
              <p>
                Harrier caching functionality is implemented through two public
                actions: cache-load and cache-store. These actions can be used
                as steps in any GitHub Actions workflow with access to the
                Marketplace.<sup>25</sup>
              </p>
              <br />
              <p>
                Together, harrier-cache-load and harrier-cache-store form a
                caching mechanism that minimizes redundant dependency
                installations and optimizes workflows. By supporting both
                branch-specific and repository-wide caches, the actions reduce
                build times while ensuring compatibility with changes to
                package.json.
              </p>
              <br />
              <img
                className="w-3/4 place-self-center bg-white"
                src={CacheByHarrier}
                alt="Cache Load Store Harrier"
              />
              <br />
              <p>
                The harrier-cache-load action restores a cached node_modules
                directory. It checks for a tarball—a compressed archive file
                (e.g., .tar.gz)—in the user's S3, using the current repository
                and branch in the filename. If a branch-specific tarball is
                found, it is copied and extracted into the workflow directory.
                If none exists, the action will fall back to a repository-wide
                tarball to reuse dependencies across branches. If no cache is
                available, the workflow proceeds with installing dependencies
                from scratch.
              </p>
              <br />
              <p>
                The harrier-cache-store action updates the cache after
                dependencies are installed. It first checks for a cache key in a
                metadata storage location for the current branch, then falls
                back to checking for a repository-wide key. No action is taken
                if a matching key exists and its hash matches the current
                package.json. Otherwise, the action creates a new tarball of the
                node_modules directory, stores it in the user's S3 and generates
                a new cache key. This ensures caches are updated for both
                branch-specific and repository-wide use.
              </p>
            </TextContentModal>
          </li>

          <li
            id="harrier-cache-eviction-policy"
            className="m-0 inline-block flex-shrink-0 rounded-full border-[0.1rem] border-gray-200 p-0 text-gray-600 hover:border-gray-300 hover:bg-harrierOFFWHITE/50 hover:text-harrierBLACK hover:shadow-sm"
          >
            <TextContentModal
              title="Harrier Cache Eviction Policy"
              description="Harrier Cache Eviction Policy"
            >
              <>
                <CgFileDocument size="28" className="text-harrierBLUE" />
                <span>Harrier Cache Eviction Policy</span>
              </>
              <p>
                To prevent the accumulation of unnecessary or stale data,
                Harrier includes an automated cache eviction mechanism. An
                EventBridge Scheduler and Lambda work together to manage the S3
                cache items. The scheduler is a cron job that triggers the
                Lambda once every day and can be configured by the user. The
                Lambda scans the S3 and deletes cache files not accessed in the
                past 72 hours by default, but this time can be adjust at setup.
                Each cached file's "last modified" timestamp is updated whenever
                the file is reused, ensuring only stale data is targeted for
                removal.
              </p>
            </TextContentModal>
          </li>

          <li
            id="docker-image-layer-caching"
            className="m-0 inline-block flex-shrink-0 rounded-full border-[0.1rem] border-gray-200 p-0 text-gray-600 hover:border-gray-300 hover:bg-harrierOFFWHITE/50 hover:text-harrierBLACK hover:shadow-sm"
          >
            <TextContentModal
              title="Optional - Docker Image Layer Caching"
              description="Optional - Docker Image Layer Caching"
            >
              <>
                <CgFileDocument size="28" className="text-harrierBLUE" />
                <span>Optional - Docker Image Layer Caching</span>
              </>
              <p>
                Many GitHub Actions workflows use Docker, a platform for
                packaging applications and their dependencies into containers.
                <sup>26</sup>
                Containers are created from images built in layers representing
                incremental changes. Caching these layers speeds up builds by
                reusing unchanged layers, so only modified ones are rebuilt,
                significantly improving efficiency.<sup>27</sup>
              </p>
              <br />
              <p>
                While Harrier's primary function is dependency caching, it also
                provides the secondary benefit of enabling Docker layer caching
                - a capability not available with GitHub-hosted runners. By
                setting up an S3 in the user's AWS infrastructure and mounting
                it as a directory on the self-hosted runner, Harrier allows
                BuildKit to pull and store Docker layers directly from the S3.
                This seamless integration, configured through cache-from and
                cache-to in the docker/build-push-action, speeds up Docker
                builds as a valuable additional feature of the Harrier setup.
              </p>
            </TextContentModal>
          </li>
        </ul> */}
      </section>

      <section id="implementation-6">
        <SectionInView sectionId="implementation-6" onInView={handleInView} />
        <h2>{subheaderNames[6]}</h2>
        <ImageContentModal
          src={ApiPlatformIntegration}
          alt={"API Platform Integration Webhook Event"}
        />
        <p>
          When using GitHub Action default runners, the integration steps
          necessary to transfer the code from the GitHub repository platform to
          the VM runner platform is abstracted away from users. However, when
          using self-hosted runners, it is no longer GitHub's responsibility to
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
          updates. This is accomplished by making a call to GitHub's REST API
          for creating webhooks and passing in two arguments:, the newly
          established AWS HTTP endpoint and the user's GitHub Personal Access
          Token that is used for authorization purposes (link to “click here for
          more” to read about how AWS secrets manager is used to protect user's
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
        <ul className="space-x-4 p-0 text-center">
          <li id="why-use-api-gateway?" className="modal-item">
            <TextContentModal title="Why use API Gateway?">
              <p>
                Harrier chose to use API Gateway instead of standing up a
                dedicated backend server because it offers a managed, secure,
                and scalable solution that minimizes the need for ongoing
                maintenance. The goal was to provide a "set it and forget it"
                configuration tool—one that is easy to set up, secure, and
                requires minimal manual intervention, allowing users to walk
                away knowing it will run smoothly without continued oversight.
              </p>
              <br />
              <p>
                By choosing API Gateway, Harrier gets a host of built-in
                security features like HTTPS encryption, protection from
                Distributed Denial of Service (DDoS) attacks, and authentication
                at minimal effort. On top of these benefits, API Gateway offers
                a pay-as-you-go pricing model, meaning users only pay for actual
                usage, making it cost-efficient for low-traffic workloads. In
                contrast, running an EC2 instance 24/7 incurs fixed costs
                regardless of actual usage, potentially leading to unnecessary
                expense to the user during periods of low activity.
              </p>
            </TextContentModal>
          </li>
          <li id="how-does-harrier-access-the-gh-pat" className="modal-item">
            <TextContentModal title="How does Harrier access the GH PAT?">
              <p>
                A GitHub Personal Access Token (PAT) is a secure, token-based
                authentication method used to access GitHub’s API or perform Git
                operations instead of using a password. The GitHub webhook
                necessary for integrating Harrier runners into the user’s GHA
                ecosystem can be created using GitHub’s API, and thus requires a
                PAT as an Authentication header in the HTTP request.
              </p>
              <br />
              <p>
                The PAT is an extremely sensitive user data that should only be
                made available using the appropriate security measures, such as
                storing the data in approved secrets managers and never
                hard-coding PATs directly into source code. To adhere to
                security best practices, Harrier asks users to generate their
                GitHub PAT, with the appropriately restricted scope and
                permissions, and copy it into their own AWS Secrets Manager.
                Once placed in the AWS Secrets Manager, the permission given to
                Harrier’s OIDC identity allows Harrier to describe the secret
                and use it to generate the necessary HTTP request for setting up
                a GitHub webhook, but Harrier will not be able directly access
                the PAT’s contents.
              </p>
            </TextContentModal>
          </li>
        </ul>
        {/* <h4 className="text-center">API Gateway for Receiving Webhooks</h4>
        <ul className="m-0 space-x-4 p-0 text-center">
          <li
            id="webhook-json-object"
            className="m-0 inline-block flex-shrink-0 rounded-full border-[0.1rem] border-gray-200 p-0 text-gray-600 hover:border-gray-300 hover:bg-harrierOFFWHITE/50 hover:text-harrierBLACK hover:shadow-sm"
          >
            <TextContentModal
              title="Webhook JSON Object"
              description="Webhook JSON Object"
            >
              <>
                <CgFileDocument size="28" className="text-harrierBLUE" />
                <span>Webhook JSON Object</span>
              </>
              <p>
                When a workflow runs on GitHub Actions, a webhook event is
                triggered to send data to the Harrier app hosted on the user's
                AWS environment. This webhook transmits information about the
                workflow run as a JSON object, which includes an "action"
                property specifying the event type, such as "queued" or
                "completed."
              </p>
              <img
                className="w-1/2 place-self-center"
                src={WebhookJSONExample}
                alt="Webhook JSON Object Example"
              />
            </TextContentModal>
          </li>
          <li
            id="api-gateway-for-receiving-webhook"
            className="m-0 inline-block flex-shrink-0 rounded-full border-[0.1rem] border-gray-200 p-0 text-gray-600 hover:border-gray-300 hover:bg-harrierOFFWHITE/50 hover:text-harrierBLACK hover:shadow-sm"
          >
            <TextContentModal
              title="API Gateway for Receiving Webhooks"
              description="API Gateway for Receiving Webhooks"
            >
              <>
                <CgFileDocument size="28" className="text-harrierBLUE" />
                <span>API Gateway for Receiving Webhook</span>
              </>
              <img
                className="w-1/2 place-self-center"
                src={QueuedNewRunner}
                alt="Queues New Runner"
              />
              <br />
              <p>
                We used AWS API Gateway to create and manage a simple REST API
                for receiving webhooks from GitHub Actions. REST APIs act as the
                "front door" for applications to access data, business logic, or
                functionality from backend services.<sup>22</sup> API Gateway
                handles all the tasks involved in accepting and processing API
                calls, including traffic management, authorization, and access
                control, monitoring, and API version management.
              </p>
              <br />
              <p>
                Together with AWS Lambda, API Gateway forms the app-facing part
                of the AWS serverless infrastructure. The AWS API Gateway
                receives the workflow data from the GitHub webhook and passes it
                to a Lambda setup by Harrier to manage EC2 instances.
              </p>
              <br />
              <img
                className="w-1/2 place-self-center"
                src={WebhookSetup}
                alt="Webhook Setup"
              />
              <br />
              <p>
                One alternative to using AWS API Gateway would have been to run
                a JavaScript Express server continuously on an EC2 instance to
                implement a REST API. A long-running server or process is
                unnecessary since AWS provides a fully managed API service that
                requires minimal setup or maintenance on our part. API Gateway
                is highly cost-effective since charges are based solely on the
                number of requests and the amount of data transferred. In our
                case, minimal data passes through the API Gateway — just event
                notifications from GitHub and a 200 response in return. All
                significant data transfers occur directly between GitHub and the
                EC2 instance, bypassing the API Gateway. Each workflow involves
                only three events, with negligible data exchange.
              </p>
            </TextContentModal>
          </li>
        </ul> */}
      </section>

      <section id="implementation-7">
        <SectionInView sectionId="implementation-7" onInView={handleInView} />
        <h2>{subheaderNames[7]}</h2>
        {/* <div className="h-[100px] overflow-hidden">
          <ImageContentModal
            src={MinimalWorkflowModification}
            alt={"minimal workflow modification"}
          />
        </div> */}
        <pre className="w-3/4 rounded border border-gray-300 bg-white p-4 font-mono text-sm text-gray-900">
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
          self-hosted runners, users have to simply change the{" "}
          <CodeBlock canCopy={false}>runs-on</CodeBlock> value in the YAML file
          of the workflow to <CodeBlock>self-hosted</CodeBlock> . Harrier uses
          the “self-hosted” label instead of a custom label such as
          “harrier-runner” to emphasize the fact that the entire alternative
          runner infrastructure is hosted and managed by the user.
        </p>
        <p>
          Harrier also provides a simple mechanism for using the out-of-the-box
          solution for caching dependencies through two public actions on the
          GitHub Actions Marketplace:{" "}
          <CodeBlock canCopy={false}>harrier-cache-load</CodeBlock> and{" "}
          <CodeBlock canCopy={false}>harrier-cache-store</CodeBlock>. Users have
          to simply drop in these one-line steps before and after the dependency
          installation step in their workflow in order to experience faster
          workflow build speeds.
        </p>
        {/* <ImageContentModal
          src={MinimalWorkflowModification}
          alt={"minimal workflow modification"}
        /> */}

        <ul className="space-x-4 p-0 text-center">
          <li id="what-is-a-gha-public-action" className="modal-item">
            <TextContentModal title="What is a GHA public action?">
              <p>
                A GHA public action is an open-source package of code available
                for GHA users to use, share, or contribute to that is accessible
                through the GitHub Marketplace.{" "}
              </p>
              <br />
              <p>
                Much of the appeal of public actions centers around how easy
                they are to integrate into existing workflows. For developers
                already using GitHub Actions, only minor workflow file tweaks
                are necessary to begin using the out-of-the-box Harrier caching
                solution, saving time and effort. Additionally, by leveraging
                the open-source ecosystem of GitHub Marketplace a public action
                ensures visibility, transparency, and easy adoption.
              </p>
              <br />
              <p>
                Without a public action, users would need to directly embed the
                contents of harrier-cache-load and harrier-cache-store into
                their workflow YAML file. While possible, this would clutter the
                workflow, adding unnecessary complexity and making it harder to
                maintain. By packaging Harrier as a public action, workflows
                stay clean and simple, allowing for easy integration and
                minimizing disruption to existing processes.
              </p>
            </TextContentModal>
          </li>
        </ul>
      </section>

      <section id="implementation-8">
        <SectionInView sectionId="implementation-8" onInView={handleInView} />
        <h2>{subheaderNames[8]}</h2>
        <ImageContentModal
          src={OverallArchitecture}
          alt={"Overall architecture"}
        />
        <p>
          Here is a diagram that outlines the overall system architecture
          created by the Harrier agent within the user's cloud account.
        </p>
        <br />

        <div className="scale-125 place-content-center">
          <ImageContentModal
            src={OverallArchitecture}
            alt={"Overall architecture"}
          />
        </div>
        <br />
        {/* <p className="text-center font-bold">
          Harrier uses three AWS Lambdas: the Workflow Lambda, the Timeout
          Lambda, and the Cache Eviction Lambda
        </p>
        <div className="place-self-center">
          <ImageContentModal src={ThreeLambdas} alt={"Three Lambdas"} />
        </div>

        <ul className="m-0 space-x-4 p-0 text-center">
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
                instances by maintaining JSON objects in the user's S3. When a
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
                workflow activity. The Lambda scans the user's S3 and deletes
                cache files that have not been accessed in the past 72 hours by
                default, however, this cache time-to-live can be adjusted during
                setup.
              </p>
            </TextContentModal>
          </li>
        </ul> */}
      </section>

      {/* <section id="implementation-10">
        <SectionInView sectionId="implementation-10" onInView={handleInView} />
        <h2>{subheaderNames[9]}</h2>
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
      </section> */}
      {/* <section id="implementation-11">
        <SectionInView sectionId="implementation-11" onInView={handleInView} />
        <h2>{subheaderNames[10]}</h2>
        <div className="flex w-full items-center justify-center border-2 md:w-1/2">
          <VSCodeChart />
        </div>

        <div className="flex w-full items-center justify-center border-2 md:w-1/2">
          <AxiosChart />
        </div>
      </section> */}
      {/* <section id="implementation-12">
        <SectionInView sectionId="implementation-12" onInView={handleInView} />
        <h2>{subheaderNames[11]}</h2>

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
      </section> */}
    </>
  );
};
