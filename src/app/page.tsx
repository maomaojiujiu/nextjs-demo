'use client';
import {useEffect, useState} from "react";

interface Task {
    _id: string;
    content: string;
}

export default function Home() {
    const url = 'https://blog.maojiucloud.cn/tasks';
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState<Task[]>([{_id: '', content: ''}]);
    const [editableTaskIndex, setEditableTaskIndex] = useState<number | null>(null); // 新增状态变量
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        if (index === editableTaskIndex) {
            const newTasks = [...tasks];
            newTasks[index].content = e.target.value;
            setTasks(newTasks);
        }
    };
    const fetchData = async () => {
        const response = await fetch(url);
        const data = await response.json();
        setTasks(data);
    };
    useEffect(() => {
        fetchData();
    }, []);
    // 提交任务
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const params = new URLSearchParams();
        params.append('content', task);
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params,
        });
        console.log(response);
        setTask('');
        fetchData();
    };

    const handleButtonClick = async (index: number) => {
        if (editableTaskIndex === index) {
            // 如果当前任务已经处于编辑模式，那么保存修改
            const params = new URLSearchParams();
            const task = tasks[index];
            console.log(task);
            params.append('id', task._id);
            params.append('content', task.content);
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: params,
            });
            console.log(response);
            // 退出编辑模式
            setEditableTaskIndex(null);
            fetchData()
        } else {
            // 如果当前任务不处于编辑模式，那么进入编辑模式
            setEditableTaskIndex(index);
        }
    };

    const handleDeleteClick = async (id: string) => {
        const params = new URLSearchParams();
        params.append('id', id);
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params,
        });
        if (response.ok) {
            // 如果服务器成功处理了请求，那么重新获取任务列表
            fetchData();
            // 如果正在编辑被删除的任务，那么退出编辑模式
            if (editableTaskIndex !== null && tasks[editableTaskIndex]._id === id) {
                setEditableTaskIndex(null);
            }
        } else {
            console.log('Failed to delete task');
        }
    };

    return (
        <div>
            <header className="py-8 px-4 w-full max-w-800 mx-auto">
                <h1 className="text-4xl font-semibold text-custom-red mb-3 mt-12"><span
                    className="text-custom-gray">SJsquaret</span> task list</h1>
                <form id="new-task-input" className="flex" onSubmit={handleSubmit}>
                    <input type="text" name="new-task-input" id="new-task-input" placeholder="What do you have planned?"
                           className="flex-1 bg-black p-4 rounded-2xl mr-4 text-white text-lg focus:ring-0 focus:outline-none"
                           value={task} onChange={(e) => setTask(e.target.value)}/>
                    <input type="submit" id="new-task-submit" value="Add task"
                           className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent cursor-pointer transition-colors duration-400 ease-in-out"/>
                </form>
            </header>

            <main className="py-2 px-4 flex-auto max-w-800 w-full mx-auto">
                <section>
                    <h2 className="text-2xl text-black mb-4">Tasks</h2>
                    <div id="tasks">
                        {tasks.map((task, index) => (
                            task._id === '' ? null :(
                            <div key={index} className="flex justify-between bg-black p-4 mb-4 rounded-2xl">
                                <div className="flex-auto">
                                    <input type="text"
                                           className="text-white bg-black focus:ring-0 focus:outline-none focus:text-pink-700 p-1 w-full"
                                           value={task.content}
                                           readOnly={index !== editableTaskIndex}
                                           onChange={(e) => handleInputChange(e, index)}/> {/* 添加onChange处理器 */}
                                </div>
                                <div className="mr-1 ml-1">
                                    <button
                                        className="mr-5 bg-gradient-to-r from-custom-pink to-custom-purple text-transparent bg-clip-text font-semibold"
                                        onClick={() => handleButtonClick(index)}>
                                        {index === editableTaskIndex ? 'SAVE' : 'EDIT'} {/* 根据是否处于编辑模式来显示"EDIT"还是"SAVE" */}
                                    </button>
                                    <button className="text-red-700 font-semibold"
                                            onClick={() => handleDeleteClick(task._id)}>DELETE
                                    </button>
                                </div>
                            </div>)
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}