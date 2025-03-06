
import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
  // Filter out available subservices based on the selected service
  const availableSubservices = selectedService 
    ? existingServices.find(s => s.id === selectedService)?.subservices || []
    : [];
    
  // Find the selected subservice name for display
  const selectedSubservice = availableSubservices.find(sub => sub.id === value);

  return (
    <div className="space-y-3">
      <Label htmlFor={`subservice-name-${index}`}>Sub Service Name</Label>
      <Select 
        onValueChange={onValueChange}
        value={value || ""}
      >
        <SelectTrigger id={`subservice-name-${index}`} className="bg-white">
          <SelectValue placeholder="Select a subservice">
            {selectedSubservice?.name}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {availableSubservices.map((sub) => (
            <SelectItem key={sub.id} value={sub.id}>
              {sub.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectSubservice;
