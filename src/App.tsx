import ButtonsGrid from "./components/ButtonsGrid";
import MainConsole from "./components/MainConsole";
import Layout from "./layout/Layout";
import { AppContextProvider } from "./store/app-context";

function App() {
  return (
    <AppContextProvider>
      <Layout>
        <MainConsole />
        <ButtonsGrid />
      </Layout>
    </AppContextProvider>
  );
}

export default App;
