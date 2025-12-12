'use client';

import { useState } from 'react';

interface ReflectionCalendarProps {
  completedDays: string[]; // Array of ISO date strings
}

export default function ReflectionCalendar({ completedDays }: ReflectionCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const isCompleted = (day: number) => {
    const dateStr = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    ).toISOString().split('T')[0];
    return completedDays.includes(dateStr);
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      currentMonth.getFullYear() === today.getFullYear() &&
      currentMonth.getMonth() === today.getMonth() &&
      day === today.getDate()
    );
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const completedCount = completedDays.filter(d => {
    const date = new Date(d);
    return date.getMonth() === currentMonth.getMonth() && 
           date.getFullYear() === currentMonth.getFullYear();
  }).length;

  return (
    <div style={{
      background: '#fff',
      borderRadius: '12px',
      padding: '1.5rem',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      marginBottom: '2rem'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem'
      }}>
        <button
          onClick={prevMonth}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '1.25rem',
            cursor: 'pointer',
            color: '#2C3E50'
          }}
        >
          &lt;
        </button>
        <h3 style={{ color: '#2C3E50', margin: 0 }}>{monthName}</h3>
        <button
          onClick={nextMonth}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '1.25rem',
            cursor: 'pointer',
            color: '#2C3E50'
          }}
        >
          &gt;
        </button>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '0.25rem',
        textAlign: 'center'
      }}>
        {weekDays.map((day) => (
          <div key={day} style={{
            padding: '0.5rem',
            fontSize: '0.75rem',
            color: '#888',
            fontWeight: 600
          }}>
            {day}
          </div>
        ))}

        {Array(firstDay).fill(null).map((_, i) => (
          <div key={`empty-${i}`} style={{ padding: '0.5rem' }} />
        ))}

        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
          <div
            key={day}
            style={{
              padding: '0.5rem',
              borderRadius: '8px',
              background: isCompleted(day) 
                ? '#1ABC9C' 
                : isToday(day) 
                  ? '#e8f8f5' 
                  : 'transparent',
              color: isCompleted(day) ? '#fff' : '#2C3E50',
              fontWeight: isToday(day) ? 700 : 400,
              border: isToday(day) && !isCompleted(day) ? '2px solid #1ABC9C' : 'none'
            }}
          >
            {day}
          </div>
        ))}
      </div>

      <div style={{
        marginTop: '1rem',
        padding: '0.75rem',
        background: '#f5f5f5',
        borderRadius: '8px',
        textAlign: 'center'
      }}>
        <span style={{ color: '#1ABC9C', fontWeight: 600 }}>{completedCount}</span>
        <span style={{ color: '#888' }}> reflections this month</span>
      </div>
    </div>
  );
}
