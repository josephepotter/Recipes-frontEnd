import React, { Component } from 'react';

class Modal extends Component {
  constructor(props) {
   super(props);
  }

  render() {
    let recipe;
    if (this.props.type === "view"){
      let ingredients = []
      this.props.recipe.ingredients.forEach((ingredient, key) => {
        ingredients.push(<div className="ingredient" key={key}>{ingredient.amount + " " + ingredient.title}</div>);
      })
      let image = <span></span>
      if (this.props.recipe.image){
        image = <img className="recipe-image-modal" src={this.props.recipe.image} />
      }
      recipe = (
        <div className="recipe-inner">
          <h2 className="recipe-header">{this.props.recipe.title}</h2>
          {image}
          {ingredients}
          <p className="noMargin">{this.props.recipe.directions}</p>
        </div>
      );
    } else if(this.props.type==="delete"){

      recipe =(
      <div className="recipe-inner">
        <h2 className="recipe-header">Are you sure you would like to delete {this.props.recipe.title}?</h2>
        <div className="center">
          <span className="button red" onClick={this.props.deleteRecipe}>Delete</span>
          <span className="button blue" onClick={this.props.closeModal}>Nevermind</span>
        </div>
      </div>
    )
    }


    return (
      <div className="modal-outer">
        <div className="modal">
          <div className="modal-content">
            {recipe}
          </div>
          <span className="close" onClick={this.props.closeModal}><i className="material-icons">close</i></span>
        </div>
      </div>
    );
  }
}

export default Modal;
