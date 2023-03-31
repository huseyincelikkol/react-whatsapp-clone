import { useSelector } from "react-redux";
import { BrowserRouter as Router,Routes,Route} from "react-router-dom";
import { Sidebar } from "./component/Sidebar";
import PageContainer from "./containers/PageContainer";
import { Chat } from "./pages/Chat";
import { ChatDetail } from "./pages/ChatDetail";
import Login from "./pages/Login";


function App() {
  const {user} = useSelector(state => state.user)
  
  
  return (
    <>
      {
      !user ? <Login /> :
        <Router>
          <PageContainer>
          <Sidebar/>
          <Routes>
            <Route element={<Chat/>}path="/"/>
            <Route element={<ChatDetail/>} path="chat/:id"/>
          </Routes>
          </PageContainer>
        </Router>
        }
    </>
  );
}

export default App;
