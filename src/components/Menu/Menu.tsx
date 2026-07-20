import { HistoryIcon, HouseIcon, MoonIcon, SettingsIcon, SunIcon } from "lucide-react"
import styles from "./Menu.module.css"
import { MenuItem } from "../MenuItem"
import { useEffect, useState } from "react"

type AvailableThemes = 'dark' | 'light';

export function Menu() {
    const [theme, setTheme] = useState<AvailableThemes>(localStorage.getItem('theme') as AvailableThemes || 'dark');

    function handleThemeChange(event: React.MouseEvent<HTMLAnchorElement>) {
        event.preventDefault();

        setTheme(prev => prev == "dark" ? "light" : "dark");
    }

    const nextThemeIcon = {
        dark: <SunIcon />,
        light: <MoonIcon />
    }

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    return (
        <>
            <nav className={styles.menu}>
                <MenuItem link="/" help="Ir para a home">
                    <HouseIcon />
                </MenuItem>

                <MenuItem link="/history" help="Ver Histórico">
                    <HistoryIcon />
                </MenuItem>

                <MenuItem link="/settings" help="Configuracões">
                    <SettingsIcon />
                </MenuItem>

                <MenuItem help="Mudar Tema" onClick={handleThemeChange}>
                    {nextThemeIcon[theme]}
                </MenuItem>
            </nav>
        </>
    )
}