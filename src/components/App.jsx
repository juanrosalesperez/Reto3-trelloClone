import React, { Component } from "react";
import TrelloList from "./TrelloList";
import { connect } from "react-redux";
import TrelloActionButton from "./TrelloActionButton";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { sort } from "../actions";
import styled from "styled-components";
/* import { logo } from "./../img/trello_logo"; */

const ListContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
const Header = styled.div`
  background-color: #f77f00;
  padding: 1%;
  opacity: 0.5;
  width: 100%;
  heigth: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Titulo = styled.h1`
  color: #003e49;
`;
const styles = {
  margen: {
    margin: 8,
  },
};

class App extends Component {
  onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }
    this.props.dispatch(
      sort(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId,
        type
      )
    );
  };

  render() {
    const { lists } = this.props;
    const logo = require("./../img/trello_logo.png");

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Header>
          <img src={logo} width="90" height="30" />
        </Header>
        <div style={styles.margen} className="App">
          <Titulo>Trello Juan Rosales</Titulo>
          <Droppable droppableId="all-lists" direction="horizontal" type="list">
            {(provided) => (
              <ListContainer
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {lists.map((list, index, state) => (
                  <TrelloList
                    listID={list.id}
                    key={list.id}
                    title={list.title}
                    cards={list.cards}
                    index={index}
                    state={state}
                  />
                ))}
                <TrelloActionButton list />
              </ListContainer>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    );
  }
}

const mapStateToProps = (state) => ({
  lists: state.lists,
});

export default connect(mapStateToProps)(App);
