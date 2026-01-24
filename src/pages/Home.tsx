import { Link } from "react-router-dom";
import { MessageSquare, Leaf, Cloud, TrendingUp, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: MessageSquare,
    title: "Smart Chat Assistant",
    description: "Get instant answers about farming techniques, crop management, and best practices.",
    path: "/chat",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Leaf,
    title: "Disease Detection",
    description: "Upload crop images to identify diseases and get treatment recommendations.",
    path: "/disease",
    color: "bg-secondary/20 text-secondary-foreground",
  },
  {
    icon: Cloud,
    title: "Weather Insights",
    description: "Get local weather forecasts with farming-specific advice for your region.",
    path: "/weather",
    color: "bg-accent text-accent-foreground",
  },
  {
    icon: TrendingUp,
    title: "Market Prices",
    description: "Track and predict crop prices to optimize your selling strategy.",
    path: "/market",
    color: "bg-muted text-foreground",
  },
];

const Home = () => {
  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl gradient-hero p-8 md:p-16 text-primary-foreground">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50"></div>
        
        <div className="relative max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm px-4 py-2 text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            AI-Powered Agriculture
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            AI Agro Agent
          </h1>
          
          <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl leading-relaxed">
            Your intelligent farming companion. Get real-time advice on crops, weather patterns, 
            disease detection, and market insights to maximize your agricultural success.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg" variant="secondary" className="gap-2 font-semibold">
              <Link to="/chat">
                Start Chatting
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="gap-2 bg-primary-foreground/10 border-primary-foreground/20 hover:bg-primary-foreground/20">
              <Link to="/disease">
                Detect Disease
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Everything You Need
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive tools designed to help modern farmers make data-driven decisions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Link
                key={feature.path}
                to={feature.path}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:shadow-elevated hover:-translate-y-1"
              >
                <div className={`inline-flex p-3 rounded-xl ${feature.color} mb-4`}>
                  <Icon className="h-6 w-6" />
                </div>
                
                <h3 className="text-xl font-semibold text-card-foreground mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>

                <div className="absolute bottom-8 right-8 opacity-0 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  <ArrowRight className="h-5 w-5 text-primary" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Stats Section */}
      <section className="gradient-accent rounded-2xl p-8 md:p-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "50+", label: "Crop Types" },
            { value: "95%", label: "Detection Accuracy" },
            { value: "24/7", label: "AI Support" },
            { value: "100+", label: "Market Data Points" },
          ].map((stat, index) => (
            <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
