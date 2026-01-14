import { useParams, Link } from "react-router-dom";
import { useProject } from "./hooks/useProject";
import { useProjectPackage } from "./hooks/useProjectPackage";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, ArrowLeft, Download, FileText } from "lucide-react";
import { AlertCircle } from "lucide-react";

export const ProjectDetails = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const {
    data: project,
    isLoading: isProjectLoading,
    isError: isProjectError,
  } = useProject(projectId);
  const {
    data: projectPackage,
    isLoading: isPackageLoading,
    isError: isPackageError,
  } = useProjectPackage(projectId);

  if (isProjectLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (isProjectError || !project) {
    return (
      <div className="p-4 text-red-500 flex items-center gap-2">
        <AlertCircle className="h-4 w-4" />
        Failed to load project details
      </div>
    );
  }

  const handleDownload = () => {
    if (projectPackage) {
      const url = window.URL.createObjectURL(new Blob([projectPackage]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `project-${projectId}-package.zip`); // Assuming zip, or handle extension based on type
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
    }
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/projects">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Project Details</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Info</CardTitle>
            <CardDescription>
              General information about the project
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-1">Title</h3>
              <p className="text-muted-foreground">{project.title}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Description</h3>
              <p className="text-muted-foreground">{project.description}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Deadline</h3>
              <p className="text-muted-foreground">
                {new Date(project.deadline).toLocaleDateString()}
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Status</h3>
              <p className="text-muted-foreground">
                {project.status ? "Active" : "Inactive"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Files</CardTitle>
            <CardDescription>Project files and documents</CardDescription>
          </CardHeader>
          <CardContent>
            {isPackageLoading ? (
              <div className="flex justify-center p-4">
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
            ) : projectPackage ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="font-medium">Project Package</p>
                      <p className="text-xs text-muted-foreground">
                        Click to download
                      </p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" onClick={handleDownload}>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">
                No package files available for this project.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
