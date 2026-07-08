import { Logo } from "../../components/Logo";
import { Countdown } from "../../components/Countdown";
import { Footer } from "../../components/Footer";
import { MainForm } from "../../components/MainForm";
import { Container } from "../../components/Container";
import { Menu } from "../../components/Menu";

type MainTemplateProps = {
    children: React.ReactNode
}

export function MainTemplate({ children }: MainTemplateProps) {
    return (
        <>
            <Container>
                <Logo />
            </Container>
            
            <Container>
                <Menu />
            </Container>

            { children }

            <Container>
                <Footer />
            </Container>
        </>
    )
}