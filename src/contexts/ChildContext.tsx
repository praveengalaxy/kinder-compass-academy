
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

export interface Child {
  id: string;
  first_name: string;
  last_name: string;
  age: number | null;
  grade_id: number | null;
  parent_id: string;
  created_at: string;
  updated_at: string;
}

interface ChildContextType {
  children: Child[];
  activeChild: Child | null;
  isLoading: boolean;
  setActiveChild: (child: Child) => void;
  addChild: (childData: Partial<Child>) => Promise<void>;
  updateChild: (id: string, childData: Partial<Child>) => Promise<void>;
  deleteChild: (id: string) => Promise<void>;
  refreshChildren: () => Promise<void>;
}

const ChildContext = createContext<ChildContextType | undefined>(undefined);

export const ChildProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [childrenList, setChildrenList] = useState<Child[]>([]);
  const [activeChild, setActiveChild] = useState<Child | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Fetch children when the parent authenticates
  useEffect(() => {
    if (isAuthenticated && user) {
      refreshChildren();
    } else {
      setChildrenList([]);
      setActiveChild(null);
      setIsLoading(false);
    }
  }, [isAuthenticated, user]);

  // Set active child when children list changes (if no active child)
  useEffect(() => {
    if (childrenList.length > 0 && !activeChild) {
      setActiveChild(childrenList[0]);
    } else if (childrenList.length === 0) {
      setActiveChild(null);
    } else if (activeChild && !childrenList.find(child => child.id === activeChild.id)) {
      // If active child was removed, select the first child
      setActiveChild(childrenList[0]);
    }
  }, [childrenList]);

  // Navigate to the active child's page when it changes
  useEffect(() => {
    if (activeChild && isAuthenticated) {
      navigate(`/children/${activeChild.id}`);
    }
  }, [activeChild, isAuthenticated]);

  const refreshChildren = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('children')
        .select('*')
        .eq('parent_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setChildrenList(data || []);
    } catch (error) {
      console.error('Error fetching children:', error);
      toast({
        title: 'Failed to fetch children',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addChild = async (childData: Partial<Child>) => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('children')
        .insert({
          ...childData,
          parent_id: user.id,
        })
        .select()
        .single();
      
      if (error) throw error;
      
      setChildrenList(prevChildren => [data, ...prevChildren]);
      toast({
        title: 'Child added',
        description: `${childData.first_name} was added successfully.`,
      });

      // Set as active child if it's the first child
      if (childrenList.length === 0) {
        setActiveChild(data);
      }
    } catch (error: any) {
      console.error('Error adding child:', error);
      toast({
        title: 'Failed to add child',
        description: error.message || 'Please try again later.',
        variant: 'destructive',
      });
    }
  };

  const updateChild = async (id: string, childData: Partial<Child>) => {
    try {
      const { data, error } = await supabase
        .from('children')
        .update(childData)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      
      setChildrenList(prevChildren => 
        prevChildren.map(child => child.id === id ? data : child)
      );

      // Update active child if it's the one being modified
      if (activeChild && activeChild.id === id) {
        setActiveChild(data);
      }

      toast({
        title: 'Child updated',
        description: `${data.first_name}'s information was updated successfully.`,
      });
    } catch (error: any) {
      console.error('Error updating child:', error);
      toast({
        title: 'Failed to update child',
        description: error.message || 'Please try again later.',
        variant: 'destructive',
      });
    }
  };

  const deleteChild = async (id: string) => {
    try {
      const { error } = await supabase
        .from('children')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setChildrenList(prevChildren => 
        prevChildren.filter(child => child.id !== id)
      );

      toast({
        title: 'Child removed',
        description: 'The child was removed successfully.',
      });

      // If the active child is deleted, setActiveChild will handle selecting another child in useEffect
    } catch (error: any) {
      console.error('Error deleting child:', error);
      toast({
        title: 'Failed to remove child',
        description: error.message || 'Please try again later.',
        variant: 'destructive',
      });
    }
  };

  const value = {
    children: childrenList,
    activeChild,
    isLoading,
    setActiveChild,
    addChild,
    updateChild,
    deleteChild,
    refreshChildren,
  };

  return <ChildContext.Provider value={value}>{children}</ChildContext.Provider>;
};

export const useChild = () => {
  const context = useContext(ChildContext);
  if (context === undefined) {
    throw new Error('useChild must be used within a ChildProvider');
  }
  return context;
};
