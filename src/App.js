import React from "react";
import { BrowserRouter,  Routes, Route } from "react-router-dom";
import HomePage from "./scenes/HomePage/HomePage.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <HomePage /> } exact/>
                <Route path="/home" element={ <HomePage /> } exact/>
                <Route path="/directions" element={ <HomePage /> } exact/>
                <Route path="/fee" element={ <HomePage /> } exact/>
                <Route path="/stations" element={ <HomePage /> } exact/>
                <Route path="/news" element={ <HomePage /> } exact/>
                <Route path="/activities" element={ <HomePage /> } exact/>
            </Routes>
        </BrowserRouter>
    );
}
export default App;