import { useState } from "react";
import Intro from "./components/Intro";
import MainSection from "./components/MainSection";

function App() {
    const [displayIntro, setDisplayIntro] = useState<boolean>(true);

    return (
        <div className="bg-black h-screen w-full flex flex-col justify-center items-center">
            <Intro
                displayIntro={displayIntro}
                setDisplayIntro={setDisplayIntro}
            />
            {!displayIntro && <MainSection/>}
        </div>
    );
}

export default App;
