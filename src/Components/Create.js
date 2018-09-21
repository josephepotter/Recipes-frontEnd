import React, { Component } from 'react';
import Ingredient from './Ingredient';
import $ from 'jquery';
import '../CSS/form.css';
import Cookies from 'universal-cookie';
import ImageTools from '../Helpers/ImageTools'
import { apiEndpoint } from '../constants.js'
const cookies = new Cookies();

class Create extends Component {

  constructor(props) {
   super(props);
   this.state = {
     ingredientCount:1,
     title:"Create New Recipe",
     recipe:{
       user: cookies.get('userToken'),
       title:"",
       directions:"",
       image: undefined,
       ingredients:[
         {
           id: 1,
           title: "",
           amount:""
         }
       ]
     }
   };
  }

  componentWillMount() {
    if (!cookies.get("userToken")){
      window.location = '/login';
    } else {
      //https://stackoverflow.com/questions/979975/how-to-get-the-value-from-the-get-parameters?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
      let url = new URL(window.location.href);
      let id = url.searchParams.get("id");
      if(id){
        this.setState({title:"Edit Recipe"})
        let APIurl = `${apiEndpoint}/recipes/id/${id}/${cookies.get('userToken')}`
        $.ajax({
          url: APIurl,
          type: 'Get',
          contentType: 'application/json',
          success: (d) => {
            d.user = cookies.get("userToken");
            let max = 1;
            d.ingredients.forEach(ingredient =>{
              if (ingredient.id > max){
                max = ingredient.id;
              }
            })
            this.setState({ingredientCount:max});
            this.setState({recipe:d});
          }
        });
      }
    }
  }

  submit(){
    if(this.state.recipe.image && this.state.recipe.image.length > 2000000){
      this.setState({error: "File too large for upload."})
    } else if(this.state.ext &&
      this.state.ext !== "png" && this.state.ext !== "PNG" &&
      this.state.ext !== "jpg" && this.state.ext !== "JPG" &&
      this.state.ext !== "jpeg" && this.state.ext !== "JPEG") {
      this.setState({error: "Invalid image. Please Use jpg, jpeg, or png."})
    } else{
      let type = "POST"
      let newurl = new URL(window.location.href);
      let id = newurl.searchParams.get("id");
      if(id){
        type = "PUT";
      }
      let url = `${apiEndpoint}/recipes/`
      let data = JSON.stringify({
        recipe:JSON.stringify(this.state.recipe)
      });
      $.ajax({
        url,
        type,
        contentType: 'application/json',
        data,
        success: function(d){
          window.location = '/myrecipes'
        }
      });
    }

  }

  //https://stackoverflow.com/questions/23427384/get-form-data-in-reactjs?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
  handleTitleChange(e) {
    let recipe = this.state.recipe;
    recipe.title = e.target.value
    this.setState({recipe:recipe});
  }

  handleDirectionsChange(e) {
    let recipe = this.state.recipe;
    recipe.directions = e.target.value
    this.setState({recipe:recipe});
  }

  handleIngredientChange(e) {
    let name = e.target.name;
    let recipe = this.state.recipe;
    recipe.ingredients.forEach((item, index) =>{
      if(item.id.toString() === name){
        recipe.ingredients[index].title = e.target.value
      }
    });
    this.setState({recipe:recipe});
  }


  handleImageChange(e) {
    //http://jsfiddle.net/eliseosoto/JHQnk/
    //https://stackoverflow.com/questions/2434458/image-resizing-client-side-with-javascript-before-upload-to-the-server?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
    //https://stackoverflow.com/questions/190852/how-can-i-get-file-extensions-with-javascript
    //https://stackoverflow.com/questions/18650168/convert-blob-to-base64?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
    let files = e.target.files;
    let file = files[0];
    if (files && file) {
        let ext = e.target.files[0].name.split('.').pop();
        ImageTools.resize(file, {
          width: 300, // maximum width
          height: 300 // maximum height
        }, (blob, didItResize) => {
           var reader = new FileReader();
           reader.readAsDataURL(blob);
           reader.onloadend = () =>{
               let imageString = reader.result;
               let recipe = this.state.recipe;
               recipe.image = imageString;
               this.setState({recipe:recipe, ext:ext})
           }
        });

    }

  }

  handleAmountChange(e) {
    let name = e.target.name;
    let recipe = this.state.recipe;
    recipe.ingredients.forEach((item, index) =>{
      if(item.id.toString() === name){
        recipe.ingredients[index].amount = e.target.value
      }
    });
    this.setState({recipe:recipe});
  }

  addIngredient(){
    let recipe = this.state.recipe;
    recipe.ingredients.push({
      id:(this.state.ingredientCount + 1),
      title:"",
      amount:""
    });
    this.setState({recipe:recipe, ingredientCount: this.state.ingredientCount+1});
  }

  deleteIngredient(id){
    let ingredients = this.state.recipe.ingredients;
    let newIngredients = [];
    ingredients.forEach((ingredient) => {
      if(!(ingredient.id === id)){
        newIngredients.push(ingredient);
      }
    });
    let recipe = this.state.recipe;
    recipe.ingredients = newIngredients;
    this.setState({recipe:recipe});
  }
  //https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file
  render() {
    let image = <span></span>
    if (this.state.recipe.image){
      image = <span className="image-holder"><img  className="image"  src={this.state.recipe.image} /></span>
    }
    const ingredients = []
    this.state.recipe.ingredients.forEach((ingredient,key)=>{
      ingredients.push(<Ingredient ingredient={ingredient} deleteIngredient={() => this.deleteIngredient(ingredient.id)} amountChange={this.handleAmountChange.bind(this)} ingredientChange={this.handleIngredientChange.bind(this)} key={key} />)
    })
    return (
      <div className="form-container">
        <h1>{this.state.title}</h1>
        <p className="error-message">{this.state.error}</p>
        <div className="holder">
          <p className="title">Recipe Title:</p>
          <input value={this.state.recipe.title} onChange={this.handleTitleChange.bind(this)} id="title" className="input"></input>
        </div>
        <div className="holder">
          <p className="title">Image:</p>
          <input type="file" id="image-file"  onChange={this.handleImageChange.bind(this)} className="image-input"></input>
        </div>
        {image}
        {ingredients}
        <div className="holder">
          <span className="form-right" ><span onClick={this.addIngredient.bind(this)}><i className="material-icons nav-icon">add_circle</i> Add Ingredient</span></span>
        </div>
        <div className="holder">
          <p id="instructions" className="title">Instructions:</p>
          <textarea value={this.state.recipe.directions} onChange={this.handleDirectionsChange.bind(this)} className="input input-area"></textarea>
        </div>
        <div className="holder">
          <span className="form-right" ><span onClick={this.submit.bind(this)} className="button blue margin">Submit</span></span>
        </div>

      </div>

    );
  }
}

export default Create;
