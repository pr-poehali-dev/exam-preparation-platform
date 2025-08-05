import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

// Данные тестов (первые 10 вопросов)
const examQuestions = [
  {
    id: 1,
    question: "Какие общие требования предъявляются к современным вычислительным системам?",
    options: [
      "Отсутствие необходимости в программных средствах общения с ЭВМ.",
      "Повышение быстродействия и снижение стоимости арифметических операций и единицы памяти, разработка программных средств общения с ЭВМ, возможность решения сложных прикладных и математических задач.",
      "Только увеличение объёма оперативной памяти.",
      "Ограничение возможностей решения сложных прикладных задач."
    ],
    correct: 1
  },
  {
    id: 2,
    question: "Что такое архитектура компьютерных сетей?",
    options: [
      "Совокупность только физических компонентов сети.",
      "Сложная структура, которая включает в себя различные сервисы и протоколы для обеспечения работы Интернета и других глобальных сервисов, а также элементы сети, средства объединения устройств, системы адресации и механизмы управления.",
      "Набор правил для работы с локальными сетями.",
      "Система, не включающая в себя механизмы управления и сервисы."
    ],
    correct: 1
  },
  {
    id: 3,
    question: "Перечислите основные компоненты сетевой операционной системы.",
    options: [
      "Только средства управления файлами.",
      "Средства обеспечения взаимодействия между компьютерами, управления ресурсами и обмена данными, средства управления процессами, памятью, файлами и обработки сигналов.",
      "Исключительно инструменты для работы с периферийными устройствами.",
      "Компоненты, не связанные с управлением ресурсами и обменом данными."
    ],
    correct: 1
  },
  {
    id: 4,
    question: "Что такое локальная сеть и как она организуется?",
    options: [
      "Локальная сеть — это сеть, которая объединяет компьютеры в разных странах; организуется без использования систем адресации.",
      "Локальная сеть — это сеть, которая состоит из ряда элементов, обеспечивающих взаимодействие между компьютерами и другими устройствами; использует систему адресации для идентификации устройств и передачи данных, позволяет совместно использовать ресурсы.",
      "Локальная сеть нужна только для подключения принтеров.",
      "Локальная сеть организуется без каких-либо технологий и средств объединения устройств."
    ],
    correct: 1
  },
  {
    id: 5,
    question: "Какие базовые топологии сетей существуют?",
    options: [
      "Топология сети не имеет значения для её работы.",
      "Существуют различные базовые топологии, которые определяют способ соединения устройств в сети и влияют на её характеристики (надёжность, скорость передачи данных, удобство управления).",
      "Существует только одна универсальная топология для всех сетей.",
      "Топология определяется исключительно количеством устройств в сети."
    ],
    correct: 1
  }
];

const achievements = [
  { name: "Первые шаги", description: "Прошли первый тест", icon: "Medal", unlocked: false },
  { name: "Знаток", description: "Набрали 80%+ баллов", icon: "Award", unlocked: false },
  { name: "Отличник", description: "5 тестов подряд на отлично", icon: "Trophy", unlocked: false },
  { name: "Исследователь", description: "Изучили все темы", icon: "BookOpen", unlocked: false }
];

