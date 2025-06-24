
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, AlertTriangle, TrendingUp, Eye, Database, MessageSquare, FileText, Activity } from "lucide-react";
import { IPScanForm } from "@/components/IPScanForm";
import { RiskOverview } from "@/components/RiskOverview";
import { VulnerabilityList } from "@/components/VulnerabilityList";
import { RiskMatrix } from "@/components/RiskMatrix";
import { AssetClassification } from "@/components/AssetClassification";
import { RiskTreatment } from "@/components/RiskTreatment";
import { ConsultationModule } from "@/components/ConsultationModule";
import { ReportGeneration } from "@/components/ReportGeneration";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-cyan-400" />
              <h1 className="text-2xl font-bold text-white">Sentinel Risk Architect</h1>
              <span className="text-sm text-slate-400 bg-slate-700 px-2 py-1 rounded">Enterprise Edition</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                <Eye className="h-4 w-4 mr-2" />
                Live Monitor
              </Button>
              <Button className="bg-cyan-600 hover:bg-cyan-700">
                Generate Report
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Total Assets</CardTitle>
              <Database className="h-4 w-4 text-cyan-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">247</div>
              <p className="text-xs text-slate-400">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Critical Risks</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-400">3</div>
              <p className="text-xs text-slate-400">Immediate attention required</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Risk Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-400">7.2</div>
              <p className="text-xs text-slate-400">Medium-high risk level</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Compliance</CardTitle>
              <Shield className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">94%</div>
              <p className="text-xs text-slate-400">ISO 27001 compliance</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs defaultValue="scanning" className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 bg-slate-800 border-slate-700">
            <TabsTrigger value="scanning" className="data-[state=active]:bg-cyan-600">
              <Shield className="h-4 w-4 mr-2" />
              Scanning
            </TabsTrigger>
            <TabsTrigger value="assets" className="data-[state=active]:bg-cyan-600">
              <Database className="h-4 w-4 mr-2" />
              Assets
            </TabsTrigger>
            <TabsTrigger value="risks" className="data-[state=active]:bg-cyan-600">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Risk Analysis
            </TabsTrigger>
            <TabsTrigger value="treatment" className="data-[state=active]:bg-cyan-600">
              <Activity className="h-4 w-4 mr-2" />
              Treatment
            </TabsTrigger>
            <TabsTrigger value="consultation" className="data-[state=active]:bg-cyan-600">
              <MessageSquare className="h-4 w-4 mr-2" />
              Consultation
            </TabsTrigger>
            <TabsTrigger value="reports" className="data-[state=active]:bg-cyan-600">
              <FileText className="h-4 w-4 mr-2" />
              Reports
            </TabsTrigger>
            <TabsTrigger value="overview" className="data-[state=active]:bg-cyan-600">
              <TrendingUp className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="monitoring" className="data-[state=active]:bg-cyan-600">
              <Eye className="h-4 w-4 mr-2" />
              Monitoring
            </TabsTrigger>
          </TabsList>

          <TabsContent value="scanning" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Vulnerability Assessment</CardTitle>
                    <CardDescription className="text-slate-400">
                      Enter an IP address to perform automated security scanning using multiple methodologies
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <IPScanForm />
                  </CardContent>
                </Card>
              </div>
              <div>
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Recent Vulnerabilities</CardTitle>
                    <CardDescription className="text-slate-400">
                      Latest identified security issues
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <VulnerabilityList />
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="assets" className="mt-6">
            <AssetClassification />
          </TabsContent>

          <TabsContent value="risks" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Risk Matrix</CardTitle>
                  <CardDescription className="text-slate-400">
                    Probability vs Impact visualization
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RiskMatrix />
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Risk Distribution</CardTitle>
                  <CardDescription className="text-slate-400">
                    Current risk level breakdown
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RiskOverview />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="treatment" className="mt-6">
            <RiskTreatment />
          </TabsContent>

          <TabsContent value="consultation" className="mt-6">
            <ConsultationModule />
          </TabsContent>

          <TabsContent value="reports" className="mt-6">
            <ReportGeneration />
          </TabsContent>

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Risk Overview</CardTitle>
                  <CardDescription className="text-slate-400">
                    Current risk distribution
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RiskOverview />
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Risk Matrix</CardTitle>
                  <CardDescription className="text-slate-400">
                    Probability vs Impact analysis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RiskMatrix />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="monitoring" className="mt-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Real-time Monitoring Dashboard</CardTitle>
                <CardDescription className="text-slate-400">
                  Live supervision of risks and control effectiveness
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-700/50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-300">System Status</span>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                    <div className="text-2xl font-bold text-green-400">Online</div>
                    <div className="text-xs text-slate-400">All systems operational</div>
                  </div>
                  <div className="bg-slate-700/50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-300">Active Scans</span>
                      <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                    </div>
                    <div className="text-2xl font-bold text-blue-400">7</div>
                    <div className="text-xs text-slate-400">Scanning in progress</div>
                  </div>
                  <div className="bg-slate-700/50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-300">Alerts</span>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    </div>
                    <div className="text-2xl font-bold text-yellow-400">12</div>
                    <div className="text-xs text-slate-400">Pending review</div>
                  </div>
                </div>

                <Card className="bg-slate-700/30 border-slate-600">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">Recent Activity Feed</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm text-white">Critical vulnerability detected</p>
                        <p className="text-xs text-slate-400">192.168.1.100 - 2 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm text-white">Risk assessment completed</p>
                        <p className="text-xs text-slate-400">10.0.0.5 - 15 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm text-white">Control implemented</p>
                        <p className="text-xs text-slate-400">Security patch applied - 1 hour ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm text-white">New asset classified</p>
                        <p className="text-xs text-slate-400">Database Server #5 - 2 hours ago</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
