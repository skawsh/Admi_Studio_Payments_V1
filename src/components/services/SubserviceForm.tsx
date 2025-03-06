
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash, ShoppingBag } from "lucide-react";
import { ClothingItem, NewClothingItem, Subservice } from "@/types/serviceTypes";
import ClothingItemBadges from "./ClothingItemBadges";
import ClothingItemForm from "./ClothingItemForm";

interface SubServiceFormProps {
  subservice: Omit<Subservice, "id">;
  index: number;
  activeSubserviceIndex: number | null;
  selectedService: string;
  existingServices: any[];
  newItem: NewClothingItem;
  onSubserviceSelect: (index: number, subserviceId: string) => void;
  onSubserviceChange: (index: number, field: "name" | "basePrice" | "priceUnit", value: string | number) => void;
  onToggleItemsPanel: (index: number) => void;
  onRemoveSubservice: (index: number) => void;
  onNewItemChange: (field: keyof NewClothingItem, value: string | number) => void;
  onAddItem: () => void;
  onRemoveItem: (subserviceIndex: number, itemIndex: number) => void;
}

const SubserviceForm: React.FC<SubServiceFormProps> = ({
  subservice,
  index,
  activeSubserviceIndex,
  selectedService,
  existingServices,
  newItem,
  onSubserviceSelect,
  onSubserviceChange,
  onToggleItemsPanel,
  onRemoveSubservice,
  onNewItemChange,
  onAddItem,
  onRemoveItem
}) => {
  return (
    <div className="p-4 border rounded-md">
      <div className="space-y-3">
        <Label htmlFor={`subservice-name-${index}`}>Sub Service Name</Label>
        <Select 
          onValueChange={(value) => onSubserviceSelect(index, value)}
          value={subservice.name}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a subservice" />
          </SelectTrigger>
          <SelectContent>
            {existingServices
              .find(s => s.id === selectedService)
              ?.subservices.map((sub) => (
              <SelectItem key={sub.id} value={sub.id}>
                {sub.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor={`subservice-price-${index}`}>Base Price</Label>
            <Input
              id={`subservice-price-${index}`}
              type="number"
              placeholder="Base Price"
              value={subservice.basePrice}
              onChange={(e) => onSubserviceChange(index, "basePrice", parseFloat(e.target.value) || 0)}
            />
          </div>
          <div>
            <Label htmlFor={`subservice-unit-${index}`}>Price Unit</Label>
            <Input
              id={`subservice-unit-${index}`}
              placeholder="e.g. per kg, per piece"
              value={subservice.priceUnit}
              onChange={(e) => onSubserviceChange(index, "priceUnit", e.target.value)}
            />
          </div>
        </div>
      </div>
      
      <ClothingItemBadges 
        items={subservice.items}
        onRemoveItem={(itemIndex) => onRemoveItem(index, itemIndex)}
      />
      
      <div className="flex gap-2 mt-3">
        <Button
          type="button"
          onClick={() => onToggleItemsPanel(index)}
          variant="outline"
          className="text-blue-600 border-blue-200 hover:bg-blue-50"
          size="sm"
        >
          <ShoppingBag className="h-4 w-4 mr-1" />
          {activeSubserviceIndex === index ? 'Hide Items' : 'Add Items'}
        </Button>
        
        <Button
          type="button"
          onClick={() => onRemoveSubservice(index)}
          variant="outline"
          className="border-red-200 text-red-600 hover:bg-red-50"
          size="sm"
        >
          <Trash className="h-4 w-4 mr-1" />
          Remove
        </Button>
      </div>
      
      {activeSubserviceIndex === index && (
        <ClothingItemForm
          newItem={newItem}
          onItemChange={onNewItemChange}
          onAddItem={onAddItem}
          index={index}
        />
      )}
    </div>
  );
};

export default SubserviceForm;
