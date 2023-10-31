import { useState } from "react";

export default function TaskForm({ onAdd }) {
    const [taskName, setTaskName] = useState("");
    const soundCreate = new Audio("/sounds/sound_create.mp3");
    soundCreate.volume = 0.2;

    function handleSubmit(event) {
        event.preventDefault();

        if (taskName.trim() !== "") {
            soundCreate.play();
            onAdd(taskName);
            setTaskName("");
        }
    }

    return (
        <form onSubmit={event => handleSubmit(event)}>
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