const Index = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [testStarted, setTestStarted] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const [userAchievements, setUserAchievements] = useState(achievements);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === examQuestions[currentQuestion].correct;
    if (isCorrect) {
      setScore(score + 1);
    }

    setAnsweredQuestions(answeredQuestions + 1);
    setShowResult(true);

    setTimeout(() => {
      if (currentQuestion < examQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        // Тест завершен
        const finalScore = isCorrect ? score + 1 : score;
        const percentage = (finalScore / examQuestions.length) * 100;
        
        // Разблокируем достижения
        const newAchievements = [...userAchievements];
        if (!newAchievements[0].unlocked) {
          newAchievements[0].unlocked = true;
        }
        if (percentage >= 80 && !newAchievements[1].unlocked) {
          newAchievements[1].unlocked = true;
        }
        setUserAchievements(newAchievements);
      }
    }, 2000);
  };

  const startTest = () => {
    setTestStarted(true);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnsweredQuestions(0);
  };

  const resetTest = () => {
    setTestStarted(false);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnsweredQuestions(0);
  };

  const progress = (answeredQuestions / examQuestions.length) * 100;
  const isTestCompleted = currentQuestion === examQuestions.length - 1 && showResult;

  if (!testStarted) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        {/* Header */}
        <header className="max-w-6xl mx-auto mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                Подготовка к экзамену
              </h1>
              <p className="text-slate-600">
                Система тестирования по вычислительным системам
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="px-3 py-1">
                <Icon name="User" size={16} className="mr-2" />
                Студент
              </Badge>
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Главная карточка теста */}
          <div className="lg:col-span-2">
            <Card className="exam-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Icon name="BookOpen" size={24} className="text-blue-500" />
                  Тест по вычислительным системам
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Icon name="Clock" size={16} className="text-slate-500" />
                    <span>≈ 15 минут</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="HelpCircle" size={16} className="text-slate-500" />
                    <span>{examQuestions.length} вопросов</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Target" size={16} className="text-slate-500" />
                    <span>Проходной: 60%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="CheckCircle" size={16} className="text-slate-500" />
                    <span>Один правильный ответ</span>
                  </div>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-medium text-blue-900 mb-2">О тесте:</h3>
                  <p className="text-blue-800 text-sm">
                    Проверка знаний по общей теории построения ЭВМ, архитектуре компьютерных сетей 
                    и основам информационных систем в строительстве.
                  </p>
                </div>

                <Button 
                  onClick={startTest}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                  size="lg"
                >
                  <Icon name="Play" size={20} className="mr-2" />
                  Начать тестирование
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Боковая панель */}
          <div className="space-y-6">
            {/* Статистика */}
            <Card className="exam-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Icon name="BarChart3" size={20} className="text-green-500" />
                  Статистика
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Пройдено тестов</span>
                    <Badge variant="outline">0</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Средний балл</span>
                    <Badge variant="outline">-</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Лучший результат</span>
                    <Badge variant="outline">-</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Достижения */}
            <Card className="exam-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Icon name="Award" size={20} className="text-yellow-500" />
                  Достижения
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {userAchievements.map((achievement, index) => (
                    <div 
                      key={index} 
                      className={`flex items-center gap-3 p-3 rounded-lg ${
                        achievement.unlocked ? 'bg-yellow-50 border border-yellow-200' : 'bg-slate-50'
                      }`}
                    >
                      <Icon 
                        name={achievement.icon as any} 
                        size={16} 
                        className={achievement.unlocked ? 'text-yellow-600' : 'text-slate-400'} 
                      />
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${
                          achievement.unlocked ? 'text-yellow-900' : 'text-slate-500'
                        }`}>
                          {achievement.name}
                        </p>
                        <p className={`text-xs ${
                          achievement.unlocked ? 'text-yellow-700' : 'text-slate-400'
                        }`}>
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (isTestCompleted) {
    const percentage = (score / examQuestions.length) * 100;
    return (
      <div className="min-h-screen bg-slate-50 p-6 flex items-center justify-center">
        <Card className="exam-card max-w-lg w-full">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Icon name="CheckCircle" size={32} className="text-blue-600" />
            </div>
            <CardTitle className="text-2xl">Тест завершен!</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {score} / {examQuestions.length}
              </div>
              <div className="text-lg text-slate-600">
                {percentage.toFixed(0)}% правильных ответов
              </div>
            </div>

            <div className={`p-4 rounded-lg ${
              percentage >= 80 ? 'bg-green-50 text-green-800' :
              percentage >= 60 ? 'bg-yellow-50 text-yellow-800' :
              'bg-red-50 text-red-800'
            }`}>
              {percentage >= 80 ? '🎉 Отличный результат!' :
               percentage >= 60 ? '👍 Хороший результат!' :
               '📚 Нужно подучить материал'}
            </div>

            <div className="space-y-3">
              <Button onClick={resetTest} className="w-full" variant="outline">
                <Icon name="RotateCcw" size={16} className="mr-2" />
                Пройти заново
              </Button>
              <Button onClick={() => window.location.reload()} className="w-full">
                <Icon name="Home" size={16} className="mr-2" />
                На главную
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      {/* Header с прогрессом */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" onClick={resetTest}>
            <Icon name="ArrowLeft" size={16} className="mr-2" />
            Завершить тест
          </Button>
          <Badge variant="secondary">
            Вопрос {currentQuestion + 1} из {examQuestions.length}
          </Badge>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Основной контент */}
      <div className="max-w-4xl mx-auto">
        <Card className="exam-card">
          <CardHeader>
            <CardTitle className="text-xl leading-relaxed">
              {examQuestions[currentQuestion].question}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {examQuestions[currentQuestion].options.map((option, index) => (
              <div
                key={index}
                className={`question-option ${
                  selectedAnswer === index ? 'selected' : ''
                } ${
                  showResult && index === examQuestions[currentQuestion].correct
                    ? 'correct'
                    : showResult && selectedAnswer === index && index !== examQuestions[currentQuestion].correct
                    ? 'incorrect'
                    : ''
                }`}
                onClick={() => handleAnswerSelect(index)}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
                    selectedAnswer === index 
                      ? 'border-blue-500 bg-blue-500 text-white' 
                      : 'border-slate-300'
                  }`}>
                    {String.fromCharCode(97 + index)}
                  </div>
                  <p className="flex-1 text-slate-800 leading-relaxed">{option}</p>
                  {showResult && index === examQuestions[currentQuestion].correct && (
                    <Icon name="Check" size={20} className="text-green-600" />
                  )}
                  {showResult && selectedAnswer === index && index !== examQuestions[currentQuestion].correct && (
                    <Icon name="X" size={20} className="text-red-600" />
                  )}
                </div>
              </div>
            ))}

            <div className="pt-6 flex justify-between items-center">
              <div className="text-sm text-slate-500">
                {showResult ? (
                  selectedAnswer === examQuestions[currentQuestion].correct ? (
                    <span className="text-green-600 flex items-center gap-1">
                      <Icon name="CheckCircle" size={16} />
                      Правильно!
                    </span>
                  ) : (
                    <span className="text-red-600 flex items-center gap-1">
                      <Icon name="XCircle" size={16} />
                      Неправильно
                    </span>
                  )
                ) : (
                  "Выберите один вариант ответа"
                )}
              </div>
              <Button 
                onClick={handleNextQuestion}
                disabled={selectedAnswer === null || showResult}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {currentQuestion === examQuestions.length - 1 ? 'Завершить тест' : 'Следующий вопрос'}
                <Icon name="ChevronRight" size={16} className="ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;