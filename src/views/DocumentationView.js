import React, {useEffect} from "react";
import styled from "styled-components";

import DocumentComponent from "../components/documentation/DocumentComponent";

//import Loading from "../components/generic/Loading";
import Button from "../components/generic/Button";
import Panel from "../components/generic/Panel";
import DisplayTime from "../components/generic/DisplayTime";
import DisplayRounds from "../components/generic/DisplayRounds";

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Title = styled.div`
  font-size: 2rem;
`;

/**
 * You can document your components by using the DocumentComponent component
 */
const Documentation = () => {
  useEffect(() => {
    document.title = 'Susana T. - Assignment 2 - Documentation';
  },[])

  return (
    <Container>
      <div>
        <Title>Documentation</Title>
        <DocumentComponent
          title="Button "
          component={<Button className='btn-active' text='Start' />}
          propDocs={[
            {
              prop: "className",
              description: "If 'btn-disabled' grey it out remove pointer cursor.",
              type: "string",
              possibleValues: "btn-active | btn-disabled",
              defaultValue: "btn-active",
            },
            {
              prop: "text",
              description: "Updates the image path based on the text value passed in.",
              type: "string",
              possibleValues:"Start | Pause | End | Reset",
              defaultValue: "Start",
            }
          ]}
        />
        <DocumentComponent
          title="Panel "
          component={<Panel className="myDivClass"><p>content here</p></Panel>}
          propDocs={[
            {
              prop: "className",
              description: "Gives the wrapping div element a class name",
              type: "string",
              possibleValues: "",
              defaultValue: "",
            },
            {
              prop: "",
              description: "Places your JSX and components inside a div element",
              type: "string",
              possibleValues: "",
              defaultValue: "",
            }
          ]}
        />

        <DocumentComponent
          title="DisplayTime"
          component={<DisplayTime time="09:10"/>}
          propDocs={[
            {
              prop: "time",
              description: "Outputs `Time: xx:xx`",
              type: "string",
              possibleValues: "",
              defaultValue: "",
            }
          ]}
        />

        <DocumentComponent
          title="DisplayRounds"
          component={<DisplayRounds rounds="3"/>}
          propDocs={[
            {
              prop: "rounds",
              description: "Outputs `Ronds: x`",
              type: "string",
              possibleValues: "",
              defaultValue: "",
            }
          ]}
        />
      </div>
    </Container>
  );
};

export default Documentation;
