
import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Search, ChevronDown, X } from "lucide-react";

interface SelectSubserviceProps {
  value: string;
  onValueChange: (value: string) => void;
  selectedService?: string;
  existingServices: any[];
  index?: number;
  label?: string;
  placeholder?: string;
  isServiceSelect?: boolean;
}

const SelectSubservice: React.FC<SelectSubserviceProps> = ({
  value,
  onValueChange,
  selectedService,
  existingServices,
  index = 0,
  label = "Sub Service Name",
  placeholder = "Search or select subservice...",
  isServiceSelect = false
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState<any[]>([]);

  // Get available options based on whether this is a service or subservice selector
  const getAvailableOptions = () => {
    if (isServiceSelect) {
      // For service selection, return all services
      return existingServices;
    } else {
      // For subservice selection, filter by selected service
      return selectedService 
        ? existingServices.find(s => s.id === selectedService)?.subservices || []
        : [];
    }
  };

  // Update filtered options when search term or available options change
  useEffect(() => {
    const availableOptions = getAvailableOptions();
    if (searchTerm.trim() === "") {
      setFilteredOptions(availableOptions);
    } else {
      const filtered = availableOptions.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredOptions(filtered);
    }
  }, [searchTerm, selectedService, existingServices, isServiceSelect]);

  const handleSelect = (optionName: string) => {
    onValueChange(optionName);
    setIsDropdownOpen(false);
    setSearchTerm("");
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const clearSelection = (e: React.MouseEvent) => {
    e.stopPropagation();
    onValueChange("");
    setSearchTerm("");
  };

  return (
    <div className="space-y-3">
      <Label htmlFor={`${isServiceSelect ? 'service' : 'subservice'}-name-${index}`}>{label}</Label>
      
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
                <span className="text-sm text-gray-400">{placeholder}</span>
              </div>
            )}
            
            <div className="absolute right-3 pointer-events-none">
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent 
          className="w-[var(--radix-dropdown-menu-trigger-width)] bg-white p-0 z-50" 
          align="start"
        >
          <div className="p-2 border-b">
            <Input
              placeholder={`Search ${isServiceSelect ? 'services' : 'subservices'}...`}
              value={searchTerm}
              onChange={handleSearchChange}
              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              autoFocus
            />
          </div>
          
          <div className="max-h-[200px] overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <DropdownMenuItem 
                  key={option.id} 
                  className="cursor-pointer px-4 py-2 text-sm hover:bg-blue-50"
                  onClick={() => handleSelect(option.name)}
                >
                  {option.name}
                </DropdownMenuItem>
              ))
            ) : (
              <div className="p-2 text-sm text-gray-500 text-center">
                {getAvailableOptions().length === 0 
                  ? `No ${isServiceSelect ? 'services' : 'subservices'} available` 
                  : `No matching ${isServiceSelect ? 'services' : 'subservices'} found`}
              </div>
            )}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SelectSubservice;
