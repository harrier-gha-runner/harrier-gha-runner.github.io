/* main.tsx */
import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { PageNavigationProvider } from "@/providers/PageNavigation";
import { SetupStepsProvider } from "@/providers/SetupSteps";
import { TeamProvider } from "@/providers/Team";


import { TryHarrierPage } from "./components/pages/TryHarrierPage";
import { TeamPage } from "./components/pages/TeamPage";
import { Layout } from "./components/utility/Layout";
import { LandingPage } from "./components/pages/LandingPage";
import { NotFoundPage } from "./components/pages/NotFoundPage";
import { CaseStudyHomePage } from "./components/pages/CaseStudyHomePage";
import { Introduction } from "./components/pages/case-study/Introduction";
import { ProblemDomain } from "./components/pages/case-study/ProblemDomain";
import { Design } from "./components/pages/case-study/Design";
import { Implementation } from "./components/pages/case-study/Implementation";
import { FutureWork } from "./components/pages/case-study/FutureWork";
import "./index.css";

const basename = "/";

createRoot(document.getElementById("app")!).render(
  <StrictMode>
    <PageNavigationProvider>
      <TeamProvider>
        <RouterProvider
          router={createHashRouter(
            [
              {
                path: "/",
                element: <Layout />,
                errorElement: <NotFoundPage />, // TODO: Add improved error page
                children: [
                  {
                    index: true,
                    element: <LandingPage />,
                  },
                  {
                    path: "case-study",
                    element: <CaseStudyHomePage />,
                    errorElement: <NotFoundPage />,
                    children: [
                      {
                        path: "problem-domain",
                        element: <ProblemDomain />,
                      },
                      {
                        path: "design",
                        element: <Design />,
                      },
                      {
                        path: "implementation",
                        element: <Implementation />,
                      },
                      {
                        path: "future-work",
                        element: <FutureWork />,
                      },
                      {
                        path: "introduction",
                        element: <Introduction />,
                      },
                      {
                        path: "*",
                        element: <NotFoundPage />,
                      },
                    ],
                  },
                  {
                    path: "team",
                    element: <TeamPage />,
                  },
                  {
                    path: "try-harrier",
                    element: (
                      <SetupStepsProvider>
                        <Suspense fallback={<div>Loading...</div>}>
                          <TryHarrierPage />
                        </Suspense>
                      </SetupStepsProvider>
                    ),
                  },
                  {
                    path: "*",
                    element: <NotFoundPage />,
                  },
                ],
              },
            ],
            { basename },
          )}
        />
      </TeamProvider>
    </PageNavigationProvider>
  </StrictMode>,
);
