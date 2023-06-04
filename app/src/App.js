import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Category from './Category';
import Expense from './Expense';
import AppNav from './AppNav'

class App extends Component {
    state = {  }
    render() {
        return (
            <div>
              <AppNav />
              <Routes>
                <Route path="/" element={<Expense />} />
                <Route path="/category" element={<Category />} />
                <Route path="/expense" element={<Expense />} />
              </Routes>
            </div>
          );

    }

}

export default App;