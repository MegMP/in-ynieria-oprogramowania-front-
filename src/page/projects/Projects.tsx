import { useProjects } from "./hooks/useProjects";
import { useTopics } from "../topics/hooks/useTopics";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Loader2,
  AlertCircle,
  FolderGit2,
  Calendar,
  CheckCircle2,
  Circle,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "../../components/ui/badge";
import { CreateProjectForm } from "./components/CreateProjectForm";
import { useDeleteProject } from "./hooks/useDeleteProject";

export const Projects = () => {
  const {
    data: projects,
    isLoading: projectsLoading,
    isError: projectsError,
  } = useProjects();
  const { data: topics, isLoading: topicsLoading } = useTopics();
  const deleteProjectMutation = useDeleteProject();

  const isLoading = projectsLoading || topicsLoading;
  const isError = projectsError;

  const handleDelete = (projectId: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      deleteProjectMutation.mutate(projectId);
    }
  };

  const getTopicName = (topicId: string) => {
    return topics?.find((t) => t.id === topicId)?.name || "Unknown Topic";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

    if (isLoading) {
      return (
        <div className="flex-1 min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-pink-50 to-gray-100">
          <Loader2 className="w-10 h-10 animate-spin text-pink-400" />
        </div>
      );
    }

    if (isError) {
      return (
        <div className="flex-1 min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-pink-50 to-gray-100">
          <div className="flex flex-col items-center gap-2 text-red-500 bg-white p-6 rounded-xl shadow-lg">
            <AlertCircle className="w-10 h-10" />
            <p className="font-semibold">Failed to load projects</p>
            <Button
              variant="outline"
              onClick={() => window.location.reload()}
              className="cursor-pointer"
            >
              Retry
            </Button>
          </div>
        </div>
      );
    }

  return (
    <div className="flex-1 min-h-[calc(100vh-4rem)] bg-gradient-to-br from-pink-50 to-gray-100 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-pink-100 rounded-lg">
              <FolderGit2 className="w-6 h-6 text-pink-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Projects</h1>
          </div>
          <CreateProjectForm />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {projects?.map((project) => (
            <Card
              key={project.id}
              className="hover:shadow-lg transition-shadow bg-white border-pink-100"
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start gap-2">
                  <CardTitle className="text-xl text-gray-800">
                    {project.title}
                  </CardTitle>
                  <Badge
                    variant={project.status ? "default" : "secondary"}
                    className={
                      project.status ? "bg-green-500 hover:bg-green-600" : ""
                    }
                  >
                    {project.status ? "Completed" : "In Progress"}
                  </Badge>
                </div>
                <CardDescription className="text-sm font-medium text-pink-500">
                  Topic: {getTopicName(project.topicId)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">
                  {project.description}
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <CardFooter className="flex justify-end pt-0">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-400 hover:text-red-500 hover:bg-red-50"
                      onClick={() => handleDelete(project.id)}
                      disabled={deleteProjectMutation.isPending}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </CardFooter>
                  <span>Due: {formatDate(project.deadline)}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
