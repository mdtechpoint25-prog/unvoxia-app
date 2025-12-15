"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Heart, ArrowRight, ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";
import { useState } from "react";

const questions = [
  {
    category: "Communication",
    questions: [
      { id: 1, text: "I feel heard and understood when I share my thoughts with my partner." },
      { id: 2, text: "We can discuss difficult topics without the conversation turning into a fight." },
      { id: 3, text: "My partner asks about my day and genuinely listens to my answer." },
    ]
  },
  {
    category: "Trust & Honesty",
    questions: [
      { id: 4, text: "I trust my partner to be honest with me, even when it's difficult." },
      { id: 5, text: "I feel comfortable sharing my fears and vulnerabilities with my partner." },
      { id: 6, text: "I believe my partner is faithful and committed to our relationship." },
    ]
  },
  {
    category: "Emotional Connection",
    questions: [
      { id: 7, text: "I feel emotionally close to my partner most of the time." },
      { id: 8, text: "My partner shows affection in ways that make me feel loved." },
      { id: 9, text: "We share moments of joy, laughter, and fun together regularly." },
    ]
  },
  {
    category: "Conflict Resolution",
    questions: [
      { id: 10, text: "When we argue, we eventually come to a resolution that works for both of us." },
      { id: 11, text: "My partner takes responsibility for their part in disagreements." },
      { id: 12, text: "After conflicts, we're able to repair and reconnect without lingering resentment." },
    ]
  },
  {
    category: "Support & Care",
    questions: [
      { id: 13, text: "My partner supports my personal goals and growth." },
      { id: 14, text: "I feel like we're a team when facing life's challenges." },
      { id: 15, text: "My partner shows up for me during difficult times." },
    ]
  },
  {
    category: "Commitment & Future",
    questions: [
      { id: 16, text: "We share similar values about what's important in life." },
      { id: 17, text: "I feel confident about our future together." },
      { id: 18, text: "We make decisions together that consider both of our needs." },
    ]
  }
];

const options = [
  { value: "1", label: "Strongly Disagree" },
  { value: "2", label: "Disagree" },
  { value: "3", label: "Neutral" },
  { value: "4", label: "Agree" },
  { value: "5", label: "Strongly Agree" },
];

const allQuestions = questions.flatMap(cat => cat.questions.map(q => ({ ...q, category: cat.category })));

