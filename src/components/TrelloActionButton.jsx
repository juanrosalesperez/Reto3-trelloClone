import React from "react";
import Icon from "@material-ui/core/Icon";
import TextArea from "react-textarea-autosize";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { addList, addCard } from "../actions";

class TrelloActionButton extends React.Component {
  state = {
    formOpen: false,
  };

  // Abre y cierra formulario
  openForm = () => {
    this.setState({
      formOpen: true,
      text: "",
    });
  };

  closeForm = (e) => {
    this.setState({
      formOpen: false,
    });
  };

  // Cambia el Input a recolector de valor
  handleInputChange = (e) => {
    this.setState({
      text: e.target.value,
    });
  };

  handleAddList = () => {
    const { dispatch } = this.props;
    const { text } = this.state;
    if (text) {
      this.setState({
        text: "",
      });
      dispatch(addList(text));
    }
    return;
  };

  handleAddCard = () => {
    const { dispatch, listID } = this.props;
    const { text } = this.state;
    if (text) {
      dispatch(addCard(listID, text));
    }
    return;
  };

  //Añade Boton
  renderAddButton = () => {
    const { list } = this.props;
    const buttonText = list ? "Add another list" : "Add another card";
    const buttonTextOpacity = list ? 1 : 0.5;
    const buttonTextColor = list ? "white" : "inherit";
    const buttonTextBackground = list ? "rgb(0,0,0,.15)" : "inherit";
    return (
      <div
        onClick={this.openForm}
        style={{
          ...styles.openFormButtonGroup,
          opacity: buttonTextOpacity,
          color: buttonTextColor,
          backgroundColor: buttonTextBackground,
        }}
      >
        <Icon>add</Icon>
        <p>{buttonText}</p>
      </div>
    );
  };

  // Añade Formulario para nueva Card o List
  renderForm = () => {
    const { list } = this.props;
    const placeholder = list
      ? "Introduzce el titulo de la lista..."
      : "Añade un titulo para esta tarjeta...";
    const buttonTitle = list ? "Añade otra Lista" : "Añade otra tarjeta";
    return (
      <div>
        <Card
          style={{
            minHeight: 80,
            minWidht: 272,
            padding: "6px 8px 2px",
          }}
        >
          <TextArea
            placeholder={placeholder}
            autoFocus
            onBlur={this.closeForm}
            value={this.state.text}
            onChange={this.handleInputChange}
            style={{
              resize: "none",
              widht: "100%",
              overflow: "hidden",
              outline: "none",
              border: "none",
            }}
          />
        </Card>
        <div style={styles.formButtonGroup}>
          <Button
            onMouseDown={list ? this.handleAddList : this.handleAddCard}
            variant="contained"
            style={{ color: "white", backgroundColor: "#d62828" }}
          >
            {buttonTitle}{" "}
          </Button>
          <Icon style={{ marginLeft: 8, cursor: "pointer" }}>close</Icon>
        </div>
      </div>
    );
  };

  render() {
    return this.state.formOpen ? this.renderForm() : this.renderAddButton();
  }
}

const styles = {
  openFormButtonGroup: {
    display: "flex",
    color: "#003e49",
    alignItems: "center",
    cursor: "pointer",
    borderRadius: 3,
    height: 36,
    width: 272,
    paddingLeft: 10,
  },
  formButtonGroup: {
    marginTop: 8,
    display: "flex",
    alignItems: "center",
  },
  boton: {
    backgroundColor: "rgb(164, 24, 24)",
  },
};

export default connect()(TrelloActionButton);
