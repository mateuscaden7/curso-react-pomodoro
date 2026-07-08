import { PlayCircleIcon } from "lucide-react"
import { Cycles } from "../Cycles"
import { DefaultButton } from "../DefaultButton"
import { LabelInput } from "../LabelInput"

export function MainForm() {
    return (
        <form className="form" action="">
            <div className="formRow">
                <LabelInput topLabel="Task" placeholder="Digite algo..." id="inputTask"/>
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
    )
}