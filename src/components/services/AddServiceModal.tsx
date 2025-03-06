
import React, { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { Subservice, NewClothingItem, ClothingItem } from "@/types/serviceTypes";
import { useToast } from "@/hooks/use-toast";
import { mockServices } from "@/data/mockServiceData";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SubserviceForm from "./SubserviceForm";
import { Input } from "@/components/ui/input";

interface AddServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddService: (serviceName: string, subservices: Omit<Subservice, "id">[]) => void;
}

const AddServiceModal: React.FC<AddServiceModalProps> = ({ 
  isOpen, 
  onClose,
  onAddService 
}) => {
  const existingServices = mockServices;
  const [serviceName, setServiceName] = useState("");
  const [selectedService, setSelectedService] = useState<string>("");
  const [subservices, setSubservices] = useState<Array<Omit<Subservice, "id">>>(
    [{ name: "", basePrice: 0, priceUnit: "", items: [], enabled: true }]
  );
  const [activeSubserviceIndex, setActiveSubserviceIndex] = useState<number | null>(null);
  const [newItem, setNewItem] = useState<NewClothingItem>({
    name: "",
    standardPrice: 0,
    expressPrice: 0
  });
  const { toast } = useToast();

  const handleServiceSelect = (serviceId: string) => {
    const service = existingServices.find(s => s.id === serviceId);
    if (service) {
      setServiceName(service.name);
      setSelectedService(serviceId);
    }
  };

  const handleSubserviceSelect = (index: number, subserviceName: string) => {
    const service = existingServices.find(s => s.id === selectedService);
    if (service) {
      const subservice = service.subservices.find(sub => sub.name === subserviceName);
      
      if (subservice) {
        const newSubservices = [...subservices];
        newSubservices[index] = {
          ...newSubservices[index],
          name: subservice.name,
          items: [...(subservice.items || [])],
        };
        setSubservices(newSubservices);
      }
    }
  };

  const handleAddSubservice = () => {
    setSubservices([...subservices, { name: "", basePrice: 0, priceUnit: "", items: [], enabled: true }]);
  };

  const handleRemoveSubservice = (index: number) => {
    if (subservices.length === 1) {
      toast({
        title: "Cannot remove",
        description: "You need at least one subservice",
        variant: "destructive"
      });
      return;
    }
    const newSubservices = [...subservices];
    newSubservices.splice(index, 1);
    setSubservices(newSubservices);
    
    if (activeSubserviceIndex === index) {
      setActiveSubserviceIndex(null);
    } else if (activeSubserviceIndex !== null && activeSubserviceIndex > index) {
      setActiveSubserviceIndex(activeSubserviceIndex - 1);
    }
  };

  const handleSubserviceChange = (index: number, field: "name" | "basePrice" | "priceUnit", value: string | number) => {
    const newSubservices = [...subservices];
    newSubservices[index] = {
      ...newSubservices[index],
      [field]: value
    };
    setSubservices(newSubservices);
  };

  const handleToggleItemsPanel = (index: number) => {
    setActiveSubserviceIndex(activeSubserviceIndex === index ? null : index);
    setNewItem({
      name: "",
      standardPrice: 0,
      expressPrice: 0
    });
  };

  const handleNewItemChange = (field: keyof NewClothingItem, value: string | number) => {
    setNewItem({
      ...newItem,
      [field]: value
    });
  };

  const generateTempId = () => {
    return `temp-${Math.random().toString(36).substring(2, 9)}`;
  };

  const handleAddItem = () => {
    if (activeSubserviceIndex === null) return;
    
    if (!newItem.name.trim()) {
      toast({
        title: "Invalid input",
        description: "Item name is required",
        variant: "destructive"
      });
      return;
    }

    const newSubservices = [...subservices];
    newSubservices[activeSubserviceIndex].items = [
      ...newSubservices[activeSubserviceIndex].items,
      { 
        ...newItem,
        id: generateTempId()
      } as ClothingItem
    ];
    
    setSubservices(newSubservices);
    setNewItem({
      name: "",
      standardPrice: 0,
      expressPrice: 0
    });
  };

  const handleRemoveItem = (subserviceIndex: number, itemIndex: number) => {
    const newSubservices = [...subservices];
    newSubservices[subserviceIndex].items.splice(itemIndex, 1);
    setSubservices(newSubservices);
  };

  const handleSave = () => {
    if (!serviceName.trim()) {
      toast({
        title: "Invalid input",
        description: "Service name is required",
        variant: "destructive"
      });
      return;
    }

    const invalidSubservice = subservices.find(sub => !sub.name.trim());
    if (invalidSubservice) {
      toast({
        title: "Invalid input",
        description: "All subservice names are required",
        variant: "destructive"
      });
      return;
    }

    try {
      // Make sure all required fields have valid values before submission
      const cleanedSubservices = subservices.map(sub => ({
        ...sub,
        basePrice: sub.basePrice || 0,
        priceUnit: sub.priceUnit || "",
        items: sub.items.map(item => ({
          ...item,
          standardPrice: typeof item.standardPrice === 'number' ? item.standardPrice : 0,
          expressPrice: typeof item.expressPrice === 'number' ? item.expressPrice : 0
        }))
      }));
      
      onAddService(serviceName, cleanedSubservices);
      resetForm();
    } catch (error) {
      console.error("Error saving service:", error);
      toast({
        title: "Error",
        description: "Failed to add service. Please check all fields and try again.",
        variant: "destructive"
      });
    }
  };

  const resetForm = () => {
    setServiceName("");
    setSelectedService("");
    setSubservices([{ name: "", basePrice: 0, priceUnit: "", items: [], enabled: true }]);
    setActiveSubserviceIndex(null);
    setNewItem({
      name: "",
      standardPrice: 0,
      expressPrice: 0
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold text-blue-600">
            Add Service
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div>
            <Label htmlFor="service-name">Service Name</Label>
            <div className="flex space-x-2 mt-1">
              <Input
                id="service-name"
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
                placeholder="Enter service name"
                className="flex-1"
              />
              <Select onValueChange={handleServiceSelect} value={selectedService}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Or select existing" />
                </SelectTrigger>
                <SelectContent>
                  {existingServices.map((service) => (
                    <SelectItem key={service.id} value={service.id}>
                      {service.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>Sub Services</Label>
            <div className="space-y-4 mt-2">
              {subservices.map((subservice, index) => (
                <SubserviceForm
                  key={index}
                  subservice={subservice}
                  index={index}
                  activeSubserviceIndex={activeSubserviceIndex}
                  selectedService={selectedService}
                  existingServices={existingServices}
                  newItem={newItem}
                  onSubserviceSelect={handleSubserviceSelect}
                  onSubserviceChange={handleSubserviceChange}
                  onToggleItemsPanel={handleToggleItemsPanel}
                  onRemoveSubservice={handleRemoveSubservice}
                  onNewItemChange={handleNewItemChange}
                  onAddItem={handleAddItem}
                  onRemoveItem={handleRemoveItem}
                />
              ))}
            </div>

            <Button
              type="button"
              onClick={handleAddSubservice}
              variant="outline"
              className="mt-4 text-blue-600 bg-blue-50 hover:bg-blue-100 border-blue-200"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Sub Service
            </Button>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" onClick={resetForm}>Cancel</Button>
          </DialogClose>
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddServiceModal;
