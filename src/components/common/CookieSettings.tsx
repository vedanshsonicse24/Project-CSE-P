import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';
import { Separator } from '../ui/separator';
import { Cookie, Shield, Eye, BarChart3, Settings, Trash2 } from 'lucide-react';
import { ConsentCookies, CookieUtils, UserCookies, PreferenceCookies } from '../../utils/cookies';
import { toast } from 'sonner';

export function CookieSettings() {
  const [consent, setConsent] = useState<'accepted' | 'declined' | 'partial' | null>(null);
  const [preferences, setPreferences] = useState({
    necessary: true,
    functional: true,
    analytics: false,
    marketing: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load current consent and preferences
    const currentConsent = ConsentCookies.getConsent();
    setConsent(currentConsent);

    // Load preferences from localStorage if they exist
    const savedPreferences = localStorage.getItem('sankhya_cookie_preferences');
    if (savedPreferences) {
      try {
        setPreferences(JSON.parse(savedPreferences));
      } catch (error) {
        console.error('Error parsing cookie preferences:', error);
      }
    }
  }, []);

  const handleToggle = (key: keyof typeof preferences) => {
    if (key === 'necessary') return; // Can't disable necessary cookies
    
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const savePreferences = async () => {
    setIsLoading(true);
    
    try {
      // Save preferences to localStorage
      localStorage.setItem('sankhya_cookie_preferences', JSON.stringify(preferences));
      
      // Update consent based on preferences
      const hasOptionalCookies = preferences.functional || preferences.analytics || preferences.marketing;
      const newConsent = hasOptionalCookies ? 'partial' : 'declined';
      
      ConsentCookies.setConsent(newConsent);
      setConsent(newConsent);
      
      toast.success('Cookie preferences saved successfully!');
    } catch (error) {
      toast.error('Failed to save cookie preferences');
    } finally {
      setIsLoading(false);
    }
  };

  const clearAllCookies = () => {
    if (confirm('Are you sure you want to clear all cookies? This will log you out and reset all preferences.')) {
      CookieUtils.clearAll();
      localStorage.removeItem('sankhya_cookie_preferences');
      setConsent(null);
      setPreferences({
        necessary: true,
        functional: false,
        analytics: false,
        marketing: false,
      });
      toast.success('All cookies cleared successfully!');
      
      // Reload the page to reset the application state
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  const getConsentBadge = () => {
    switch (consent) {
      case 'accepted':
        return <Badge className="bg-green-100 text-green-800">All Accepted</Badge>;
      case 'partial':
        return <Badge className="bg-yellow-100 text-yellow-800">Partially Accepted</Badge>;
      case 'declined':
        return <Badge className="bg-red-100 text-red-800">Declined</Badge>;
      default:
        return <Badge variant="secondary">Not Set</Badge>;
    }
  };

  const cookieCategories = [
    {
      key: 'necessary' as const,
      title: 'Necessary Cookies',
      description: 'Essential for the website to function properly. These cannot be disabled.',
      icon: Shield,
      required: true,
      examples: ['Authentication', 'Security', 'Form submissions'],
    },
    {
      key: 'functional' as const,
      title: 'Functional Cookies',
      description: 'Remember your preferences and settings to provide a personalized experience.',
      icon: Settings,
      required: false,
      examples: ['Dashboard layout', 'Language preference', 'Theme settings'],
    },
    {
      key: 'analytics' as const,
      title: 'Analytics Cookies',
      description: 'Help us understand how you use our website to improve performance and user experience.',
      icon: BarChart3,
      required: false,
      examples: ['Page views', 'User interactions', 'Performance metrics'],
    },
    {
      key: 'marketing' as const,
      title: 'Marketing Cookies',
      description: 'Used to show you relevant content and advertisements based on your interests.',
      icon: Eye,
      required: false,
      examples: ['Personalized content', 'Advertisement tracking', 'Social media integration'],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Cookie className="h-8 w-8 text-blue-600" />
        <div>
          <h1 className="text-2xl font-bold">Cookie Settings</h1>
          <p className="text-gray-600">Manage your cookie preferences and privacy settings</p>
        </div>
      </div>

      {/* Current Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Current Cookie Consent
            {getConsentBadge()}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            {consent === 'accepted' && 'You have accepted all cookies. We use them to provide the best experience.'}
            {consent === 'partial' && 'You have accepted some cookies. You can modify your preferences below.'}
            {consent === 'declined' && 'You have declined optional cookies. Only necessary cookies are used.'}
            {!consent && 'You haven\'t set your cookie preferences yet. Please configure them below.'}
          </p>
          
          <div className="flex gap-3">
            <Button onClick={savePreferences} disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Preferences'}
            </Button>
            <Button variant="outline" onClick={clearAllCookies}>
              <Trash2 className="h-4 w-4 mr-2" />
              Clear All Cookies
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Cookie Categories */}
      <div className="space-y-4">
        {cookieCategories.map((category) => {
          const Icon = category.icon;
          const isEnabled = preferences[category.key];
          
          return (
            <Card key={category.key}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Icon className="h-6 w-6 text-blue-600" />
                    <div>
                      <h3 className="font-semibold text-lg flex items-center gap-2">
                        {category.title}
                        {category.required && <Badge variant="secondary">Required</Badge>}
                      </h3>
                      <p className="text-gray-600 text-sm mt-1">{category.description}</p>
                    </div>
                  </div>
                  
                  <Switch
                    checked={isEnabled}
                    onCheckedChange={() => handleToggle(category.key)}
                    disabled={category.required}
                  />
                </div>
                
                <Separator className="my-3" />
                
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Examples:</p>
                  <div className="flex flex-wrap gap-2">
                    {category.examples.map((example, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {example}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Information Section */}
      <Card>
        <CardHeader>
          <CardTitle>About Cookies</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-sm text-gray-600">
            <p>
              Cookies are small text files that are stored on your device when you visit our website. 
              They help us provide you with a better experience by remembering your preferences and 
              understanding how you use our site.
            </p>
            
            <p>
              <strong>Your Privacy Matters:</strong> We are committed to protecting your privacy. 
              You can change your cookie preferences at any time using the controls above. 
              Note that disabling certain cookies may impact your experience on our website.
            </p>
            
            <p>
              <strong>Questions?</strong> If you have any questions about our use of cookies, 
              please contact our support team or refer to our Privacy Policy.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}