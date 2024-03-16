import React from "react";

import { PageContainer, PageContent, Nav, Footer, Table } from "../Layout";

import './style.scss'
export default function Companies() {
  let headers = [
    {
      id: "id",
      title: "ID",
    },
    {
      id: "name",
      title: "Name",
    },
    {
      id: "cnpj",
      title: "cnpj",
    },
  
  ];

  return (
    <PageContainer isFixedNav>
      <Nav />
      <PageContent
        title="Companies"
        // primaryAction={{
        //   content: "Add Company",
        //   onClick: () => {
        //     alert("ok");
        //   },
        // }}
      >
       { <Table source="company" headers={headers}  />}
      </PageContent>
      <Footer />
    </PageContainer>
  );
}
