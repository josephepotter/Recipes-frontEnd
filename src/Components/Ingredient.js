import React, { Component } from 'react';
import '../CSS/form.css';



class Ingredient extends Component {
  render() {
    return (
      <span>
        <div className="holder">
          <p className="title title-lg ingredient-title">Ingredient</p>
          <span className="delete"><span onClick={this.props.deleteIngredient}><i className="material-icons nav-icon">remove_circle</i> Delete Ingredient</span></span>
        </div>
        <div className="holder">
          <p className="title">Name:</p>
          <input name={this.props.ingredient.id} value={this.props.ingredient.title} onChange={this.props.ingredientChange} id={this.props.ingredient.id+"title"} className="input"></input>
        </div>
        <div className="holder">
          <p className="title">Amount:</p>
          <input onChange={this.props.amountChange} value={this.props.ingredient.amount} name={this.props.ingredient.id} className="input"></input>
        </div>
      </span>

    );
  }
}

export default Ingredient;
