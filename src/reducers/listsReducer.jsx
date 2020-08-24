import { CONSTANTS } from "../actions";

let listID = 1;
let cardID = 1;

const initialState = [
  {
    title: "Mis Tareas",
    id: `list-${0}`,
    cards: [
      {
        id: `card-${0}`,
        text: "Estudiar Programación",
      },
    ],
  },
];

const listsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.ADD_LIST: {
      const newList = {
        title: action.payload,
        cards: [],
        id: `list-${listID}`,
      };
      listID += 1;
      return [...state, newList];
    }

    case CONSTANTS.ADD_CARD: {
      const newCard = {
        id: `card-${cardID}`,
        text: action.payload.text,
      };
      cardID += 1;

      const newState = state.map((list) => {
        if (list.id === action.payload.listID) {
          return {
            ...list,
            cards: [...list.cards, newCard],
          };
        } else {
          return list;
        }
      });
      return newState;
    }

    case CONSTANTS.DELETE_CARD: {
      const { idCard, listID } = action.payload;
      //Buscamos la lista a editar
      const list = state.find((x) => x.id === listID);
      //Buscamos la Card a reemplazar
      list.cards.forEach((x, index) => {
        if (list.cards[index].id === idCard) {
          list.cards.splice(index, 1);
        }
      });
      return [...state];
    }

    case CONSTANTS.EDIT_CARD: {
      const { idCard, listID, newText } = action.payload;
      //Buscamos la lista a editar
      const list = state.find((x) => x.id === listID);
      //Creamos una nueva Card
      const newCard = {
        text: newText,
        id: idCard,
      };
      //Buscamos la Card a reemplazar
      list.cards.forEach((x, index) => {
        if (list.cards[index].id === idCard) {
          list.cards.splice(index, 1, newCard);
        }
      });

      return [...state];
    }

    case CONSTANTS.DELETE_LIST: {
      const { state } = action.state;
      return state;
    }

    case CONSTANTS.DRAG_HAPPENED: {
      const {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexStart,
        droppableIndexEnd,
        type,
      } = action.payload;
      const newState = [...state];

      //Dragging List alrededor
      if (type === "list") {
        const list = newState.splice(droppableIndexStart, 1);
        newState.splice(droppableIndexEnd, 0, ...list);
        return newState;
      }

      //Drag and Drop en la misma lista
      if (droppableIdStart === droppableIdEnd) {
        const list = state.find((list) => droppableIdStart === list.id);
        const card = list.cards.splice(droppableIndexStart, 1);
        console.log(list);
        console.log(card);
        list.cards.splice(droppableIndexEnd, 0, ...card);
        console.log(list.cards.splice(droppableIndexEnd, 0, ...card));
      }

      //Drag and Drop en otras listas
      if (droppableIdStart !== droppableIdEnd) {
        //Encuentra la lista donde hace drag inicio
        const listStart = state.find((list) => droppableIdStart === list.id);
        // pone la otra card en la lista
        const card = listStart.cards.splice(droppableIndexStart, 1);
        //Encuentra la lista donde hace drag final
        const listEnd = state.find((list) => droppableIdEnd === list.id);
        // pone la otra card en la nueva lista
        listEnd.cards.splice(droppableIndexEnd, 0, ...card);
      }

      return newState;
    }
    default:
      return state;
  }
};
export default listsReducer;
