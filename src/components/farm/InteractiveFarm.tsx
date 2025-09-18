import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  Zap, 
  Moon,
  Droplets,
  Thermometer,
  Wind
} from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface Crop {
  id: string;
  name: string;
  planted: Date;
  growthStage: number; // 0-100
  harvestReady: boolean;
  x: number;
  y: number;
}

interface Weather {
  condition: 'sunny' | 'rainy' | 'cloudy' | 'storm';
  temperature: number;
  humidity: number;
  windSpeed: number;
}

const weatherConditions = [
  { condition: 'sunny' as const, icon: Sun, color: 'text-yellow-500', label: 'Sunny' },
  { condition: 'rainy' as const, icon: CloudRain, color: 'text-blue-500', label: 'Rainy' },
  { condition: 'cloudy' as const, icon: Cloud, color: 'text-gray-500', label: 'Cloudy' },
  { condition: 'storm' as const, icon: Zap, color: 'text-purple-500', label: 'Storm' }
];

const cropTypes = ['Rice', 'Wheat', 'Millet', 'Cotton', 'Sugarcane'];

export function InteractiveFarm() {
  const [crops, setCrops] = useState<Crop[]>([]);
  const [weather, setWeather] = useState<Weather>({
    condition: 'sunny',
    temperature: 28,
    humidity: 65,
    windSpeed: 12
  });
  const [isDay, setIsDay] = useState(true);
  const [selectedPlot, setSelectedPlot] = useState<{ x: number; y: number } | null>(null);

  // Simulate day/night cycle
  useEffect(() => {
    const interval = setInterval(() => {
      setIsDay(prev => !prev);
    }, 30000); // Change every 30 seconds for demo

    return () => clearInterval(interval);
  }, []);

  // Simulate weather changes
  useEffect(() => {
    const interval = setInterval(() => {
      const conditions = weatherConditions;
      const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
      setWeather({
        condition: randomCondition.condition,
        temperature: Math.floor(Math.random() * 15) + 20, // 20-35°C
        humidity: Math.floor(Math.random() * 40) + 40, // 40-80%
        windSpeed: Math.floor(Math.random() * 20) + 5 // 5-25 km/h
      });
    }, 45000); // Change every 45 seconds

    return () => clearInterval(interval);
  }, []);

  // Simulate crop growth
  useEffect(() => {
    const interval = setInterval(() => {
      setCrops(prevCrops => 
        prevCrops.map(crop => {
          const growthRate = weather.condition === 'rainy' ? 2 : 
                           weather.condition === 'sunny' ? 1.5 : 
                           weather.condition === 'storm' ? 0.5 : 1;
          
          const newGrowth = Math.min(100, crop.growthStage + growthRate);
          return {
            ...crop,
            growthStage: newGrowth,
            harvestReady: newGrowth >= 100
          };
        })
      );
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, [weather]);

  const plantCrop = (x: number, y: number) => {
    const randomCropType = cropTypes[Math.floor(Math.random() * cropTypes.length)];
    const newCrop: Crop = {
      id: `${Date.now()}-${x}-${y}`,
      name: randomCropType,
      planted: new Date(),
      growthStage: 0,
      harvestReady: false,
      x,
      y
    };
    
    setCrops(prev => [...prev, newCrop]);
    setSelectedPlot(null);
  };

  const harvestCrop = (cropId: string) => {
    setCrops(prev => prev.filter(crop => crop.id !== cropId));
  };

  const weatherIcon = weatherConditions.find(w => w.condition === weather.condition);
  const WeatherIcon = weatherIcon?.icon || Sun;

  return (
    <div className="space-y-6">
      {/* Weather & Time Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-amber-800">
              <WeatherIcon className={`${weatherIcon?.color}`} size={24} />
              <span>Current Weather</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2 text-amber-700">
                <Thermometer size={16} />
                <span>{weather.temperature}°C</span>
              </div>
              <div className="flex items-center space-x-2 text-amber-700">
                <Droplets size={16} />
                <span>{weather.humidity}%</span>
              </div>
              <div className="flex items-center space-x-2 text-amber-700">
                <Wind size={16} />
                <span>{weather.windSpeed} km/h</span>
              </div>
              <div className="flex items-center space-x-2 text-amber-700">
                {isDay ? <Sun size={16} /> : <Moon size={16} />}
                <span>{isDay ? 'Day' : 'Night'}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-amber-800">Farm Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-amber-600">Total Crops:</span>
                <span className="ml-2 font-semibold text-amber-800">{crops.length}</span>
              </div>
              <div>
                <span className="text-amber-600">Ready to Harvest:</span>
                <span className="ml-2 font-semibold text-amber-800">{crops.filter(c => c.harvestReady).length}</span>
              </div>
              <div>
                <span className="text-amber-600">Growing:</span>
                <span className="ml-2 font-semibold text-amber-800">{crops.filter(c => !c.harvestReady).length}</span>
              </div>
              <div>
                <span className="text-amber-600">Weather Effect:</span>
                <Badge variant={weather.condition === 'rainy' ? 'default' : 'secondary'} className="ml-2 bg-amber-600">
                  {weather.condition === 'rainy' ? 'Boost' : 
                   weather.condition === 'storm' ? 'Slow' : 'Normal'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Interactive Farm Grid */}
      <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
        <CardHeader>
          <CardTitle className="text-amber-800">Your Farm</CardTitle>
          <p className="text-sm text-amber-600">
            Click on empty plots to plant crops. Click on grown crops to harvest them.
          </p>
        </CardHeader>
        <CardContent>
          <div 
            className={`relative w-full h-96 rounded-lg border-2 border-dashed border-border overflow-hidden transition-all duration-1000 ${
              isDay 
                ? 'bg-gradient-to-b from-blue-200 to-green-200' 
                : 'bg-gradient-to-b from-indigo-900 to-green-900'
            }`}
            style={{
              backgroundImage: `url("https://images.unsplash.com/photo-1752424564550-dbada9062781?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJsZSUyMGZhcm1pbmclMjBjcm9wcyUyMHJpY2UlMjB3aGVhdHxlbnwxfHx8fDE3NTgyMDEwNzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundBlendMode: isDay ? 'normal' : 'multiply'
            }}
          >
            {/* Weather overlay */}
            {weather.condition === 'rainy' && (
              <div className="absolute inset-0 bg-blue-500 opacity-20 animate-pulse"></div>
            )}
            {weather.condition === 'storm' && (
              <div className="absolute inset-0 bg-purple-500 opacity-30 animate-pulse"></div>
            )}
            
            {/* Farm grid */}
            <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 gap-2 p-4">
              {Array.from({ length: 24 }, (_, index) => {
                const x = index % 6;
                const y = Math.floor(index / 6);
                const existingCrop = crops.find(crop => crop.x === x && crop.y === y);
                
                return (
                  <div
                    key={index}
                    className={`border border-white/30 rounded-lg bg-white/10 backdrop-blur-sm cursor-pointer transition-all hover:bg-white/20 ${
                      selectedPlot?.x === x && selectedPlot?.y === y ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => {
                      if (existingCrop) {
                        if (existingCrop.harvestReady) {
                          harvestCrop(existingCrop.id);
                        }
                      } else {
                        if (selectedPlot?.x === x && selectedPlot?.y === y) {
                          plantCrop(x, y);
                        } else {
                          setSelectedPlot({ x, y });
                        }
                      }
                    }}
                  >
                    {existingCrop ? (
                      <div className="w-full h-full flex flex-col items-center justify-center text-white text-xs">
                        <div className={`w-4 h-4 rounded-full mb-1 ${
                          existingCrop.harvestReady 
                            ? 'bg-yellow-400 animate-pulse' 
                            : existingCrop.growthStage > 50 
                              ? 'bg-green-400' 
                              : 'bg-green-200'
                        }`}></div>
                        <span className="font-semibold">{existingCrop.name}</span>
                        <span className="text-xs">{Math.round(existingCrop.growthStage)}%</span>
                        {existingCrop.harvestReady && (
                          <Badge className="mt-1 text-xs">Ready!</Badge>
                        )}
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        {selectedPlot?.x === x && selectedPlot?.y === y ? (
                          <Button size="sm" variant="secondary" className="text-xs">
                            Plant
                          </Button>
                        ) : (
                          <span className="text-white/50 text-xs">Empty</span>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}