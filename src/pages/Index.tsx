import { useState, useEffect } from 'react';
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
  const [consoleText, setConsoleText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  // Эффект мигающего курсора
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  // Эффект печатающейся машинки для результата
  useEffect(() => {
    if (result) {
      const fullText = `> ГЕНЕРАЦИЯ ЗАВЕРШЕНА\n\n${result.scenario}${result.storyboard ? '\n\n' + result.storyboard : ''}`;
      let index = 0;
      setConsoleText('');
      
      const interval = setInterval(() => {
        if (index < fullText.length) {
          setConsoleText(fullText.slice(0, index + 1));
          index++;
        } else {
          clearInterval(interval);
        }
      }, 20);
      
      return () => clearInterval(interval);
    } else {
      setConsoleText('');
    }
  }, [result]);

  const handleGenerate = () => {
    if (!scenario.trim()) return;
    
    setIsGenerating(true);
    setConsoleText('> ИНИЦИАЛИЗАЦИЯ ГЕНЕРАТОРА...\n> ОБРАБОТКА СЦЕНАРИЯ...\n> АНАЛИЗ СТРУКТУРЫ...');
    
    setTimeout(() => {
      const scenarioResult = `Сценарий обработан:\n\n${scenario}\n\nЖанр: драма\nДлительность: ~10 минут\nСцены: 5`;
      
      const storyboardResult = generateStoryboard 
        ? `РАСКАДРОВКА:\n\n[СЦЕНА 1] Крупный план главного героя\n[СЦЕНА 2] Общий план локации\n[СЦЕНА 3] Средний план диалог\n[СЦЕНА 4] Деталь предмета\n[СЦЕНА 5] Финальный кадр` 
        : undefined;
      
      setResult({
        scenario: scenarioResult,
        storyboard: storyboardResult
      });
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#0d1b17] relative overflow-hidden">
      {/* Атмосферный фон с зелёным свечением */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-emerald-500/20 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-green-600/15 rounded-full blur-[120px]" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-teal-600/10 rounded-full blur-[200px]"></div>
      </div>

      {/* Шумовой паттерн */}
      <div className="absolute inset-0 opacity-[0.015] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]"></div>

      {/* Декоративные элементы - растение слева */}
      <div className="absolute bottom-0 left-0 w-48 h-64 opacity-30">
        <div className="absolute bottom-0 left-8 w-20 h-48 bg-gradient-to-t from-green-900/80 to-transparent rounded-t-full"></div>
        <div className="absolute bottom-32 left-6 w-16 h-32 bg-gradient-to-tr from-green-800/60 to-transparent rounded-full -rotate-45"></div>
        <div className="absolute bottom-28 left-16 w-20 h-36 bg-gradient-to-tl from-green-800/60 to-transparent rounded-full rotate-45"></div>
      </div>

      {/* Декоративные элементы - кружка справа */}
      <div className="absolute bottom-4 right-12 w-16 h-20 opacity-40">
        <div className="w-full h-16 bg-gradient-to-b from-green-900/60 to-green-950/80 rounded-b-lg border-2 border-green-700/40"></div>
        <div className="absolute top-4 -right-3 w-8 h-10 border-2 border-green-700/40 rounded-full border-l-0"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* CRT Television Frame */}
        <div className="max-w-5xl mx-auto">
          {/* Верхняя рамка телевизора */}
          <div className="bg-gradient-to-b from-emerald-800 to-emerald-900 rounded-t-3xl p-6 border-4 border-emerald-700 relative">
            <div className="absolute top-2 left-4 flex gap-2">
              <div className="w-2 h-2 rounded-full bg-red-900 border border-red-700"></div>
              <div className="w-2 h-2 rounded-full bg-emerald-950 border border-emerald-800"></div>
            </div>
            <div className="text-center">
              <div className="inline-block terminal-text text-emerald-200 text-xl opacity-60 tracking-wider">
                RETRO SCENARIO GEN v1.0
              </div>
            </div>
          </div>

          {/* CRT Screen */}
          <div className="bg-black border-x-4 border-emerald-700 relative overflow-hidden">
            {/* Эффект сканлиний */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-emerald-500/[0.02] to-transparent bg-[length:100%_4px] opacity-70"></div>
            
            {/* Эффект свечения экрана */}
            <div className="absolute inset-0 crt-screen pointer-events-none"></div>

            {/* Контент экрана */}
            <div className="relative bg-black/95 p-8 min-h-[600px]">
              {!result ? (
                <div className="space-y-6">
                  <div className="terminal-text text-emerald-400 text-2xl mb-6">
                    <span className="text-emerald-300">&gt;</span> ГЕНЕРАТОР СЦЕНАРИЕВ
                  </div>

                  <div>
                    <Label htmlFor="scenario" className="terminal-text text-emerald-400 text-lg mb-3 block">
                      <span className="text-emerald-300">&gt;</span> ВВЕДИТЕ_СЦЕНАРИЙ:
                    </Label>
                    <Textarea
                      id="scenario"
                      value={scenario}
                      onChange={(e) => setScenario(e.target.value)}
                      placeholder="> напечатайте вашу идею здесь..."
                      className="min-h-[200px] bg-black/80 border-2 border-emerald-600/40 resize-none text-lg text-emerald-300 placeholder:text-emerald-700 focus-visible:ring-emerald-500 focus-visible:border-emerald-500 rounded-none terminal-text"
                    />
                  </div>

                  <div className="flex items-center space-x-3 p-4 bg-emerald-950/30 border border-emerald-800/40">
                    <Checkbox
                      id="storyboard"
                      checked={generateStoryboard}
                      onCheckedChange={(checked) => setGenerateStoryboard(checked as boolean)}
                      className="border-2 border-emerald-600 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-500"
                    />
                    <Label 
                      htmlFor="storyboard" 
                      className="terminal-text text-base cursor-pointer select-none text-emerald-400"
                    >
                      [X] СОЗДАТЬ_РАСКАДРОВКУ
                    </Label>
                  </div>

                  <Button
                    onClick={handleGenerate}
                    disabled={isGenerating || !scenario.trim()}
                    className="w-full h-12 terminal-text text-xl bg-emerald-700 hover:bg-emerald-600 text-black border-2 border-emerald-500 rounded-none shadow-lg shadow-emerald-600/30 transition-all duration-300 disabled:opacity-50 font-bold"
                  >
                    {isGenerating ? (
                      <span className="flex items-center justify-center gap-3">
                        <span className="animate-pulse">[</span>
                        <span>ГЕНЕРАЦИЯ</span>
                        <span className="animate-pulse">]</span>
                      </span>
                    ) : (
                      <span>&gt; ЗАПУСТИТЬ_ГЕНЕРАЦИЮ</span>
                    )}
                  </Button>
                </div>
              ) : (
                <div className="terminal-text text-emerald-400 text-base leading-relaxed space-y-2">
                  <div className="whitespace-pre-wrap">
                    {consoleText}
                    {showCursor && <span className="inline-block w-2 h-5 bg-emerald-400 ml-1 animate-pulse"></span>}
                  </div>
                  
                  <div className="pt-8">
                    <Button
                      onClick={() => {
                        setResult(null);
                        setScenario('');
                        setGenerateStoryboard(false);
                      }}
                      className="terminal-text text-lg bg-emerald-900/50 hover:bg-emerald-800/50 text-emerald-400 border-2 border-emerald-600 rounded-none"
                    >
                      &gt; НОВАЯ_ГЕНЕРАЦИЯ
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Нижняя рамка телевизора */}
          <div className="bg-gradient-to-t from-emerald-800 to-emerald-900 rounded-b-3xl p-4 border-4 border-t-0 border-emerald-700 flex items-center justify-between">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-950 border-2 border-emerald-700 flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-emerald-900"></div>
              </div>
              <div className="w-10 h-10 rounded-full bg-emerald-950 border-2 border-emerald-700 flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-emerald-900"></div>
              </div>
            </div>
            
            <div className="terminal-text text-emerald-300/40 text-sm tracking-widest">
              POWERED BY RETRO TECH
            </div>
            
            <div className="flex gap-2">
              <div className="w-16 h-2 bg-emerald-950 border border-emerald-700 rounded-full"></div>
              <div className="w-16 h-2 bg-emerald-950 border border-emerald-700 rounded-full"></div>
            </div>
          </div>
        </div>

        <footer className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 terminal-text text-sm text-emerald-700/60">
            <span>— — —</span>
            <span>RETRO DESIGN EXPERIENCE</span>
            <span>— — —</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
