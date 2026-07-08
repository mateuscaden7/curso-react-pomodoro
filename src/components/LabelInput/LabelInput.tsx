import styles from "./LabelInput.module.css"

type LabelInputProps = {
    topLabel?: string;
} & React.ComponentProps<'input'>;

export function LabelInput({ topLabel, ...rest }: LabelInputProps) {
    return (
        <>
            { topLabel && <label htmlFor={{...rest}.id}>{ topLabel }</label> }
            <input className={styles.input} { ...rest } />
        </>
    )
}