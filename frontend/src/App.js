import { AppProvider } from "./Components/ContextAPI"
import { GlobalStyle } from "./Components/GlobalStyle"
import AllRouters from "./Components/AllRouters"

function App() {
  return (
    <AppProvider>
      <GlobalStyle />
      <AllRouters />
    </AppProvider>
  )
}

export default App
