'use client';
/* eslint-disable @next/next/no-img-element */

import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [modules, setModules] = useState({});
  const [lessons, setLessons] = useState({});
  const [objectives, setObjectives] = useState({});
  const [highlights, setHighlights] = useState({});
  
  const [courseTitle, setCourseTitle] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [courseHeroTitle, setCourseHeroTitle] = useState('');
  const [courseHeroImageFile, setCourseHeroImageFile] = useState(null);
  const [courseHeroImagePreview, setCourseHeroImagePreview] = useState('');
  const [courseImageFile, setCourseImageFile] = useState(null);
  const [courseImagePreview, setCourseImagePreview] = useState('');
  const [moduleTitle, setModuleTitle] = useState('');
  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonContent, setLessonContent] = useState('');
  const [objectiveText, setObjectiveText] = useState('');
  const [highlightText, setHighlightText] = useState('');
  
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [showAddModule, setShowAddModule] = useState({});
  const [showAddLesson, setShowAddLesson] = useState({});
  const [showObjectives, setShowObjectives] = useState({});
  const [showHighlights, setShowHighlights] = useState({});

  const [editingCourseId, setEditingCourseId] = useState(null);
  const [editingCourseTitle, setEditingCourseTitle] = useState('');
  const [editingCourseDescription, setEditingCourseDescription] = useState('');
  const [editingCourseHeroTitle, setEditingCourseHeroTitle] = useState('');
  const [editingHeroicImageFile, setEditingHeroicImageFile] = useState(null);
  const [editingHeroicImageUrl, setEditingHeroicImageUrl] = useState('');
  const [editingHeroicImagePreview, setEditingHeroicImagePreview] = useState('');
  const [editingCourseImageFile, setEditingCourseImageFile] = useState(null);
  const [editingCourseImageUrl, setEditingCourseImageUrl] = useState('');
  const [editingCourseImagePreview, setEditingCourseImagePreview] = useState('');
  const [editingModuleId, setEditingModuleId] = useState(null);
  const [editingModuleTitle, setEditingModuleTitle] = useState('');
  const [editingLessonId, setEditingLessonId] = useState(null);
  const [editingLessonTitle, setEditingLessonTitle] = useState('');
  const [editingLessonContent, setEditingLessonContent] = useState('');
  const [editingObjectiveId, setEditingObjectiveId] = useState(null);
  const [editingObjectiveText, setEditingObjectiveText] = useState('');
  const [editingHighlightId, setEditingHighlightId] = useState(null);
  const [editingHighlightText, setEditingHighlightText] = useState('');

  const fetchCourses = useCallback(async () => {
    const res = await axios.get('/api/courses');
    setCourses(res.data);
    try {
      await populateInitialCounts(res.data);
    } catch (err) {
      console.error('Failed to prefetch counts', err);
    }
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const addCourse = async () => {
    if (!courseTitle) return alert('Course title required');
    const formData = new FormData();
    formData.append('title', courseTitle);
    formData.append('description', courseDescription);
    if (courseHeroTitle) formData.append('heroictitle', courseHeroTitle);
    if (courseHeroImageFile) formData.append('heroicimage', courseHeroImageFile);
    if (courseImageFile) formData.append('image', courseImageFile);

    await axios.post('/api/courses', formData);
    setCourseTitle('');
    setCourseDescription('');
    setCourseHeroTitle('');
    setCourseHeroImageFile(null);
    setCourseHeroImagePreview('');
    setCourseImageFile(null);
    setCourseImagePreview('');
    setShowAddCourse(false);
    fetchCourses();
  };

  const deleteCourse = async (courseId) => {
    if (!confirm('Delete this course? This will remove all modules and lessons.')) return;
    try {
      await axios.delete(`/api/courses/${courseId}`);
      fetchCourses();
      if (selectedCourse === courseId) setSelectedCourse(null);
    } catch (error) {
      const message = error?.response?.data?.message || error?.message || 'Failed to delete course';
      alert(message);
    }
  };

  const addModule = async () => {
    if (!moduleTitle || !selectedCourse) return alert('Select course & title');
    await axios.post('/api/modules', { course_id: selectedCourse, title: moduleTitle });
    setModuleTitle('');
    setShowAddModule(prev => ({ ...prev, [selectedCourse]: false }));
    fetchModules(selectedCourse);
  };

  const deleteModule = async (moduleId, courseId) => {
    if (!confirm('Delete this module? This will remove all lessons.')) return;
    try {
      await axios.delete(`/api/modules`, { params: { id: moduleId } });
      fetchModules(courseId);
      if (selectedModule === moduleId) setSelectedModule(null);
    } catch (error) {
      const message = error?.response?.data?.message || error?.message || 'Failed to delete module';
      alert(message);
    }
  };

  const addLesson = async () => {
    if (!lessonTitle || !selectedModule) return alert('Select module & title');
    await axios.post('/api/lessons/', { module_id: selectedModule, title: lessonTitle, content: lessonContent });
    setLessonTitle('');
    setLessonContent('');
    setShowAddLesson(prev => ({ ...prev, [selectedModule]: false }));
    fetchLessons(selectedModule);
  };

  const deleteLesson = async (lessonId, moduleId) => {
    if (!confirm('Delete this lesson?')) return;
    try {
      await axios.delete(`/api/lessons`, { params: { id: lessonId } });
      fetchLessons(moduleId);
    } catch (error) {
      const message = error?.response?.data?.message || error?.message || 'Failed to delete lesson';
      alert(message);
    }
  };

  const fetchObjectives = async (courseId) => {
    try {
      const res = await axios.get(`/api/courses/objectives`, { params: { courseId } });
      setObjectives(prev => ({ ...prev, [courseId]: res.data }));
    } catch (error) {
      console.error('Error fetching objectives:', error);
    }
  };

  const addObjective = async (courseId) => {
    if (!objectiveText) return alert('Objective text required');
    try {
      await axios.post('/api/courses/objectives', { course_id: courseId, objective: objectiveText });
      setObjectiveText('');
      fetchObjectives(courseId);
    } catch (error) {
      alert('Failed to add objective');
    }
  };

  const updateObjective = async (objectiveId, courseId) => {
    if (!editingObjectiveText) return alert('Objective text required');
    try {
      await axios.put(`/api/courses/objectives/${objectiveId}`, { objective: editingObjectiveText });
      setEditingObjectiveId(null);
      setEditingObjectiveText('');
      fetchObjectives(courseId);
    } catch (error) {
      alert('Failed to update objective');
    }
  };

  const deleteObjective = async (objectiveId, courseId) => {
    if (!confirm('Delete this objective?')) return;
    try {
      await axios.delete(`/api/courses/objectives/${objectiveId}`);
      fetchObjectives(courseId);
    } catch (error) {
      alert('Failed to delete objective');
    }
  };

  // Highlights
  const fetchHighlights = async (courseId) => {
    try {
      const res = await axios.get(`/api/courses/highlights`, { params: { courseId } });
      setHighlights(prev => ({ ...prev, [courseId]: res.data }));
    } catch (error) {
      console.error('Error fetching highlights:', error);
    }
  };

  const addHighlight = async (courseId) => {
    if (!highlightText) return alert('Highlight text required');
    try {
      await axios.post('/api/courses/highlights', { course_id: courseId, highlight: highlightText });
      setHighlightText('');
      fetchHighlights(courseId);
    } catch (error) {
      alert('Failed to add highlight');
    }
  };

  const updateHighlight = async (highlightId, courseId) => {
    if (!editingHighlightText) return alert('Highlight text required');
    try {
      await axios.put(`/api/courses/highlights/${highlightId}`, { highlight: editingHighlightText });
      setEditingHighlightId(null);
      setEditingHighlightText('');
      fetchHighlights(courseId);
    } catch (error) {
      alert('Failed to update highlight');
    }
  };

  const deleteHighlight = async (highlightId, courseId) => {
    if (!confirm('Delete this highlight?')) return;
    try {
      await axios.delete(`/api/courses/highlights/${highlightId}`);
      fetchHighlights(courseId);
    } catch (error) {
      alert('Failed to delete highlight');
    }
  };

  const fetchModules = async (courseId) => {
    const res = await axios.get(`/api/modules`, { params: { courseId } });
    setModules((prev) => ({ ...prev, [courseId]: res.data }));
  };

  const fetchLessons = async (moduleId) => {
    const res = await axios.get(`/api/lessons`, { params: { moduleId } });
    setLessons((prev) => ({ ...prev, [moduleId]: res.data }));
  };

  const populateInitialCounts = async (coursesList) => {
    if (!Array.isArray(coursesList) || coursesList.length === 0) return;

    const moduleResults = await Promise.all(
      coursesList.map((c) => axios.get(`/api/modules`, { params: { courseId: c.id } }))
    );

    const nextModules = {};
    const allModules = [];
    coursesList.forEach((c, idx) => {
      const rows = moduleResults[idx]?.data || [];
      nextModules[c.id] = rows;
      allModules.push(...rows);
    });
    setModules((prev) => ({ ...prev, ...nextModules }));

    if (allModules.length === 0) return;

    const lessonResults = await Promise.all(
      allModules.map((m) => axios.get(`/api/lessons`, { params: { moduleId: m.id } }))
    );

    const nextLessons = {};
    allModules.forEach((m, idx) => {
      nextLessons[m.id] = lessonResults[idx]?.data || [];
    });
    setLessons((prev) => ({ ...prev, ...nextLessons }));
  };

  const startEditCourse = (course) => {
    setEditingCourseId(course.id);
    setEditingCourseTitle(course.title || '');
    setEditingCourseDescription(course.description || '');
    setEditingCourseHeroTitle(course.heroictitle || '');
    setEditingHeroicImageUrl(course.heroicimage || '');
    setEditingHeroicImageFile(null);
    setEditingHeroicImagePreview('');
    setEditingCourseImageUrl(course.image || '');
    setEditingCourseImageFile(null);
    setEditingCourseImagePreview('');
  };

  const cancelEditCourse = () => {
    setEditingCourseId(null);
    setEditingCourseTitle('');
    setEditingCourseDescription('');
    setEditingCourseHeroTitle('');
    setEditingHeroicImageFile(null);
    setEditingHeroicImageUrl('');
    setEditingHeroicImagePreview('');
    setEditingCourseImageFile(null);
    setEditingCourseImageUrl('');
    setEditingCourseImagePreview('');
  };

  const saveCourseEdit = async (courseId) => {
    if (!editingCourseTitle) return alert('Title required');
    try {
      const formData = new FormData();
      formData.append('title', editingCourseTitle);
      formData.append('description', editingCourseDescription);
      formData.append('heroictitle', editingCourseHeroTitle || '');
      if (editingHeroicImageFile) {
        formData.append('heroicimage', editingHeroicImageFile);
      } else if (editingHeroicImageUrl) {
        // Keep existing image if no new file selected
        formData.append('heroicimage', editingHeroicImageUrl);
      }
      if (editingCourseImageFile) {
        formData.append('image', editingCourseImageFile);
      } else if (editingCourseImageUrl) {
        // Keep existing image if no new file selected
        formData.append('image', editingCourseImageUrl);
      }

      await axios.put(`/api/courses/${courseId}`, formData);
      setEditingCourseId(null);
      setEditingCourseTitle('');
      setEditingCourseDescription('');
      setEditingCourseHeroTitle('');
      setEditingHeroicImageFile(null);
      setEditingHeroicImageUrl('');
      setEditingCourseImageFile(null);
      setEditingCourseImageUrl('');
      fetchCourses();
    } catch (error) {
      const message = error?.response?.data?.message || error?.message || 'Failed to update course';
      alert(message);
    }
  };

  const startEditModule = (mod) => {
    setEditingModuleId(mod.id);
    setEditingModuleTitle(mod.title || '');
  };

  const cancelEditModule = () => {
    setEditingModuleId(null);
    setEditingModuleTitle('');
  };

  const saveModuleEdit = async (moduleId, courseId) => {
    if (!editingModuleTitle) return alert('Title required');
    try {
      await axios.put(`/api/modules`, { title: editingModuleTitle }, { params: { id: moduleId } });
      setEditingModuleId(null);
      setEditingModuleTitle('');
      fetchModules(courseId);
    } catch (error) {
      const message = error?.response?.data?.message || error?.message || 'Failed to update module';
      alert(message);
    }
  };

  const startEditLesson = (lesson) => {
    setEditingLessonId(lesson.id);
    setEditingLessonTitle(lesson.title || '');
    setEditingLessonContent(lesson.content || '');
  };

  const cancelEditLesson = () => {
    setEditingLessonId(null);
    setEditingLessonTitle('');
    setEditingLessonContent('');
  };

  const saveLessonEdit = async (lessonId, moduleId) => {
    if (!editingLessonTitle) return alert('Title required');
    try {
      await axios.put(`/api/lessons`, { title: editingLessonTitle, content: editingLessonContent }, { params: { id: lessonId } });
      setEditingLessonId(null);
      setEditingLessonTitle('');
      setEditingLessonContent('');
      fetchLessons(moduleId);
    } catch (error) {
      const message = error?.response?.data?.message || error?.message || 'Failed to update lesson';
      alert(message);
    }
  };

  return (
    <div className="min-h-screen admin-main ml-64 bg-slate-50">
      <motion.div initial={{ y: -12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.4 }} className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">Course Management</h1>
              <p className="text-slate-500 text-sm mt-1">Create, organize and manage courses, modules and lessons</p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="mb-6">
          <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} onClick={() => setShowAddCourse(!showAddCourse)} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium shadow-sm">
            {showAddCourse ? '✖ Cancel' : 'Add New Course'}
          </motion.button>
        </motion.div>

        <AnimatePresence>
          {showAddCourse && (
            <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }} className="bg-white rounded-xl border border-slate-200 p-6 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                  <span className="text-white text-xl font-bold">+</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">Create New Course</h2>
                  <p className="text-sm text-slate-500">Add a new course to your curriculum</p>
                </div>
              </div>
              <div className="space-y-3">
                <input type="text" placeholder="Enter course title..." value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)} className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-700 placeholder:text-slate-400" />
                <input type="text" placeholder="Enter course hero title..." value={courseHeroTitle} onChange={(e) => setCourseHeroTitle(e.target.value)} className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-700 placeholder:text-slate-400" />
                <textarea placeholder="Enter course description..." value={courseDescription} onChange={(e) => setCourseDescription(e.target.value)} className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-700 placeholder:text-slate-400 min-h-24 resize-y" />
                <div className="flex items-center gap-3">
                  {courseHeroImagePreview && (
                    <img src={courseHeroImagePreview} alt="Preview" className="h-12 w-12 object-cover rounded border" />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files && e.target.files[0] ? e.target.files[0] : null;
                      setCourseHeroImageFile(file);
                      setCourseHeroImagePreview(file ? URL.createObjectURL(file) : '');
                    }}
                    className="block w-full text-sm text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>
                <div className="flex items-center gap-3">
                  {courseImagePreview && (
                    <img src={courseImagePreview} alt="Course Image Preview" className="h-12 w-12 object-cover rounded border" />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files && e.target.files[0] ? e.target.files[0] : null;
                      setCourseImageFile(file);
                      setCourseImagePreview(file ? URL.createObjectURL(file) : '');
                    }}
                    className="block w-full text-sm text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  <span className="text-xs text-slate-500">Course Image</span>
                </div>
                <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} onClick={addCourse} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium shadow-sm">
                  Add Course
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-6">All Courses</h2>
          {courses.length === 0 ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="bg-white rounded-2xl border-2 border-dashed border-slate-300 p-16 text-center">
              <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">📚</span>
              </div>
              <h3 className="text-xl font-bold text-slate-700 mb-2">No courses yet</h3>
              <p className="text-slate-500">Create your first course to get started with your learning platform</p>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {courses.map((course, idx) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden transition-all hover:shadow-xl hover:border-slate-300"
                >
                  <div className="p-8">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <motion.div whileHover={{ rotate: 360, scale: 1.1 }} transition={{ duration: 0.5 }} className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-md cursor-pointer">
                            <span className="text-white text-xl">📖</span>
                          </motion.div>
                          <div className="flex-1">
                            {editingCourseId === course.id ? (
                              <div className="space-y-2">
                                <input
                                  type="text"
                                  value={editingCourseTitle}
                                  onChange={(e) => setEditingCourseTitle(e.target.value)}
                                  className="w-full border-2 border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                />
                                <input
                                  type="text"
                                  value={editingCourseHeroTitle}
                                  onChange={(e) => setEditingCourseHeroTitle(e.target.value)}
                                  placeholder="Hero title"
                                  className="w-full border-2 border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                />
                                <textarea
                                  value={editingCourseDescription}
                                  onChange={(e) => setEditingCourseDescription(e.target.value)}
                                  className="w-full border-2 border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 min-h-20"
                                />
                                <div className="flex items-center gap-3">
                                  {editingHeroicImagePreview ? (
                                    <img src={editingHeroicImagePreview} alt="Preview" className="h-12 w-12 object-cover rounded border" />
                                  ) : (
                                    editingHeroicImageUrl && (
                                      <img src={editingHeroicImageUrl} alt="Current" className="h-12 w-12 object-cover rounded" />
                                    )
                                  )}
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                      const file = e.target.files && e.target.files[0] ? e.target.files[0] : null;
                                      setEditingHeroicImageFile(file);
                                      setEditingHeroicImagePreview(file ? URL.createObjectURL(file) : '');
                                    }}
                                    className="block w-full text-sm text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                                  />
                                </div>
                                <div className="flex items-center gap-3">
                                  {editingCourseImagePreview ? (
                                    <img src={editingCourseImagePreview} alt="Course Image Preview" className="h-12 w-12 object-cover rounded border" />
                                  ) : (
                                    editingCourseImageUrl && (
                                      <img src={editingCourseImageUrl} alt="Current Course Image" className="h-12 w-12 object-cover rounded" />
                                    )
                                  )}
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                      const file = e.target.files && e.target.files[0] ? e.target.files[0] : null;
                                      setEditingCourseImageFile(file);
                                      setEditingCourseImagePreview(file ? URL.createObjectURL(file) : '');
                                    }}
                                    className="block w-full text-sm text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                                  />
                                </div>
                                <div className="flex gap-2">
                                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => saveCourseEdit(course.id)} className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 rounded-lg text-xs font-semibold">
                                    Save
                                  </motion.button>
                                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={cancelEditCourse} className="bg-slate-200 hover:bg-slate-300 text-slate-800 px-3 py-2 rounded-lg text-xs font-semibold">
                                    Cancel
                                  </motion.button>
                                </div>
                              </div>
                            ) : (
                              <>
                                <div className="flex items-center gap-2">
                                  <h3 className="text-2xl font-bold text-slate-800">{course.title}</h3>
                                  <button onClick={() => startEditCourse(course)} className="text-slate-500 hover:text-slate-700 text-sm" title="Edit course">
                                    ✏️
                                  </button>
                                </div>
                                {course.heroictitle && (
                                  <p className="text-sm text-emerald-700 mt-1 font-medium">{course.heroictitle}</p>
                                )}
                                <div className="flex items-center gap-4 mt-2">
                                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-slate-500 flex items-center gap-1">
                                    <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }} className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></motion.span>
                                    {modules[course.id]?.length || 0} modules
                                  </motion.span>
                                  <span className="text-sm text-slate-400">•</span>
                                  <span className="text-sm text-slate-500">
                                    {modules[course.id]?.reduce((acc, mod) => acc + (lessons[mod.id]?.length || 0), 0) || 0} lessons
                                  </span>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} onClick={() => deleteCourse(course.id)} className="bg-white ml-[15px] border border-slate-300 text-slate-700 hover:bg-slate-50 px-4 py-2.5 rounded-lg text-sm font-medium">
                          Delete
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            const isOpen = selectedCourse === course.id;
                            setSelectedCourse(isOpen ? null : course.id);
                            if (!isOpen) {
                              fetchModules(course.id);
                              fetchObjectives(course.id);
                              fetchHighlights(course.id);
                            }
                          }}
                          className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 py-3 rounded-xl text-sm font-semibold transition shadow-md hover:shadow-lg whitespace-nowrap"
                        >
                          {selectedCourse === course.id ? '▲ Hide Details' : '▼ Show Details'}
                        </motion.button>
                      </div>
                    </div>

                    <AnimatePresence>
                      {selectedCourse === course.id && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="mt-6 pt-6 border-t-2 border-slate-100 space-y-6">
                          {(course.heroicimage || course.heroictitle || course.image) ? (
                            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-5 border border-emerald-200 flex items-center gap-4">
                              {course.heroicimage && (
                                <img src={course.heroicimage} alt="Hero" className="h-24 w-36 object-cover rounded-lg border border-emerald-200" />
                              )}
                              {course.image && !course.heroicimage && (
                                <img src={course.image} alt="Course" className="h-24 w-36 object-cover rounded-lg border border-emerald-200" />
                              )}
                              <div className="min-w-0">
                                <h4 className="text-lg font-bold text-slate-800 truncate">{course.heroictitle || 'Course Image'}</h4>
                                {course.description && (
                                  <p className="text-sm text-slate-600 mt-1 line-clamp-2">{course.description}</p>
                                )}
                              </div>
                            </div>
                          ) : null}
                          
                          {/* Objectives Section */}
                          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                            <div className="flex justify-between items-center mb-4">
                              <h4 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                🎯 Learning Objectives
                              </h4>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setShowObjectives(prev => ({ ...prev, [course.id]: !prev[course.id] }))}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-semibold"
                              >
                                {showObjectives[course.id] ? '✖ Cancel' : '+ Add Objective'}
                              </motion.button>
                            </div>

                            <AnimatePresence>
                              {showObjectives[course.id] && (
                                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mb-4">
                                  <div className="flex gap-2">
                                    <input
                                      type="text"
                                      placeholder="Enter objective..."
                                      value={objectiveText}
                                      onChange={(e) => setObjectiveText(e.target.value)}
                                      onKeyPress={(e) => e.key === 'Enter' && addObjective(course.id)}
                                      className="flex-1 border-2 border-blue-300 bg-white rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => addObjective(course.id)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold">
                                      Add
                                    </motion.button>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>

                            {objectives[course.id]?.length > 0 ? (
                              <ul className="space-y-2">
                                {objectives[course.id].map((obj, i) => (
                                  <motion.li key={obj.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="flex items-start gap-3 bg-white rounded-lg p-3 border border-blue-200">
                                    <span className="text-blue-600 font-bold">•</span>
                                    {editingObjectiveId === obj.id ? (
                                      <div className="flex-1 flex gap-2">
                                        <input
                                          type="text"
                                          value={editingObjectiveText}
                                          onChange={(e) => setEditingObjectiveText(e.target.value)}
                                          className="flex-1 border border-slate-300 rounded px-2 py-1 text-sm"
                                        />
                                        <button onClick={() => updateObjective(obj.id, course.id)} className="text-xs bg-blue-600 text-white px-2 py-1 rounded">Save</button>
                                        <button onClick={() => { setEditingObjectiveId(null); setEditingObjectiveText(''); }} className="text-xs bg-slate-300 px-2 py-1 rounded">Cancel</button>
                                      </div>
                                    ) : (
                                      <>
                                        <span className="flex-1 text-sm text-slate-700">{obj.objective}</span>
                                        <div className="flex gap-1">
                                          <button onClick={() => { setEditingObjectiveId(obj.id); setEditingObjectiveText(obj.objective); }} className="text-xs text-slate-500 hover:text-slate-700">✏️</button>
                                          <button onClick={() => deleteObjective(obj.id, course.id)} className="text-xs text-red-500 hover:text-red-700">🗑️</button>
                                        </div>
                                      </>
                                    )}
                                  </motion.li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-sm text-slate-500 text-center py-4">No objectives added yet</p>
                            )}
                          </div>

                          {/* Highlights Section */}
                          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200">
                            <div className="flex justify-between items-center mb-4">
                              <h4 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                ⭐ Course Highlights
                              </h4>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setShowHighlights(prev => ({ ...prev, [course.id]: !prev[course.id] }))}
                                className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg text-xs font-semibold"
                              >
                                {showHighlights[course.id] ? '✖ Cancel' : '+ Add Highlight'}
                              </motion.button>
                            </div>

                            <AnimatePresence>
                              {showHighlights[course.id] && (
                                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mb-4">
                                  <div className="flex gap-2">
                                    <input
                                      type="text"
                                      placeholder="Enter highlight..."
                                      value={highlightText}
                                      onChange={(e) => setHighlightText(e.target.value)}
                                      onKeyPress={(e) => e.key === 'Enter' && addHighlight(course.id)}
                                      className="flex-1 border-2 border-amber-300 bg-white rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                                    />
                                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => addHighlight(course.id)} className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg text-sm font-semibold">
                                      Add
                                    </motion.button>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>

                            {highlights[course.id]?.length > 0 ? (
                              <ul className="space-y-2">
                                {highlights[course.id].map((highlight, i) => (
                                  <motion.li key={highlight.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="flex items-start gap-3 bg-white rounded-lg p-3 border border-amber-200">
                                    <span className="text-amber-600 font-bold -mt-0.5">★</span>
                                    {editingHighlightId === highlight.id ? (
                                      <div className="flex-1 flex gap-2">
                                        <input
                                          type="text"
                                          value={editingHighlightText}
                                          onChange={(e) => setEditingHighlightText(e.target.value)}
                                          className="flex-1 border border-slate-300 rounded px-2 py-1 text-sm"
                                        />
                                        <button onClick={() => updateHighlight(highlight.id, course.id)} className="text-xs bg-amber-600 text-white px-2 py-1 rounded">Save</button>
                                        <button onClick={() => { setEditingHighlightId(null); setEditingHighlightText(''); }} className="text-xs bg-slate-300 px-2 py-1 rounded">Cancel</button>
                                      </div>
                                    ) : (
                                      <>
                                        <span className="flex-1 text-sm text-slate-700">{highlight.highlight}</span>
                                        <div className="flex gap-1">
                                          <button onClick={() => { setEditingHighlightId(highlight.id); setEditingHighlightText(highlight.highlight); }} className="text-xs text-slate-500 hover:text-slate-700">✏️</button>
                                          <button onClick={() => deleteHighlight(highlight.id, course.id)} className="text-xs text-red-500 hover:text-red-700">🗑️</button>
                                        </div>
                                      </>
                                    )}
                                  </motion.li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-sm text-slate-500 text-center py-4">No highlights added yet</p>
                            )}
                          </div>

                          {/* Modules Section */}
                          <div>
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6">
                              <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setShowAddModule(prev => ({ ...prev, [course.id]: !prev[course.id] }))}
                                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl text-sm font-semibold transition shadow-md hover:shadow-lg"
                              >
                                {showAddModule[course.id] ? '✖ Cancel' : '+ Add New Module'}
                              </motion.button>
                            </motion.div>

                            <AnimatePresence>
                              {showAddModule[course.id] && (
                                <motion.div
                                  initial={{ opacity: 0, y: -20, scale: 0.95 }}
                                  animate={{ opacity: 1, y: 0, scale: 1 }}
                                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                                  transition={{ duration: 0.3 }}
                                  className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 mb-6 border border-slate-200"
                                >
                                  <h4 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
                                    Add New Module
                                  </h4>
                                  <div className="flex gap-3">
                                    <input
                                      type="text"
                                      placeholder="Module title..."
                                      value={moduleTitle}
                                      onChange={(e) => setModuleTitle(e.target.value)}
                                      onKeyPress={(e) => e.key === 'Enter' && addModule()}
                                      className="flex-1 border-2 border-slate-200 bg-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                    />
                                    <motion.button
                                      whileHover={{ scale: 1.02 }}
                                      whileTap={{ scale: 0.98 }}
                                      onClick={addModule}
                                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition shadow-md hover:shadow-lg"
                                    >
                                      Add Module
                                    </motion.button>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>

                            {modules[course.id]?.length === 0 ? (
                              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8">
                                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                                  <span className="text-xl">📋</span>
                                </div>
                                <p className="text-sm text-slate-500 font-medium">
                                  No modules yet. Add your first module above.
                                </p>
                              </motion.div>
                            ) : (
                              <div className="space-y-4">
                                {modules[course.id]?.map((mod, idx) => (
                                  <motion.div
                                    key={mod.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="bg-gradient-to-br from-white to-slate-50 rounded-xl border-2 border-slate-200 shadow-sm hover:shadow-md transition-all"
                                  >
                                    <div className="p-6">
                                      <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-4">
                                          <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }} className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center text-sm font-bold text-white shadow-md cursor-pointer">
                                            {idx + 1}
                                          </motion.div>
                                          <div>
                                            {editingModuleId === mod.id ? (
                                              <div className="flex items-center gap-2">
                                                <input
                                                  type="text"
                                                  value={editingModuleTitle}
                                                  onChange={(e) => setEditingModuleTitle(e.target.value)}
                                                  className="border-2 border-slate-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                                />
                                                <motion.button
                                                  whileHover={{ scale: 1.05 }}
                                                  whileTap={{ scale: 0.95 }}
                                                  onClick={() => saveModuleEdit(mod.id, course.id)}
                                                  className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold"
                                                >
                                                  Save
                                                </motion.button>
                                                <motion.button
                                                  whileHover={{ scale: 1.05 }}
                                                  whileTap={{ scale: 0.95 }}
                                                  onClick={cancelEditModule}
                                                  className="bg-slate-200 hover:bg-slate-300 text-slate-800 px-3 py-1.5 rounded-lg text-xs font-semibold"
                                                >
                                                  Cancel
                                                </motion.button>
                                              </div>
                                            ) : (
                                              <div className="flex items-center gap-2">
                                                <h5 className="font-bold text-slate-800 text-lg">{mod.title}</h5>
                                                <button
                                                  onClick={() => startEditModule(mod)}
                                                  className="text-slate-500 hover:text-slate-700 text-sm"
                                                  title="Edit module"
                                                >
                                                  ✏️
                                                </button>
                                              </div>
                                            )}
                                            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                                              <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} className="w-1.5 h-1.5 bg-purple-500 rounded-full"></motion.span>
                                              {lessons[mod.id]?.length || 0} lessons
                                            </p>
                                          </div>
                                        </div>
                                        <div className="flex gap-2">
                                          <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} onClick={() => deleteModule(mod.id, course.id)} className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-3 py-2 rounded-lg text-xs font-medium">
                                            Delete
                                          </motion.button>
                                          <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => {
                                              setSelectedModule(selectedModule === mod.id ? null : mod.id);
                                              if (selectedModule !== mod.id) fetchLessons(mod.id);
                                            }}
                                            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition shadow-md hover:shadow-lg"
                                          >
                                            {selectedModule === mod.id ? '▲ Hide' : '▼ Lessons'}
                                          </motion.button>
                                        </div>
                                      </div>

                                      <AnimatePresence>
                                        {selectedModule === mod.id && (
                                          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="mt-6 pt-6 border-t-2 border-slate-100">
                                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-4">
                                              <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => setShowAddLesson(prev => ({ ...prev, [mod.id]: !prev[mod.id] }))}
                                                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition shadow-md hover:shadow-lg"
                                              >
                                                {showAddLesson[mod.id] ? '✖ Cancel' : '+ Add New Lesson'}
                                              </motion.button>
                                            </motion.div>

                                            <AnimatePresence>
                                              {showAddLesson[mod.id] && (
                                                <motion.div
                                                  initial={{ opacity: 0, y: -20, scale: 0.95 }}
                                                  animate={{ opacity: 1, y: 0, scale: 1 }}
                                                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                                                  transition={{ duration: 0.3 }}
                                                  className="bg-white rounded-xl p-5 mb-4 border-2 border-slate-200 shadow-sm"
                                                >
                                                  <h6 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
                                                    Add New Lesson
                                                  </h6>
                                                  <input
                                                    type="text"
                                                    placeholder="Lesson title..."
                                                    value={lessonTitle}
                                                    onChange={(e) => setLessonTitle(e.target.value)}
                                                    className="w-full border-2 border-slate-200 rounded-lg px-4 py-2.5 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                                                  />
                                                  <textarea
                                                    placeholder="Lesson Objective..."
                                                    value={lessonContent}
                                                    onChange={(e) => setLessonContent(e.target.value)}
                                                    className="w-full border-2 border-slate-200 rounded-lg px-4 py-2.5 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition min-h-28 resize-y"
                                                  />
                                                  <motion.button
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    onClick={addLesson}
                                                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition shadow-md hover:shadow-lg w-full"
                                                  >
                                                    Add Lesson
                                                  </motion.button>
                                                </motion.div>
                                              )}
                                            </AnimatePresence>

                                            {lessons[mod.id]?.length === 0 ? (
                                              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-6">
                                                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                                                  <span className="text-lg">📝</span>
                                                </div>
                                                <p className="text-xs text-slate-500 font-medium">No lessons yet.</p>
                                              </motion.div>
                                            ) : (
                                              <div className="space-y-3">
                                                {lessons[mod.id]?.map((lesson, lessonIdx) => (
                                                  <motion.div
                                                    key={lesson.id}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: lessonIdx * 0.05 }}
                                                    whileHover={{ scale: 1.01 }}
                                                    className="bg-white rounded-lg border-2 border-slate-200 p-4 hover:border-slate-300 transition-colors shadow-sm"
                                                  >
                                                    <div className="flex items-start gap-3">
                                                      <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }} className="w-7 h-7 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center text-xs font-bold text-white shadow-sm flex-shrink-0 mt-0.5 cursor-pointer">
                                                        {lessonIdx + 1}
                                                      </motion.div>
                                                      <div className="flex-1 min-w-0">
                                                        {editingLessonId === lesson.id ? (
                                                          <div className="mb-3">
                                                            <input
                                                              type="text"
                                                              value={editingLessonTitle}
                                                              onChange={(e) => setEditingLessonTitle(e.target.value)}
                                                              className="w-full border-2 border-slate-200 rounded-lg px-3 py-2 text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                                                              placeholder="Lesson title"
                                                            />
                                                            <textarea
                                                              value={editingLessonContent}
                                                              onChange={(e) => setEditingLessonContent(e.target.value)}
                                                              className="w-full border-2 border-slate-200 rounded-lg px-3 py-2 text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 min-h-24"
                                                              placeholder="Lesson content"
                                                            />
                                                            <div className="flex gap-2">
                                                              <motion.button
                                                                whileHover={{ scale: 1.05 }}
                                                                whileTap={{ scale: 0.95 }}
                                                                onClick={() => saveLessonEdit(lesson.id, mod.id)}
                                                                className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold"
                                                              >
                                                                Save
                                                              </motion.button>
                                                              <motion.button
                                                                whileHover={{ scale: 1.05 }}
                                                                whileTap={{ scale: 0.95 }}
                                                                onClick={cancelEditLesson}
                                                                className="bg-slate-200 hover:bg-slate-300 text-slate-800 px-3 py-1.5 rounded-lg text-xs font-semibold"
                                                              >
                                                                Cancel
                                                              </motion.button>
                                                            </div>
                                                          </div>
                                                        ) : (
                                                          <>
                                                            <h6 className="font-bold text-slate-800 text-sm mb-2">
                                                              {lesson.title}
                                                            </h6>
                                                            <p className="text-sm text-slate-600 leading-relaxed mb-3">
                                                              {lesson.content}
                                                            </p>
                                                          </>
                                                        )}
                                                        {editingLessonId !== lesson.id && (
                                                          <button
                                                            onClick={() => startEditLesson(lesson)}
                                                            className="text-slate-500 hover:text-slate-700 text-xs mr-2"
                                                            title="Edit lesson"
                                                          >
                                                            ✏️ Edit
                                                          </button>
                                                        )}
                                                        <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} onClick={() => deleteLesson(lesson.id, mod.id)} className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-3 py-1.5 rounded-lg text-xs font-medium">
                                                          Delete
                                                        </motion.button>
                                                      </div>
                                                    </div>
                                                  </motion.div>
                                                ))}
                                              </div>
                                            )}
                                          </motion.div>
                                        )}
                                      </AnimatePresence>
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}