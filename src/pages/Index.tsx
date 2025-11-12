import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [scenario, setScenario] = useState('');
  const [generateStoryboard, setGenerateStoryboard] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<{ scenario: string; storyboard?: string } | null>(null);

  const handleGenerate = () => {
    if (!scenario.trim()) return;
    
    setIsGenerating(true);
    
    setTimeout(() => {
      const scenarioResult = `Сценарий обработан:\n\n${scenario}\n\nЖанр: драма\nДлительность: ~10 минут\nСцены: 5`;
      
      const storyboardResult = generateStoryboard 
        ? `РАСКАДРОВКА:\n\n📐 Сцена 1: Крупный план главного героя\n📐 Сцена 2: Общий план локации\n📐 Сцена 3: Средний план диалог\n📐 Сцена 4: Деталь предмета\n📐 Сцена 5: Финальный кадр` 
        : undefined;
      
      setResult({
        scenario: scenarioResult,
        storyboard: storyboardResult
      });
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
      {/* Неоновый фон в стиле референса */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-red-600/30 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-red-500/20 rounded-full blur-[150px] animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-red-700/15 rounded-full blur-[180px]"></div>
      </div>
      
      {/* Градиентный оверлей для глубины */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70"></div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        <header className="mb-16 text-center">
          <div className="inline-block relative">
            <h1 className="text-6xl md:text-8xl font-black mb-4 text-white tracking-tight">
              Генератор Сценариев
            </h1>
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
          </div>
          <p className="text-lg mt-10 text-gray-400 font-light">Создайте сценарий и раскадровку за минуты</p>
        </header>

        <div className="max-w-4xl mx-auto">
          <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-white/5 hover:border-red-500/30 transition-all duration-500">
            <div className="space-y-8">
              <div>
                <Label htmlFor="scenario" className="text-base mb-4 block flex items-center gap-2 text-gray-300 font-medium">
                  <Icon name="FileText" size={18} className="text-red-500" />
                  Введите сценарий
                </Label>
                <Textarea
                  id="scenario"
                  value={scenario}
                  onChange={(e) => setScenario(e.target.value)}
                  placeholder="Напишите идею сценария... Например: История о космонавте, который находит загадочный артефакт на Марсе..."
                  className="min-h-[220px] bg-black/50 border-white/10 resize-none text-base text-gray-100 placeholder:text-gray-500 focus-visible:ring-red-500/50 focus-visible:border-red-500/50 rounded-2xl transition-all"
                />
              </div>

              <div className="flex items-center space-x-3 p-5 bg-white/5 rounded-2xl hover:bg-white/10 transition-all cursor-pointer border border-white/5">
                <Checkbox
                  id="storyboard"
                  checked={generateStoryboard}
                  onCheckedChange={(checked) => setGenerateStoryboard(checked as boolean)}
                  className="border-2 border-gray-600 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600 rounded-md"
                />
                <Label 
                  htmlFor="storyboard" 
                  className="text-base cursor-pointer select-none flex items-center gap-2 flex-1 text-gray-300"
                >
                  <Icon name="Film" size={18} className="text-red-500" />
                  Генерировать раскадровку
                </Label>
              </div>

              <Button
                onClick={handleGenerate}
                disabled={isGenerating || !scenario.trim()}
                className="w-full h-14 text-lg font-semibold bg-red-600 hover:bg-red-700 text-white rounded-2xl shadow-lg shadow-red-600/20 hover:shadow-red-600/40 transition-all duration-300 disabled:opacity-50"
              >
                {isGenerating ? (
                  <span className="flex items-center gap-3">
                    <Icon name="Loader2" size={24} className="animate-spin" />
                    Генерация...
                  </span>
                ) : (
                  <span className="flex items-center gap-3">
                    <Icon name="Sparkles" size={24} />
                    Генерировать
                  </span>
                )}
              </Button>
            </div>
          </div>

          {result && (
            <div className="mt-12 space-y-6 animate-fade-in">
              <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/5 hover:border-red-500/20 transition-all duration-500">
                <h2 className="text-3xl mb-6 flex items-center gap-3 text-white font-bold">
                  <div className="p-2 bg-red-600/20 rounded-xl">
                    <Icon name="FileCheck" size={28} className="text-red-500" />
                  </div>
                  Результат
                </h2>
                <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed bg-black/50 text-gray-300 p-6 rounded-2xl border border-white/10">
                  {result.scenario}
                </pre>
              </div>

              {result.storyboard && (
                <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-red-500/20 hover:border-red-500/40 transition-all duration-500">
                  <h2 className="text-3xl mb-6 flex items-center gap-3 text-white font-bold">
                    <div className="p-2 bg-red-600/20 rounded-xl">
                      <Icon name="Clapperboard" size={28} className="text-red-500" />
                    </div>
                    Раскадровка
                  </h2>
                  <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed bg-black/50 text-gray-300 p-6 rounded-2xl border border-red-500/20">
                    {result.storyboard}
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>

        <footer className="mt-24 text-center">
          <div className="inline-flex items-center gap-4 text-sm text-gray-600">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-gray-700"></div>
            <span className="font-light">Современный дизайн</span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-gray-700"></div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
