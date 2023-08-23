import React, { useState } from "react";
import AutoTabs from "@/components/AutoTabs";
import Roles from "./Roles/Roles";
import Permissions from "./Permissions/Permissions";
import Routes from "./Roles/Role/Routes";

export default function Index(): JSX.Element {

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
