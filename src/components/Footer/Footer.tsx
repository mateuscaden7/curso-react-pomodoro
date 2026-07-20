import styles from "./Footer.module.css"
import { RouterLink } from "../RouterLink"

export function Footer() {
    return (
        <footer className={styles.footer}>
            <RouterLink href="/about-pomodoro">Entenda como funciona a técnica Pomodoro</RouterLink>
            <RouterLink href="/">Chronos Pomodoro &copy; {new Date().getFullYear()}</RouterLink>
        </footer>
    )
}