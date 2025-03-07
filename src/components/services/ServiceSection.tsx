
import React from 'react';
import { Service } from '@/types/serviceTypes';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronRight, Edit, Trash } from 'lucide-react';

interface ServiceSectionProps {
  services: Service[];
  expandedServices: Record<string, boolean>;
  onToggleService: (serviceId: string) => void;
  onToggleServiceExpand: (serviceId: string) => void;
  onEditService: (serviceId: string) => void;
  onDeleteService: (serviceId: string) => void;
}

const ServiceSection: React.FC<ServiceSectionProps> = ({
  services,
  expandedServices,
  onToggleService,
  onToggleServiceExpand,
  onEditService,
  onDeleteService
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h3 className="font-medium text-lg mb-3 border-b pb-2">Services</h3>
      <div className="space-y-2">
        {services.map(service => (
          <div 
            key={service.id} 
            className="border rounded-md p-3 hover:bg-gray-50 cursor-pointer"
            onClick={() => onToggleServiceExpand(service.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {expandedServices[service.id] ? (
                  <ChevronDown className="h-4 w-4 text-gray-400 mr-2" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-gray-400 mr-2" />
                )}
                <span className="font-medium">{service.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id={`enable-service-${service.id}`}
                  checked={service.enabled}
                  onCheckedChange={() => onToggleService(service.id)}
                  className="data-[state=checked]:bg-emerald-500"
                />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditService(service.id);
                  }}
                >
                  <Edit className="h-4 w-4 text-gray-500" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteService(service.id);
                  }}
                >
                  <Trash className="h-4 w-4 text-gray-500" />
                </Button>
              </div>
            </div>
            <div className="mt-1">
              <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                {service.subservices.length} Subservices
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceSection;
