
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Shield, AlertTriangle, DollarSign, XCircle, CheckCircle } from "lucide-react";

interface RiskItem {
  id: string;
  vulnerability: string;
  probability: number;
  impact: number;
  riskScore: number;
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  recommendedStrategy: 'Mitigate' | 'Transfer' | 'Accept' | 'Avoid';
  estimatedCost: number;
  residualRisk: number;
  controls: string[];
}

export const RiskTreatment = () => {
  const [risks] = useState<RiskItem[]>([
    {
      id: "1",
      vulnerability: "Apache HTTP Server RCE",
      probability: 8,
      impact: 9,
      riskScore: 72,
      riskLevel: "Critical",
      recommendedStrategy: "Mitigate",
      estimatedCost: 15000,
      residualRisk: 20,
      controls: ["Patch Management", "WAF Implementation", "Network Segmentation"]
    },
    {
      id: "2", 
      vulnerability: "OpenSSL Certificate Issue",
      probability: 6,
      impact: 7,
      riskScore: 42,
      riskLevel: "High",
      recommendedStrategy: "Mitigate",
      estimatedCost: 8000,
      residualRisk: 15,
      controls: ["Certificate Renewal", "SSL/TLS Hardening", "Monitoring"]
    },
    {
      id: "3",
      vulnerability: "Outdated WordPress Plugin",
      probability: 4,
      impact: 5,
      riskScore: 20,
      riskLevel: "Medium",
      recommendedStrategy: "Accept",
      estimatedCost: 2000,
      residualRisk: 18,
      controls: ["Plugin Updates", "Content Security Policy"]
    }
  ]);

  const [selectedRisk, setSelectedRisk] = useState<string | null>(null);
  const { toast } = useToast();

  const getStrategyColor = (strategy: string) => {
    switch (strategy) {
      case 'Mitigate': return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      case 'Transfer': return 'bg-purple-500/20 text-purple-400 border-purple-500/50';
      case 'Accept': return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'Avoid': return 'bg-red-500/20 text-red-400 border-red-500/50';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/50';
    }
  };

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'Critical': return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'High': return 'bg-orange-500/20 text-orange-400 border-orange-500/50';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'Low': return 'bg-green-500/20 text-green-400 border-green-500/50';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/50';
    }
  };

  const getStrategyIcon = (strategy: string) => {
    switch (strategy) {
      case 'Mitigate': return <Shield className="h-4 w-4" />;
      case 'Transfer': return <DollarSign className="h-4 w-4" />;
      case 'Accept': return <CheckCircle className="h-4 w-4" />;
      case 'Avoid': return <XCircle className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const applyTreatment = (riskId: string) => {
    toast({
      title: "Treatment Applied",
      description: "Risk treatment strategy has been implemented",
    });
  };

  const getStrategyDescription = (strategy: string) => {
    switch (strategy) {
      case 'Mitigate': return 'Implement controls to reduce probability or impact';
      case 'Transfer': return 'Transfer risk through insurance or outsourcing';
      case 'Accept': return 'Accept the risk based on cost-benefit analysis';
      case 'Avoid': return 'Eliminate the risk source or activity';
      default: return 'Unknown strategy';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            Risk Treatment Strategies
          </CardTitle>
          <CardDescription className="text-slate-400">
            Apply ISO/IEC 27002:2022 compliant risk treatment based on probability and impact analysis
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="space-y-4">
        {risks.map((risk) => (
          <Card key={risk.id} className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-medium text-white mb-2">{risk.vulnerability}</h3>
                  <div className="flex items-center space-x-3 mb-3">
                    <Badge variant="outline" className={getRiskLevelColor(risk.riskLevel)}>
                      {risk.riskLevel} Risk
                    </Badge>
                    <Badge variant="outline" className={getStrategyColor(risk.recommendedStrategy)}>
                      {getStrategyIcon(risk.recommendedStrategy)}
                      <span className="ml-1">{risk.recommendedStrategy}</span>
                    </Badge>
                    <span className="text-sm text-slate-400">Score: {risk.riskScore}/100</span>
                  </div>
                  <p className="text-sm text-slate-400 mb-4">
                    {getStrategyDescription(risk.recommendedStrategy)}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-cyan-400">${risk.estimatedCost.toLocaleString()}</div>
                  <div className="text-xs text-slate-400">Treatment Cost</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <div className="text-sm text-slate-400 mb-1">Probability</div>
                  <Progress value={risk.probability * 10} className="bg-slate-700" />
                  <div className="text-xs text-slate-500 mt-1">{risk.probability}/10</div>
                </div>
                <div>
                  <div className="text-sm text-slate-400 mb-1">Impact</div>
                  <Progress value={risk.impact * 10} className="bg-slate-700" />
                  <div className="text-xs text-slate-500 mt-1">{risk.impact}/10</div>
                </div>
                <div>
                  <div className="text-sm text-slate-400 mb-1">Residual Risk</div>
                  <Progress value={risk.residualRisk} className="bg-slate-700" />
                  <div className="text-xs text-slate-500 mt-1">{risk.residualRisk}% remaining</div>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-sm text-slate-400 mb-2">Recommended Controls:</div>
                <div className="flex flex-wrap gap-2">
                  {risk.controls.map((control, index) => (
                    <Badge key={index} variant="secondary" className="bg-slate-700 text-slate-300">
                      {control}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedRisk(selectedRisk === risk.id ? null : risk.id)}
                  className="border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  {selectedRisk === risk.id ? "Hide Details" : "View Details"}
                </Button>
                <Button
                  onClick={() => applyTreatment(risk.id)}
                  className="bg-cyan-600 hover:bg-cyan-700"
                >
                  Apply Treatment
                </Button>
              </div>

              {selectedRisk === risk.id && (
                <div className="mt-4 p-4 bg-slate-700/50 rounded-lg border border-slate-600">
                  <h4 className="text-sm font-medium text-white mb-2">Treatment Plan Details</h4>
                  <div className="space-y-2 text-sm text-slate-300">
                    <p><strong>Risk Formula:</strong> {risk.probability} (Probability) × {risk.impact} (Impact) = {risk.riskScore}</p>
                    <p><strong>Treatment Justification:</strong> Based on ISO/IEC 27002:2022 guidelines for {risk.riskLevel.toLowerCase()} risk scenarios</p>
                    <p><strong>Implementation Timeline:</strong> 30-60 days depending on control complexity</p>
                    <p><strong>Success Metrics:</strong> Risk reduction to {risk.residualRisk}% of original level</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
