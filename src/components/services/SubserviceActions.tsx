
import React from "react";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Trash } from "lucide-react";

interface SubserviceActionsProps {
  onToggleItemsPanel: () => void;
  onRemoveSubservice: () => void;
  isActive: boolean;
}

const SubserviceActions: React.FC<SubserviceActionsProps> = ({
  onToggleItemsPanel,
  onRemoveSubservice,
  isActive
}) => {
  return (
    <div className="flex gap-2 mt-3">
      <Button
        type="button"
        onClick={onToggleItemsPanel}
        variant="outline"
        className="text-blue-600 border-blue-200 hover:bg-blue-50"
        size="sm"
      >
        <ShoppingBag className="h-4 w-4 mr-1" />
        {isActive ? 'Hide Items' : 'Add Items'}
      </Button>
      
      <Button
        type="button"
        onClick={onRemoveSubservice}
        variant="outline"
        className="border-red-200 text-red-600 hover:bg-red-50"
        size="sm"
      >
        <Trash className="h-4 w-4 mr-1" />
        Remove
      </Button>
    </div>
  );
};

export default SubserviceActions;
