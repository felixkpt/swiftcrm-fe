import React, { useState } from "react";
import AutoTabs from "@/components/AutoTabs";
import Roles from "./Tabs/Roles";
import Permissions from "./Tabs/Permissions";
import Routes from "./Tabs/Routes";

export default function Index(): JSX.Element {
  // Define an array of Tab objects
  const tabs = [
    {
      name: "Roles",
      link: "roles",
      content: <Roles />,
    },
    {
      name: "Permissions",
      link: "permissions",
      content: <Permissions />,
    },
     {
      name: "Routes",
      link: "routes",
      content: <Routes />,
    },
  ];

  return (
    <div className="mb-3">
      <AutoTabs tabs={tabs} active="roles" />
    </div>
  );
}
