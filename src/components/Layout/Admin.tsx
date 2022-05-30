import DashboardPage from "features/dashboard";
import PostFeature from "features/posts";
import UserFeature from "features/users";
import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import { Navbar, SideBar } from "../Common";

export function AdminLayout() {
  const [open, setOpen] = useState(false);
  const toggleSidebar = () => {
    setOpen(!open);
  };
  return (
    <div className={open ? "d-flex toggled" : "d-flex"} id="wrapper">
      <SideBar />
      <div id="page-content-wrapper">
        <Navbar toggleSidebar={toggleSidebar} />
        <Switch>
          <Route path="/admin/dashboard" >
            <DashboardPage />
          </Route>
          <Route path="/admin/users" >
            <UserFeature />
          </Route>
          <Route path="/admin/posts" >
            <PostFeature />
          </Route>
        </Switch>
      </div>
    </div>
  );
}
