"use client"

import { getToken } from '@/utils/auth'
import axios from 'axios'
import { useRouter } from 'next/router';
import React, { useEffect, useState} from 'react'
import { toast } from 'react-toastify';

interface Task {
    _id: string; // or string, depending on your data
    title: string;
    description: string;
    dueTime: string;
    status: string
}

const Tasks = () => {

    const [tasks, setTasks] = useState([]);
    const [tokenValue, setTokenValue] = useState<string | null>("");
    const router = useRouter()
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const token = getToken();
                if (!token) {
                    toast.error("You are not connected")
                    router.push('/login')
                } else {
                    setTokenValue(token)
                    const res = await axios.get("/api/tasks/", {
                        headers: { Authorization: token },
                    });
                    setTasks(res.data);
                }
                
            } catch (err) {
                console.error("Failed to fetch tasks", err);
            }
        };
        fetchTasks();
    }, []);

    const deleteItem = (taskId: string) => {
        const url = `/api/tasks/delete/${taskId}`
        try {
            const res = axios.delete(url, {
                headers: { 
                    Authorization: tokenValue,
                    taskId: taskId
                },
            })
            console.log('====================================');
            console.log(res);
            console.log('====================================');
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>

            {tasks.length > 0 ? (
                <ul>
                    {tasks.map((task: Task) => (
                        <li key={task._id}>
                            {task.title}
                            <button onClick={() => deleteItem(task._id)} className='text-red-600'>delete</button>
                            <br />
                            <hr />
                        </li>
                        
                    ))}
                </ul>
            ) : (
                <div>Tasks list is empty</div>
            )}
        </div>
    );
}

export default Tasks
