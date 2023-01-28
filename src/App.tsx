import React from 'react';
import { Provider } from 'react-redux';
import { proteinStore } from './store/store';
import HomePage from './routes/HomePage/HomePage';
import ResultPage from './routes/ResultPage/ResultPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.scss';
import Canvas from './components/Canvas/Canvas';

const router = createBrowserRouter([
	{
		path: '/',
		element: <HomePage />,
	},
	{
		path: '/result/:id',
		element: <ResultPage />,
	},
	{
		path: '/DEBUG/canvas',
		element: <Canvas />,
	},
]);

function App() {
	return (
		<Provider store={proteinStore}>
			<div className="app" data-testid="AppComponent">
				<RouterProvider router={router} />
			</div>
		</Provider>
	);
}

export default App;
