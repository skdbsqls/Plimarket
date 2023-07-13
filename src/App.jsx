import React from "react";
import Router from "./shared/Router";
import { QueryClient, QueryClientProvider } from "react-query";
import GlobalStyle from "./styles/global/GlobalStyle";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle></GlobalStyle>
      <Router />
    </QueryClientProvider>
  );
};

export default App;
