import React, {  useEffect, useState } from "react";

import { PageContainer, PageContent, Nav, Footer, Table } from "../Layout";

import './style.scss';

export default function Employees() {
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
      id: "cpf",
      title: "CPF",
    },
    {
      id: "company_name",
      title: "Company",
    },

    // {
    //   id: "company",
    //   title: "Company",
    // },
  ];

  

  // const reloader = async ()=>{
  //   
  //   setItems(users);
  // }


 



  return (
    <PageContainer isFixedNav>
      <Nav />
      <PageContent
        title="Employees"
        
      >
       {  <Table headers={headers} />}
      </PageContent>
      <Footer />
    </PageContainer>
  );
}
