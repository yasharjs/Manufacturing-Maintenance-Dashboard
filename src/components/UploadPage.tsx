import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Upload, FileText, Image, File, Download, Trash2 } from "lucide-react";
import { useState } from "react";

export function UploadPage() {
  const [dragActive, setDragActive] = useState(false);
  
  // Mock uploaded files
  const [files] = useState([
    {
      id: 1,
      name: "HyPET500_Maintenance_Manual.pdf",
      type: "PDF",
      size: "2.4 MB",
      uploadDate: "2024-01-15",
      category: "Manual"
    },
    {
      id: 2,
      name: "Inspection_Checklist_Template.xlsx",
      type: "Excel",
      size: "156 KB",
      uploadDate: "2024-01-14",
      category: "Template"
    },
    {
      id: 3,
      name: "Machine_Layout_Diagram.png",
      type: "Image",
      size: "890 KB",
      uploadDate: "2024-01-13",
      category: "Diagram"
    }
  ]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // Handle file upload logic here
      console.log("Files dropped:", e.dataTransfer.files);
    }
  };

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return <FileText className="h-8 w-8 text-red-500" />;
      case 'image':
        return <Image className="h-8 w-8 text-blue-500" />;
      case 'excel':
        return <File className="h-8 w-8 text-green-500" />;
      default:
        return <File className="h-8 w-8 text-gray-500" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Manual':
        return 'bg-blue-100 text-blue-800';
      case 'Template':
        return 'bg-green-100 text-green-800';
      case 'Diagram':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#F59E0B] rounded-full flex items-center justify-center">
              <Upload className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Upload Documents</h1>
              <p className="text-sm text-gray-600">Manage maintenance documents, manuals, and operational procedures</p>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Upload Area */}
        <Card className="p-8 border border-gray-200 bg-white rounded-xl mb-8">
          <div
            className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
              dragActive 
                ? "border-[#3B82F6] bg-blue-50" 
                : "border-gray-300 hover:border-gray-400"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className={`h-16 w-16 mx-auto mb-4 ${
              dragActive ? "text-[#3B82F6]" : "text-gray-400"
            }`} />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Drag and drop files here
            </h3>
            <p className="text-gray-600 mb-6">
              or click to browse your computer
            </p>
            <Button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-lg">
              Choose Files
            </Button>
            <p className="text-xs text-gray-500 mt-4">
              Supported formats: PDF, DOC, XLS, PPT, PNG, JPG (Max 10MB)
            </p>
          </div>
        </Card>

        {/* File Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 text-center border border-gray-200 bg-white rounded-xl">
            <FileText className="h-12 w-12 text-blue-500 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Manuals</h3>
            <p className="text-sm text-gray-600">Equipment manuals and documentation</p>
          </Card>
          <Card className="p-6 text-center border border-gray-200 bg-white rounded-xl">
            <File className="h-12 w-12 text-green-500 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Templates</h3>
            <p className="text-sm text-gray-600">Checklists and procedure templates</p>
          </Card>
          <Card className="p-6 text-center border border-gray-200 bg-white rounded-xl">
            <Image className="h-12 w-12 text-purple-500 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Diagrams</h3>
            <p className="text-sm text-gray-600">Technical diagrams and schematics</p>
          </Card>
        </div>

        {/* Uploaded Files */}
        <Card className="border border-gray-200 bg-white rounded-xl">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Uploaded Documents</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {files.map((file) => (
              <div key={file.id} className="p-6 flex items-center justify-between hover:bg-gray-50">
                <div className="flex items-center gap-4">
                  {getFileIcon(file.type)}
                  <div>
                    <h4 className="font-medium text-gray-900">{file.name}</h4>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <span>{file.size}</span>
                      <span>•</span>
                      <span>Uploaded {file.uploadDate}</span>
                      <span 
                        className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(file.category)}`}
                      >
                        {file.category}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </main>
    </div>
  );
}