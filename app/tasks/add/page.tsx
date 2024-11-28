"use client"

import { getToken } from '@/utils/auth'
import axios from 'axios'
import React, { useState } from 'react'

const AddTask = () => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [dueTime, setDueTime] = useState("")
    const [status, setStatus] = useState("")

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const url = "/api/tasks/add/"
            const res = await axios.post(url, {
                headers: { Authorization: getToken() },
                data: { title, description, dueTime, status }
            })
            console.log('====================================');
            console.log('====================================');
            console.log(res);
            console.log('====================================');
            console.log("sent from frontend");
            console.log('====================================');
        } catch (error) {
            console.error("Failed to fetch tasks", error);
        }
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
            <h1 className="text-2xl font-bold text-center text-gray-800">Login</h1>
            <form onSubmit={handleLogin} className="mt-4">
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
                    type="text"
                    placeholder="Due time"
                    value={dueTime}
                    onChange={(e) => setDueTime(e.target.value)}
                    required
                    className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    placeholder="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    required
                    className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="w-full py-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Login
                </button>
            </form>
        </div>
    )
}

export default AddTask