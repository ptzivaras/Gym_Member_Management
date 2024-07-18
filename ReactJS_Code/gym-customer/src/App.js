// import './App.css';
// // import Login from './Pages/Login';

// import NavBar from './Components/NavBar/NavBar';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import HomePage from './Pages/HomePage';
// import AboutPage from './Pages/AboutPage';
// import TrainerPage from './Pages/TrainerPage';
// import ClassesPage from './Pages/ClassesPage';
// import PricePage from './Pages/PricePage';

// import ViewCustomer from './Components/ViewCustomer/ViewCustomer';
// import UpdateCustomer from './Components/UpdateCustomer/UpdateCustomer';
// import DeleteCustomer from './Components/DeleteCustomer/DeleteCustomer';
// import CustomerCreate from './Components/CreateCustomer/CustomerCreate';
// import TrainerCreate from './Components/CreateTrainer/TrainerCreate';
// import CreateClassType from './Components/CreateClassType/CreateClassType';

// function App() {
//   return (
//     <div className="app-container">
//       {/* <Login></Login> */}
//       <BrowserRouter>
//         <main>
//           <NavBar />
//           <Routes>
//             <Route path="/" element={<HomePage />} />
//             <Route path="/about" element={<AboutPage />} /> 
//             <Route path="/trainers" element={<TrainerPage />} />
//             <Route path="/classes" element={<ClassesPage />} />
//             <Route path="/price" element={<PricePage />} />

//             <Route path="/view-customer/:customerId" element={<ViewCustomer />} />
//             <Route path="/edit-customer/:customerId" element={<UpdateCustomer />} /> {/* Add route for editing */}
//             <Route path="/delete-customer/:customerId" element={<DeleteCustomer />} /> {/* Add route for deleting */}
//             <Route path="/create-customer/" element={<CustomerCreate/>} />
//             <Route path="/create-trainer/" element={<TrainerCreate/>} />
//             <Route path="/classtype/" element={<CreateClassType/>} />
//           </Routes>
//         </main>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;
import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Pages/Login';
import NavBar from './Components/NavBar/NavBar';
import HomePage from './Pages/HomePage';
import AboutPage from './Pages/AboutPage';
import TrainerPage from './Pages/TrainerPage';
import ClassesPage from './Pages/ClassesPage';
import PricePage from './Pages/PricePage';
import ViewCustomer from './Components/ViewCustomer/ViewCustomer';
import UpdateCustomer from './Components/UpdateCustomer/UpdateCustomer';
import DeleteCustomer from './Components/DeleteCustomer/DeleteCustomer';
import CustomerCreate from './Components/CreateCustomer/CustomerCreate';
import TrainerCreate from './Components/CreateTrainer/TrainerCreate';
import CreateClassType from './Components/CreateClassType/CreateClassType';

const App = () => {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<ProtectedRoutes />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

const ProtectedRoutes = () => {
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
  
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <main>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/trainers" element={<TrainerPage />} />
        <Route path="/classes" element={<ClassesPage />} />
        <Route path="/price" element={<PricePage />} />
        <Route path="/view-customer/:customerId" element={<ViewCustomer />} />
        <Route path="/edit-customer/:customerId" element={<UpdateCustomer />} /> {/* Add route for editing */}
        <Route path="/delete-customer/:customerId" element={<DeleteCustomer />} /> {/* Add route for deleting */}
        <Route path="/create-customer/" element={<CustomerCreate />} />
        <Route path="/create-trainer/" element={<TrainerCreate />} />
        <Route path="/classtype/" element={<CreateClassType />} />
      </Routes>
    </main>
  );
};

export default App;
