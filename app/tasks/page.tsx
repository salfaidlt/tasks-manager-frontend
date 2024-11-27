"use client"

import { getToken } from '@/utils/auth'
import axios from 'axios'
import React, { useEffect, useState} from 'react'

interface Task {
    id: string; // or string, depending on your data
    title: string;
    description: string;
    dueTime: string;
    status: string
}

const Tasks = () => {

    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const token = getToken();
                const res = await axios.get("/api/tasks/", {
                    headers: { Authorization: token },
                });
                setTasks(res.data);
            } catch (err) {
                console.error("Failed to fetch tasks", err);
            }
        };
        fetchTasks();
    }, []);

    return (
        <div>
            {tasks.length > 0 ? (
                <ul>
                    {tasks.map((task: Task) => (
                        <li key={task.id}>{task.title}</li>
                    ))}
                </ul>
            ) : (
                <div>Tasks list is empty</div>
            )}
        </div>
    );
}

export default Tasks
