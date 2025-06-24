
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { FileText, Download, Mail, Calendar, BarChart3 } from "lucide-react";

interface ReportConfig {
  title: string;
  includeExecutiveSummary: boolean;
  includeVulnerabilities: boolean;
  includeRiskMatrix: boolean;
  includeAssetClassification: boolean;
  includeTreatmentPlan: boolean;
  includeConsultation: boolean;
  includeMetrics: boolean;
  recipientEmail: string;
  scheduledGeneration: boolean;
}

export const ReportGeneration = () => {
  const [reportConfig, setReportConfig] = useState<ReportConfig>({
    title: "Cybersecurity Risk Assessment Report",
    includeExecutiveSummary: true,
    includeVulnerabilities: true,
    includeRiskMatrix: true,
    includeAssetClassification: true,
    includeTreatmentPlan: true,
    includeConsultation: false,
    includeMetrics: true,
    recipientEmail: "",
    scheduledGeneration: false
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateReport = async () => {
    setIsGenerating(true);
    
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 3000));

    toast({
      title: "Report Generated Successfully",
      description: "Your cybersecurity risk assessment report is ready for download",
    });

    setIsGenerating(false);
  };

  const handleConfigChange = (key: keyof ReportConfig, value: any) => {
    setReportConfig(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const reportSections = [
    {
      key: 'includeExecutiveSummary',
      label: 'Executive Summary',
      description: 'High-level overview for management and stakeholders'
    },
    {
      key: 'includeVulnerabilities',
      label: 'Vulnerability Analysis',
      description: 'Detailed findings from security scans and assessments'
    },
    {
      key: 'includeRiskMatrix',
      label: 'Risk Matrix',
      description: 'Probability vs Impact visualization and risk scoring'
    },
    {
      key: 'includeAssetClassification',
      label: 'Asset Classification',
      description: 'CIA triad analysis and asset valuation'
    },
    {
      key: 'includeTreatmentPlan',
      label: 'Risk Treatment Plan',
      description: 'Recommended mitigation strategies and implementation roadmap'
    },
    {
      key: 'includeConsultation',
      label: 'Stakeholder Consultation',
      description: 'Comments, recommendations, and approval records'
    },
    {
      key: 'includeMetrics',
      label: 'Metrics & KPIs',
      description: 'Risk reduction metrics and compliance indicators'
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Report Generation
          </CardTitle>
          <CardDescription className="text-slate-400">
            Generate comprehensive PDF reports for stakeholders and compliance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Report Configuration */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="report-title" className="text-slate-300">Report Title</Label>
              <Input
                id="report-title"
                value={reportConfig.title}
                onChange={(e) => handleConfigChange('title', e.target.value)}
                className="bg-slate-700 border-slate-600 text-white"
                placeholder="Enter report title"
              />
            </div>

            <div>
              <Label className="text-slate-300 mb-3 block">Report Sections</Label>
              <div className="space-y-3">
                {reportSections.map((section) => (
                  <div key={section.key} className="flex items-start space-x-3">
                    <Checkbox
                      id={section.key}
                      checked={reportConfig[section.key as keyof ReportConfig] as boolean}
                      onCheckedChange={(checked) => handleConfigChange(section.key as keyof ReportConfig, checked)}
                      className="mt-0.5"
                    />
                    <div className="flex-1">
                      <label
                        htmlFor={section.key}
                        className="text-sm font-medium text-white cursor-pointer"
                      >
                        {section.label}
                      </label>
                      <p className="text-xs text-slate-400 mt-1">
                        {section.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="recipient-email" className="text-slate-300">Recipient Email (Optional)</Label>
              <Input
                id="recipient-email"
                type="email"
                value={reportConfig.recipientEmail}
                onChange={(e) => handleConfigChange('recipientEmail', e.target.value)}
                className="bg-slate-700 border-slate-600 text-white"
                placeholder="stakeholder@company.com"
              />
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox
                id="scheduled-generation"
                checked={reportConfig.scheduledGeneration}
                onCheckedChange={(checked) => handleConfigChange('scheduledGeneration', checked)}
                className="mt-0.5"
              />
              <div className="flex-1">
                <label
                  htmlFor="scheduled-generation"
                  className="text-sm font-medium text-white cursor-pointer"
                >
                  Schedule Automatic Generation
                </label>
                <p className="text-xs text-slate-400 mt-1">
                  Generate reports automatically on a weekly basis
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <Button
              onClick={generateReport}
              disabled={isGenerating}
              className="bg-cyan-600 hover:bg-cyan-700"
            >
              {isGenerating ? (
                <>
                  <BarChart3 className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Generate PDF Report
                </>
              )}
            </Button>

            {reportConfig.recipientEmail && (
              <Button
                variant="outline"
                onClick={() => {
                  toast({
                    title: "Email Sent",
                    description: `Report will be sent to ${reportConfig.recipientEmail}`,
                  });
                }}
                className="border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                <Mail className="h-4 w-4 mr-2" />
                Send via Email
              </Button>
            )}

            {reportConfig.scheduledGeneration && (
              <Button
                variant="outline"
                className="border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Reports
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Report Preview */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white text-lg">Report Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-white p-6 rounded-lg text-slate-900 max-h-96 overflow-y-auto">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-slate-800 mb-2">
                {reportConfig.title}
              </h1>
              <p className="text-slate-600">
                Generated on {new Date().toLocaleDateString()}
              </p>
            </div>

            {reportConfig.includeExecutiveSummary && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-slate-800 mb-3">Executive Summary</h2>
                <p className="text-sm text-slate-700 leading-relaxed">
                  This cybersecurity risk assessment has identified 3 critical vulnerabilities 
                  requiring immediate attention. The overall risk score is 7.2/10, indicating 
                  a medium-high risk level that necessitates swift remediation actions.
                </p>
              </div>
            )}

            {reportConfig.includeVulnerabilities && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-slate-800 mb-3">Vulnerability Findings</h2>
                <div className="text-sm text-slate-700">
                  <ul className="list-disc list-inside space-y-1">
                    <li>CVE-2023-4567: Apache HTTP Server RCE (Critical)</li>
                    <li>CVE-2023-1234: OpenSSL Certificate Issue (High)</li>
                    <li>CVE-2023-8901: WordPress Plugin XSS (Medium)</li>
                  </ul>
                </div>
              </div>
            )}

            {reportConfig.includeRiskMatrix && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-slate-800 mb-3">Risk Assessment</h2>
                <p className="text-sm text-slate-700">
                  Risk matrix analysis shows concentration in high-impact, medium-probability quadrant.
                </p>
              </div>
            )}

            <div className="text-center text-xs text-slate-500 mt-8">
              [Additional sections would appear here based on configuration]
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
