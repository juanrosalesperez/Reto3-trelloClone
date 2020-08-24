import React from "react";
import TrelloCard from "./TrelloCard";
import TrelloActionButton from "./TrelloActionButton";
import { Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import Icon from "@material-ui/core/Icon";
import { deleteList } from "../actions";

const ListContainer = styled.div`
  background-color: #f77f00;
  color: #003e49;
  border-radius: 3px;
  width: 300;
  height: 100%;
  padding: 8px;
  margin-right: 8px;
`;
const DeleteButton = styled(Icon)`
  cursor: pointer;
  color: #003e49;
  transition: opacity 0.3s ease-in-out;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
`;
const TitleContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const TrelloList = ({ title, cards, listID, index, state }) => {
  const handleDeleteList = () => {
    console.log(listID);
    console.log(state);
    deleteList(listID, state, index);
  };
  return (
    <Draggable draggableId={String(listID)} index={index}>
      {(provided) => (
        <ListContainer
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
        >
          <Droppable droppableId={String(listID)}>
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <TitleContainer>
                  <h2>{title}</h2>
                  <DeleteButton onClick={handleDeleteList}>delete</DeleteButton>
                </TitleContainer>
                {cards.map((card, index) => (
                  <TrelloCard
                    key={card.id}
                    text={card.text}
                    id={card.id}
                    index={index}
                    listID={listID}
                  />
                ))}
                <TrelloActionButton listID={listID} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </ListContainer>
      )}
    </Draggable>
  );
};

export default TrelloList;
