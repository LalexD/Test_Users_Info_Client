import { AppRouter } from 'app/routers';
import { store } from 'app/store/AppStore';
import { checkAuth } from 'entities/session/model/SessionSlice';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import './App.scss';

function App() {

  useEffect(() => {
    store.dispatch(checkAuth())
  }, [])

  return (
    <Provider store={store}>
      <RouterProvider router={AppRouter} />
    </Provider>
  );
}

export default App;
