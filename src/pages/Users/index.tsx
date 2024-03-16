import React from "react";

import { PageContainer, PageContent, Nav, Footer, Table } from "../Layout";

import './style.scss';
export default function Users() {
  let headers = [
    {
      id: "id",
      title: "ID",
    },
    {
      id: "username",
      title: "Name",
    },
    {
      id: "email",
      title: "Email",
    },
    {
      id: "date_joined",
      title: "Date registered",
    },
  ];

  return (
    <PageContainer isFixedNav>
      <Nav />
      <PageContent
        title="Users"
      >
       {  <Table selectable source={'users'} selected={[2, 3]} headers={headers} />}
      </PageContent>
      <Footer />
    </PageContainer>
  );
}
