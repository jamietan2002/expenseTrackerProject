import React, { Component } from 'react';
import { Button, FormGroup, Label, Input } from 'reactstrap';


class ExpenseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: '',
      amount: '',
      category: '',
      date: new Date().toISOString().split('T')[0],
    };
  }

    handleChange = (e) => {
      const { name, value } = e.target;

      if (name === 'category') {
        const selectedCategory = this.props.categories.find(category => category.name === value);
        console.log(selectedCategory);

        this.setState({ category: selectedCategory });
      } else {
        this.setState({ [name]: value });

      }
    };


  handleSubmit = async (e) => {
    e.preventDefault();

    const {item, amount, category, date} = this.state;
    console.log(amount);
    console.log(category);
    console.log(date);
    if (!item || !amount || !category || !date) {
       console.log("no input");
       alert("Please fill in required fields!")
       return
    }


    const formattedExpense = {
      item: item,
      amount: parseFloat(amount),
      category: {
        id: parseInt(category.id),
        name: category.name,
      },
      date: date,
    };

      console.log('Request Body:', JSON.stringify(formattedExpense));
      try {
      const response = await fetch('api/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
        },
        body: JSON.stringify(formattedExpense),
      });


      if (!response.ok) {
        throw new Error('Failed to add expense');
      }

      console.log('New expense added:', this.state.item);
    } catch (error) {
      console.error('Error adding expense:', error);
    }
    this.setState({
      item: '',
      amount: '',
      category: '',
      date: new Date().toISOString().split('T')[0],
    });
    window.location.reload();
  };


  render() {
    const { item, amount, category, date } = this.state;
    const { categories } = this.props;

    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="item" className="form-label">Item:</Label>
            <Input
              type="text"
              id="item"
              name="item"
              value={item}
              onChange={this.handleChange}
              className="form-input"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="amount" className="form-label">Amount:</Label>
            <Input
              type="number"
              id="amount"
              name="amount"
              value={amount}
              onChange={this.handleChange}
              className="form-input"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="category" className="form-label">Category:</Label>
            <Input
              type="select"
              id="category"
              name="category"
              value={category.name}
              onChange={this.handleChange}
              className="form-input"
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="date" className="form-label">Date:</Label>
            <Input
              type="date"
              id="date"
              name="date"
              value={date}
              onChange={this.handleChange}
              className="form-input"
              required
            />
          </FormGroup>
          <Button type="submit" className="submit-button">Submit</Button>
        </form>
      </div>
    );
  }
}

export default ExpenseForm;







//  render() {
//    const { item, amount, category, date } = this.state;
//    const { categories } = this.props;
//    return (
//      <div>
//        <h2>Expense Form</h2>
//        <form onSubmit={this.handleSubmit}>
//          <div>
//            <label htmlFor="item">Item:</label>
//            <input
//              type="text"
//              id="item"
//              name="item"
//              value={item}
//              onChange={this.handleChange}
//              required
//            />
//          </div>
//          <div>
//            <label htmlFor="amount">Amount:</label>
//            <input
//              type="number"
//              id="amount"
//              name="amount"
//              value={amount}
//              onChange={this.handleChange}
//              required
//            />
//          </div>
//
//                    <div>
//                                <label htmlFor="category">Category:</label>
//                                <select
//                                  id="category"
//                                  name="category"
//                                  value={category.name}
//                                  onChange={this.handleChange}
//                                  required
//                                >
//                                  <option value="">Select a category</option>
//                                  {categories.map((category) => (
//                                    <option key={category.id} value={category.name}>
//                                      {category.name}
//                                    </option>
//                                  ))}
//                                </select>
//                              </div>
//
//          <div>
//            <label htmlFor="date">Date:</label>
//            <input
//              type="date"
//              id="date"
//              name="date"
//              value={date}
//              onChange={this.handleChange}
//              required
//            />
//          </div>
//          <button type="submit">Submit</button>
//        </form>
//      </div>
//    );
//  }
//}
//
//export default ExpenseForm;
