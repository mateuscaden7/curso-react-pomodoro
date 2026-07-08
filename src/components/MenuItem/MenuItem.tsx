import styles from "./MenuItem.module.css"

type MenuItemProps = {
    children: React.ReactNode;
    help?: string;
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

export function MenuItem({ children, help, onClick }: MenuItemProps) {
    return (
        <>
            <a className={styles.menuitemLink} href="#" aria-label={ help } title={ help } onClick={onClick}>
                {children}
            </a>
        </>
    )
}