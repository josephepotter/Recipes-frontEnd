import React, { Component } from 'react';
import '../CSS/recipes.css';
import $ from 'jquery';
import Cookies from 'universal-cookie';
import Modal from './Modal';
import { apiEndpoint } from '../constants.js';

const cookies = new Cookies();

class MyRecipes extends Component {
  constructor(props) {
   super(props);
   this.state = {
     recipes:[],
     hasData:false,
     columns:5
   };
  }

  getRecipes(){
    let url = `${apiEndpoint}/recipes/user/${cookies.get('userToken')}`
    $.ajax({
      url,
      type: 'Get',
      contentType: 'application/json',
      success: (d) => {
        this.setState({
          recipes:d,
          hasData:true
        });
      }
    });
  }

  componentWillMount() {
    if (!cookies.get("userToken")){
      window.location = '/login';
    } else{
      const resize = () => {
        let size;
        if(window.innerWidth < 512){
          size = 1
        } else if(window.innerWidth < 768){
          size = 2
        } else if(window.innerWidth < 1024){
          size = 3;
        } else if(window.innerWidth < 1280){
          size = 4;
        } else {
          size = 5;
        }
        this.setState({columns:size})
      }
      resize();
      //https://developer.mozilla.org/en-US/docs/Web/Events/resize
      window.onresize = resize;

    }
  }
  deleteRecipe(id){
    this.closeModal();
    let url = `${apiEndpoint}/recipes/id/${id.$oid}/${cookies.get('userToken')}`
    $.ajax({
      url,
      type: 'Delete',
      contentType: 'application/json',
      success: (d) => {
        this.getRecipes();
      }
    });
  }
  viewRecipe(recipe){
    this.setState({modalRecipe:recipe, modalType:"view"})
  }
  closeModal(){
    this.setState({modalRecipe:undefined,modalType:undefined})
  }
  deleteInitial(recipe){
    this.setState({modalRecipe:recipe, modalType:"delete"})
  }
  render() {
    if (!this.state.hasData){
        this.getRecipes();
    }
    let recipeColumns = [];
    for(let i = 0; i< this.state.columns; i++){
      let recipes = [];
      this.state.recipes.forEach((recipe,key)=>{
        if((key) % this.state.columns === i){
          let ingredients = []
          recipe.ingredients.forEach((ingredient, key) => {
            ingredients.push(<div className="ingredient" key={key}>{ingredient.amount + " " + ingredient.title}</div>);
          })
          let image = <span></span>
          if (recipe.image){
            image = <img className="recipe-image" src={recipe.image} />
          }
          recipes.push(
            <div className="recipe" key={key}>
              <div className="recipe-inner">
                <div className="main-recipe-body">
                  <h2 className="recipe-header">{recipe.title}</h2>
                  {image}
                  {ingredients}
                  <p className="noMargin">{recipe.directions}</p>
                </div>
                <div className="center">
                  <span className="button red" onClick={() => this.deleteInitial(recipe)}>Delete</span>
                  <a className="button blue" href={"/create?id=" + recipe._id.$oid}>Edit</a>
                  <span className="button blue" onClick={() => this.viewRecipe(recipe)}>View</span>
                </div>
              </div>
            </div>
          );
        }
      });
      recipeColumns.push(
        <div key={i} className="column">{recipes}</div>
      )
    }
    let modal;
    if (this.state.modalRecipe){
      modal = <Modal  deleteRecipe={() => this.deleteRecipe(this.state.modalRecipe._id)} recipe={this.state.modalRecipe} type={this.state.modalType} closeModal={this.closeModal.bind(this)}/>
    }
    return (
      <div className="full">
        <h1>My Recipes</h1>
        <div className="recipes-container">
          {recipeColumns}
        </div>
        {modal}
      </div>
    );
  }
}

export default MyRecipes;
