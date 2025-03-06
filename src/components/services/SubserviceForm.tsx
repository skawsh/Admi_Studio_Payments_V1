
import React from "react";
import { ClothingItem, NewClothingItem, Subservice } from "@/types/serviceTypes";
import ClothingItemBadges from "./ClothingItemBadges";
import ClothingItemForm from "./ClothingItemForm";
import SelectSubservice from "./SelectSubservice";
import PriceInputs from "./PriceInputs";
import SubserviceActions from "./SubserviceActions";

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
      <SelectSubservice 
        value={subservice.id || ""}
        onValueChange={(value) => onSubserviceSelect(index, value)}
        selectedService={selectedService}
        existingServices={existingServices}
        index={index}
      />
      
      <div className="mt-3">
        <PriceInputs 
          basePrice={subservice.basePrice}
          priceUnit={subservice.priceUnit}
          onBasePriceChange={(value) => onSubserviceChange(index, "basePrice", value)}
          onPriceUnitChange={(value) => onSubserviceChange(index, "priceUnit", value)}
          index={index}
        />
      </div>
      
      <ClothingItemBadges 
        items={subservice.items}
        onRemoveItem={(itemIndex) => onRemoveItem(index, itemIndex)}
      />
      
      <SubserviceActions 
        onToggleItemsPanel={() => onToggleItemsPanel(index)}
        onRemoveSubservice={() => onRemoveSubservice(index)}
        isActive={activeSubserviceIndex === index}
      />
      
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
