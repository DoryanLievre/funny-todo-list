'use client'
import styles from './styles.css'
import TaskForm from "@/components/TaskForm";
import Task from "@/components/Task";
import { useEffect, useState } from "react";
import { Howl, Howler } from 'howler';

export default function Home() {
    const [tasks, setTasks] = useState([]);
    const [checkedTasks, setCheckedTasks] = useState(0);
    const [soundPlaying, setSoundPlaying] = useState(false);

    const doneTasks = tasks.length > 0 ? tasks.filter(task => task.done).length : 0;
    const totalTasks = tasks.length;

    useEffect(() => {
        if (tasks.length === 0) return;
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        const tasks = JSON.parse(localStorage.getItem("tasks"));
        setTasks(tasks);
    }, []);

    function addTask(name) {
        setTasks(prevState => {
            return [...prevState, { name: name, done: false }];
        });
    }

    function removeTask(index) {
        setTasks(prevState => {
            const newTasks = [...prevState];
            newTasks.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(newTasks));
            return newTasks;
        });
    }

    function renameTask(index, newName) {
        setTasks(prevState => {
            const newTasks = [...prevState];
            newTasks[index].name = newName;
            return newTasks;
        });
    }
    function updateTask(index, newDone) {
        setTasks((prevState) => {
            const newTasks = [...prevState];
            newTasks[index].done = newDone;

            const numCheckedTasks = newTasks.filter((task) => task.done).length;
            if (numCheckedTasks === totalTasks && !soundPlaying) {
                const sound = new Howl({
                    src: ['/sounds/sound_done.mp3'],
                    volume: 0.02,
                    onend: () => {
                        setSoundPlaying(true);
                    },
                });
                sound.play();
            } else {
                setSoundPlaying(false);
            }

            setCheckedTasks(numCheckedTasks);
            return newTasks;
        });
    }

    function moveTaskUp(index) {
        if (index === 0) return;
        setTasks(prevState => {
            const newTasks = [...prevState];
            [newTasks[index], newTasks[index - 1]] = [newTasks[index - 1], newTasks[index]];
            return newTasks;
        });
    }

    function moveTaskDown(index) {
        if (index === tasks.length - 1) return;
        setTasks(prevState => {
            const newTasks = [...prevState];
            [newTasks[index], newTasks[index + 1]] = [newTasks[index + 1], newTasks[index]];
            return newTasks;
        });
    }



    function getMessage() {
        const percentage = doneTasks / totalTasks * 100;
        if (percentage === 0) {
            return 'Aller, fait-en au moins une ! 🙏';
        }
        if (percentage < 25) {
            return 'Aller, on continue 💪 !';
        }
        if (percentage < 50) {
            return 'Tu peux le faire 🤗 !';
        }
        if (percentage < 75) {
            return 'Tu y es presque 🤩 !';
        }
        if (percentage < 90) {
            return 'Ne lâche rien 😎 !';
        }
        if (percentage < 100) {
            return 'Encore un petit effort 😁 !';
        }
        if (percentage === 100) {
            return "Bravo, tu as terminé pour aujourd'hui 🥳 !";
        }
    }
    return (
        <main>
            {checkedTasks === totalTasks && checkedTasks !== 0 &&
                <img className="img-fade-in" src="/images/mh_quest_complete.png" alt="Image" />
            }
            <h1>{doneTasks}/{totalTasks} Terminées</h1>
            <h2>{getMessage()}</h2>
            <TaskForm onAdd={addTask} />
            <div className="task-list-container">
                {tasks ? tasks.map((task, index) => (
                    <div className="task-container"  key={index}>
                        <div className="button-container">
                            <button className="move" onClick={() => moveTaskUp(index)}>
                                <svg className="center-svg" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><path d="M182.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"/>
                                </svg>
                            </button>
                            <button className="move" onClick={() => moveTaskDown(index)}>
                                <svg className="center-svg" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><path d="M182.6 470.6c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128z"/>
                                </svg>
                            </button>
                        </div>
                        <div className="task-content">
                            <Task
                                {...task}
                                onToggle={done => updateTask(index, done)}
                                onDelete={() => removeTask(index)}
                                onRename={newName => renameTask(index, newName)}
                            />
                        </div>
                    </div>
                )) : "Aucune tâche pour le moment"}
            </div>
        </main>
    );
}
