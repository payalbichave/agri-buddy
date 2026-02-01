import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

interface DiseaseResultCardProps {
  imagePreview: string;
  filename: string;
  prediction: string;
  timestamp: Date;
}

interface ParsedResult {
  disease: string;
  confidence: string;
  symptoms: string[];
  treatment: string;
  prevention: string;
}

const parseAIResponse = (prediction: string): ParsedResult => {
  const result: ParsedResult = {
    disease: "",
    confidence: "",
    symptoms: [],
    treatment: "",
    prevention: "",
  };

  // Extract disease/condition
  const diseaseMatch = prediction.match(/\*\*Disease\/Condition\*\*:\s*(.+?)(?:\n|$)/i);
  if (diseaseMatch) {
    result.disease = diseaseMatch[1].trim();
  }

  // Extract confidence
  const confidenceMatch = prediction.match(/\*\*Confidence\*\*:\s*(.+?)(?:\n|$)/i);
  if (confidenceMatch) {
    result.confidence = confidenceMatch[1].trim();
  }

  // Extract symptoms
  const symptomsMatch = prediction.match(/\*\*Symptoms Observed\*\*:\s*(.+?)(?=\n\d\.|\n\*\*|$)/is);
  if (symptomsMatch) {
    const symptomsText = symptomsMatch[1].trim();
    // Split by bullet points, dashes, or newlines
    result.symptoms = symptomsText
      .split(/[-•]\s*|\n/)
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith("**"));
  }

  // Extract treatment
  const treatmentMatch = prediction.match(/\*\*Recommended Treatment\*\*:\s*(.+?)(?=\n\d\.|\n\*\*|$)/is);
  if (treatmentMatch) {
    result.treatment = treatmentMatch[1].trim();
  }

  // Extract prevention
  const preventionMatch = prediction.match(/\*\*Prevention Tips\*\*:\s*(.+?)(?=\n\d\.|\n\*\*|$)/is);
  if (preventionMatch) {
    result.prevention = preventionMatch[1].trim();
  }

  return result;
};

const DiseaseResultCard = ({ imagePreview, filename, prediction, timestamp }: DiseaseResultCardProps) => {
  const parsed = parseAIResponse(prediction);
  const isHealthy = parsed.disease.toLowerCase().includes("healthy");
  const plantName = filename.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");

  // Determine confidence percentage for display
  const getConfidenceDisplay = (conf: string) => {
    if (conf.toLowerCase().includes("high")) return "95%";
    if (conf.toLowerCase().includes("medium")) return "75%";
    if (conf.toLowerCase().includes("low")) return "50%";
    return conf;
  };

  return (
    <div className={`mt-6 rounded-2xl overflow-hidden animate-fade-in ${
      isHealthy ? "bg-accent/50" : "bg-destructive/5"
    }`}>
      {/* Header with image and basic info */}
      <div className="p-5">
        <div className="flex gap-4">
          {/* Thumbnail */}
          <div className="flex-shrink-0">
            <img
              src={imagePreview}
              alt="Crop"
              className="w-20 h-20 rounded-xl object-cover shadow-soft"
            />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-semibold text-foreground capitalize">
                  {plantName || "Crop Analysis"}
                </h3>
                <p className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5">
                  <span>⏱</span>
                  {format(timestamp, "MMM d, yyyy 'at' h:mm a")}
                </p>
              </div>
              <Badge
                variant={isHealthy ? "default" : "destructive"}
                className="flex-shrink-0"
              >
                {isHealthy ? "Healthy" : "Disease Detected"}
              </Badge>
            </div>

            {/* Diagnosis */}
            <div className="mt-3">
              <p className="text-sm font-medium text-muted-foreground">Diagnosis:</p>
              <p className={`font-semibold ${isHealthy ? "text-primary" : "text-destructive"}`}>
                {parsed.disease || "Unknown"} 
                {parsed.confidence && (
                  <span className="text-muted-foreground font-normal">
                    {" "}- {getConfidenceDisplay(parsed.confidence)} confidence
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Symptoms */}
        {parsed.symptoms.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-semibold text-foreground mb-2">Symptoms Identified:</p>
            <ul className="space-y-1.5">
              {parsed.symptoms.map((symptom, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-primary mt-0.5">•</span>
                  <span>{symptom}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Treatment Section */}
      {parsed.treatment && (
        <div className="bg-card/80 backdrop-blur-sm border-t border-border mx-4 mb-4 p-4 rounded-xl">
          <p className="text-sm font-semibold text-foreground mb-2">Treatment:</p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {parsed.treatment}
          </p>
          
          {parsed.prevention && (
            <>
              <p className="text-sm font-semibold text-foreground mt-3 mb-2">Prevention:</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {parsed.prevention}
              </p>
            </>
          )}
        </div>
      )}

      {/* Fallback: Show raw prediction if parsing failed */}
      {!parsed.disease && !parsed.treatment && (
        <div className="px-5 pb-5">
          <p className="text-sm text-muted-foreground whitespace-pre-wrap">{prediction}</p>
        </div>
      )}
    </div>
  );
};

export default DiseaseResultCard;
