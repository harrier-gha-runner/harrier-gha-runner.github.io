const TryHarrierPage = () => {
  return (
    <>
      <h2 className="text-center text-3xl font-bold">Get Started</h2>
      <section id="try-harrier-1">1</section>
      <section id="try-harrier-2">2</section>
      <section id="try-harrier-3">3</section>
      <section id="try-harrier-4">4</section>
      {/* 
        sections:
        1. Setup AWS OIDC role => grab OIDC role arn(?) to provide to Harrier, With appropriate permissions
        2. Get Github Organization PAT
           Generate PAT w/ correct scoping and permissions => place PAT into AWS secrets manager
        3. Choose self-hosted runner infra config
            Bare minimum of description for each config variable necessary
        4. Click generate YAML and download
            Upload to repo and run workflow


        desired ui features:
         1. screenshot carousel for each step (where necessary)
         2. form validation for each user setting options dropdown
         3. download/copy yaml code button
      */}
    </>
  );
};

export default TryHarrierPage;
