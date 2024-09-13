import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; // Replace Redirect with Navigate
import "bootstrap/dist/css/bootstrap.min.css";
import { QueryClient, QueryClientProvider } from "react-query";
import SignUp from "./Components/SignUp/Signup";
import Login from "./Components/SignIn/Login";
import Dashboard from "./Components/Dashboard/Dashboard";
import { AuthProvider }  from "./Components/Context/AuthContext";

import AdminLogin from "../src/Admin/Components/Login/Login";
import AdminDashboard from "../src/Admin/Components/Dashboard/Dashboard";
import Sidebar from "../src/Admin/Components/Sidebar/Sidebar";

import ForgotPassword from "./Components/SignIn/ForgotPassword";
// import VerifyOTP from './Components/SignIn/VerifyOTP';
import Website from "./Components/Website/website"
import User from "../src/Admin/Components/User/User";
import ManageUsers from "../src/Admin/Components/ManageUsers/ManageUsers"
import Score from "../src/Admin/Components/Scores/Scores";
import LeaderBoard from "./Components/Cohort/LeaderBoard";
import Vocabulary from "./Components/Website/Vocabulary"
import Comprehension from "./Components/Website/Comprehension";
import FillInTheBlank from "./Components/Website/FillInTheBlanks";
import Jumblewords from "./Components/Website/JumbledWords";
import Spelling from "./Components/Website/Spelling";

import Website2 from "./Components/Website2/website"
import Vocabulary2 from "./Components/Website2/Vocabulary"
import Comprehension2 from "./Components/Website2/Comprehension";
import FillInTheBlank2 from "./Components/Website2/FillInTheBlanks";
import Jumblewords2 from "./Components/Website2/JumbledWords";
import Spelling2 from "./Components/Website2/Spelling";


import Website3 from "./Components/Website3/website"
import Vocabulary3 from "./Components/Website3/Vocabulary"
import Comprehension3 from "./Components/Website3/Comprehension";
import FillInTheBlank3 from "./Components/Website3/FillInTheBlanks";
import Jumblewords3 from "./Components/Website3/JumbledWords";
import Spelling3 from "./Components/Website3/Spelling";



import Website4 from "./Components/Website4/website"
import Vocabulary4 from "./Components/Website4/Vocabulary"
import Comprehension4 from "./Components/Website4/Comprehension";
import FillInTheBlank4 from "./Components/Website4/FillInTheBlanks";
import Jumblewords4 from "./Components/Website4/JumbledWords";
import Spelling4 from "./Components/Website4/Spelling";



import Website5 from "./Components/Website5/website"
import Vocabulary5 from "./Components/Website5/Vocabulary"
import Comprehension5 from "./Components/Website5/Comprehension";
import FillInTheBlank5 from "./Components/Website5/FillInTheBlanks";
import Jumblewords5 from "./Components/Website5/JumbledWords";
import Spelling5 from "./Components/Website5/Spelling";
import Activity from "./Admin/Components/Activity/Activity";



const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>

<AuthProvider>
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/user" element={<User />} />
        <Route path="/manageUsers" element={<ManageUsers />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/website" element={<Website />} />
        <Route path="/Comprehension" element={<Comprehension />} />
        <Route path="/Vocabulary" element={<Vocabulary />} />
        <Route path="/FillInTheBlank" element={<FillInTheBlank />} />
        <Route path="/Jumblewords" element={<Jumblewords />} />
        <Route path="/Spelling" element={<Spelling />} />
        <Route path="/scores" element={<Score />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/leaderboard" element={<LeaderBoard />} />


        <Route path="/website2" element={<Website2 />} />
        <Route path="/Comprehension2" element={<Comprehension2 />} />
        <Route path="/Vocabulary2" element={<Vocabulary2 />} />
        <Route path="/FillInTheBlank2" element={<FillInTheBlank2 />} />
        <Route path="/Jumblewords2" element={<Jumblewords2 />} />
        <Route path="/Spelling2" element={<Spelling2 />} />




        <Route path="/website3" element={<Website3 />} />
        <Route path="/Comprehension3" element={<Comprehension3 />} />
        <Route path="/Vocabulary3" element={<Vocabulary3 />} />
        <Route path="/FillInTheBlank3" element={<FillInTheBlank3 />} />
        <Route path="/Jumblewords3" element={<Jumblewords3 />} />
        <Route path="/Spelling3" element={<Spelling3 />} />


        
        <Route path="/website4" element={<Website4 />} />
        <Route path="/Comprehension4" element={<Comprehension4 />} />
        <Route path="/Vocabulary4" element={<Vocabulary4 />} />
        <Route path="/FillInTheBlank4" element={<FillInTheBlank4 />} />
        <Route path="/Jumblewords4" element={<Jumblewords4 />} />
        <Route path="/Spelling4" element={<Spelling4 />} />

        
        <Route path="/website5" element={<Website5 />} />
        <Route path="/Comprehension5" element={<Comprehension5 />} />
        <Route path="/Vocabulary5" element={<Vocabulary5 />} />
        <Route path="/FillInTheBlank5" element={<FillInTheBlank5 />} />
        <Route path="/Jumblewords5" element={<Jumblewords5 />} />
        <Route path="/Spelling5" element={<Spelling5 />} />

      </Routes>
    </BrowserRouter>
    </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;