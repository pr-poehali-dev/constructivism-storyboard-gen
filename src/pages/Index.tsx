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
    <div className="min-h-screen bg-white">
      <div className="relative">
        <div className="absolute top-0 right-0 w-1/3 h-96 bg-accent/10 -skew-y-6 transform origin-top-right"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-64 bg-black transform skew-x-12"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        <header className="mb-16 text-center">
          <div className="inline-block relative">
            <h1 className="text-6xl md:text-8xl font-bold mb-4 relative">
              ГЕНЕРАТОР
            </h1>
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-accent"></div>
          </div>
          <p className="text-xl mt-6 tracking-wide">СЦЕНАРИИ И РАСКАДРОВКА</p>
        </header>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white border-4 border-black p-8 md:p-12 relative">
            <div className="absolute top-0 right-0 w-20 h-20 bg-accent transform rotate-45 -mr-10 -mt-10"></div>
            
            <div className="space-y-8">
              <div>
                <Label htmlFor="scenario" className="text-lg mb-3 block uppercase tracking-wider">
                  Введите сценарий
                </Label>
                <Textarea
                  id="scenario"
                  value={scenario}
                  onChange={(e) => setScenario(e.target.value)}
                  placeholder="Напишите идею сценария..."
                  className="min-h-[200px] border-2 border-black resize-none text-base focus-visible:ring-accent"
                />
              </div>

              <div className="flex items-center space-x-3 p-4 bg-muted/50">
                <Checkbox
                  id="storyboard"
                  checked={generateStoryboard}
                  onCheckedChange={(checked) => setGenerateStoryboard(checked as boolean)}
                  className="border-2 border-black data-[state=checked]:bg-accent data-[state=checked]:border-accent"
                />
                <Label 
                  htmlFor="storyboard" 
                  className="text-base uppercase tracking-wide cursor-pointer select-none"
                >
                  Генерировать раскадровку
                </Label>
              </div>

              <Button
                onClick={handleGenerate}
                disabled={isGenerating || !scenario.trim()}
                className="w-full h-14 text-xl uppercase tracking-wider bg-black hover:bg-accent border-4 border-black hover:border-accent transition-all duration-300 disabled:opacity-50"
              >
                {isGenerating ? (
                  <span className="flex items-center gap-3">
                    <Icon name="Loader2" size={24} className="animate-spin" />
                    Генерация...
                  </span>
                ) : (
                  <span className="flex items-center gap-3">
                    <Icon name="Zap" size={24} />
                    Генерировать
                  </span>
                )}
              </Button>
            </div>
          </div>

          {result && (
            <div className="mt-12 space-y-6 animate-fade-in">
              <div className="bg-black text-white p-8 relative">
                <div className="absolute top-0 left-0 w-16 h-16 bg-accent transform -rotate-12 -ml-6 -mt-6"></div>
                <h2 className="text-3xl mb-4 flex items-center gap-3">
                  <Icon name="FileText" size={32} />
                  РЕЗУЛЬТАТ
                </h2>
                <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed">
                  {result.scenario}
                </pre>
              </div>

              {result.storyboard && (
                <div className="bg-accent text-white p-8 relative border-4 border-black">
                  <div className="absolute bottom-0 right-0 w-20 h-20 bg-black transform rotate-45 -mr-10 -mb-10"></div>
                  <h2 className="text-3xl mb-4 flex items-center gap-3">
                    <Icon name="Film" size={32} />
                    РАСКАДРОВКА
                  </h2>
                  <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed">
                    {result.storyboard}
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>

        <footer className="mt-24 text-center">
          <div className="inline-flex items-center gap-4 text-sm uppercase tracking-widest">
            <div className="w-16 h-0.5 bg-black"></div>
            <span>Конструктивизм</span>
            <div className="w-16 h-0.5 bg-accent"></div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
