"use client";

import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Define the event type
interface Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
}

// Set up the localizer
const localizer = momentLocalizer(moment);

const BigCalendar = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [newTask, setNewTask] = useState({ title: '', start: '', end: '' });

  // Fetch tasks from the database
  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch('/api/tasks');
      const tasks = await response.json();
      setEvents(
        tasks.map((task: any) => ({
          id: task.id,
          title: task.title,
          start: new Date(task.start),
          end: new Date(task.end),
        }))
      );
    };
    fetchTasks();
  }, []);

  // Handle form submission to add a new task
  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.title && newTask.start && newTask.end) {
      const response = await fetch('/api/tasks/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask),
      });
      const task = await response.json();
      setEvents([
        ...events,
        {
          id: task.id,
          title: task.title,
          start: new Date(task.start),
          end: new Date(task.end),
        },
      ]);
      setNewTask({ title: '', start: '', end: '' });
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Daily Tasks</h1>

      {/* Form to add a new task */}
      <form onSubmit={handleAddTask} className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Task Title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            className="p-2 border rounded"
            required
          />
          <input
            type="datetime-local"
            value={newTask.start}
            onChange={(e) => setNewTask({ ...newTask, start: e.target.value })}
            className="p-2 border rounded"
            required
          />
          <input
            type="datetime-local"
            value={newTask.end}
            onChange={(e) => setNewTask({ ...newTask, end: e.target.value })}
            className="p-2 border rounded"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Add Task
          </button>
        </div>
      </form>

      {/* Calendar Component */}
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        defaultView="day"
        views={['day', 'week', 'month']}
        onSelectEvent={(event: Event) => alert(`Selected Task: ${event.title}`)}
      />
    </div>
  );
};

export default BigCalendar;