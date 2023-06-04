import React, { Component } from 'react';
import { Button, Input } from 'reactstrap';
import './Category.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { RiAddLine, Tooltip, RiDeleteBin5Line } from 'react-icons/ri';



class Category extends Component {

    state = {
        isLoading : true,
        Categories : [],
        newCategory: '',
        showDeleteIcons: false,
    }

    async componentDidMount(){
        const response=await fetch('api/category');
        const body = await response.json();
        this.setState({Categories : body , isLoading: false, newCategory: ''});

    }

    handleAddCategory = async () => {
        const { newCategory, categories } = this.state;
        if (newCategory == '') {
           console.log("no input");
           alert("Please enter a new category!")
           return
        }
        try {
          const response = await fetch('api/category', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Cache-Control': 'no-cache',
            },
            body: JSON.stringify({ name: newCategory }),

          });

          if (!response.ok) {
            throw new Error('Failed to add category');
          }

          const updatedCategory = await response.json();

          this.setState(prevState => ({
            Categories: [...prevState.Categories, updatedCategory],
            newCategory: '',
          }));

          console.log('New category added:', this.state.Categories);
        } catch (error) {
          console.error('Error adding category:', error);
        }
    };

    handleDeleteCategory = async categoryId => {
        const confirm = window.confirm("Deleting this category will also delete all expenses in this category. Are you sure you want to proceed?")
        if (confirm) {
        try {
          const response = await fetch(`api/category/${categoryId}`, {
            method: 'DELETE',
          });

          if (!response.ok) {
            throw new Error('Failed to delete category');
          }

          // Remove the deleted category from the state
          this.setState(prevState => ({
            Categories: prevState.Categories.filter(Category => Category.id !== categoryId),
            showDeleteIcons: !prevState.showDeleteIcons,
          }));

          console.log('Category deleted:', categoryId);
        } catch (error) {
          console.error('Error deleting category:', error);
        }
      };
      };


      handleInputChange = e => {
        this.setState({ newCategory: e.target.value });
      };



    render() {
        const {Categories , isLoading, newCategory, showDeleteIcons}= this.state;
        if(isLoading)
            return (<div>Loading...</div>);
        let categoriesList;

          categoriesList = Categories.map(category => (
            <div key={category.id} className="category-item">
                <div>{category.name}</div>

                <div><Button color='#ffffff' onClick={() => this.handleDeleteCategory(category.id)}>
                                                            <RiDeleteBin5Line className="delete-icon" />
                                                          </Button></div>

              </div>));
        return (
                <div className="sidebar">
                  <ul className="category-list">
                          {categoriesList}
                        </ul>
                  <div className="input-container">
                    <Input
                      type="text"
                      value={newCategory}
                      onChange={this.handleInputChange}
                      placeholder="Enter new category"
                      onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                this.handleAddCategory();
                              }
                            }}
                    />
                    <div className="enter-icon" onClick={this.handleAddCategory}>
                          <RiAddLine size={30} color="#ffffff" />
                        </div>
                  </div>

                  </div>

         );
    }
}

export default Category;