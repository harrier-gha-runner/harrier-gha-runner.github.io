import { SiAwslambda } from "react-icons/si";
import { CgFileDocument } from "react-icons/cg";
import { AiOutlineBlock } from "react-icons/ai";
import { useContext } from "react";
import { PageNavigationContext } from "@/providers/PageNavigation";

import { TextContentModal, ImageContentModal } from "@/components/ui/dialog";
import { useInView } from "react-intersection-observer";

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
import QueuedNewRunner from "@/assets/4.1.6.queued-new-runner.png";

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

  const handleInView = (id: string) => {
    const subheaderIndex = subheaderIds.indexOf(id);
    if (subheaderIndex !== -1) {
      setActiveSubheader(subheaderIndex);
    }
  };

  return (
    <>
      <section id="implementation-1">
        <SectionInView sectionId="implementation-1" onInView={handleInView} />
        <h2>Implementation 1</h2>
        <div className="">
          <div className="">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
              malesuada dui non augue aliquet, vel iaculis arcu pharetra. Nullam
              tristique tortor eu sapien convallis, et euismod ligula iaculis.
            </p>
            <p>
              Curabitur vehicula erat at ante fermentum, in condimentum nisi
              condimentum. Sed viverra nisl sit amet nibh sodales, eget
              facilisis lorem feugiat. Donec vel eros ut urna faucibus maximus.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
              voluptatibus modi quam amet repudiandae quos molestias
              reprehenderit optio itaque ullam quisquam vitae totam aut
              laboriosam, saepe est corrupti voluptatem sunt.
            </p>
          </div>
          <ImageContentModal
            src={IsolatedVPC}
            alt={"Isolated VPC in user's AWS account"}
          />
        </div>
      </section>

      <section id="implementation-2">
        <SectionInView sectionId="implementation-2" onInView={handleInView} />

        <h2>Implementation 2</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          vehicula, arcu ut facilisis vehicula, urna felis vehicula purus, eget
          varius odio risus vel lorem. Vestibulum ante ipsum primis in faucibus
          orci luctus et ultrices posuere cubilia curae; Nulla facilisi.
        </p>
        <p>
          Vivamus sollicitudin orci eu est gravida, at iaculis risus
          condimentum. Etiam aliquam dui vel augue dapibus, vel aliquam ligula
          convallis. Morbi euismod odio nec orci feugiat, vel vehicula ligula
          volutpat.
        </p>
        <ImageContentModal
          src={FleetOfEC2Runners}
          alt={"Fleet of EC2 runners"}
        />
      </section>

      <section id="implementation-3">
        <SectionInView sectionId="implementation-3" onInView={handleInView} />
        <h2>Implementation 3</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed fringilla
          augue sit amet ipsum blandit, a mollis purus elementum. In condimentum
          sapien vitae magna vehicula, sit amet lacinia ipsum tristique.
        </p>
        <p>
          Donec vel ligula ante. Fusce quis nisl ac turpis feugiat eleifend sit
          amet sit amet velit. Integer vestibulum, elit in fringilla faucibus,
          eros arcu vulputate urna, eget sollicitudin libero mi vel ante.
        </p>
        <ImageContentModal
          src={JustInTimeTokenRegistration}
          alt={"Just-in-time token registration of runner"}
        />
        <ul className="m-0 flex flex-row justify-start space-x-4 p-0">
          <li
            id="private-versus-public-subnets"
            className="m-0 inline-block flex-shrink-0 rounded-full border-[0.1rem] border-gray-200 p-0 text-gray-600 hover:border-gray-300 hover:bg-harrierOFFWHITE/50 hover:text-harrierBLACK hover:shadow-sm"
          >
            <TextContentModal
              title="Private Versus Public Subnets"
              description="description"
            >
              <>
                <CgFileDocument size="28" className="text-harrierBLUE" />
                <span>Public Versus Private Subnets</span>
              </>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam
              non ipsa, asperiores eligendi repellendus, assumenda rem
              distinctio iure esse reprehenderit sit temporibus eos perspiciatis
              beatae fugit totam tempora. Sit, aliquam.
            </TextContentModal>
          </li>
          <li
            id="eni-for-lambdas"
            className="m-0 inline-block flex-shrink-0 rounded-full border-[0.1rem] border-gray-200 p-0 text-gray-600 hover:border-gray-300 hover:bg-harrierOFFWHITE/50 hover:text-harrierBLACK hover:shadow-sm"
          >
            <TextContentModal title="ENI for Lambdas" description="description">
              <>
                <SiAwslambda size="28" className="text-harrierPINK" />
                <span>ENI for Lambdas</span>
              </>
              CONTENT
            </TextContentModal>
          </li>
          <li
            id="cidr-blocks"
            className="border-lg m-0 inline-block flex-shrink-0 rounded-full bg-harrierBLACK p-0 text-white"
          >
            <TextContentModal title="CIDR Blocks" description="description">
              <>
                <AiOutlineBlock size="28" className="text-harrierYELLOW" />
                <span>CIDR Blocks</span>
              </>
              CONTENT
            </TextContentModal>
          </li>
        </ul>
      </section>

      <section id="implementation-4">
        <SectionInView sectionId="implementation-4" onInView={handleInView} />
        <h2>Implementation 4</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          scelerisque nibh in sem efficitur, id bibendum ligula sodales. Donec
          vitae ante sapien. Sed in tortor at lectus dapibus malesuada.
        </p>
        <p>
          Aliquam erat volutpat. Nullam vel velit urna. Nunc hendrerit massa at
          risus aliquam, vel malesuada orci dictum. Ut tincidunt ipsum non nulla
          varius, sit amet maximus lorem vulputate.
        </p>
        <ImageContentModal
          src={TerminationOfEC2Runners}
          alt={"Termination of EC2 runners"}
        />
      </section>

      <section id="implementation-5">
        <SectionInView sectionId="implementation-5" onInView={handleInView} />
        <h2>Implementation 5</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          faucibus ligula orci, vel malesuada purus sollicitudin eu. Mauris
          dapibus, libero non convallis porttitor, augue libero vulputate odio,
          in luctus metus lectus id lorem.
        </p>
        <p>
          Etiam ac lorem ac nunc feugiat gravida. Suspendisse potenti. Vivamus
          vel ante massa. Phasellus sollicitudin magna sed dui vestibulum
          vehicula.
        </p>
        <ImageContentModal
          src={S3BucketCacheStore}
          alt={"S3 bucket cache store"}
        />
      </section>

      <section id="implementation-6">
        <SectionInView sectionId="implementation-6" onInView={handleInView} />
        <h2>Implementation 6</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
          facilisi. Aenean fringilla interdum nunc, et interdum nisi feugiat
          nec. Sed fringilla urna quis lorem varius, ac auctor lorem laoreet.
        </p>
        <p>
          Fusce interdum ligula sit amet volutpat consequat. Integer at augue ac
          justo posuere gravida. Aliquam feugiat odio et felis elementum, sed
          hendrerit ipsum elementum. Nulla sed tempus sem, vel feugiat justo.
        </p>
        <ImageContentModal src={CacheByHarrier} alt={"Cache by Harrier"} />
      </section>

      <section id="implementation-7">
        <SectionInView sectionId="implementation-7" onInView={handleInView} />
        <h2>Implementation 7</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          nec tortor id ligula accumsan auctor at eu nisl. Phasellus tempor,
          erat et facilisis aliquet, sapien orci gravida ipsum, eu interdum
          lorem augue ac nisi.
        </p>
        <p>
          Nullam scelerisque nibh ut augue sollicitudin, non placerat neque
          suscipit. Nam eget lacus in metus ullamcorper interdum. Morbi
          pellentesque ante sit amet risus malesuada, ac faucibus ante varius.
        </p>
        <ImageContentModal src={HighLevelArchitecture} alt={"high-level"} />
      </section>

      <section id="implementation-8">
        <SectionInView sectionId="implementation-8" onInView={handleInView} />
        <h2>Implementation 8</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed bibendum
          nunc eget leo pharetra, non lobortis sem auctor. Nam ultricies est vel
          sapien convallis vehicula. Ut vulputate, odio sit amet viverra
          ullamcorper, purus lacus feugiat leo, vel convallis sapien odio eget
          orci.
        </p>
        <p>
          Aliquam nec nisl non mi luctus tincidunt. Sed sollicitudin eros vel
          sapien aliquet, et gravida lorem auctor. Nam et lectus a turpis
          sollicitudin tempor.
        </p>
        <ImageContentModal
          src={MinimalWorkflowModification}
          alt={"minimal workflow modification"}
        />
      </section>

      <section id="implementation-9">
        <SectionInView sectionId="implementation-9" onInView={handleInView} />
        <h2>Implementation 9</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tempus
          eros ac quam tempor, ut varius erat gravida. Aliquam eget tortor at
          nisi vulputate convallis. In hac habitasse platea dictumst.
          Pellentesque auctor libero in est malesuada, at congue lorem
          efficitur.
        </p>
        <p>
          Nulla facilisi. Cras feugiat, enim sit amet vehicula efficitur, turpis
          est sodales ligula, eget venenatis ipsum sapien vel libero. Mauris
          posuere arcu in justo suscipit suscipit.
        </p>
        <ImageContentModal
          src={OverallArchitecture}
          alt={"Overall architecture"}
        />
      </section>

      <section id="implementation-10">
        <SectionInView sectionId="implementation-10" onInView={handleInView} />
        <h2>Implementation 10</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
          gravida est non risus facilisis, ac convallis nulla condimentum. Nulla
          vel vulputate ex. Vivamus aliquam ligula ut felis vulputate, non
          dictum ligula pretium.
        </p>
        <p>
          Vestibulum malesuada lorem ut sapien ultricies, id placerat elit
          malesuada. Sed pharetra orci in nibh posuere, at lobortis magna
          vehicula. Aliquam erat volutpat. Curabitur tristique, ligula sed
          vehicula egestas, lorem urna gravida nunc, ut viverra ligula felis
          eget erat.
        </p>
        <ImageContentModal
          src={QueuedNewRunner}
          alt={"Termination of EC2 runners"}
        />
      </section>
    </>
  );
};
export default Implementation;
