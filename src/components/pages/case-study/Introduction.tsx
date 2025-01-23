// import HarrierIntro from "@/assets/1.harrier-intro.png"
// import { ImageContentModal } from "@/components/ui/dialog";
export default function Introduction() {
  return (
    <>
      <p>
        Harrier is an open-source infrastructure deployment agent designed to
        accelerate automated workflow runtimes in GitHub Actions (GHA) through
        optimized caching mechanisms made possible by using GitHub’s very own
        self-hosted runner feature.
      </p>
      {/* <ImageContentModal src={ImageContentModal} alt="Harrier Intro/> */}
      <p>
        GHA default runners for workflows are ephemeral virtual machines (VMs)
        by design, ensuring that workflow artifacts are destroyed upon
        completion. This design, while providing users with important benefits
        of a clean runtime environment and secure data management, is not
        conducive for utilizing cache to re-use previously created data and
        reduce redundant work.
      </p>
      <p>
        There are many workarounds for accelerating workflow runtimes by
        providing a cache mechanism that sits outside of the GitHub ecosystem,
        with many of them taking advantage of GitHub’s self-hosted runner
        feature that allows any server to connect to GHA as an available runner.
        However, none of these are a one-size-fits-all solution as there are a
        series of tradeoffs that must be taken into consideration, such as the
        level of user engagement required for implementing and managing the
        solution, degree of risk related to data security, and the financial
        implication to name a few.
      </p>
      <p>
        Harrier is ideal for developers and teams who are not afraid of hosting
        their own cloud resources on a pay-as-you-go pricing plan but do not
        have the time nor the requisite knowledge to stand up a robust GHA
        runner infrastructure. As an open-source agent, Harrier provisions and
        configures the necessary cloud resources, integrates the cloud platform
        to GitHub and the GHA ecosystem, and provides an easy to use
        out-of-the-box dependency caching mechanism, all with just a few clicks
        from the user.
      </p>
    </>
  );
}
