'use client';

import { 
  BookOpen, 
  Clock, 
  CheckCircle, 
  TrendingUp,
  Calendar,
  PlayCircle,
  FileText,
  Users,
  ChevronRight,
  Star,
  AlertCircle,
  Award,
  Activity,
  Download
} from 'lucide-react';
import { useUser } from "../Context/UserContext";

export default function Dashboard() {
  const stats = [
    {
      name: 'Enrolled Courses',
      value: '6',
      icon: BookOpen,
      color: 'bg-blue-500',
      change: '+2 this semester',
      trend: 'up'
    },
    {
      name: 'Completed Assignments',
      value: '24',
      icon: CheckCircle,
      color: 'bg-green-500',
      change: '4 pending',
      trend: 'neutral'
    },
    {
      name: 'Study Hours',
      value: '142',
      icon: Clock,
      color: 'bg-purple-500',
      change: 'This month',
      trend: 'up'
    },
    {
      name: 'Overall GPA',
      value: '3.8',
      icon: TrendingUp,
      color: 'bg-orange-500',
      change: '+0.2 from last sem',
      trend: 'up'
    }
  ];

  const upcomingClasses = [
    {
      id: 1,
      course: 'Advanced React Development',
      time: '10:00 AM - 11:30 AM',
      instructor: 'Dr. Sarah Wilson',
      room: 'Room 204',
      color: 'bg-blue-100 text-blue-800',
      status: 'starting-soon'
    },
    {
      id: 2,
      course: 'Database Systems',
      time: '2:00 PM - 3:30 PM',
      instructor: 'Prof. Michael Chen',
      room: 'Lab 301',
      color: 'bg-green-100 text-green-800',
      status: 'upcoming'
    },
    {
      id: 3,
      course: 'Machine Learning',
      time: '4:00 PM - 5:30 PM',
      instructor: 'Dr. Emily Rodriguez',
      room: 'Room 105',
      color: 'bg-purple-100 text-purple-800',
      status: 'upcoming'
    }
  ];

  const recentCourses = [
    {
      id: 1,
      title: 'Web Development Fundamentals',
      progress: 85,
      nextLesson: 'Advanced CSS Animations',
      instructor: 'John Smith',
      duration: '2h 30m',
      rating: 4.8,
      studentsCount: 1250
    },
    {
      id: 2,
      title: 'Data Structures & Algorithms',
      progress: 60,
      nextLesson: 'Binary Trees',
      instructor: 'Jane Doe',
      duration: '3h 15m',
      rating: 4.9,
      studentsCount: 980
    },
    {
      id: 3,
      title: 'Mobile App Development',
      progress: 40,
      nextLesson: 'State Management',
      instructor: 'Mike Johnson',
      duration: '4h 20m',
      rating: 4.7,
      studentsCount: 750
    }
  ];

  const assignments = [
    {
      id: 1,
      title: 'React Portfolio Project',
      course: 'Web Development',
      dueDate: 'Due in 2 days',
      status: 'urgent',
      type: 'Project',
      points: 100
    },
    {
      id: 2,
      title: 'Database Design Assignment',
      course: 'Database Systems',
      dueDate: 'Due in 5 days',
      status: 'pending',
      type: 'Assignment',
      points: 75
    },
    {
      id: 3,
      title: 'ML Algorithm Implementation',
      course: 'Machine Learning',
      dueDate: 'Due in 1 week',
      status: 'pending',
      type: 'Lab Work',
      points: 50
    }
  ];

  const achievements = [
    { title: 'Perfect Attendance', icon: Award, earned: true },
    { title: 'Quick Learner', icon: Activity, earned: true },
    { title: 'Top Performer', icon: Star, earned: false },
  ];
  const { user } = useUser();
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 rounded-xl p-6 sm:p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
                Welcome back, {user?.full_name || "Guest"}👋
              </h1>
              <p className="text-blue-100 text-lg">Ready to continue your learning journey?</p>
              <div className="flex items-center mt-3 space-x-4 text-sm">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Today: Wednesday, Sept 24</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>3 classes remaining</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="bg-white text-blue-700 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-all duration-200 shadow-lg">
                View All Courses
              </button>
              <button className="bg-blue-500 bg-opacity-30 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-medium hover:bg-opacity-40 transition-all duration-200 border border-white border-opacity-20">
                Download Schedule
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.name}</p>
                <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <div className="flex items-center">
                  <p className="text-xs text-gray-500">{stat.change}</p>
                  {stat.trend === 'up' && (
                    <div className="ml-2 flex items-center text-green-500">
                      <TrendingUp className="h-3 w-3" />
                    </div>
                  )}
                </div>
              </div>
              <div className={`${stat.color} p-3 rounded-xl shadow-sm`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Courses - Takes up 2 columns */}
        <div className="xl:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
                  Continue Learning
                </h2>
                <button className="text-blue-600 text-sm font-medium hover:text-blue-700 flex items-center">
                  View All <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              {recentCourses.map((course) => (
                <div key={course.id} className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-all duration-200 group">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center shadow-sm">
                      <BookOpen className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                      <h3 className="text-base font-semibold text-gray-900 truncate">{course.title}</h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1 sm:mt-0">
                        <Star className="h-4 w-4 text-yellow-400" />
                        <span>{course.rating}</span>
                        <span>•</span>
                        <span>{course.studentsCount} students</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">Instructor: {course.instructor} • {course.duration}</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-semibold text-gray-900">{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                      <p className="text-sm text-blue-600 font-medium">Next: {course.nextLesson}</p>
                    </div>
                  </div>
                  <button className="flex-shrink-0 p-3 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors duration-200 group-hover:bg-blue-100">
                    <PlayCircle className="h-6 w-6" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Today's Schedule */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                Today&apos;s Schedule
              </h2>
            </div>
            <div className="p-4 space-y-3">
              {upcomingClasses.map((class_item) => (
                <div key={class_item.id} className="border-l-4 border-blue-500 pl-4 py-3 bg-gray-50 rounded-r-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${class_item.color} mb-2`}>
                        {class_item.course}
                      </div>
                      <p className="text-sm font-semibold text-gray-900 mb-1">{class_item.time}</p>
                      <p className="text-xs text-gray-600">{class_item.instructor}</p>
                      <p className="text-xs text-gray-600">{class_item.room}</p>
                    </div>
                    {class_item.status === 'starting-soon' && (
                      <div className="flex items-center text-orange-500 text-xs font-medium">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Starting Soon
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <button className="w-full py-2 text-sm text-blue-600 font-medium hover:bg-blue-50 rounded-lg transition-colors duration-200">
                View Full Schedule
              </button>
            </div>
          </div>

          {/* Upcoming Assignments */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <FileText className="h-5 w-5 mr-2 text-orange-600" />
                Assignments
                <span className="ml-2 bg-red-100 text-red-800 text-xs font-semibold px-2 py-1 rounded-full">
                  4 Due
                </span>
              </h2>
            </div>
            <div className="p-4 space-y-3">
              {assignments.map((assignment) => (
                <div key={assignment.id} className="p-3 border border-gray-100 rounded-lg hover:border-gray-200 transition-colors duration-200">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-gray-900 mb-1">{assignment.title}</h3>
                      <p className="text-xs text-gray-600 mb-2">{assignment.course}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                            assignment.status === 'urgent' ? 'bg-red-500' : 'bg-yellow-500'
                          }`} />
                          <span className={`text-xs font-medium ${
                            assignment.status === 'urgent' ? 'text-red-600' : 'text-yellow-600'
                          }`}>
                            {assignment.dueDate}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500 font-medium">{assignment.points} pts</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                      <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                        {assignment.type}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              <button className="w-full py-2 text-sm text-orange-600 font-medium hover:bg-orange-50 rounded-lg transition-colors duration-200">
                View All Assignments
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
            </div>
            <div className="p-4 grid grid-cols-2 gap-3">
              <button className="flex flex-col items-center p-3 text-center border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200">
                <Download className="h-5 w-5 text-blue-600 mb-2" />
                <span className="text-xs font-medium text-gray-700">Download Materials</span>
              </button>
              <button className="flex flex-col items-center p-3 text-center border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-all duration-200">
                <Users className="h-5 w-5 text-green-600 mb-2" />
                <span className="text-xs font-medium text-gray-700">Join Study Group</span>
              </button>
              <button className="flex flex-col items-center p-3 text-center border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all duration-200">
                <Calendar className="h-5 w-5 text-purple-600 mb-2" />
                <span className="text-xs font-medium text-gray-700">Book Session</span>
              </button>
              <button className="flex flex-col items-center p-3 text-center border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-all duration-200">
                <FileText className="h-5 w-5 text-orange-600 mb-2" />
                <span className="text-xs font-medium text-gray-700">Submit Work</span>
              </button>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <Award className="h-5 w-5 mr-2 text-yellow-600" />
                Recent Achievements
              </h2>
            </div>
            <div className="p-4 space-y-3">
              {achievements.map((achievement, index) => (
                <div key={index} className={`flex items-center p-3 rounded-lg ${
                  achievement.earned 
                    ? 'bg-yellow-50 border border-yellow-200' 
                    : 'bg-gray-50 border border-gray-200'
                }`}>
                  <div className={`p-2 rounded-lg mr-3 ${
                    achievement.earned 
                      ? 'bg-yellow-500' 
                      : 'bg-gray-400'
                  }`}>
                    <achievement.icon className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-sm font-medium ${
                      achievement.earned ? 'text-yellow-800' : 'text-gray-600'
                    }`}>
                      {achievement.title}
                    </h3>
                  </div>
                  {achievement.earned && (
                    <CheckCircle className="h-4 w-4 text-yellow-600" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Footer */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <Activity className="h-5 w-5 mr-2 text-indigo-600" />
            Recent Activity
          </h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">
                  <span className="font-medium">Assignment submitted:</span> Database Design Project
                </p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">
                  <span className="font-medium">Course completed:</span> Introduction to React Hooks
                </p>
                <p className="text-xs text-gray-500">Yesterday</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">
                  <span className="font-medium">New message:</span> From Prof. Wilson about upcoming exam
                </p>
                <p className="text-xs text-gray-500">2 days ago</p>
              </div>
            </div>
          </div>
          <button className="mt-4 text-sm text-indigo-600 font-medium hover:text-indigo-700 transition-colors duration-200">
            View All Activity
          </button>
        </div>
      </div>
    </div>
  );
}