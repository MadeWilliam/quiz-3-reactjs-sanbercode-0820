import React from 'react';
import { LoginProvider } from './contexts/LoginContext';
import PageContent from './PageContent';

function App() {
  return (
    <div className="root">
      <LoginProvider>
        <PageContent />
      </LoginProvider>
    </div>
  );
}

export default App;
