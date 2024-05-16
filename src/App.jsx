import { Outlet } from 'react-router-dom';
import {Header} from './screens/Header/Header.jsx';
import {Footer} from './screens/Footer/Footer.jsx';

export function App(){
    return (
        <>
            <Header/>
            <Outlet/>
        </>
    )
}