import React from 'react';
import CustomerForm from '../Components/Form/CustomerForm';
import CustomerList from '../Components/CustomerList/CustomerList';

function HomePage() {

  return (
    <div style={{ color: 'red' }}>

      {/* Nunito, Lato, Montserrat, Open Sans*/}
      
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CustomerList />
      </div>

      {/* <h3> Add Customer</h3>
      <CustomerForm /> */}

    </div>
  );
}

export default HomePage;