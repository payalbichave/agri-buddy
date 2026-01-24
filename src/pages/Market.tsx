import { useState } from "react";
import { TrendingUp, Search, Loader2, AlertTriangle, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface MarketResult {
  crop: string;
  price: string;
}

const popularCrops = ["Wheat", "Rice", "Corn", "Soybean", "Cotton", "Sugarcane"];

const Market = () => {
  const [crop, setCrop] = useState("");
  const [result, setResult] = useState<MarketResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!crop.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/market/price?crop=${encodeURIComponent(crop.trim())}`
      );

      if (!response.ok) throw new Error("Price fetch failed");

      const data = await response.json();
      setResult({
        crop: crop.trim(),
        price: data.price || data.predicted_price || data.value || JSON.stringify(data),
      });
    } catch (err) {
      setError("Failed to get market price. Please ensure the API server is running.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickSelect = (selectedCrop: string) => {
    setCrop(selectedCrop);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Market Prices</h1>
        <p className="text-muted-foreground">
          Get predicted market prices for your crops to plan your sales strategy.
        </p>
      </div>

      {/* Quick Select */}
      <div className="mb-6">
        <p className="text-sm text-muted-foreground mb-3">Popular crops:</p>
        <div className="flex flex-wrap gap-2">
          {popularCrops.map((popularCrop) => (
            <button
              key={popularCrop}
              type="button"
              onClick={() => handleQuickSelect(popularCrop)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                crop.toLowerCase() === popularCrop.toLowerCase()
                  ? "bg-primary text-primary-foreground"
                  : "bg-accent text-accent-foreground hover:bg-primary/10"
              }`}
            >
              {popularCrop}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <TrendingUp className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              value={crop}
              onChange={(e) => setCrop(e.target.value)}
              placeholder="Enter crop name..."
              className="pl-12 h-14 rounded-xl text-base"
            />
          </div>
          <Button
            type="submit"
            size="lg"
            disabled={!crop.trim() || isLoading}
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

      {/* Price Result */}
      {result && (
        <div className="mt-8 animate-fade-in">
          <div className="rounded-2xl overflow-hidden border border-border shadow-elevated bg-card">
            <div className="p-8 text-center">
              <div className="w-16 h-16 rounded-2xl gradient-hero mx-auto mb-4 flex items-center justify-center">
                <DollarSign className="h-8 w-8 text-primary-foreground" />
              </div>
              
              <h3 className="text-lg text-muted-foreground mb-2">
                Predicted price for
              </h3>
              
              <p className="text-2xl font-bold text-foreground mb-4 capitalize">
                {result.crop}
              </p>

              <div className="inline-block bg-primary/10 rounded-xl px-6 py-4">
                <p className="text-3xl font-bold text-primary">
                  {result.price}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!result && !error && (
        <div className="mt-12 text-center">
          <div className="w-20 h-20 rounded-2xl gradient-accent mx-auto mb-4 flex items-center justify-center">
            <TrendingUp className="h-10 w-10 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Check Market Prices
          </h3>
          <p className="text-muted-foreground max-w-sm mx-auto">
            Enter a crop name or select from popular options to see predicted market prices.
          </p>
        </div>
      )}
    </div>
  );
};

export default Market;
