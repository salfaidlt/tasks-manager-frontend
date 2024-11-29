"use client";

import { getToken, getUserId } from '@/utils/auth';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const AddTask = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [status, setStatus] = useState("");
    const [token, setToken] = useState<string | null>("");

    useEffect(() => {
        setToken(getToken());
    }, []);

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const url = "/api/tasks/add/";
            const userId = getUserId()
            await axios.post(url, {
                userId,
                title,
                description,
                dueDate,
                status
            }, {
                headers: { Authorization: token }
            });
            toast.success("Task added successfully")
        } catch (error) {
            console.error("Failed to add task", error);
            toast.error("Error while adding the task")
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
            <h1 className="text-2xl font-bold text-center text-gray-800">Add Task</h1>
            <form onSubmit={handleAdd} className="mt-4">
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="date"
                    placeholder="Due date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    required
                    className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    placeholder="Status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    required
                    className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="w-full py-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Add Task
                </button>
            </form>
        </div>
    );
};

export default AddTask;
