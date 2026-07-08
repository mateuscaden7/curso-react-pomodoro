import "./styles/global.css";
import "./styles/theme.css"
import { Logo } from "./components/Logo";
import { Menu } from "./components/Menu";
import { Countdown } from "./components/Countdown";
import { Container } from "./components/Container";
import { LabelInput } from "./components/LabelInput";
import { Cycles } from "./components/Cycles";
import { DefaultButton } from "./components/DefaultButton";
import { PlayCircleIcon } from "lucide-react";
import { Footer } from "./components/Footer";

export function App() {
    return (
        <>
            <Container>
                <Logo />
            </Container>
            
            <Container>
                <Menu />
            </Container>

            <Container>
                <Countdown />
            </Container>

            <Container>
                <form className="form" action="">
                    <div className="formRow">
                        <LabelInput topLabel="Task" placeholder="Digite algo..." id="inputTask "/>
                    </div>

                    <div className="formRow">
                        <p>Lorem ipsum dolor sit amet.</p>
                    </div>

                    <div className="formRow">
                        <Cycles />
                    </div>

                    <div className="formRow">
                        <DefaultButton icon={<PlayCircleIcon />} color="red" />
                    </div>
                </form>
            </Container>

            <Container>
                <Footer />
            </Container>
        </>
    );
}