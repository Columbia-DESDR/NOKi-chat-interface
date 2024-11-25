import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LeftLogoPane, Logos, PageWrapper, RightFormPane } from "./styles";
import iriLogo from "../../assests/IRI_logo.jpg";
import columbiaLogo from "../../assests/columbia_logo.png";
import { Button } from "../../common/styles";

const HomePage = () => {
  const navigate = useNavigate();

  const startNewChat = () => {
    navigate("/chat"); // Navigate to the chat page or initiate a new chat
  };

  return (
    <PageWrapper>
      <LeftLogoPane>
        <span>DESDR NOKi</span>
        <span>SURVEY YOUR WAY</span>
        <Logos>
          <img src={iriLogo} alt="IRI Logo" />
          <img src={columbiaLogo} alt="Columbia University Logo" />
        </Logos>
      </LeftLogoPane>
      <RightFormPane>
        <Button onClick={startNewChat}>New Chat</Button>
      </RightFormPane>
    </PageWrapper>
  );
};

export default HomePage;
