import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Cookie, Settings, Check, X } from 'lucide-react';
import { ConsentCookies } from '../../utils/cookies';

interface CookieConsentBannerProps {
  onConsentChange?: (consent: 'accepted' | 'declined' | 'partial') => void;
}

export function CookieConsentBanner({ onConsentChange }: CookieConsentBannerProps) {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // Always true, can't be disabled
    functional: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already given consent
    if (!ConsentCookies.hasConsent()) {
      setShowBanner(true);
    }
  }, []);

  const handleAcceptAll = () => {
    ConsentCookies.setConsent('accepted');
    setShowBanner(false);
    onConsentChange?.('accepted');
  };

  const handleDeclineAll = () => {
    ConsentCookies.setConsent('declined');
    setShowBanner(false);
    onConsentChange?.('declined');
  };

  const handleSavePreferences = () => {
    const hasOptionalCookies = preferences.functional || preferences.analytics || preferences.marketing;
    const consent = hasOptionalCookies ? 'partial' : 'declined';
    
    ConsentCookies.setConsent(consent);
    // Store specific preferences
    localStorage.setItem('sankhya_cookie_preferences', JSON.stringify(preferences));
    
    setShowBanner(false);
    setShowSettings(false);
    onConsentChange?.(consent);
  };

  const togglePreference = (key: keyof typeof preferences) => {
    if (key === 'necessary') return; // Can't disable necessary cookies
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-black bg-opacity-50">
      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-6">
          {!showSettings ? (
            // Main consent banner
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <Cookie className="h-8 w-8 text-blue-600" />
              </div>
              
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">Cookie Consent</h3>
                <p className="text-gray-600 mb-4">
                  We use cookies to enhance your experience on Sankhya VS. This includes cookies for authentication, 
                  remembering your preferences, and analyzing site usage to improve our services. 
                  You can manage your cookie preferences at any time.
                </p>
                
                <div className="flex flex-wrap gap-3">
                  <Button onClick={handleAcceptAll} className="bg-blue-600 hover:bg-blue-700">
                    <Check className="h-4 w-4 mr-2" />
                    Accept All
                  </Button>
                  
                  <Button variant="outline" onClick={handleDeclineAll}>
                    <X className="h-4 w-4 mr-2" />
                    Decline All
                  </Button>
                  
                  <Button variant="outline" onClick={() => setShowSettings(true)}>
                    <Settings className="h-4 w-4 mr-2" />
                    Customize
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            // Cookie settings panel
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Cookie className="h-6 w-6 text-blue-600" />
                <h3 className="font-semibold text-lg">Cookie Preferences</h3>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">Necessary Cookies</h4>
                      <Badge variant="secondary">Always Active</Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      Essential for the website to function properly. These cannot be disabled.
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="w-12 h-6 bg-blue-600 rounded-full flex items-center justify-end px-1">
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium mb-1">Functional Cookies</h4>
                    <p className="text-sm text-gray-600">
                      Remember your preferences and settings to provide a personalized experience.
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <button
                      onClick={() => togglePreference('functional')}
                      className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                        preferences.functional ? 'bg-blue-600 justify-end' : 'bg-gray-300 justify-start'
                      }`}
                    >
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium mb-1">Analytics Cookies</h4>
                    <p className="text-sm text-gray-600">
                      Help us understand how you use our website to improve performance and user experience.
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <button
                      onClick={() => togglePreference('analytics')}
                      className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                        preferences.analytics ? 'bg-blue-600 justify-end' : 'bg-gray-300 justify-start'
                      }`}
                    >
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium mb-1">Marketing Cookies</h4>
                    <p className="text-sm text-gray-600">
                      Used to show you relevant content and advertisements based on your interests.
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <button
                      onClick={() => togglePreference('marketing')}
                      className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                        preferences.marketing ? 'bg-blue-600 justify-end' : 'bg-gray-300 justify-start'
                      }`}
                    >
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button onClick={handleSavePreferences} className="bg-blue-600 hover:bg-blue-700">
                  Save Preferences
                </Button>
                <Button variant="outline" onClick={() => setShowSettings(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}