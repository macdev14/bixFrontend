import React, {useEffect, useState} from "react";
import {
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Stack,
  Text,
  Flex,
  Icon,
  Badge
} from "@chakra-ui/react";

import { FaChevronUp, FaChevronDown } from "react-icons/fa";

import { PageContainer, PageContent, Nav, Footer, Card } from "../Layout";

import "./Dashboard.scss";
import { useApi } from "../../hooks/useApi";
import IUser from "../../../types";

export default function Dashboard() {
  const { get } = useApi();
  const [ users, setUsers ] = useState<IUser[]>();

  useEffect(()=>{
    const getUsers = async () => {
      if (!users) {
          try {
              const resp = await get("employees/");
              setUsers(resp);
          } catch (error) {
              console.error('Erro ao obter tipos de veículos:', error);
          }
      }
  };
  getUsers();
  },[]);
  
  console.log(users);
  return (
    <PageContainer isFixedNav>
      <Nav />
      <PageContent
        title="Dashboard"
       
      >
        <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={10}>
          
         
          {  users && users.map((user:any, i:any)=>{
            return <Card
            title={user.username}
          >
           {user.username}
          </Card>
          } )}
        
        </SimpleGrid>
      </PageContent>
      <Footer />
    </PageContainer>
  );
}
