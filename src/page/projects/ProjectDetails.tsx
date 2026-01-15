import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { useProject } from "./hooks/useProject";
import { useProjectPackage } from "./hooks/useProjectPackage";
import { useProjectGrade } from "./hooks/useProjectGrade";
import { useGradeProject } from "./hooks/useGradeProject";
import { useUploadProjectPackage } from "./hooks/useUploadProjectPackage";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Loader2,
  ArrowLeft,
  Download,
  FileText,
  Upload,
  FolderGit2,
} from "lucide-react";
import { AlertCircle } from "lucide-react";

export const ProjectDetails = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const {
    data: project,
    isLoading: isProjectLoading,
    isError: isProjectError,
  } = useProject(projectId);
  const { data: projectPackage, isLoading: isPackageLoading } =
    useProjectPackage(projectId);
  const { data: grade } = useProjectGrade(projectId);
  const gradeMutation = useGradeProject(projectId);
  const [gradeValue, setGradeValue] = useState<number | "">("");
  const [feedback, setFeedback] = useState("");

  const uploadMutation = useUploadProjectPackage(projectId);

  const handleGradeSubmit = () => {
    if (gradeValue !== "") {
      gradeMutation.mutate(
        { value: String(gradeValue), feedback },
        {
          onSuccess: () => {
            setGradeValue("");
            setFeedback("");
          },
        }
      );
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      uploadMutation.mutate(selectedFile, {
        onSuccess: () => {
          setSelectedFile(null);
          // To clear visual input, we might need a ref, but let's keep it simple.
          document.getElementById("document")?.setAttribute("value", "");
        },
      });
    }
  };

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
    <div className="flex-1 min-h-[calc(100vh-4rem)] bg-gradient-to-br from-pink-50 to-gray-100 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Link to="/projects">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-pink-100 rounded-lg">
              <FolderGit2 className="w-6 h-6 text-pink-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">
              {project.title}
            </h1>
          </div>
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
                <Badge
                  variant={project.status ? "default" : "secondary"}
                  className={
                    project.status ? "bg-green-500 hover:bg-green-600" : ""
                  }
                >
                  {project.status ? "Completed" : "In Progress"}
                </Badge>
              </div>
              {grade ? (
                <div className="pt-4 border-t mt-4">
                  <h3 className="font-semibold mb-1">Grade</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-primary">
                      {grade.value}
                    </span>
                    {grade.feedback && (
                      <p className="text-sm text-muted-foreground italic">
                        "{grade.feedback}"
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="pt-4 border-t mt-4 space-y-3">
                  <div>
                    <h3 className="font-semibold mb-1">Grade</h3>
                    <p className="text-sm text-muted-foreground">
                      This project has not been graded yet.
                    </p>
                  </div>
                  <h3 className="font-semibold pt-2">Grade Project</h3>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Grade Value</label>
                    <Input
                      type="number"
                      value={gradeValue}
                      onChange={(e) => setGradeValue(Number(e.target.value))}
                      placeholder="Enter grade (e.g. 1-100)"
                      min={0}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Feedback</label>
                    <textarea
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Enter feedback..."
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                    />
                  </div>
                  <Button
                    onClick={handleGradeSubmit}
                    disabled={gradeValue === "" || gradeMutation.isPending}
                    className="w-full"
                  >
                    {gradeMutation.isPending && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Submit Grade
                  </Button>
                  {gradeMutation.isError && (
                    <p className="text-sm text-red-500">
                      {(gradeMutation.error as any)?.response?.data?.message || "Failed to submit grade. Please check your inputs."}
                    </p>
                  )}
                </div>
              )}
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
              ) : (
                <div className="space-y-6">
                  {projectPackage ? (
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
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleDownload}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm">
                      No package files available for this project.
                    </p>
                  )}

                  <div className="pt-4 border-t">
                    <h4 className="text-sm font-semibold mb-3">Upload File</h4>
                    <div className="flex items-end gap-3">
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Input
                          id="document"
                          type="file"
                          onChange={handleFileChange}
                          className="cursor-pointer"
                        />
                      </div>
                      <Button
                        onClick={handleUpload}
                        disabled={!selectedFile || uploadMutation.isPending}
                      >
                        {uploadMutation.isPending ? (
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <Upload className="h-4 w-4 mr-2" />
                        )}
                        Upload
                      </Button>
                    </div>
                    {uploadMutation.isError && (
                      <p className="text-sm text-red-500 mt-2">
                        {uploadMutation.error?.message ||
                          "Failed to upload file. Please try again."}
                      </p>
                    )}
                    {uploadMutation.isSuccess && !selectedFile && (
                      <p className="text-sm text-green-500 mt-2">
                        File uploaded successfully!
                      </p>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
