import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { RiAddLine, Tooltip, RiDeleteBin5Line } from 'react-icons/ri';
import { BiCategory } from "react-icons/bi";

import './Expense.css';
import ExpenseForm from './ExpenseForm';
import Category from './Category';

class ExpensePage extends Component {
  state = {
    categories: [],
    expenseByCategory: {},
    expenseByDate: {},
    isLoading: true,
    isModalOpen: false,
    isCategoryOpen: false,
  };

  async componentDidMount() {
    try {
      const response = await fetch('api/expenses/categoryTotal', {method: 'GET',});
      if (!response.ok) {
                  throw new Error('Failed to get expenses by category');
                }
      const data = await response.json();
      this.setState({ expenseByCategory: data });
      console.log("fetched expenses by category");


      const dateResponse = await fetch('api/expenses/dateTotal', {method: 'GET',});
         if (!dateResponse.ok) {
                     throw new Error('Failed to get expenses by date');
                   }
         const dataByDate = await dateResponse.json();
         this.setState({ expenseByDate: dataByDate });
         console.log("fetched expenses by date");

      const categoriesResponse=await fetch('api/category');
      const categoriesData = await categoriesResponse.json();
      this.setState({categories : categoriesData , isLoading: false, newCategory: ''});

    } catch (error) {
      console.error('Error fetching expense data:', error);
    }
  }

    toggleModal = () => {
      this.setState(prevState => ({
        isModalOpen: !prevState.isModalOpen
      }));
    };

    toggleCategory = () => {
          this.setState(prevState => ({
            isCategoryOpen: !prevState.isCategoryOpen
          }));
        };

    handleDelete = async (expenseId) => {
      const confirmed = window.confirm('Are you sure you want to delete this expense?');
      console.log(expenseId);
      if (confirmed) {
        try {
          const response = await fetch(`/api/expenses/${expenseId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Cache-Control': 'no-cache',
            },
          });

          if (!response.ok) {
            throw new Error('Failed to delete expense');
          }

          window.location.reload();

          console.log('Expense deleted:', expenseId);
        } catch (error) {
          console.error('Error deleting expense:', error);
        }
      }
    };


  render() {
    const { expenseByCategory, expenseByDate, isLoading, isModalOpen, categories, isCategoryOpen} = this.state;

    if (isLoading) {
      return <div>Loading...</div>;
    }

    const categoryLabels = Object.keys(expenseByCategory);
    const categoryExpenses = Object.values(expenseByCategory);

    const data = {
      labels: categoryLabels,
      datasets: [
        {
          data: categoryExpenses,
          backgroundColor: [
            '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#32CD32',
              '#FF69B4',
              '#8A2BE2',
              '#00FFFF'
          ],
        },
      ],
    };



    const sortedExpenses = Object.entries(expenseByDate).sort(([dateA], [dateB]) => new Date(dateB) - new Date(dateA));


    return (
    <div>
    <div>
      <div className="doughnut-chart">
        <Doughnut
          data={data}
        />
      </div>

       <button className="add-button" onClick={this.toggleModal}>
                 <RiAddLine size={30} color="#ffffff" />
               </button>

              <Modal isOpen={isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Add Expense</ModalHeader>
                <ModalBody>
                  <ExpenseForm categories={categories} addExpense={this.addExpense}/>
                </ModalBody>
              </Modal>

       <button className="category-button" onClick={this.toggleCategory}>
                        <BiCategory size={30} color="#ffffff" />
                      </button>

                     <Modal isOpen={isCategoryOpen} toggle={this.toggleCategory}>
                       <ModalHeader toggle={this.toggleCategory}>Categories</ModalHeader>
                       <ModalBody>
                         <Category/>
                       </ModalBody>
                     </Modal>
     </div>
      <br/>
            <div className="table-container">
                    <table className="expense-table">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Category</th>
                          <th>Item</th>
                          <th>Amount</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {sortedExpenses.map(([date, expenses]) => (
                          <React.Fragment key={date}>
                            <tr className="date-row">
                              <td colSpan="3">{date}</td>
                            </tr>
                            {expenses.map((expense, index) => {
                              const [id, item, amount, category] = expense;
                              return (
                                <tr key={id}>
                                  <td></td>
                                  <td>{category}</td>
                                  <td>{item}</td>
                                  <td>${amount}</td>
                                  <td><Button color='#ffffff' onClick={() => this.handleDelete(id)}>
                                            <RiDeleteBin5Line className="delete-icon" />
                                          </Button></td>
                                </tr>
                              );
                            })}
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  </div>
    );

  }
}

export default ExpensePage;
