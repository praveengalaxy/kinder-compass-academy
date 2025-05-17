
import React from 'react';
import { useChild, Child } from '@/contexts/ChildContext';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Check, ChevronDown, User, PlusCircle } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
} from '@/components/ui/dialog';
import AddChildForm from './AddChildForm';

interface ChildSelectorProps {
  className?: string;
}

const ChildSelector: React.FC<ChildSelectorProps> = ({ className }) => {
  const { children, activeChild, setActiveChild } = useChild();
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleAddChildSuccess = () => {
    setDialogOpen(false);
  };
  
  if (children.length === 0) {
    return (
      <Dialog open={dialogOpen || true} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className={className}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Your First Child
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Child</DialogTitle>
          </DialogHeader>
          <AddChildForm onSuccess={handleAddChildSuccess} />
        </DialogContent>
      </Dialog>
    );
  }
  
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>{activeChild ? `${activeChild.first_name} ${activeChild.last_name}` : 'Select Child'}</span>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          {children.map((child) => (
            <DropdownMenuItem 
              key={child.id}
              onClick={() => setActiveChild(child)}
              className="flex items-center justify-between"
            >
              <span>{child.first_name} {child.last_name}</span>
              {activeChild && activeChild.id === child.id && (
                <Check className="h-4 w-4" />
              )}
            </DropdownMenuItem>
          ))}
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Child
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Child</DialogTitle>
              </DialogHeader>
              <AddChildForm onSuccess={handleAddChildSuccess} />
            </DialogContent>
          </Dialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ChildSelector;
