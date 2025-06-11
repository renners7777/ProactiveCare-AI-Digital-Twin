import React, { useState } from 'react';
import { BookOpen, Mail, Smartphone, Monitor, Brain, Activity, Heart, Info } from 'lucide-react';
import { usePatient } from '../contexts/PatientContext';
import Button from '../components/ui/Button';

interface Tutorial {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  steps: {
    title: string;
    content: string;
    action?: () => void;
  }[];
}

const AboutPage: React.FC = () => {
  const [activeTutorial, setActiveTutorial] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const { simulateScenario, patients } = usePatient();

  const tutorials: Tutorial[] = [
    {
      id: 'dashboard-overview',
      title: 'Dashboard Overview',
      description: 'Learn how to use the dashboard effectively',
      icon: Activity,
      steps: [
        {
          title: 'Patient Risk Distribution',
          content: 'The dashboard shows patients categorized by risk level. High-risk patients require immediate attention, while medium and low-risk patients need regular monitoring.'
        },
        {
          title: 'Activity Monitoring',
          content: 'Watch how the system detects a gradual decline in patient activity.',
          action: () => simulateScenario('subtle-slowdown', patients[0]?.id)
        },
        {
          title: 'Alert System',
          content: 'When significant changes are detected, the system generates alerts with specific recommendations for intervention.'
        }
      ]
    },
    {
      id: 'medical-events',
      title: 'Medical Event Detection',
      description: 'Understanding medical event patterns',
      icon: Heart,
      steps: [
        {
          title: 'Hypertensive Episode',
          content: 'See how the system detects and responds to a hypertensive crisis.',
          action: () => simulateScenario('hypertensive-crisis', patients[0]?.id)
        },
        {
          title: 'Alert Analysis',
          content: 'The system analyzes vital signs and activity patterns to identify potential medical emergencies.'
        },
        {
          title: 'Intervention Recommendations',
          content: 'Based on the detected patterns, the system provides specific care recommendations.'
        }
      ]
    },
    {
      id: 'cognitive-monitoring',
      title: 'Cognitive Pattern Recognition',
      description: 'Detecting cognitive-related changes',
      icon: Brain,
      steps: [
        {
          title: 'Behavioral Changes',
          content: 'Learn how the system identifies unusual behavioral patterns.',
          action: () => simulateScenario('dementia-episode', patients[0]?.id)
        },
        {
          title: 'Pattern Analysis',
          content: 'The system analyzes daily routines and identifies deviations that might indicate cognitive issues.'
        },
        {
          title: 'Early Intervention',
          content: 'Based on detected patterns, the system suggests early intervention strategies.'
        }
      ]
    }
  ];

  const handleTutorialStart = (tutorialId: string) => {
    setActiveTutorial(tutorialId);
    setCurrentStep(0);
  };

  const handleNextStep = () => {
    const tutorial = tutorials.find(t => t.id === activeTutorial);
    if (tutorial && currentStep < tutorial.steps.length - 1) {
      const nextStep = tutorial.steps[currentStep + 1];
      if (nextStep.action) {
        nextStep.action();
      }
      setCurrentStep(currentStep + 1);
    } else {
      setActiveTutorial(null);
      setCurrentStep(0);
    }
  };

  const renderTutorialContent = () => {
    if (!activeTutorial) return null;

    const tutorial = tutorials.find(t => t.id === activeTutorial);
    if (!tutorial) return null;

    const step = tutorial.steps[currentStep];

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg max-w-2xl w-full mx-4 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center">
              <tutorial.icon className="mr-2\" size={24} />
              {tutorial.title}
            </h3>
            <span className="text-sm text-neutral-500">
              Step {currentStep + 1} of {tutorial.steps.length}
            </span>
          </div>

          <div className="mb-6">
            <h4 className="font-medium mb-2">{step.title}</h4>
            <p className="text-neutral-600">{step.content}</p>
          </div>

          <div className="flex justify-end">
            <Button
              onClick={handleNextStep}
              className="bg-primary-600 hover:bg-primary-700 text-white"
            >
              {currentStep === tutorial.steps.length - 1 ? 'Finish' : 'Next Step'}
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-800">About ProactiveCare</h1>
        <p className="text-neutral-500 mt-1">Learn about our platform and how it works</p>
      </div>

      <div className="space-y-6">
        {/* Getting Started Guide */}
        <div className="bg-white p-6 rounded-lg shadow-card">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <BookOpen className="mr-2" size={20} />
            Getting Started
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-md font-medium mb-2">What is ProactiveCare?</h3>
              <p className="text-neutral-600">
                ProactiveCare is an AI-powered Digital Twin platform that helps healthcare professionals and family members monitor and support patients' well-being. It uses advanced analytics to detect potential health risks early and provide actionable recommendations.
              </p>
            </div>
            
            <div>
              <h3 className="text-md font-medium mb-2">Key Features</h3>
              <ul className="list-disc pl-5 text-neutral-600 space-y-1">
                <li>Real-time activity monitoring and analysis</li>
                <li>Early risk detection and alerts</li>
                <li>Personalized care recommendations</li>
                <li>Secure communication between care team members</li>
                <li>Comprehensive analytics and reporting</li>
              </ul>
            </div>

            <div>
              <h3 className="text-md font-medium mb-2">Device Compatibility</h3>
              <div className="flex items-center space-x-4 text-neutral-600">
                <div className="flex items-center">
                  <Monitor className="mr-1" size={16} />
                  <span>Desktop</span>
                </div>
                <div className="flex items-center">
                  <Smartphone className="mr-1" size={16} />
                  <span>Mobile</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Tutorials */}
        <div className="bg-white p-6 rounded-lg shadow-card">
          <h2 className="text-lg font-semibold mb-4">Interactive Tutorials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tutorials.map(tutorial => (
              <div 
                key={tutorial.id}
                className="bg-neutral-50 border border-neutral-200 rounded-lg p-4 hover:border-primary-300 transition-colors"
              >
                <div className="flex items-center mb-3">
                  <tutorial.icon className="text-primary-500 mr-2" size={24} />
                  <h3 className="font-medium">{tutorial.title}</h3>
                </div>
                <p className="text-sm text-neutral-600 mb-4">{tutorial.description}</p>
                <Button
                  onClick={() => handleTutorialStart(tutorial.id)}
                  variant="secondary"
                  size="sm"
                  className="w-full"
                >
                  Start Tutorial
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Version Information */}
        <div className="bg-white p-6 rounded-lg shadow-card">
          <h2 className="text-lg font-semibold mb-4">Version Information</h2>
          <div className="space-y-2">
            <p className="text-neutral-600">
              <span className="font-medium">Version:</span> 0.1.0
            </p>
            <p className="text-neutral-600">
              <span className="font-medium">Last Updated:</span> March 15, 2025
            </p>
            <p className="text-neutral-600">
              <span className="font-medium">Build:</span> 2025.03.15.1
            </p>
          </div>
        </div>

        {/* Support */}
        <div className="bg-white p-6 rounded-lg shadow-card">
          <h2 className="text-lg font-semibold mb-4">Support</h2>
          <div className="space-y-3">
            <p className="text-neutral-600">
              For technical support or questions about using ProactiveCare:
            </p>
            <div className="flex items-center space-x-2">
              <Mail size={16} className="text-neutral-500" />
              <a 
                href="mailto:CRSoftwareEngineer@outlook.com" 
                className="text-primary-600 hover:text-primary-700"
              >
                CRSoftwareEngineer@outlook.com
              </a>
            </div>
          </div>
        </div>

        {/* Legal Information */}
        <div className="bg-white p-6 rounded-lg shadow-card">
          <h2 className="text-lg font-semibold mb-4">Legal Information</h2>
          <div className="space-y-2">
            <p>
              <a 
                href="#" 
                className="text-primary-600 hover:text-primary-700"
              >
                Terms of Service
              </a>
            </p>
            <p>
              <a 
                href="#" 
                className="text-primary-600 hover:text-primary-700"
              >
                Privacy Policy
              </a>
            </p>
            <p>
              <a 
                href="#" 
                className="text-primary-600 hover:text-primary-700"
              >
                Cookie Policy
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Tutorial overlay */}
      {renderTutorialContent()}
    </div>
  );
};

export default AboutPage;