export default function IndividualAssessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [email, setEmail] = useState("");

  const progress = ((currentQuestion + 1) / allQuestions.length) * 100;
  const currentQ = allQuestions[currentQuestion];
  const canProceed = answers[currentQ.id] !== undefined;

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({ ...prev, [currentQ.id]: value }));
  };

  const handleNext = () => {
    if (currentQuestion < allQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const calculateScore = () => {
    const total = Object.values(answers).reduce((sum, val) => sum + parseInt(val), 0);
    const maxScore = allQuestions.length * 5;
    return Math.round((total / maxScore) * 100);
  };

  const getCategoryScore = (category: string) => {
    const categoryQuestions = allQuestions.filter(q => q.category === category);
    const categoryAnswers = categoryQuestions.map(q => parseInt(answers[q.id] || "0"));
    const total = categoryAnswers.reduce((sum, val) => sum + val, 0);
    const maxScore = categoryQuestions.length * 5;
    return Math.round((total / maxScore) * 100);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    if (score >= 40) return "text-orange-600";
    return "text-red-600";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Healthy";
    if (score >= 60) return "Moderate";
    if (score >= 40) return "Needs Attention";
    return "Critical";
  };

  const getInsights = (score: number) => {
    if (score >= 80) {
      return {
        summary: "Your relationship shows strong foundations across most areas.",
        insights: [
          "You and your partner have built a solid foundation of trust and communication.",
          "Continue nurturing what's working well in your relationship.",
          "Consider deepening your connection through shared experiences and goals."
        ],
        actions: [
          "Schedule regular relationship check-ins to maintain connection.",
          "Express appreciation for the positive aspects of your relationship.",
          "Set new shared goals to continue growing together."
        ]
      };
    }
    if (score >= 60) {
      return {
        summary: "Your relationship has strengths but some areas need attention.",
        insights: [
          "You have positive elements to build upon.",
          "There are specific areas where focused improvement could help.",
          "Open communication about concerns could strengthen your bond."
        ],
        actions: [
          "Identify 1-2 areas for improvement and discuss them openly.",
          "Create dedicated time for meaningful connection.",
          "Consider reading relationship books or attending workshops together."
        ]
      };
    }
    if (score >= 40) {
      return {
        summary: "Several aspects of your relationship need focused attention.",
        insights: [
          "There are significant concerns that deserve honest reflection.",
          "Without attention, these issues may continue to grow.",
          "Both partners need to commit to positive change."
        ],
        actions: [
          "Have an honest conversation about your concerns with your partner.",
          "Consider seeking professional guidance from a counselor.",
          "Focus on rebuilding trust and communication as foundations."
        ]
      };
    }
    return {
      summary: "Your relationship is experiencing significant challenges.",
      insights: [
        "Multiple core areas of your relationship need immediate attention.",
        "These patterns often indicate deeper issues that need addressing.",
        "Professional support is highly recommended at this stage."
      ],
      actions: [
        "Seek professional counseling or therapy as soon as possible.",
        "Prioritize your emotional safety and wellbeing.",
        "Consider whether both partners are willing to commit to change."
      ]
    };
  };

  if (showResults) {
    const score = calculateScore();
    const categories = [...new Set(questions.map(q => q.category))];
    const { summary, insights, actions } = getInsights(score);

    return (
      <div className="min-h-screen bg-background">
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold tracking-tight">NOMA</span>
            </Link>
          </div>
        </nav>

        <main className="pt-32 pb-20 px-6">
          <motion.div 
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="text-center mb-12">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-primary" />
              </div>
              <h1 className="text-3xl md:text-4xl font-serif font-medium mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                Your Relationship Health Report
              </h1>
              <p className="text-muted-foreground">
                Based on your responses, here's your personalized assessment.
              </p>
            </div>

            <Card className="mb-8">
              <CardContent className="p-8 text-center">
                <p className="text-sm text-muted-foreground mb-2">Overall Relationship Health Score</p>
                <p className={`text-6xl font-bold mb-2 ${getScoreColor(score)}`}>{score}%</p>
                <p className={`text-xl font-medium ${getScoreColor(score)}`}>{getScoreLabel(score)}</p>
                <p className="text-muted-foreground mt-4">{summary}</p>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-6">Category Breakdown</h3>
                <div className="space-y-4">
                  {categories.map(category => {
                    const catScore = getCategoryScore(category);
                    return (
                      <div key={category}>
                        <div className="flex justify-between mb-2">
                          <span className="font-medium">{category}</span>
                          <span className={getScoreColor(catScore)}>{catScore}%</span>
                        </div>
                        <div className="h-3 bg-muted rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full rounded-full ${catScore >= 80 ? 'bg-green-500' : catScore >= 60 ? 'bg-yellow-500' : catScore >= 40 ? 'bg-orange-500' : 'bg-red-500'}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${catScore}%` }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-4">Key Insights</h3>
                <ul className="space-y-3">
                  {insights.map((insight, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-primary text-sm font-medium">{i + 1}</span>
                      </div>
                      <span className="text-muted-foreground">{insight}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="mb-8 border-primary/30 bg-primary/5">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-4">Your Action Plan</h3>
                <ul className="space-y-3">
                  {actions.map((action, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="mb-8 border-amber-200 bg-amber-50/50">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-amber-800">
                    <strong>Remember:</strong> This assessment provides guidance, not diagnosis. For serious concerns, please consult a professional counselor or therapist.
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="text-center">
              <Button asChild size="lg" className="rounded-full">
                <Link href="/">Return to Home</Link>
              </Button>
            </div>
          </motion.div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <Heart className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold tracking-tight">NOMA</span>
          </Link>
          <Link href="/assessment" className="text-muted-foreground hover:text-foreground text-sm">
            Exit Assessment
          </Link>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>{currentQ.category}</span>
              <span>Question {currentQuestion + 1} of {allQuestions.length}</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-xl md:text-2xl font-medium mb-8 leading-relaxed">
                    {currentQ.text}
                  </h2>

                  <RadioGroup
                    value={answers[currentQ.id] || ""}
                    onValueChange={handleAnswer}
                    className="space-y-3"
                  >
                    {options.map(option => (
                      <div key={option.value} className="flex items-center">
                        <RadioGroupItem
                          value={option.value}
                          id={`option-${option.value}`}
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor={`option-${option.value}`}
                          className="flex-1 p-4 rounded-xl border-2 cursor-pointer transition-all peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 hover:border-primary/50"
                        >
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="rounded-full"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <Button
              onClick={handleNext}
              disabled={!canProceed}
              className="rounded-full"
            >
              {currentQuestion === allQuestions.length - 1 ? "See Results" : "Next"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
