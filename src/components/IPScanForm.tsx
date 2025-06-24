
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Search, Play, AlertCircle } from "lucide-react";

export const IPScanForm = () => {
  const [ipAddress, setIpAddress] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanResults, setScanResults] = useState(null);
  const { toast } = useToast();

  const validateIP = (ip: string) => {
    const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipRegex.test(ip);
  };

  const simulateScan = async () => {
    if (!validateIP(ipAddress)) {
      toast({
        title: "Invalid IP Address",
        description: "Please enter a valid IPv4 address",
        variant: "destructive",
      });
      return;
    }

    setIsScanning(true);
    setScanProgress(0);
    setScanResults(null);

    // Simulate scanning progress
    const intervals = [20, 40, 60, 80, 100];
    for (let i = 0; i < intervals.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setScanProgress(intervals[i]);
    }

    // Simulate results
    const mockResults = {
      ip: ipAddress,
      openPorts: [22, 80, 443, 8080],
      vulnerabilities: [
        { id: "CVE-2023-1234", severity: "High", description: "Remote code execution vulnerability" },
        { id: "CVE-2023-5678", severity: "Medium", description: "Information disclosure" }
      ],
      riskScore: 7.5,
      riskLevel: "High"
    };

    setScanResults(mockResults);
    setIsScanning(false);

    toast({
      title: "Scan Complete",
      description: `Found ${mockResults.vulnerabilities.length} vulnerabilities`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <Label htmlFor="ip-address" className="text-slate-300">IP Address</Label>
          <Input
            id="ip-address"
            type="text"
            placeholder="192.168.1.100"
            value={ipAddress}
            onChange={(e) => setIpAddress(e.target.value)}
            className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
          />
        </div>
        <div className="flex items-end">
          <Button 
            onClick={simulateScan}
            disabled={isScanning}
            className="w-full bg-cyan-600 hover:bg-cyan-700"
          >
            {isScanning ? (
              <>
                <Search className="h-4 w-4 mr-2 animate-spin" />
                Scanning...
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                Start Scan
              </>
            )}
          </Button>
        </div>
      </div>

      {isScanning && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-slate-300">
            <span>Scanning progress</span>
            <span>{scanProgress}%</span>
          </div>
          <Progress value={scanProgress} className="bg-slate-700" />
        </div>
      )}

      {scanResults && (
        <Card className="bg-slate-700/50 border-slate-600 p-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Scan Results for {scanResults.ip}</h3>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                scanResults.riskLevel === 'High' ? 'bg-red-500/20 text-red-400' :
                scanResults.riskLevel === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-green-500/20 text-green-400'
              }`}>
                {scanResults.riskLevel} Risk
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-slate-300 mb-2">Open Ports</h4>
                <div className="flex flex-wrap gap-2">
                  {scanResults.openPorts.map((port) => (
                    <span key={port} className="px-2 py-1 bg-slate-600 text-slate-300 rounded text-sm">
                      {port}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-slate-300 mb-2">Risk Score</h4>
                <div className="text-2xl font-bold text-red-400">{scanResults.riskScore}/10</div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-slate-300 mb-2">Vulnerabilities Found</h4>
              <div className="space-y-2">
                {scanResults.vulnerabilities.map((vuln, index) => (
                  <div key={index} className="flex items-center space-x-3 p-2 bg-slate-600/50 rounded">
                    <AlertCircle className={`h-4 w-4 ${
                      vuln.severity === 'High' ? 'text-red-400' :
                      vuln.severity === 'Medium' ? 'text-yellow-400' :
                      'text-green-400'
                    }`} />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-sm text-white">{vuln.id}</span>
                        <span className={`px-2 py-0.5 rounded text-xs ${
                          vuln.severity === 'High' ? 'bg-red-500/20 text-red-400' :
                          vuln.severity === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-green-500/20 text-green-400'
                        }`}>
                          {vuln.severity}
                        </span>
                      </div>
                      <p className="text-sm text-slate-400">{vuln.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
