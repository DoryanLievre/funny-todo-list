import { useState } from "react";
import { Howl } from 'howler';

export default function TaskForm({ onAdd }) {
    const [taskName, setTaskName] = useState("");

    function handleSubmit(event) {
        event.preventDefault();

        if (taskName.trim() !== "") {
            const soundCreate = new Howl({
                src: ['/sounds/sound_create.mp3'],
                volume: 0.2,
            });

            soundCreate.play();
            onAdd(taskName);
            setTaskName("");
        }
    }

    return (
        <form onSubmit={(event) => handleSubmit(event)}>
            <button>+</button>
            <input
                value={taskName}
                onChange={(event) => setTaskName(event.target.value)}
                type="text"
                placeholder="Ta nouvelle tâche ... "
            />
        </form>
    );
}
