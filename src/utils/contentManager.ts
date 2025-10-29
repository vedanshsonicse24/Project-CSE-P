// Content management utility for developer portal
export interface AnnouncementContent {
  id: string;
  title: string;
  content: string;
  date: string;
  category: string;
  isActive: boolean;
}

export interface StatContent {
  id: string;
  title: string;
  value: string;
  description: string;
  icon: string;
  isActive: boolean;
}

export interface DepartmentContent {
  id: string;
  name: string;
  description: string;
  icon: string;
  isActive: boolean;
}

export interface HeroContent {
  title: string;
  subtitle: string;
  description: string;
  backgroundVideo?: string;
  ctaText: string;
  isActive: boolean;
}

export class ContentManager {
  private static STORAGE_KEYS = {
    announcements: 'sankhya_announcements',
    stats: 'sankhya_stats',
    departments: 'sankhya_departments',
    hero: 'sankhya_hero'
  };

  // Announcements Management
  static getAnnouncements(): AnnouncementContent[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEYS.announcements);
      return stored ? JSON.parse(stored) : this.getDefaultAnnouncements();
    } catch {
      return this.getDefaultAnnouncements();
    }
  }

  static saveAnnouncements(announcements: AnnouncementContent[]): void {
    localStorage.setItem(this.STORAGE_KEYS.announcements, JSON.stringify(announcements));
  }

  static addAnnouncement(announcement: Omit<AnnouncementContent, 'id'>): void {
    const announcements = this.getAnnouncements();
    const newAnnouncement = {
      ...announcement,
      id: Date.now().toString()
    };
    announcements.push(newAnnouncement);
    this.saveAnnouncements(announcements);
  }

  static updateAnnouncement(id: string, updates: Partial<AnnouncementContent>): void {
    const announcements = this.getAnnouncements();
    const index = announcements.findIndex(a => a.id === id);
    if (index !== -1) {
      announcements[index] = { ...announcements[index], ...updates };
      this.saveAnnouncements(announcements);
    }
  }

  static deleteAnnouncement(id: string): void {
    const announcements = this.getAnnouncements();
    const filtered = announcements.filter(a => a.id !== id);
    this.saveAnnouncements(filtered);
  }

  // Stats Management
  static getStats(): StatContent[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEYS.stats);
      return stored ? JSON.parse(stored) : this.getDefaultStats();
    } catch {
      return this.getDefaultStats();
    }
  }

  static saveStats(stats: StatContent[]): void {
    localStorage.setItem(this.STORAGE_KEYS.stats, JSON.stringify(stats));
  }

  static addStat(stat: Omit<StatContent, 'id'>): void {
    const stats = this.getStats();
    const newStat = {
      ...stat,
      id: Date.now().toString()
    };
    stats.push(newStat);
    this.saveStats(stats);
  }

  static updateStat(id: string, updates: Partial<StatContent>): void {
    const stats = this.getStats();
    const index = stats.findIndex(s => s.id === id);
    if (index !== -1) {
      stats[index] = { ...stats[index], ...updates };
      this.saveStats(stats);
    }
  }

  static deleteStat(id: string): void {
    const stats = this.getStats();
    const filtered = stats.filter(s => s.id !== id);
    this.saveStats(filtered);
  }

  // Departments Management
  static getDepartments(): DepartmentContent[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEYS.departments);
      return stored ? JSON.parse(stored) : this.getDefaultDepartments();
    } catch {
      return this.getDefaultDepartments();
    }
  }

  static saveDepartments(departments: DepartmentContent[]): void {
    localStorage.setItem(this.STORAGE_KEYS.departments, JSON.stringify(departments));
  }

  static addDepartment(department: Omit<DepartmentContent, 'id'>): void {
    const departments = this.getDepartments();
    const newDepartment = {
      ...department,
      id: Date.now().toString()
    };
    departments.push(newDepartment);
    this.saveDepartments(departments);
  }

  static updateDepartment(id: string, updates: Partial<DepartmentContent>): void {
    const departments = this.getDepartments();
    const index = departments.findIndex(d => d.id === id);
    if (index !== -1) {
      departments[index] = { ...departments[index], ...updates };
      this.saveDepartments(departments);
    }
  }

  static deleteDepartment(id: string): void {
    const departments = this.getDepartments();
    const filtered = departments.filter(d => d.id !== id);
    this.saveDepartments(filtered);
  }

  // Hero Content Management
  static getHeroContent(): HeroContent {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEYS.hero);
      return stored ? JSON.parse(stored) : this.getDefaultHeroContent();
    } catch {
      return this.getDefaultHeroContent();
    }
  }

  static saveHeroContent(hero: HeroContent): void {
    localStorage.setItem(this.STORAGE_KEYS.hero, JSON.stringify(hero));
  }

  // Default Content
  private static getDefaultAnnouncements(): AnnouncementContent[] {
    return [
      {
        id: '1',
        title: 'Welcome to Sankhya University',
        content: 'We are excited to announce the launch of our new digital platform.',
        date: new Date().toISOString().split('T')[0],
        category: 'General',
        isActive: true
      },
      {
        id: '2',
        title: 'Academic Year 2024-25',
        content: 'Registration for the new academic year is now open.',
        date: new Date().toISOString().split('T')[0],
        category: 'Academic',
        isActive: true
      }
    ];
  }

  private static getDefaultStats(): StatContent[] {
    return [
      {
        id: '1',
        title: 'Students Enrolled',
        value: '15,000+',
        description: 'Active students across all programs',
        icon: 'Users',
        isActive: true
      },
      {
        id: '2',
        title: 'Faculty Members',
        value: '500+',
        description: 'Distinguished educators and researchers',
        icon: 'GraduationCap',
        isActive: true
      },
      {
        id: '3',
        title: 'Research Projects',
        value: '200+',
        description: 'Ongoing research initiatives',
        icon: 'BookOpen',
        isActive: true
      },
      {
        id: '4',
        title: 'Campus Area',
        value: '100 Acres',
        description: 'Beautifully landscaped campus',
        icon: 'MapPin',
        isActive: true
      }
    ];
  }

  private static getDefaultDepartments(): DepartmentContent[] {
    return [
      {
        id: '1',
        name: 'Computer Science',
        description: 'Advanced computing and software engineering programs',
        icon: 'Monitor',
        isActive: true
      },
      {
        id: '2',
        name: 'Engineering',
        description: 'Mechanical, Electrical, and Civil Engineering',
        icon: 'Cog',
        isActive: true
      },
      {
        id: '3',
        name: 'Business Administration',
        description: 'Management and entrepreneurship programs',
        icon: 'Briefcase',
        isActive: true
      },
      {
        id: '4',
        name: 'Liberal Arts',
        description: 'Literature, philosophy, and social sciences',
        icon: 'BookOpen',
        isActive: true
      }
    ];
  }

  private static getDefaultHeroContent(): HeroContent {
    return {
      title: 'Welcome to Sankhya University',
      subtitle: 'Excellence in Education',
      description: 'Empowering minds, shaping futures, and building tomorrow\'s leaders through innovative education and research.',
      ctaText: 'Explore Our Programs',
      isActive: true
    };
  }
}