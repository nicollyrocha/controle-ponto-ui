import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './pages/login';
import { ContextProvider } from './context';
import { MainPage } from './pages/mainPage';

function App() {
	return (
		<ContextProvider>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Login />} />
					<Route path='/user/:id' element={<MainPage />} />
				</Routes>
			</BrowserRouter>
		</ContextProvider>
	);
}

export default App;
