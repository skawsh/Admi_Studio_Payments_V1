
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Search, ChevronDown, X } from "lucide-react";

interface SelectSubserviceProps {
  value: string;
  onValueChange: (value: string) => void;
  selectedService: string;
  existingServices: any[];
  index: number;
}

const SelectSubservice: React.FC<SelectSubserviceProps> = ({
  value,
  onValueChange,
  selectedService,
  existingServices,
  index
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Filter out available subservices based on the selected service
  const availableSubservices = selectedService 
    ? existingServices.find(s => s.id === selectedService)?.subservices || []
    : [];
    
  // Filter subservices based on search term
  const filteredSubservices = availableSubservices.filter(sub => 
    sub.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (subserviceName: string) => {
    onValueChange(subserviceName);
    setIsDropdownOpen(false);
    setSearchTerm("");
  };

  const clearSelection = (e: React.MouseEvent) => {
    e.stopPropagation();
    onValueChange("");
    setSearchTerm("");
  };

  return (
    <div className="space-y-3">
      <Label htmlFor={`subservice-name-${index}`}>Sub Service Name</Label>
      
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <div 
            className="relative flex items-center w-full rounded-md border border-input h-10 bg-white hover:bg-gray-50 cursor-pointer"
            onClick={() => setIsDropdownOpen(true)}
          >
            <div className="absolute left-3 pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            
            {value ? (
              <div className="flex items-center justify-between w-full px-10 py-2">
                <span className="text-sm truncate">{value}</span>
                <button 
                  className="absolute right-8 focus:outline-none" 
                  onClick={clearSelection}
                >
                  <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between w-full px-10 py-2">
                <span className="text-sm text-gray-400">Search or select subservice...</span>
              </div>
            )}
            
            <div className="absolute right-3 pointer-events-none">
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent 
          className="w-[var(--radix-dropdown-menu-trigger-width)] bg-white p-0" 
          align="start"
        >
          <div className="p-2 border-b">
            <Input
              placeholder="Search subservices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              autoFocus
            />
          </div>
          
          <div className="max-h-[200px] overflow-y-auto">
            {filteredSubservices.length > 0 ? (
              filteredSubservices.map((sub) => (
                <DropdownMenuItem 
                  key={sub.id} 
                  className="cursor-pointer px-4 py-2 text-sm hover:bg-blue-50"
                  onClick={() => handleSelect(sub.name)}
                >
                  {sub.name}
                </DropdownMenuItem>
              ))
            ) : (
              <div className="p-2 text-sm text-gray-500 text-center">
                {availableSubservices.length === 0 
                  ? "No subservices available for selected service" 
                  : "No matching subservices found"}
              </div>
            )}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SelectSubservice;
