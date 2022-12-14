import React, {useContext} from 'react';
import './App.css';
import {Header, Footer, UserProvider } from "./components"
import {Home, Login, SignUp, Game, GameLog, GameHistory, Win, Draw} from './pages'
import { Routes, Route, Navigate } from 'react-router-dom'
import {UserContext} from "./context";

function App() {
//     const { logout } = useContext(UserContext)
//     window.addEventListener("beforeunload", (ev) =>
//     {
//         ev.preventDefault();
//         logout()
//         sessionStorage.clear()
// });
  return (
        <UserProvider>
                <div className="App">
                    <Header/>
                    <div id={"main"}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="login" element={<Login />} />
                        <Route path="game/:boardSize/:length" element={<Game/>} />
                        <Route path="gameLog/" element={<GameLog />} />
                        <Route path="gameHistory" element={<GameHistory />} />
                        <Route path="signup" element={<SignUp />} />
                        <Route path="win" element={<Win />} />
                        <Route path="draw" element={<Draw />} />

                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                    </div>
                    <Footer/>
                </div>
        </UserProvider>
  );
}

export default App;
