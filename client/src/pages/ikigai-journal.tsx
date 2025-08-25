import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Heart, Star, Globe, DollarSign, Trophy, ChevronLeft, ChevronRight, RotateCcw, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import type { JournalResponses } from "@shared/schema";

const TOTAL_STEPS = 5;

const initialResponses: JournalResponses = {
  step1: {
    prompt1: '',
    prompt2: '',
    prompt3: '',
    prompt4: '',
    prompt5: ''
  },
  step2: {
    prompt1: '',
    prompt2: '',
    prompt3: '',
    prompt4: '',
    prompt5: ''
  },
  step3: {
    prompt1: '',
    prompt2: '',
    prompt3: '',
    prompt4: '',
    prompt5: ''
  },
  step4: {
    prompt1: '',
    prompt2: '',
    prompt3: '',
    prompt4: '',
    prompt5: ''
  },
  step5: {
    ikigai: ''
  }
};

export default function IkigaiJournal() {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useLocalStorage<JournalResponses>('ikigai-journal-responses', initialResponses);
  const [showWelcome, setShowWelcome] = useState(true);

  const progress = Math.max(0, (currentStep / TOTAL_STEPS) * 100);

  const updateResponse = (step: keyof JournalResponses, prompt: string, value: string) => {
    setResponses(prev => ({
      ...prev,
      [step]: {
        ...prev[step],
        [prompt]: value
      }
    }));
  };

  const startJourney = () => {
    setShowWelcome(false);
    setCurrentStep(1);
  };

  const goToStep = (step: number) => {
    setShowWelcome(false);
    setCurrentStep(step);
  };

  const nextStep = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    } else {
      // Go to summary
      setCurrentStep(6);
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      setShowWelcome(true);
      setCurrentStep(0);
    }
  };

  const resetJourney = () => {
    if (confirm('Are you sure you want to start over? This will clear all your responses.')) {
      setResponses(initialResponses);
      setCurrentStep(0);
      setShowWelcome(true);
    }
  };

  const exportJourney = () => {
    window.print();
  };

  if (showWelcome) {
    return (
      <div className="min-h-screen bg-cream-50">
        {/* Header */}
        <header className="bg-cream-100 border-b border-cream-200 sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-serif text-2xl md:text-3xl font-bold text-earth-900" data-testid="header-title">
                  Ikigai Journal
                </h1>
                <p className="text-earth-700 text-sm mt-1">Discover your life's purpose through guided reflection</p>
              </div>
              <div className="text-right">
                <div className="text-xs text-earth-700 mb-1">Progress</div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-earth-800" data-testid="progress-current">0</span>
                  <span className="text-xs text-earth-600">of</span>
                  <span className="text-sm font-medium text-earth-800">5</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <Progress value={0} className="w-full" data-testid="progress-bar" />
              <div className="flex justify-between mt-2 text-xs text-earth-600">
                <span>Start</span>
                <span>Complete</span>
              </div>
            </div>
          </div>
        </header>

        {/* Welcome Content */}
        <main className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center max-w-2xl mx-auto">
            <div className="mb-8">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-coral-400 to-sage-400 rounded-full flex items-center justify-center mb-6 shadow-lg">
                <Heart className="text-3xl text-white" size={48} />
              </div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-earth-900 mb-4" data-testid="welcome-title">
                Find Your Ikigai
              </h2>
              <p className="text-lg text-earth-700 leading-relaxed mb-6">
                Ikigai is your reason for being—the sweet spot where what you love, what you're good at, 
                what the world needs, and what you can be paid for all come together.
              </p>
              <div className="bg-cream-100 rounded-xl p-6 mb-8 border border-cream-200">
                <p className="text-earth-800 font-georgia italic text-lg">
                  "Only staying active will make you want to live a hundred years."
                </p>
                <p className="text-earth-600 text-sm mt-2">— Japanese Proverb</p>
              </div>
            </div>
            
            <Button 
              onClick={startJourney}
              className="bg-coral-500 hover:bg-coral-400 text-white px-8 py-4 rounded-xl font-medium text-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
              data-testid="button-start-journey"
            >
              Begin Your Journey
              <ChevronRight className="ml-2" size={20} />
            </Button>
          </div>
        </main>

        <footer className="bg-cream-100 border-t border-cream-200 mt-16">
          <div className="max-w-4xl mx-auto px-4 py-8 text-center">
            <p className="text-earth-600 text-sm">
              Inspired by the framework from{" "}
              <a 
                href="https://notesbythalia.com/how-to-find-your-ikigai/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-coral-600 hover:text-coral-500 font-medium"
              >
                Notes by Thalia
              </a>
            </p>
            <p className="text-earth-500 text-xs mt-2">
              Remember: Your Ikigai may evolve as you grow. This is completely natural and encouraged.
            </p>
          </div>
        </footer>
      </div>
    );
  }

  // Step Components
  const renderStep1 = () => (
    <div className="max-w-3xl mx-auto">
      <Card className="bg-white rounded-2xl shadow-lg border border-cream-200 overflow-hidden">
        <div className="bg-gradient-to-r from-coral-400 to-coral-500 px-6 py-8 text-white">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <span className="font-bold text-sm">1</span>
            </div>
            <span className="text-sm font-medium opacity-90">Step One</span>
          </div>
          <h2 className="font-serif text-3xl font-bold">Rediscover the things you love</h2>
          <p className="mt-3 text-coral-50 text-lg">
            Finding your Ikigai is a process of discovery. Let's start by exploring what truly brings you joy.
          </p>
        </div>
        
        <CardContent className="p-6 md:p-8">
          <div className="prose prose-earth max-w-none mb-8">
            <p className="text-earth-700 leading-relaxed">
              Passion fuels motivation and drive. If you're not passionate about something, chances are you'll get bored easily. 
              <strong> So do not skip this step</strong> — brainstorm the activities you love doing first, and then the rest will fall into place.
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="font-serif text-xl font-semibold text-earth-800 border-b border-cream-200 pb-2">Journal Prompts</h3>
            
            {[
              "What activities or hobbies bring you genuine joy?",
              "What do you love doing in your free time?",
              "What makes you lose track of the minutes and hours?",
              "Reflect on your most satisfying and fulfilling moments. What were you doing?",
              "What activities would you like to pursue if money wasn't an object?"
            ].map((prompt, index) => (
              <div key={index} className="border border-cream-200 rounded-xl p-5 bg-cream-50">
                <Label className="block font-georgia text-earth-800 mb-3 font-medium">
                  {prompt}
                </Label>
                <Textarea
                  className="w-full p-4 border border-cream-300 rounded-lg resize-none focus:ring-2 focus:ring-coral-400 focus:border-transparent transition-all"
                  rows={4}
                  placeholder={index === 0 ? "Take your time to reflect... What makes your heart sing?" : 
                            index === 1 ? "When you have complete freedom, what do you gravitate towards?" :
                            index === 2 ? "Think about times when you were completely absorbed in an activity..." :
                            index === 3 ? "Remember specific moments when you felt deeply fulfilled..." :
                            "Remove all financial constraints - what would you do with your time?"}
                  value={responses.step1[`prompt${index + 1}` as keyof typeof responses.step1]}
                  onChange={(e) => updateResponse('step1', `prompt${index + 1}`, e.target.value)}
                  data-testid={`textarea-step1-prompt${index + 1}`}
                />
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-8 pt-6 border-t border-cream-200">
            <Button
              variant="ghost"
              onClick={previousStep}
              className="px-6 py-3 text-earth-600 hover:text-earth-800 transition-colors font-medium"
              data-testid="button-previous"
            >
              <ChevronLeft className="mr-2" size={16} />
              Back
            </Button>
            <Button
              onClick={nextStep}
              className="bg-coral-500 hover:bg-coral-400 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-lg"
              data-testid="button-next"
            >
              Continue
              <ChevronRight className="ml-2" size={16} />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderStep2 = () => (
    <div className="max-w-3xl mx-auto">
      <Card className="bg-white rounded-2xl shadow-lg border border-cream-200 overflow-hidden">
        <div className="bg-gradient-to-r from-sage-400 to-sage-500 px-6 py-8 text-white">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <span className="font-bold text-sm">2</span>
            </div>
            <span className="text-sm font-medium opacity-90">Step Two</span>
          </div>
          <h2 className="font-serif text-3xl font-bold">Identify your natural strengths and skills</h2>
          <p className="mt-3 text-sage-50 text-lg">
            When you lean into your natural strengths, you gain the confidence you need to achieve more.
          </p>
        </div>
        
        <CardContent className="p-6 md:p-8">
          <div className="prose prose-earth max-w-none mb-8">
            <p className="text-earth-700 leading-relaxed">
              By focusing on your inherent skills and expertise, you empower yourself to grow and thrive. 
              You have the confidence to push yourself out of your comfort zone to find <em>real</em> purpose.
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="font-serif text-xl font-semibold text-earth-800 border-b border-cream-200 pb-2">Journal Prompts</h3>
            
            {[
              "What are you really good at? What comes naturally to you?",
              "What skills do you have that many others do not?",
              "What skill(s) have you been spending time to practice?",
              "What do people look to you for help with?",
              "What are your strengths? List at least 8"
            ].map((prompt, index) => (
              <div key={index} className="border border-cream-200 rounded-xl p-5 bg-cream-50">
                <Label className="block font-georgia text-earth-800 mb-3 font-medium">
                  {prompt}
                </Label>
                <Textarea
                  className="w-full p-4 border border-cream-300 rounded-lg resize-none focus:ring-2 focus:ring-sage-400 focus:border-transparent transition-all"
                  rows={4}
                  placeholder={index === 0 ? "Think about things you do with ease that others find challenging..." : 
                            index === 1 ? "Consider your unique abilities and talents..." :
                            index === 2 ? "What skills are you actively developing and improving?" :
                            index === 3 ? "What do friends, family, or colleagues often ask you about?" :
                            "Don't be modest - really dig deep and list your strengths..."}
                  value={responses.step2[`prompt${index + 1}` as keyof typeof responses.step2]}
                  onChange={(e) => updateResponse('step2', `prompt${index + 1}`, e.target.value)}
                  data-testid={`textarea-step2-prompt${index + 1}`}
                />
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-8 pt-6 border-t border-cream-200">
            <Button
              variant="ghost"
              onClick={previousStep}
              className="px-6 py-3 text-earth-600 hover:text-earth-800 transition-colors font-medium"
              data-testid="button-previous"
            >
              <ChevronLeft className="mr-2" size={16} />
              Previous
            </Button>
            <Button
              onClick={nextStep}
              className="bg-sage-500 hover:bg-sage-400 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-lg"
              data-testid="button-next"
            >
              Continue
              <ChevronRight className="ml-2" size={16} />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderStep3 = () => (
    <div className="max-w-3xl mx-auto">
      <Card className="bg-white rounded-2xl shadow-lg border border-cream-200 overflow-hidden">
        <div className="bg-gradient-to-r from-earth-700 to-earth-800 px-6 py-8 text-white">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <span className="font-bold text-sm">3</span>
            </div>
            <span className="text-sm font-medium opacity-90">Step Three</span>
          </div>
          <h2 className="font-serif text-3xl font-bold">Align your interests and skills with what the world needs</h2>
          <p className="mt-3 text-cream-100 text-lg">
            You are two steps away from creating a purpose-driven life! How does that feel?
          </p>
        </div>
        
        <CardContent className="p-6 md:p-8">
          <div className="prose prose-earth max-w-none mb-8">
            <p className="text-earth-700 leading-relaxed">
              To find your <em>real</em> purpose, you need to be completely open and honest with yourself. 
              Don't write down what you think you should be writing down. Dive deep inside yourself and write down those core passions, skills and desires.
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="font-serif text-xl font-semibold text-earth-800 border-b border-cream-200 pb-2">Journal Prompts</h3>
            
            {[
              "What industry or market can benefit from your skills?",
              "What specific challenges is this industry or market currently facing?",
              "What problems or needs can you solve with your skills?",
              "How do your passions and interests align with the needs of this market or industry?",
              "How can you specifically leave a positive impact on this industry or market?"
            ].map((prompt, index) => (
              <div key={index} className="border border-cream-200 rounded-xl p-5 bg-cream-50">
                <Label className="block font-georgia text-earth-800 mb-3 font-medium">
                  {prompt}
                </Label>
                <Textarea
                  className="w-full p-4 border border-cream-300 rounded-lg resize-none focus:ring-2 focus:ring-earth-700 focus:border-transparent transition-all"
                  rows={4}
                  placeholder={index === 0 ? "Consider where your skills could make the biggest impact..." : 
                            index === 1 ? "Think about problems you've noticed or heard about..." :
                            index === 2 ? "Be specific about how your abilities can address these challenges..." :
                            index === 3 ? "Find the connection between what you love and what's needed..." :
                            "Envision the change you could create..."}
                  value={responses.step3[`prompt${index + 1}` as keyof typeof responses.step3]}
                  onChange={(e) => updateResponse('step3', `prompt${index + 1}`, e.target.value)}
                  data-testid={`textarea-step3-prompt${index + 1}`}
                />
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-8 pt-6 border-t border-cream-200">
            <Button
              variant="ghost"
              onClick={previousStep}
              className="px-6 py-3 text-earth-600 hover:text-earth-800 transition-colors font-medium"
              data-testid="button-previous"
            >
              <ChevronLeft className="mr-2" size={16} />
              Previous
            </Button>
            <Button
              onClick={nextStep}
              className="bg-earth-700 hover:bg-earth-600 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-lg"
              data-testid="button-next"
            >
              Continue
              <ChevronRight className="ml-2" size={16} />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderStep4 = () => (
    <div className="max-w-3xl mx-auto">
      <Card className="bg-white rounded-2xl shadow-lg border border-cream-200 overflow-hidden">
        <div className="bg-gradient-to-r from-coral-500 to-earth-700 px-6 py-8 text-white">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <span className="font-bold text-sm">4</span>
            </div>
            <span className="text-sm font-medium opacity-90">Step Four</span>
          </div>
          <h2 className="font-serif text-3xl font-bold">Explore ways to get paid for what you love, skills and value</h2>
          <p className="mt-3 text-cream-100 text-lg">
            Having money simply makes life easier and opens up a world of opportunities and possibilities.
          </p>
        </div>
        
        <CardContent className="p-6 md:p-8">
          <div className="prose prose-earth max-w-none mb-8">
            <p className="text-earth-700 leading-relaxed">
              So if you can get paid for your purpose, then you're basically winning at life, right? 
              That's why this next step is essential — explore how you can get paid for what you love, your skills and your value to the world.
            </p>
            <div className="bg-coral-50 border border-coral-200 rounded-lg p-4 mt-4">
              <p className="text-coral-800 font-medium">
                <strong>Hot take:</strong> Getting paid for your interests and skills might not necessarily be limited to typical job roles. 
                It might allow you to venture out on your own and create a business or side hustle.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="font-serif text-xl font-semibold text-earth-800 border-b border-cream-200 pb-2">Journal Prompts</h3>
            
            {[
              "What skills do you have that are in high demand?",
              "How can you leverage your interests to provide value to others and make money?",
              "What industry or target market would benefit from your interests and skills?",
              "What job opportunities align with your interests and skills?",
              "How can you level up your skills to stay relevant and in demand?"
            ].map((prompt, index) => (
              <div key={index} className="border border-cream-200 rounded-xl p-5 bg-cream-50">
                <Label className="block font-georgia text-earth-800 mb-3 font-medium">
                  {prompt}
                </Label>
                <Textarea
                  className="w-full p-4 border border-cream-300 rounded-lg resize-none focus:ring-2 focus:ring-coral-400 focus:border-transparent transition-all"
                  rows={4}
                  placeholder={index === 0 ? "Think about skills that people are actively seeking and willing to pay for..." : 
                            index === 1 ? "Consider how your passions could solve problems or fulfill needs..." :
                            index === 2 ? "Identify specific groups of people who would pay for what you offer..." :
                            index === 3 ? "Research specific roles, companies, or career paths..." :
                            "What additional learning or development would increase your value?"}
                  value={responses.step4[`prompt${index + 1}` as keyof typeof responses.step4]}
                  onChange={(e) => updateResponse('step4', `prompt${index + 1}`, e.target.value)}
                  data-testid={`textarea-step4-prompt${index + 1}`}
                />
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-8 pt-6 border-t border-cream-200">
            <Button
              variant="ghost"
              onClick={previousStep}
              className="px-6 py-3 text-earth-600 hover:text-earth-800 transition-colors font-medium"
              data-testid="button-previous"
            >
              <ChevronLeft className="mr-2" size={16} />
              Previous
            </Button>
            <Button
              onClick={nextStep}
              className="bg-coral-500 hover:bg-coral-400 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-lg"
              data-testid="button-next"
            >
              Continue
              <ChevronRight className="ml-2" size={16} />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderStep5 = () => (
    <div className="max-w-3xl mx-auto">
      <Card className="bg-white rounded-2xl shadow-lg border border-cream-200 overflow-hidden">
        <div className="bg-gradient-to-r from-sage-500 via-coral-500 to-earth-700 px-6 py-8 text-white">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <span className="font-bold text-sm">5</span>
            </div>
            <span className="text-sm font-medium opacity-90">Final Step</span>
          </div>
          <h2 className="font-serif text-3xl font-bold">Find the overlap: Your Ikigai</h2>
          <p className="mt-3 text-cream-100 text-lg">
            This is where everything comes together. You're looking for the sweet spot—your reason for being.
          </p>
        </div>
        
        <CardContent className="p-6 md:p-8">
          <div className="prose prose-earth max-w-none mb-8">
            <p className="text-earth-700 leading-relaxed">
              Once you've completed the above 4 steps, you'll hopefully discover that there's an overlap between all these areas. 
              <strong> Overlap is good.</strong> These overlaps are where you want to hang out for a while, as this is the step where everything comes together.
            </p>
          </div>

          {/* Ikigai Diagram */}
          <div className="bg-gradient-to-br from-cream-100 to-cream-200 rounded-2xl p-8 mb-8 text-center">
            <h3 className="font-serif text-2xl font-semibold text-earth-800 mb-6">Your Ikigai Framework</h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-coral-100 border-2 border-coral-300 rounded-xl p-4">
                <div className="w-3 h-3 bg-coral-500 rounded-full mx-auto mb-2"></div>
                <h4 className="font-medium text-coral-800">Passion</h4>
                <p className="text-xs text-coral-600 mt-1">Love + Good At</p>
              </div>
              <div className="bg-sage-100 border-2 border-sage-300 rounded-xl p-4">
                <div className="w-3 h-3 bg-sage-500 rounded-full mx-auto mb-2"></div>
                <h4 className="font-medium text-sage-800">Profession</h4>
                <p className="text-xs text-sage-600 mt-1">Good At + Paid For</p>
              </div>
              <div className="bg-earth-100 border-2 border-earth-300 rounded-xl p-4">
                <div className="w-3 h-3 bg-earth-600 rounded-full mx-auto mb-2"></div>
                <h4 className="font-medium text-earth-800">Mission</h4>
                <p className="text-xs text-earth-600 mt-1">Love + World Needs</p>
              </div>
              <div className="bg-cream-300 border-2 border-cream-400 rounded-xl p-4">
                <div className="w-3 h-3 bg-cream-600 rounded-full mx-auto mb-2"></div>
                <h4 className="font-medium text-cream-800">Vocation</h4>
                <p className="text-xs text-cream-600 mt-1">World Needs + Paid For</p>
              </div>
            </div>
            <div className="bg-white border-4 border-dashed border-coral-400 rounded-xl p-6">
              <Heart className="text-3xl text-coral-500 mb-2 mx-auto" size={48} />
              <h4 className="font-serif text-xl font-bold text-earth-800">Your Ikigai</h4>
              <p className="text-sm text-earth-600">The intersection of all four areas</p>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="font-serif text-xl font-semibold text-earth-800 border-b border-cream-200 pb-2">Final Reflection</h3>
            
            <div className="border border-cream-200 rounded-xl p-5 bg-cream-50">
              <Label className="block font-georgia text-earth-800 mb-3 font-medium">
                Looking at all your responses, what emerges as the common thread? What is your Ikigai?
              </Label>
              <Textarea
                className="w-full p-4 border border-cream-300 rounded-lg resize-none focus:ring-2 focus:ring-coral-400 focus:border-transparent transition-all"
                rows={6}
                placeholder="Take your time to synthesize everything you've discovered about yourself. What patterns do you see? What excites you most?"
                value={responses.step5.ikigai}
                onChange={(e) => updateResponse('step5', 'ikigai', e.target.value)}
                data-testid="textarea-step5-ikigai"
              />
            </div>
          </div>

          <div className="flex justify-between mt-8 pt-6 border-t border-cream-200">
            <Button
              variant="ghost"
              onClick={previousStep}
              className="px-6 py-3 text-earth-600 hover:text-earth-800 transition-colors font-medium"
              data-testid="button-previous"
            >
              <ChevronLeft className="mr-2" size={16} />
              Previous
            </Button>
            <Button
              onClick={nextStep}
              className="bg-gradient-to-r from-sage-500 to-coral-500 hover:from-sage-400 hover:to-coral-400 text-white px-8 py-3 rounded-lg font-medium transition-all shadow-lg"
              data-testid="button-complete"
            >
              Complete Journey
              <Trophy className="ml-2" size={16} />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSummary = () => (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="w-24 h-24 mx-auto bg-gradient-to-br from-coral-400 to-sage-400 rounded-full flex items-center justify-center mb-6 shadow-xl">
          <Trophy className="text-3xl text-white" size={48} />
        </div>
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-earth-900 mb-4" data-testid="summary-title">
          Congratulations!
        </h2>
        <p className="text-xl text-earth-700">You've completed your Ikigai journey. Here's what you discovered:</p>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <div className="bg-coral-50 border border-coral-200 rounded-xl p-6">
          <h3 className="font-serif text-xl font-semibold text-coral-800 mb-3 flex items-center">
            <Heart className="mr-3 text-coral-600" size={20} />
            What You Love
          </h3>
          <div className="text-earth-700 space-y-2 text-sm">
            {Object.values(responses.step1).filter(Boolean).slice(0, 3).map((response, index) => (
              <p key={index} className="line-clamp-2">{response}</p>
            ))}
          </div>
        </div>
        
        <div className="bg-sage-50 border border-sage-200 rounded-xl p-6">
          <h3 className="font-serif text-xl font-semibold text-sage-800 mb-3 flex items-center">
            <Star className="mr-3 text-sage-600" size={20} />
            What You're Good At
          </h3>
          <div className="text-earth-700 space-y-2 text-sm">
            {Object.values(responses.step2).filter(Boolean).slice(0, 3).map((response, index) => (
              <p key={index} className="line-clamp-2">{response}</p>
            ))}
          </div>
        </div>
        
        <div className="bg-earth-50 border border-earth-200 rounded-xl p-6">
          <h3 className="font-serif text-xl font-semibold text-earth-800 mb-3 flex items-center">
            <Globe className="mr-3 text-earth-600" size={20} />
            What The World Needs
          </h3>
          <div className="text-earth-700 space-y-2 text-sm">
            {Object.values(responses.step3).filter(Boolean).slice(0, 3).map((response, index) => (
              <p key={index} className="line-clamp-2">{response}</p>
            ))}
          </div>
        </div>
        
        <div className="bg-cream-200 border border-cream-300 rounded-xl p-6">
          <h3 className="font-serif text-xl font-semibold text-cream-800 mb-3 flex items-center">
            <DollarSign className="mr-3 text-cream-600" size={20} />
            What You Can Be Paid For
          </h3>
          <div className="text-earth-700 space-y-2 text-sm">
            {Object.values(responses.step4).filter(Boolean).slice(0, 3).map((response, index) => (
              <p key={index} className="line-clamp-2">{response}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Your Ikigai */}
      <div className="bg-gradient-to-br from-cream-100 to-cream-200 border-4 border-dashed border-coral-400 rounded-2xl p-8 text-center mb-12">
        <Heart className="text-4xl text-coral-500 mb-4 mx-auto" size={64} />
        <h3 className="font-serif text-3xl font-bold text-earth-900 mb-4">Your Ikigai</h3>
        <div className="bg-white rounded-xl p-6 mx-auto max-w-2xl shadow-lg">
          <p className="text-earth-800 text-lg leading-relaxed" data-testid="text-ikigai-summary">
            {responses.step5.ikigai || "Your discovered purpose will appear here once you complete the final step..."}
          </p>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-white rounded-2xl shadow-lg border border-cream-200 p-8 mb-8">
        <h3 className="font-serif text-2xl font-semibold text-earth-800 mb-6 text-center">What's Next?</h3>
        <div className="prose prose-earth max-w-none">
          <ul className="space-y-3 text-earth-700">
            <li className="flex items-start">
              <div className="w-5 h-5 bg-coral-500 rounded-full flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                <span className="text-white text-xs">✓</span>
              </div>
              <span>Save or print this summary for future reference</span>
            </li>
            <li className="flex items-start">
              <div className="w-5 h-5 bg-coral-500 rounded-full flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                <span className="text-white text-xs">✓</span>
              </div>
              <span>Create an action plan to move toward your Ikigai</span>
            </li>
            <li className="flex items-start">
              <div className="w-5 h-5 bg-coral-500 rounded-full flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                <span className="text-white text-xs">✓</span>
              </div>
              <span>Revisit and refine your Ikigai as you grow and evolve</span>
            </li>
            <li className="flex items-start">
              <div className="w-5 h-5 bg-coral-500 rounded-full flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                <span className="text-white text-xs">✓</span>
              </div>
              <span>Share your discoveries with trusted friends or mentors</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          onClick={exportJourney}
          className="bg-coral-500 hover:bg-coral-400 text-white px-8 py-3 rounded-lg font-medium transition-colors shadow-lg"
          data-testid="button-export"
        >
          <Download className="mr-2" size={16} />
          Export My Journey
        </Button>
        <Button
          onClick={resetJourney}
          className="bg-sage-500 hover:bg-sage-400 text-white px-8 py-3 rounded-lg font-medium transition-colors shadow-lg"
          data-testid="button-reset"
        >
          <RotateCcw className="mr-2" size={16} />
          Start New Journey
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header */}
      <header className="bg-cream-100 border-b border-cream-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-serif text-2xl md:text-3xl font-bold text-earth-900" data-testid="header-title">
                Ikigai Journal
              </h1>
              <p className="text-earth-700 text-sm mt-1">Discover your life's purpose through guided reflection</p>
            </div>
            <div className="text-right">
              <div className="text-xs text-earth-700 mb-1">Progress</div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-earth-800" data-testid="progress-current">
                  {currentStep === 6 ? 5 : currentStep}
                </span>
                <span className="text-xs text-earth-600">of</span>
                <span className="text-sm font-medium text-earth-800">5</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <Progress value={currentStep === 6 ? 100 : progress} className="w-full" data-testid="progress-bar" />
            <div className="flex justify-between mt-2 text-xs text-earth-600">
              <span>Start</span>
              <span>Complete</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
        {currentStep === 4 && renderStep4()}
        {currentStep === 5 && renderStep5()}
        {currentStep === 6 && renderSummary()}
      </main>

      {/* Footer */}
      <footer className="bg-cream-100 border-t border-cream-200 mt-16">
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <p className="text-earth-600 text-sm">
            Inspired by the framework from{" "}
            <a 
              href="https://notesbythalia.com/how-to-find-your-ikigai/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-coral-600 hover:text-coral-500 font-medium"
            >
              Notes by Thalia
            </a>
          </p>
          <p className="text-earth-500 text-xs mt-2">
            Remember: Your Ikigai may evolve as you grow. This is completely natural and encouraged.
          </p>
        </div>
      </footer>
    </div>
  );
}
