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
    <div className="min-h-screen bg-background">
      <div className="relative overflow-hidden">
        <div className="absolute top-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 left-10 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        <header className="mb-16 text-center">
          <div className="inline-block relative">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent">
              Генератор Сценариев
            </h1>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-accent rounded-full"></div>
          </div>
          <p className="text-lg mt-8 text-muted-foreground">Создайте сценарий и раскадровку за минуты</p>
        </header>

        <div className="max-w-4xl mx-auto">
          <div className="bg-card backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-border/50 hover:border-accent/30 transition-all duration-300">
            <div className="space-y-8">
              <div>
                <Label htmlFor="scenario" className="text-lg mb-4 block flex items-center gap-2">
                  <Icon name="FileText" size={20} className="text-accent" />
                  Введите сценарий
                </Label>
                <Textarea
                  id="scenario"
                  value={scenario}
                  onChange={(e) => setScenario(e.target.value)}
                  placeholder="Напишите идею сценария... Например: История о космонавте, который находит загадочный артефакт на Марсе..."
                  className="min-h-[220px] bg-background/50 border-border/50 resize-none text-base focus-visible:ring-accent focus-visible:border-accent rounded-2xl transition-all"
                />
              </div>

              <div className="flex items-center space-x-3 p-5 bg-muted/30 rounded-2xl hover:bg-muted/50 transition-all cursor-pointer">
                <Checkbox
                  id="storyboard"
                  checked={generateStoryboard}
                  onCheckedChange={(checked) => setGenerateStoryboard(checked as boolean)}
                  className="border-2 data-[state=checked]:bg-accent data-[state=checked]:border-accent rounded-md"
                />
                <Label 
                  htmlFor="storyboard" 
                  className="text-base cursor-pointer select-none flex items-center gap-2 flex-1"
                >
                  <Icon name="Film" size={18} className="text-accent" />
                  Генерировать раскадровку
                </Label>
              </div>

              <Button
                onClick={handleGenerate}
                disabled={isGenerating || !scenario.trim()}
                className="w-full h-14 text-lg bg-accent hover:bg-accent/90 rounded-2xl shadow-lg hover:shadow-accent/20 transition-all duration-300 disabled:opacity-50"
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
              <div className="bg-card backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-border/50 hover:border-accent/30 transition-all duration-300">
                <h2 className="text-3xl mb-6 flex items-center gap-3">
                  <div className="p-2 bg-accent/10 rounded-xl">
                    <Icon name="FileCheck" size={28} className="text-accent" />
                  </div>
                  Результат
                </h2>
                <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed bg-background/50 p-6 rounded-2xl border border-border/30">
                  {result.scenario}
                </pre>
              </div>

              {result.storyboard && (
                <div className="bg-gradient-to-br from-accent/10 via-card to-card backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-accent/20 hover:border-accent/40 transition-all duration-300">
                  <h2 className="text-3xl mb-6 flex items-center gap-3">
                    <div className="p-2 bg-accent/20 rounded-xl">
                      <Icon name="Clapperboard" size={28} className="text-accent" />
                    </div>
                    Раскадровка
                  </h2>
                  <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed bg-background/30 p-6 rounded-2xl border border-accent/20">
                    {result.storyboard}
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>

        <footer className="mt-24 text-center">
          <div className="inline-flex items-center gap-4 text-sm text-muted-foreground">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-border"></div>
            <span>Современный дизайн</span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-border"></div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;