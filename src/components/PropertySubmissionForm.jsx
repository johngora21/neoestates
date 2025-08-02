import { useState, useEffect } from 'react';
import { MapPin, Upload, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PropertySubmissionForm = ({ isOpen, onClose, propertyType = 'residence' }) => {
  const navigate = useNavigate();

  // Automatically navigate to residential submission page when modal opens
  useEffect(() => {
    if (isOpen) {
      onClose(); // Close the modal
      navigate('/submit/residential'); // Navigate directly to residential submission
    }
  }, [isOpen, onClose, navigate]);

  // This component no longer renders anything since we auto-navigate
  return null;
};

export default PropertySubmissionForm; 