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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash, ShoppingBag } from "lucide-react";
import { Subservice, NewClothingItem, ClothingItem } from "@/types/serviceTypes";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

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
  const [serviceName, setServiceName] = useState("");
  const [subservices, setSubservices] = useState<Array<Omit<Subservice, "id">>>(
    [{ name: "", basePrice: 0, priceUnit: "per piece", items: [], enabled: true }]
  );
  const [activeSubserviceIndex, setActiveSubserviceIndex] = useState<number | null>(null);
  const [newItem, setNewItem] = useState<NewClothingItem>({
    name: "",
    standardPrice: 0,
    expressPrice: 0
  });
  const { toast } = useToast();

  const handleAddSubservice = () => {
    setSubservices([...subservices, { name: "", basePrice: 0, priceUnit: "per piece", items: [], enabled: true }]);
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

    onAddService(serviceName, subservices);
    resetForm();
  };

  const resetForm = () => {
    setServiceName("");
    setSubservices([{ name: "", basePrice: 0, priceUnit: "per piece", items: [], enabled: true }]);
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
            <Input
              id="service-name"
              placeholder="Service Name"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label>Sub Services</Label>
            <div className="space-y-4 mt-2">
              {subservices.map((subservice, index) => (
                <div key={index} className="p-4 border rounded-md">
                  <div className="space-y-3">
                    <Label htmlFor={`subservice-name-${index}`}>Sub Service Name</Label>
                    <Input
                      id={`subservice-name-${index}`}
                      placeholder="Sub service name"
                      value={subservice.name}
                      onChange={(e) => handleSubserviceChange(index, "name", e.target.value)}
                    />
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor={`subservice-price-${index}`}>Base Price</Label>
                        <Input
                          id={`subservice-price-${index}`}
                          type="number"
                          placeholder="Base Price"
                          value={subservice.basePrice}
                          onChange={(e) => handleSubserviceChange(index, "basePrice", parseFloat(e.target.value) || 0)}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`subservice-unit-${index}`}>Price Unit</Label>
                        <Input
                          id={`subservice-unit-${index}`}
                          placeholder="e.g. per kg, per piece"
                          value={subservice.priceUnit}
                          onChange={(e) => handleSubserviceChange(index, "priceUnit", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  
                  {subservice.items.length > 0 && (
                    <div className="mt-3 pt-3 border-t">
                      <Label className="mb-2 block">Clothing Items</Label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {subservice.items.map((item, itemIndex) => (
                          <Badge 
                            key={itemIndex} 
                            className="bg-blue-50 text-blue-700 hover:bg-blue-100 flex items-center gap-1"
                          >
                            <span>{item.name}</span>
                            <button 
                              onClick={() => handleRemoveItem(index, itemIndex)}
                              className="ml-1 text-blue-400 hover:text-blue-600"
                            >
                              <Trash className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex gap-2 mt-3">
                    <Button
                      type="button"
                      onClick={() => handleToggleItemsPanel(index)}
                      variant="outline"
                      className="text-blue-600 border-blue-200 hover:bg-blue-50"
                      size="sm"
                    >
                      <ShoppingBag className="h-4 w-4 mr-1" />
                      {activeSubserviceIndex === index ? 'Hide Items' : 'Add Items'}
                    </Button>
                    
                    <Button
                      type="button"
                      onClick={() => handleRemoveSubservice(index)}
                      variant="outline"
                      className="border-red-200 text-red-600 hover:bg-red-50"
                      size="sm"
                    >
                      <Trash className="h-4 w-4 mr-1" />
                      Remove
                    </Button>
                  </div>
                  
                  {activeSubserviceIndex === index && (
                    <div className="mt-3 pt-3 border-t space-y-3">
                      <h4 className="font-medium text-sm text-gray-700">Add Clothing Item</h4>
                      <div>
                        <Label htmlFor={`item-name-${index}`}>Item Name</Label>
                        <Input
                          id={`item-name-${index}`}
                          placeholder="Item name"
                          value={newItem.name}
                          onChange={(e) => handleNewItemChange("name", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label htmlFor={`standard-price-${index}`}>Standard Price</Label>
                          <Input
                            id={`standard-price-${index}`}
                            type="number"
                            placeholder="Standard Price"
                            value={newItem.standardPrice}
                            onChange={(e) => handleNewItemChange("standardPrice", parseFloat(e.target.value) || 0)}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`express-price-${index}`}>Express Price</Label>
                          <Input
                            id={`express-price-${index}`}
                            type="number"
                            placeholder="Express Price"
                            value={newItem.expressPrice}
                            onChange={(e) => handleNewItemChange("expressPrice", parseFloat(e.target.value) || 0)}
                            className="mt-1"
                          />
                        </div>
                      </div>
                      
                      <Button
                        type="button"
                        onClick={handleAddItem}
                        variant="outline"
                        className="w-full text-blue-600 bg-blue-50 hover:bg-blue-100 border-blue-200"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add Item
                      </Button>
                    </div>
                  )}
                </div>
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
