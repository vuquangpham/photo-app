import React, { Suspense } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import './App.css';
import Header from './components/Header';
import NotFound from './components/NotFound';

const Photo = React.lazy(() => import('./features/Photo'))

function App() {
  return (
    <div className="App">
      <Suspense fallback={<Spinner style={{ width: '3rem', height: '3rem' }} />}>
        <BrowserRouter>
          <Header />


          <Switch>
            <Redirect exact from="/" to="/photos" />

            <Route path="/photos" component={Photo} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
