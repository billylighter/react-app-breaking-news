import 'bootstrap/dist/css/bootstrap.min.css';
import AppHeader from "./components/AppHeader";
import NewsRow from "./components/NewsRow";


function App() {

    return (
        <>
            <AppHeader/>
            <NewsRow title="Breaking News 🔴" query={''} isBreaking classes="my-5" />
        </>
    );
}

export default App;
