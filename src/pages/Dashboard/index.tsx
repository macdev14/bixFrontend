import React from "react"
import { Chrono } from "react-chrono";
import { PageContainer, Nav, PageContent } from "../Layout";

const Dashboard = () => {
  const items = [{
    title: "1940",
    cardTitle: "Dunkirk",
    url: "http://www.history.com",
    cardSubtitle:"Men of the British Expeditionary Force (BEF) wade out to..",
    cardDetailedText: "Men of the British Expeditionary Force (BEF) wade out to..",
    media: {
      type: "IMAGE",
      source: {
        url: "http://someurl/image.jpg"
      }
    }
  }];

  return (
    <PageContainer isFixedNav>
    <Nav />
    <PageContent
      title="Timeline"
      // primaryAction={{
      //   content: "Add Company",
      //   onClick: () => {
      //     alert("ok");
      //   },
      // }}
    >
    <div style={{ width: '700px', height: '950px' }}>
  <Chrono disableInteraction items={items} mode="VERTICAL" />
</div>

</PageContent>
</PageContainer>
  )
}
export default Dashboard