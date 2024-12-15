import 'bootstrap/dist/css/bootstrap.min.css';
import AppHeader from "./components/AppHeader";
import NewsRow from "./components/NewsRow";
import Users from "./components/Users";


function App() {

    return (
        <>
            <AppHeader/>

            <NewsRow title="Breaking News 🔴" query={''} isBreaking classes="my-5" />

            <Users title={'Our authors from the Europe 🦹🏼‍♀️'}
                   query={'?gender=female&results=6'}
                    classes={'mb-4'}>
            </Users>

            <Users title={'Our authors from the USA 🦸🏼‍♂️'}
                   query={'?gender=male&results=6'}
                    classes={''}>
            </Users>
        </>
    );
}

export default App;
