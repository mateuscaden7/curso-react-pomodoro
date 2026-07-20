import { SaveIcon } from "lucide-react";
import { Container } from "../../components/Container";
import { DefaultButton } from "../../components/DefaultButton";
import { Heading } from "../../components/Heading";
import { LabelInput } from "../../components/LabelInput";
import { MainTemplate } from "../../templates/MainTemplate";
import { useRef } from "react";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { showToast } from "../../adapters/showToast";
import { TaskActionTypes } from "../../contexts/TaskContext/taskActions";

export function Settings() {
    const { state, dispatch } = useTaskContext();

    const inputWorkTime = useRef<HTMLInputElement>(null);
    const inputShortBreakTime = useRef<HTMLInputElement>(null);
    const inputLongBreakTime = useRef<HTMLInputElement>(null);

    function handleSaveSettings(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        showToast.dismiss();

        const workTime = Number(inputWorkTime.current?.value);
        const shortBreakTime = Number(inputShortBreakTime.current?.value);
        const longBreakTime = Number(inputLongBreakTime.current?.value);

        if (isNaN(workTime)) {
            showToast.warning('Digite um valor númerico para o tempo de foco');
            return;
        }

        if (isNaN(shortBreakTime)) {
            showToast.warning('Digite um valor númerico para o tempo de descanso curto');
            return;
        }

        if (isNaN(longBreakTime)) {
            showToast.warning('Digite um valor númerico para o tempo de descanso longo');
            return;
        }

        dispatch({
            type: TaskActionTypes.CHANGE_SETTINGS,
            payload: {
                workTime,
                shortBreakTime,
                longBreakTime
            }
        });

        showToast.success('Configurações salvas com sucesso!');
    }

    return (
        <>
            <MainTemplate>
                <Container>
                    <Heading>
                        Configurações
                    </Heading>
                </Container>

                <Container>
                    <p style={{ textAlign: 'center' }}>Modifique as configurações de tempo de foco, descanso curto e descanso longo.</p>
                </Container>

                <Container>
                    <form className="form" onSubmit={handleSaveSettings}>
                        <div className="formRow">
                            <LabelInput
                                topLabel="Foco (minutos)"
                                type="number"
                                id="workTime"
                                name="workTime"
                                min={1}
                                ref={inputWorkTime}
                                defaultValue={state.config.workTime}
                            />
                        </div>

                        <div className="formRow">
                            <LabelInput
                                topLabel="Descanso Curto (minutos)"
                                type="number"
                                id="shortBreakTime"
                                name="shortBreakTime"
                                min={1}
                                ref={inputShortBreakTime}
                                defaultValue={state.config.shortBreakTime}
                            />
                        </div>

                        <div className="formRow">
                            <LabelInput
                                topLabel="Descanso Longo (minutos)"
                                type="number"
                                id="longBreakTime"
                                name="longBreakTime"
                                min={1}
                                ref={inputLongBreakTime}
                                defaultValue={state.config.longBreakTime}
                            />
                        </div>
                        
                        <div className="formRow">
                            <DefaultButton 
                                icon={<SaveIcon />} 
                                aria-label="Salvar configurações"
                                title="Salvar configurações"
                            />
                        </div>
                    </form>
                </Container>
            </MainTemplate>
        </>
    )
}