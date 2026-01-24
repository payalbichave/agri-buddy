import { useState } from "react";
import { Cloud, Search, Loader2, MapPin, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface WeatherResult {
  city: string;
  advice: string;
}

const Weather = () => {
  const [city, setCity] = useState("");
  const [result, setResult] = useState<WeatherResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/weather?city=${encodeURIComponent(city.trim())}`
      );

      if (!response.ok) throw new Error("Weather fetch failed");

      const data = await response.json();
      setResult({
        city: city.trim(),
        advice: data.advice || data.message || data.weather || JSON.stringify(data),
      });
    } catch (err) {
      setError("Failed to get weather data. Please ensure the API server is running.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Weather Insights</h1>
        <p className="text-muted-foreground">
          Get weather forecasts and farming advice tailored to your location.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name..."
              className="pl-12 h-14 rounded-xl text-base"
            />
          </div>
          <Button
            type="submit"
            size="lg"
            disabled={!city.trim() || isLoading}
            className="h-14 px-8 rounded-xl"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Search className="h-5 w-5" />
            )}
          </Button>
        </div>
      </form>

      {/* Error State */}
      {error && (
        <div className="mt-6 p-4 rounded-xl bg-destructive/10 border border-destructive/20 flex items-start gap-3 animate-fade-in">
          <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
          <p className="text-destructive">{error}</p>
        </div>
      )}

      {/* Weather Result */}
      {result && (
        <div className="mt-8 animate-fade-in">
          <div className="rounded-2xl overflow-hidden border border-border shadow-soft">
            {/* Header */}
            <div className="gradient-hero p-6 text-primary-foreground">
              <div className="flex items-center gap-3 mb-2">
                <Cloud className="h-8 w-8" />
                <span className="text-2xl font-bold">{result.city}</span>
              </div>
              <p className="text-primary-foreground/80 text-sm">
                Weather forecast and farming recommendations
              </p>
            </div>

            {/* Advice */}
            <div className="bg-card p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">
                Farming Advice
              </h3>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {result.advice}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!result && !error && (
        <div className="mt-12 text-center">
          <div className="w-20 h-20 rounded-2xl gradient-accent mx-auto mb-4 flex items-center justify-center">
            <Cloud className="h-10 w-10 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Check Weather Conditions
          </h3>
          <p className="text-muted-foreground max-w-sm mx-auto">
            Enter your city name to get weather-based farming recommendations.
          </p>
        </div>
      )}
    </div>
  );
};

export default Weather;
