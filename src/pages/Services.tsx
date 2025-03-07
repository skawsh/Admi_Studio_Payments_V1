
import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { mockServices } from '@/data/mockServiceData';
import ServicesSections from '@/components/services/ServicesSections';
import SearchBox from '@/components/services/SearchBox';
import AddServiceModal from '@/components/services/AddServiceModal';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import PageHeader from '@/components/ui/PageHeader';
import { Service, Subservice } from '@/types/serviceTypes';
import { Plus } from 'lucide-react';
import { 
  addServiceToStudio, 
  addSubserviceToService,
  toggleServiceEnabled,
  toggleSubserviceEnabled
} from '@/data/mockServiceData';

const Services: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [addServiceModalOpen, setAddServiceModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [services, setServices] = useState<Service[]>(mockServices);

  const handleAddService = () => {
    setAddServiceModalOpen(true);
  };

  const handleAddServiceSubmit = (serviceName: string, subservices: Omit<Subservice, "id">[]) => {
    try {
      // For global services, we'll use a dummy studioId since the mockServiceData API requires it
      const dummyStudioId = "global";
      const newService = addServiceToStudio(dummyStudioId, {
        name: serviceName,
        subservices: [],
        enabled: true
      });
      
      subservices.forEach(subservice => {
        addSubserviceToService(dummyStudioId, newService.id, subservice);
      });

      toast({
        title: "Success",
        description: "Service added successfully",
        duration: 3000,
      });
      
      setServices([...mockServices]);
      setRefreshKey(prev => prev + 1);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add service",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const handleAddItem = (serviceId: string, subserviceId: string, newItem: any) => {
    // Placeholder for the interface, but functionality not needed now
    toast({
      title: "Coming Soon",
      description: "Add item functionality will be implemented soon.",
      duration: 3000,
    });
  };

  const handleToggleService = (serviceId: string) => {
    try {
      // For global services, we'll use a dummy studioId
      const dummyStudioId = "global";
      toggleServiceEnabled(dummyStudioId, serviceId);
      
      toast({
        title: "Success",
        description: "Service status updated",
        duration: 3000,
      });
      
      setServices([...mockServices]);
      setRefreshKey(prev => prev + 1);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update service status",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const handleToggleSubservice = (serviceId: string, subserviceId: string) => {
    try {
      // For global services, we'll use a dummy studioId
      const dummyStudioId = "global";
      toggleSubserviceEnabled(dummyStudioId, serviceId, subserviceId);
      
      toast({
        title: "Success",
        description: "Subservice status updated",
        duration: 3000,
      });
      
      setServices([...mockServices]);
      setRefreshKey(prev => prev + 1);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update subservice status",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <PageHeader
          title="Services Management"
          subtitle="Manage all laundry services and subservices available in the system"
        >
          <Button onClick={handleAddService} variant="service">
            <Plus className="h-4 w-4 mr-1" />
            Add Service
          </Button>
        </PageHeader>

        <div className="mt-6">
          <SearchBox 
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search services, subservices or items..."
          />
          
          <ServicesSections 
            key={refreshKey}
            services={services}
            searchTerm={searchTerm}
            onAddItem={handleAddItem}
            onToggleService={handleToggleService}
            onToggleSubservice={handleToggleSubservice}
          />
        </div>
      </div>

      <AddServiceModal 
        isOpen={addServiceModalOpen}
        onClose={() => setAddServiceModalOpen(false)}
        onAddService={handleAddServiceSubmit}
      />
    </AdminLayout>
  );
};

export default Services;
