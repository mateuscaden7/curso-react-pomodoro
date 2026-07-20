import styles from "./MenuItem.module.css"
import { RouterLink } from "../RouterLink";

type MenuItemProps = {
    children: React.ReactNode;
    help?: string;
    onClick?: React.MouseEventHandler<HTMLAnchorElement>
    link?: string;
}

export function MenuItem({ children, help, onClick, link }: MenuItemProps) {
    return (
        <>
            <RouterLink className={styles.menuitemLink} href={ link || "" } aria-label={ help } title={ help } onClick={onClick}>
                {children}
            </RouterLink>
        </>
    )
}