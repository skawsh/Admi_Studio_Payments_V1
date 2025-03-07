
import React from 'react';
import { Service } from '@/types/serviceTypes';
import { useToast } from '@/hooks/use-toast';
import ServiceSection from './ServiceSection';
import SubserviceSection from './SubserviceSection';
import ClothingItemSection from './ClothingItemSection';

interface ServicesSectionsProps {
  services: Service[];
  searchTerm: string;
  onAddItem: (serviceId: string, subserviceId: string, item: any) => void;
  onToggleService: (serviceId: string) => void;
  onToggleSubservice: (serviceId: string, subserviceId: string) => void;
}

const ServicesSections: React.FC<ServicesSectionsProps> = ({
  services,
  searchTerm,
  onAddItem,
  onToggleService,
  onToggleSubservice
}) => {
  const { toast } = useToast();
  const [expandedServices, setExpandedServices] = React.useState<Record<string, boolean>>({});
  const [expandedSubservices, setExpandedSubservices] = React.useState<Record<string, boolean>>({});

  // Filter services, subservices, and items based on search term
  const filteredServices = React.useMemo(() => {
    if (!searchTerm) return services;

    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    
    return services.filter(service => {
      // Check if service name matches
      const serviceMatches = service.name.toLowerCase().includes(lowerCaseSearchTerm);
      
      // Check if any subservice matches
      const subserviceMatches = service.subservices.some(sub => 
        sub.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        // Check if any clothing item matches
        sub.items.some(item => item.name.toLowerCase().includes(lowerCaseSearchTerm))
      );
      
      return serviceMatches || subserviceMatches;
    });
  }, [services, searchTerm]);

  const toggleServiceExpand = (serviceId: string) => {
    setExpandedServices(prev => ({...prev, [serviceId]: !prev[serviceId]}));
  };

  const toggleSubserviceExpand = (subserviceId: string) => {
    setExpandedSubservices(prev => ({...prev, [subserviceId]: !prev[subserviceId]}));
  };

  const handleEditService = (serviceId: string) => {
    toast({
      title: "Coming Soon",
      description: "Edit service functionality will be implemented soon.",
      duration: 3000,
    });
  };

  const handleDeleteService = (serviceId: string) => {
    toast({
      title: "Coming Soon",
      description: "Delete service functionality will be implemented soon.",
      duration: 3000,
    });
  };

  const handleAddSubservice = (serviceId: string) => {
    toast({
      title: "Coming Soon",
      description: "Add subservice functionality will be implemented soon.",
      duration: 3000,
    });
  };

  const handleEditSubservice = (subserviceId: string) => {
    toast({
      title: "Coming Soon",
      description: "Edit subservice functionality will be implemented soon.",
      duration: 3000,
    });
  };

  const handleDeleteSubservice = (subserviceId: string) => {
    toast({
      title: "Coming Soon",
      description: "Delete subservice functionality will be implemented soon.",
      duration: 3000,
    });
  };

  if (filteredServices.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 text-center mt-4">
        <p className="text-gray-500">No services found. Try adjusting your search.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 mt-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ServiceSection 
          services={filteredServices}
          expandedServices={expandedServices}
          onToggleService={onToggleService}
          onToggleServiceExpand={toggleServiceExpand}
          onEditService={handleEditService}
          onDeleteService={handleDeleteService}
        />
        
        <SubserviceSection 
          services={filteredServices}
          expandedServices={expandedServices}
          expandedSubservices={expandedSubservices}
          onToggleSubservice={onToggleSubservice}
          onToggleSubserviceExpand={toggleSubserviceExpand}
          onEditSubservice={handleEditSubservice}
          onDeleteSubservice={handleDeleteSubservice}
          onAddSubservice={handleAddSubservice}
        />
        
        <ClothingItemSection 
          services={filteredServices}
          expandedServices={expandedServices}
          expandedSubservices={expandedSubservices}
          onAddItem={onAddItem}
        />
      </div>
    </div>
  );
};

export default ServicesSections;
