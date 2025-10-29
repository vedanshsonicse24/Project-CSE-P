import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Edit3, Save, X, Settings, FileText, BarChart3, Users, FolderOpen } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { DevContentEditor } from './DevContentEditor';

interface DeveloperDashboardProps {
  userName: string;
  initialSection?: string;
  onNavigateToSection?: (section: string) => void;
}

interface ContentSection {
  id: string;
  title: string;
  description: string;
  editable: boolean;
}

export function DeveloperDashboard({ userName, initialSection = "dashboard", onNavigateToSection }: DeveloperDashboardProps) {
  const [activeSection, setActiveSection] = useState(initialSection);
  const [showContentEditor, setShowContentEditor] = useState(false);
  const [contentEditorType, setContentEditorType] = useState<'announcements' | 'stats' | 'departments' | 'hero'>('announcements');
  
  const [contentSections, setContentSections] = useState<ContentSection[]>([
    {
      id: "announcements",
      title: "Homepage Announcements",
      description: "Manage announcements displayed on the homepage",
      editable: true
    },
    {
      id: "stats",
      title: "Achievement Statistics",
      description: "Update university statistics and achievements",
      editable: true
    },
    {
      id: "departments",
      title: "Department Information",
      description: "Edit department details and course offerings",
      editable: true
    },
    {
      id: "hero",
      title: "Hero Section",
      description: "Edit main hero section content and call-to-action",
      editable: true
    }
  ]);

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "content-manager", label: "Content Manager", icon: FileText },
    { id: "user-management", label: "User Management", icon: Users },
    { id: "system-settings", label: "System Settings", icon: Settings },
    { id: "file-manager", label: "File Manager", icon: FolderOpen }
  ];

  useEffect(() => {
    setActiveSection(initialSection);
  }, [initialSection]);

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    if (onNavigateToSection) {
      onNavigateToSection(section);
    }
  };

  const handleEditContent = (contentType: 'announcements' | 'stats' | 'departments' | 'hero') => {
    setContentEditorType(contentType);
    setShowContentEditor(true);
  };

  const renderDashboardOverview = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-blue-900 mb-2">
          Welcome back, {userName}
        </h1>
        <p className="text-gray-600 mb-8">
          Developer Portal - Manage content and system settings
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: "Active Users", value: "1,234", icon: Users, color: "bg-blue-500" },
          { title: "Content Sections", value: contentSections.length.toString(), icon: FileText, color: "bg-green-500" },
          { title: "System Status", value: "Online", icon: Settings, color: "bg-purple-500" },
          { title: "Last Update", value: "2 hrs ago", icon: BarChart3, color: "bg-orange-500" }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.color}`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Content Sections Overview */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Content Sections</h2>
          <div className="space-y-3">
            {contentSections.map((section, index) => (
              <div key={section.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">{section.title}</h3>
                  <p className="text-sm text-gray-600">{section.description}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditContent(section.id as 'announcements' | 'stats' | 'departments' | 'hero')}
                  className="flex items-center gap-2"
                >
                  <Edit3 className="h-4 w-4" />
                  Edit
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );

  const renderContentManager = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-blue-900 mb-2">Content Manager</h1>
        <p className="text-gray-600 mb-8">
          Edit and manage homepage content sections
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {contentSections.map((section, index) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditContent(section.id as 'announcements' | 'stats' | 'departments' | 'hero')}
                  className="flex items-center gap-2"
                >
                  <Edit3 className="h-4 w-4" />
                  Edit
                </Button>
              </div>
              <p className="text-gray-600 mb-4">{section.description}</p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">
                  Click Edit to modify this section's content
                </p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderSectionContent = () => {
    switch (activeSection) {
      case "dashboard":
        return renderDashboardOverview();
      case "content-manager":
        return renderContentManager();
      case "user-management":
        return (
          <div className="text-center py-20">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">User Management</h2>
            <p className="text-gray-600">Manage user accounts and permissions</p>
          </div>
        );
      case "system-settings":
        return (
          <div className="text-center py-20">
            <Settings className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">System Settings</h2>
            <p className="text-gray-600">Configure system-wide settings</p>
          </div>
        );
      case "file-manager":
        return (
          <div className="text-center py-20">
            <FolderOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">File Manager</h2>
            <p className="text-gray-600">Manage uploaded files and media</p>
          </div>
        );
      default:
        return renderDashboardOverview();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-900">Developer Portal</h2>
            <p className="text-sm text-gray-600">Content Management</p>
          </div>
          <nav className="p-4 space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSectionChange(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeSection === item.id
                    ? "bg-blue-100 text-blue-700 border border-blue-200"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {renderSectionContent()}
        </div>
      </div>

      {/* Content Editor Modal */}
      {showContentEditor && (
        <DevContentEditor 
          contentType={contentEditorType}
          onClose={() => setShowContentEditor(false)}
        />
      )}
    </div>
  );
}