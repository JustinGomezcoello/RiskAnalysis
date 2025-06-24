
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare, User, Clock, AlertCircle } from "lucide-react";

interface Recommendation {
  id: string;
  author: string;
  role: string;
  timestamp: Date;
  type: 'Comment' | 'Recommendation' | 'Approval' | 'Concern';
  content: string;
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  relatedRisk?: string;
}

export const ConsultationModule = () => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([
    {
      id: "1",
      author: "Sarah Johnson",
      role: "Security Analyst",
      timestamp: new Date(Date.now() - 3600000),
      type: "Recommendation",
      content: "Consider implementing multi-factor authentication for all administrative accounts before proceeding with the Apache server patch. This will provide an additional security layer during the maintenance window.",
      priority: "High",
      relatedRisk: "Apache HTTP Server RCE"
    },
    {
      id: "2",
      author: "Mike Chen",
      role: "IT Manager", 
      timestamp: new Date(Date.now() - 7200000),
      type: "Concern",
      content: "The proposed downtime for the certificate renewal may impact our SLA commitments. Can we schedule this during the planned maintenance window next weekend?",
      priority: "Medium",
      relatedRisk: "OpenSSL Certificate Issue"
    },
    {
      id: "3",
      author: "Dr. Emily Rodriguez",
      role: "CISO",
      timestamp: new Date(Date.now() - 10800000),
      type: "Approval",
      content: "Risk treatment strategies look comprehensive. Approve the budget allocation for critical and high-risk items. Please proceed with implementation phase.",
      priority: "High",
      relatedRisk: null
    }
  ]);

  const [newRecommendation, setNewRecommendation] = useState({
    author: "",
    role: "",
    type: "Comment" as const,
    content: "",
    priority: "Medium" as const,
    relatedRisk: ""
  });

  const { toast } = useToast();

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Recommendation': return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      case 'Approval': return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'Concern': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'Comment': return 'bg-slate-500/20 text-slate-400 border-slate-500/50';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/50';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Urgent': return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'High': return 'bg-orange-500/20 text-orange-400 border-orange-500/50';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'Low': return 'bg-green-500/20 text-green-400 border-green-500/50';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/50';
    }
  };

  const addRecommendation = () => {
    if (!newRecommendation.author || !newRecommendation.content) {
      toast({
        title: "Missing Information",
        description: "Please fill in author and content fields",
        variant: "destructive",
      });
      return;
    }

    const recommendation: Recommendation = {
      id: Date.now().toString(),
      ...newRecommendation,
      timestamp: new Date()
    };

    setRecommendations([recommendation, ...recommendations]);
    setNewRecommendation({
      author: "",
      role: "",
      type: "Comment",
      content: "",
      priority: "Medium",
      relatedRisk: ""
    });

    toast({
      title: "Recommendation Added",
      description: "Your input has been recorded successfully",
    });
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div className="space-y-6">
      {/* Add New Recommendation */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <MessageSquare className="h-5 w-5 mr-2" />
            Communication & Consultation
          </CardTitle>
          <CardDescription className="text-slate-400">
            Collaborate with stakeholders on risk management decisions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="author" className="text-slate-300">Author</Label>
              <Input
                id="author"
                value={newRecommendation.author}
                onChange={(e) => setNewRecommendation({...newRecommendation, author: e.target.value})}
                className="bg-slate-700 border-slate-600 text-white"
                placeholder="Your name"
              />
            </div>
            <div>
              <Label htmlFor="role" className="text-slate-300">Role</Label>
              <Input
                id="role"
                value={newRecommendation.role}
                onChange={(e) => setNewRecommendation({...newRecommendation, role: e.target.value})}
                className="bg-slate-700 border-slate-600 text-white"
                placeholder="e.g., Security Analyst, IT Manager"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="type" className="text-slate-300">Type</Label>
              <select
                id="type"
                value={newRecommendation.type}
                onChange={(e) => setNewRecommendation({...newRecommendation, type: e.target.value as any})}
                className="w-full bg-slate-700 border border-slate-600 text-white rounded-md px-3 py-2"
              >
                <option value="Comment">Comment</option>
                <option value="Recommendation">Recommendation</option>
                <option value="Approval">Approval</option>
                <option value="Concern">Concern</option>
              </select>
            </div>
            <div>
              <Label htmlFor="priority" className="text-slate-300">Priority</Label>
              <select
                id="priority"
                value={newRecommendation.priority}
                onChange={(e) => setNewRecommendation({...newRecommendation, priority: e.target.value as any})}
                className="w-full bg-slate-700 border border-slate-600 text-white rounded-md px-3 py-2"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>
            <div>
              <Label htmlFor="relatedRisk" className="text-slate-300">Related Risk (Optional)</Label>
              <Input
                id="relatedRisk"
                value={newRecommendation.relatedRisk}
                onChange={(e) => setNewRecommendation({...newRecommendation, relatedRisk: e.target.value})}
                className="bg-slate-700 border-slate-600 text-white"
                placeholder="CVE or risk identifier"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="content" className="text-slate-300">Content</Label>
            <Textarea
              id="content"
              value={newRecommendation.content}
              onChange={(e) => setNewRecommendation({...newRecommendation, content: e.target.value})}
              className="bg-slate-700 border-slate-600 text-white min-h-[100px]"
              placeholder="Enter your recommendation, comment, or concern..."
            />
          </div>

          <Button onClick={addRecommendation} className="bg-cyan-600 hover:bg-cyan-700">
            Add Recommendation
          </Button>
        </CardContent>
      </Card>

      {/* Recommendations List */}
      <div className="space-y-4">
        {recommendations.map((rec) => (
          <Card key={rec.id} className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-slate-400" />
                    <span className="font-medium text-white">{rec.author}</span>
                    <span className="text-sm text-slate-400">({rec.role})</span>
                  </div>
                  <div className="flex items-center space-x-1 text-slate-400">
                    <Clock className="h-3 w-3" />
                    <span className="text-xs">{formatTimeAgo(rec.timestamp)}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className={getTypeColor(rec.type)}>
                    {rec.type}
                  </Badge>
                  <Badge variant="outline" className={getPriorityColor(rec.priority)}>
                    {rec.priority}
                  </Badge>
                </div>
              </div>

              {rec.relatedRisk && (
                <div className="mb-2">
                  <Badge variant="secondary" className="bg-slate-700 text-slate-300">
                    Related: {rec.relatedRisk}
                  </Badge>
                </div>
              )}

              <p className="text-slate-300 leading-relaxed">{rec.content}</p>

              {rec.type === 'Concern' && (
                <div className="mt-3 flex items-center space-x-2 text-yellow-400">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm">Requires attention</span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
