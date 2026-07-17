import { useState } from "react";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import BottomNavigation
from "../layout/BottomNavigation";
import DashboardScrollButton from "../common/DashboardScrollButton";
export default function DashboardLayout({

  children,
  title,
  subtitle,

}) {

  const [
    sidebarOpen,
    setSidebarOpen
  ] = useState(false);

  const [
    collapsed,
    setCollapsed
  ] = useState(false);

  return (

    <div
      className="
      flex
      h-screen
      overflow-hidden
      bg-slate-100
      "
    >

      {/* SIDEBAR */}

      <Sidebar

        sidebarOpen={
          sidebarOpen
        }

        setSidebarOpen={
          setSidebarOpen
        }

        collapsed={
          collapsed
        }

      />

      {/* MAIN */}

      <div
        className="
        flex
        flex-col
        flex-1
        min-w-0
        h-screen
        "
      >

        {/* FIXED NAVBAR */}

        <Navbar

          sidebarOpen={
            sidebarOpen
          }

          setSidebarOpen={
            setSidebarOpen
          }

          collapsed={
            collapsed
          }

          setCollapsed={
            setCollapsed
          }

          title={title}
          subtitle={subtitle}

        />

        {/* SCROLLABLE AREA */}

       <div
  id="dashboard-scroll"
  className="
    flex-1
    overflow-y-auto
    overflow-x-hidden
    scroll-smooth
  "
>

          <main
            className="
            px-6
            py-8
            "
          >

            {(title || subtitle) && (

              <div className="mb-8">

                {title && (

                  <h1
                    className="
                    text-3xl
                    font-bold
                    text-slate-900
                    "
                  >

                    {title}

                  </h1>

                )}

                {subtitle && (

                  <p
                    className="
                    mt-2
                    text-slate-500
                    "
                  >

                    {subtitle}

                  </p>

                )}

              </div>

            )}

            <div className="space-y-6">

              {children}

            </div>

          </main>

          <BottomNavigation />

          

          {/* FOOTER SCROLLS WITH CONTENT */}

          <Footer />

          

        </div>
        <DashboardScrollButton />

      </div>

    </div>

  );

}