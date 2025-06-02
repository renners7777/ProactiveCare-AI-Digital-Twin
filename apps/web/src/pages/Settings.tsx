import React, { useState } from 'react';
import { Bell, ShieldAlert, User, Sliders, AlertTriangle } from 'lucide-react';
import Button from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const { user } = useAuth();

  const tabs = [
    { id: 'general', label: 'General', icon: Sliders },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: ShieldAlert }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-800">Settings</h1>
        <p className="text-neutral-500 mt-1">Configure your ProactiveCare Digital Twin settings</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-card overflow-hidden">
        <div className="border-b border-neutral-200 overflow-x-auto">
          <nav className="flex space-x-6 px-6 min-w-max" role="tablist">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`${tab.id}-panel`}
                className={`py-4 px-1 border-b-2 flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600 font-medium'
                    : 'border-transparent text-neutral-600 hover:text-neutral-800'
                }`}
              >
                <tab.icon size={16} aria-hidden="true" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
        
        <div className="p-6 space-y-6">
          {/* General Settings Tab */}
          <div
            role="tabpanel"
            id="general-panel"
            aria-labelledby="general-tab"
            hidden={activeTab !== 'general'}
          >
            {activeTab === 'general' && (
              <div>
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <Sliders className="mr-2\" size={20} aria-hidden="true" />
                  Digital Twin Sensitivity
                </h2>
                
                <p className="text-neutral-600 mb-4">
                  Adjust how sensitive the Digital Twin is to detecting anomalies in patient activity data.
                  Higher sensitivity may result in more alerts but could include false positives.
                </p>
                
                <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                  <label htmlFor="sensitivity" className="block text-sm font-medium text-neutral-700 mb-2">
                    Alert Sensitivity
                  </label>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-neutral-500">Low</span>
                    <input
                      type="range"
                      id="sensitivity"
                      name="sensitivity"
                      min="1"
                      max="10"
                      defaultValue="5"
                      className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer"
                      aria-label="Alert sensitivity level"
                    />
                    <span className="text-sm text-neutral-500">High</span>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-md font-semibold mb-3">Account Information</h3>
                  <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700">Email</label>
                        <p className="text-neutral-600">{user?.email}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-700">Account Type</label>
                        <p className="text-neutral-600">Healthcare Professional</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Notifications Tab */}
          <div
            role="tabpanel"
            id="notifications-panel"
            aria-labelledby="notifications-tab"
            hidden={activeTab !== 'notifications'}
          >
            {activeTab === 'notifications' && (
              <div>
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <Bell className="mr-2\" size={20} aria-hidden="true" />
                  Notification Preferences
                </h2>
                
                <div className="space-y-4">
                  <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                    <h3 className="font-medium mb-3">Alert Methods</h3>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input 
                          type="checkbox" 
                          defaultChecked 
                          className="form-checkbox h-4 w-4 text-primary-600"
                          aria-label="Enable email notifications"
                        />
                        <span className="ml-2">Email Notifications</span>
                      </label>
                      <label className="flex items-center">
                        <input 
                          type="checkbox" 
                          defaultChecked 
                          className="form-checkbox h-4 w-4 text-primary-600"
                          aria-label="Enable in-app notifications"
                        />
                        <span className="ml-2">In-App Notifications</span>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                      <div className="flex items-center">
                        <AlertTriangle className="text-warning-500 mr-2" size={18} aria-hidden="true" />
                        <span>High Risk Alerts</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          defaultChecked 
                          className="sr-only peer"
                          aria-label="Enable high risk alerts"
                        />
                        <div className="w-11 h-6 bg-neutral-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                      <div className="flex items-center">
                        <AlertTriangle className="text-warning-400 mr-2" size={18} aria-hidden="true" />
                        <span>Medium Risk Alerts</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          defaultChecked 
                          className="sr-only peer"
                          aria-label="Enable medium risk alerts"
                        />
                        <div className="w-11 h-6 bg-neutral-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                      <div className="flex items-center">
                        <AlertTriangle className="text-warning-300 mr-2" size={18} aria-hidden="true" />
                        <span>Low Risk Alerts</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer"
                          aria-label="Enable low risk alerts"
                        />
                        <div className="w-11 h-6 bg-neutral-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Privacy Tab */}
          <div
            role="tabpanel"
            id="privacy-panel"
            aria-labelledby="privacy-tab"
            hidden={activeTab !== 'privacy'}
          >
            {activeTab === 'privacy' && (
              <div>
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <ShieldAlert className="mr-2\" size={20} aria-hidden="true" />
                  Privacy & Security
                </h2>
                
                <div className="space-y-6">
                  <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                    <h3 className="font-medium mb-3">Security Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="flex items-center mb-2">
                          <input 
                            type="checkbox" 
                            defaultChecked 
                            className="form-checkbox h-4 w-4 text-primary-600"
                            aria-label="Enable two-factor authentication"
                          />
                          <span className="ml-2">Two-Factor Authentication</span>
                        </label>
                        <p className="text-sm text-neutral-500">Add an extra layer of security to your account</p>
                      </div>
                      <div>
                        <label className="flex items-center mb-2">
                          <input 
                            type="checkbox" 
                            defaultChecked 
                            className="form-checkbox h-4 w-4 text-primary-600"
                            aria-label="Enable session timeout"
                          />
                          <span className="ml-2">Session Timeout</span>
                        </label>
                        <p className="text-sm text-neutral-500">Automatically log out after 30 minutes of inactivity</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                    <h3 className="font-medium mb-3">Data Privacy</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="flex items-center mb-2">
                          <input 
                            type="checkbox" 
                            defaultChecked 
                            className="form-checkbox h-4 w-4 text-primary-600"
                            aria-label="Enable anonymous analytics"
                          />
                          <span className="ml-2">Anonymous Analytics</span>
                        </label>
                        <p className="text-sm text-neutral-500">Help improve ProactiveCare by sharing anonymous usage data</p>
                      </div>
                      <div>
                        <Button 
                          variant="secondary" 
                          size="sm"
                          aria-label="Download your data"
                        >
                          Download My Data
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                    <h3 className="font-medium mb-3">Compliance Information</h3>
                    <ul className="list-disc pl-5 text-sm text-neutral-600 space-y-1">
                      <li>UK GDPR & Caldicott Principles compliance</li>
                      <li>NHS Digital's Data Security and Protection Toolkit (DSPT) adherence</li>
                      <li>Data minimization - only collecting necessary information</li>
                      <li>Row-level security for patient data access control</li>
                      <li>End-to-end encryption for data at rest and in transit</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-neutral-50 p-6 border-t border-neutral-200 flex justify-end">
          <Button 
            variant="secondary" 
            className="mr-3"
            aria-label="Cancel changes"
          >
            Cancel
          </Button>
          <Button 
             
            className="bg-primary-600 hover:bg-primary-700 text-white"
            aria-label="Save all settings"
          >
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;