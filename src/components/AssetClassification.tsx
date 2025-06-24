
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Shield, Database, Lock } from "lucide-react";

interface Asset {
  id: string;
  name: string;
  type: string;
  confidentiality: 'Low' | 'Medium' | 'High' | 'Critical';
  integrity: 'Low' | 'Medium' | 'High' | 'Critical';
  availability: 'Low' | 'Medium' | 'High' | 'Critical';
  value: number;
  owner: string;
}

export const AssetClassification = () => {
  const [assets, setAssets] = useState<Asset[]>([
    {
      id: "1",
      name: "Web Server",
      type: "Server",
      confidentiality: "High",
      integrity: "Critical",
      availability: "High",
      value: 95000,
      owner: "IT Department"
    },
    {
      id: "2", 
      name: "Customer Database",
      type: "Database",
      confidentiality: "Critical",
      integrity: "Critical",
      availability: "High",
      value: 250000,
      owner: "Data Management Team"
    }
  ]);

  const [newAsset, setNewAsset] = useState({
    name: "",
    type: "",
    confidentiality: "Medium" as const,
    integrity: "Medium" as const,
    availability: "Medium" as const,
    value: 0,
    owner: ""
  });

  const { toast } = useToast();

  const getCIAColor = (level: string) => {
    switch (level) {
      case 'Critical': return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'High': return 'bg-orange-500/20 text-orange-400 border-orange-500/50';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'Low': return 'bg-green-500/20 text-green-400 border-green-500/50';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/50';
    }
  };

  const calculateAssetValue = (c: string, i: string, a: string) => {
    const weights = { Low: 1, Medium: 2, High: 3, Critical: 4 };
    return (weights[c as keyof typeof weights] + 
            weights[i as keyof typeof weights] + 
            weights[a as keyof typeof weights]) * 10000;
  };

  const addAsset = () => {
    if (!newAsset.name || !newAsset.type || !newAsset.owner) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const asset: Asset = {
      id: Date.now().toString(),
      ...newAsset,
      value: calculateAssetValue(newAsset.confidentiality, newAsset.integrity, newAsset.availability)
    };

    setAssets([...assets, asset]);
    setNewAsset({
      name: "",
      type: "",
      confidentiality: "Medium",
      integrity: "Medium", 
      availability: "Medium",
      value: 0,
      owner: ""
    });

    toast({
      title: "Asset Added",
      description: `${asset.name} has been classified successfully`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Add New Asset */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Database className="h-5 w-5 mr-2" />
            Asset Classification
          </CardTitle>
          <CardDescription className="text-slate-400">
            Register and classify assets using CIA triad methodology
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="asset-name" className="text-slate-300">Asset Name</Label>
              <Input
                id="asset-name"
                value={newAsset.name}
                onChange={(e) => setNewAsset({...newAsset, name: e.target.value})}
                className="bg-slate-700 border-slate-600 text-white"
                placeholder="e.g., Web Server, Database"
              />
            </div>
            <div>
              <Label htmlFor="asset-type" className="text-slate-300">Asset Type</Label>
              <Input
                id="asset-type"
                value={newAsset.type}
                onChange={(e) => setNewAsset({...newAsset, type: e.target.value})}
                className="bg-slate-700 border-slate-600 text-white"
                placeholder="e.g., Server, Application, Database"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label className="text-slate-300 flex items-center">
                <Lock className="h-4 w-4 mr-1" />
                Confidentiality
              </Label>
              <Select value={newAsset.confidentiality} onValueChange={(value: any) => setNewAsset({...newAsset, confidentiality: value})}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-slate-300 flex items-center">
                <Shield className="h-4 w-4 mr-1" />
                Integrity
              </Label>
              <Select value={newAsset.integrity} onValueChange={(value: any) => setNewAsset({...newAsset, integrity: value})}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-slate-300 flex items-center">
                <Database className="h-4 w-4 mr-1" />
                Availability
              </Label>
              <Select value={newAsset.availability} onValueChange={(value: any) => setNewAsset({...newAsset, availability: value})}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="asset-owner" className="text-slate-300">Asset Owner</Label>
            <Input
              id="asset-owner"
              value={newAsset.owner}
              onChange={(e) => setNewAsset({...newAsset, owner: e.target.value})}
              className="bg-slate-700 border-slate-600 text-white"
              placeholder="e.g., IT Department, Security Team"
            />
          </div>

          <Button onClick={addAsset} className="bg-cyan-600 hover:bg-cyan-700">
            Add Asset
          </Button>
        </CardContent>
      </Card>

      {/* Assets List */}
      <div className="space-y-4">
        {assets.map((asset) => (
          <Card key={asset.id} className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-medium text-white">{asset.name}</h3>
                  <p className="text-sm text-slate-400">{asset.type} • Owner: {asset.owner}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-cyan-400">${asset.value.toLocaleString()}</div>
                  <div className="text-xs text-slate-400">Estimated Value</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-xs text-slate-400 mb-1">Confidentiality</div>
                  <Badge variant="outline" className={getCIAColor(asset.confidentiality)}>
                    {asset.confidentiality}
                  </Badge>
                </div>
                <div className="text-center">
                  <div className="text-xs text-slate-400 mb-1">Integrity</div>
                  <Badge variant="outline" className={getCIAColor(asset.integrity)}>
                    {asset.integrity}
                  </Badge>
                </div>
                <div className="text-center">
                  <div className="text-xs text-slate-400 mb-1">Availability</div>
                  <Badge variant="outline" className={getCIAColor(asset.availability)}>
                    {asset.availability}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
