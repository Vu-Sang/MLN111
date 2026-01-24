import { useState } from 'react';
import { Plus, Download, ChevronLeft, ChevronRight, Filter } from 'lucide-react';

interface ScheduleEvent {
  id: string;
  subject: string;
  teacher: string;
  classroom: string;
  day: number; // 0 = Monday, 6 = Sunday
  startTime: number; // 7 = 7 AM, 19 = 7 PM
  duration: number; // in hours
  color: string;
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const TIME_SLOTS = Array.from({ length: 15 }, (_, i) => i + 7); // 7 AM to 9 PM (15 slots)

const SAMPLE_EVENTS: ScheduleEvent[] = [
  {
    id: '1',
    subject: 'Mathematics',
    teacher: 'Dr. Sarah Johnson',
    classroom: 'Room 301',
    day: 0,
    startTime: 9,
    duration: 1.5,
    color: 'bg-blue-500'
  },
  {
    id: '2',
    subject: 'Physics',
    teacher: 'Prof. Michael Chen',
    classroom: 'Lab 205',
    day: 0,
    startTime: 11,
    duration: 2,
    color: 'bg-purple-500'
  },
  {
    id: '3',
    subject: 'English Literature',
    teacher: 'Ms. Emma Wilson',
    classroom: 'Room 102',
    day: 1,
    startTime: 8,
    duration: 1,
    color: 'bg-green-500'
  },
  {
    id: '4',
    subject: 'Chemistry',
    teacher: 'Dr. Robert Brown',
    classroom: 'Lab 301',
    day: 1,
    startTime: 10,
    duration: 1.5,
    color: 'bg-orange-500'
  },
  {
    id: '5',
    subject: 'History',
    teacher: 'Prof. Lisa Anderson',
    classroom: 'Room 205',
    day: 2,
    startTime: 9,
    duration: 1,
    color: 'bg-pink-500'
  },
  {
    id: '6',
    subject: 'Computer Science',
    teacher: 'Mr. David Lee',
    classroom: 'Lab 401',
    day: 2,
    startTime: 13,
    duration: 2,
    color: 'bg-cyan-500'
  },
  {
    id: '7',
    subject: 'Mathematics',
    teacher: 'Dr. Sarah Johnson',
    classroom: 'Room 301',
    day: 3,
    startTime: 10,
    duration: 1.5,
    color: 'bg-blue-500'
  },
  {
    id: '8',
    subject: 'Physical Education',
    teacher: 'Coach Williams',
    classroom: 'Gymnasium',
    day: 3,
    startTime: 15,
    duration: 1,
    color: 'bg-teal-500'
  },
  {
    id: '9',
    subject: 'Biology',
    teacher: 'Dr. Maria Garcia',
    classroom: 'Lab 202',
    day: 4,
    startTime: 8,
    duration: 1.5,
    color: 'bg-emerald-500'
  },
  {
    id: '10',
    subject: 'Art & Design',
    teacher: 'Ms. Sophie Martin',
    classroom: 'Studio A',
    day: 4,
    startTime: 14,
    duration: 2,
    color: 'bg-rose-500'
  },
];

export function Timetable() {
  const [events] = useState<ScheduleEvent[]>(SAMPLE_EVENTS);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [currentWeek, setCurrentWeek] = useState('Week of Jan 6 - Jan 12, 2026');
  const [showFilters, setShowFilters] = useState(false);

  const formatTime = (hour: number) => {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:00 ${period}`;
  };

  const getCurrentTimePosition = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();
    
    if (currentHour < 7 || currentHour >= 22) return null;
    
    const position = ((currentHour - 7) * 60 + currentMinutes) / 60;
    return position;
  };

  const currentTimePos = getCurrentTimePosition();
  const today = new Date().getDay(); // 0 = Sunday, 1 = Monday, etc.
  const currentDayIndex = today === 0 ? 6 : today - 1; // Convert to our Monday-first index

  return (
    <div className="flex flex-col h-full bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl text-slate-900">Weekly Class Schedule</h1>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">
              <Download className="w-4 h-4" />
              Export PDF
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors">
              <Plus className="w-4 h-4" />
              Add New Schedule
            </button>
          </div>
        </div>

        {/* Week Selector */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-slate-700 min-w-[200px] text-center">{currentWeek}</span>
            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {showFilters && (
            <div className="flex items-center gap-3">
              <select className="px-3 py-2 border border-slate-300 rounded-lg text-sm">
                <option>All Categories</option>
                <option>Science</option>
                <option>Mathematics</option>
                <option>Arts</option>
                <option>Languages</option>
              </select>
              <select className="px-3 py-2 border border-slate-300 rounded-lg text-sm">
                <option>All Days</option>
                <option>Weekdays</option>
                <option>Weekends</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Timetable Grid */}
      <div className="flex-1 overflow-auto p-6">
        <div className="inline-block min-w-full">
          <div className="flex">
            {/* Time Column */}
            <div className="flex-shrink-0 w-24 pr-4">
              <div className="h-16" /> {/* Header spacer */}
              {TIME_SLOTS.map((hour) => (
                <div key={hour} className="h-20 flex items-start pt-2">
                  <span className="text-sm text-slate-500">{formatTime(hour)}</span>
                </div>
              ))}
            </div>

            {/* Days Grid */}
            <div className="flex-1 relative">
              <div className="grid grid-cols-7 gap-3 mb-3">
                {DAYS.map((day, index) => (
                  <div
                    key={day}
                    className={`text-center py-3 rounded-lg ${
                      index === currentDayIndex
                        ? 'bg-indigo-100 text-indigo-700'
                        : 'bg-white text-slate-700'
                    }`}
                  >
                    <div className="text-xs uppercase tracking-wide mb-1">{day.slice(0, 3)}</div>
                    <div className="font-medium">{day}</div>
                  </div>
                ))}
              </div>

              {/* Time Grid Background */}
              <div className="relative">
                <div className="grid grid-cols-7 gap-3">
                  {DAYS.map((_, dayIndex) => (
                    <div key={dayIndex} className="relative">
                      {TIME_SLOTS.map((hour) => (
                        <div
                          key={hour}
                          className="h-20 bg-white border border-slate-100 rounded-lg"
                        />
                      ))}
                    </div>
                  ))}
                </div>

                {/* Current Time Indicator */}
                {currentTimePos !== null && (
                  <div
                    className="absolute left-0 right-0 flex items-center z-20 pointer-events-none"
                    style={{ top: `${currentTimePos * 80}px` }}
                  >
                    <div className="w-full h-0.5 bg-red-500 relative">
                      <div className="absolute -left-2 -top-2 w-4 h-4 bg-red-500 rounded-full" />
                    </div>
                  </div>
                )}

                {/* Event Blocks */}
                <div className="absolute inset-0 grid grid-cols-7 gap-3">
                  {DAYS.map((_, dayIndex) => (
                    <div key={dayIndex} className="relative">
                      {events
                        .filter((event) => event.day === dayIndex)
                        .map((event) => {
                          const top = (event.startTime - 7) * 80;
                          const height = event.duration * 80 - 8;
                          
                          return (
                            <div
                              key={event.id}
                              className={`absolute left-0 right-0 ${event.color} rounded-lg p-3 cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02] ${
                                selectedEvent === event.id ? 'ring-2 ring-slate-900 shadow-xl' : ''
                              }`}
                              style={{
                                top: `${top}px`,
                                height: `${height}px`,
                              }}
                              onClick={() => setSelectedEvent(event.id)}
                            >
                              <div className="text-white">
                                <div className="text-sm font-semibold mb-1 line-clamp-1">
                                  {event.subject}
                                </div>
                                <div className="text-xs opacity-90 mb-1">
                                  {formatTime(event.startTime)} - {formatTime(event.startTime + event.duration)}
                                </div>
                                <div className="text-xs opacity-90 line-clamp-1">{event.teacher}</div>
                                <div className="text-xs opacity-75 line-clamp-1">{event.classroom}</div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="bg-white border-t border-slate-200 px-6 py-4">
        <div className="flex items-center gap-6 text-sm">
          <span className="text-slate-600">Subjects:</span>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded" />
            <span className="text-slate-700">Mathematics</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-500 rounded" />
            <span className="text-slate-700">Physics</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded" />
            <span className="text-slate-700">Literature</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-500 rounded" />
            <span className="text-slate-700">Chemistry</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-cyan-500 rounded" />
            <span className="text-slate-700">Computer Science</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="w-3 h-0.5 bg-red-500" />
            <span className="text-slate-700">Current Time</span>
          </div>
        </div>
      </div>
    </div>
  );
}
