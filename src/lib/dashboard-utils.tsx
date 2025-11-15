import React from 'react';
import {
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaTwitter,
  FaEye,
  FaCheckCircle,
  FaSpinner,
  FaExclamationTriangle,
  FaClock,
} from 'react-icons/fa';

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('fa-IR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}

export function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('fa-IR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export function getPlatformFromService(service: string): string {
  const lowerService = service.toLowerCase();
  if (lowerService.includes('instagram') || lowerService.includes('اینستاگرام')) return 'instagram';
  if (lowerService.includes('tiktok') || lowerService.includes('تیک تاک')) return 'tiktok';
  if (lowerService.includes('youtube') || lowerService.includes('یوتیوب')) return 'youtube';
  if (lowerService.includes('twitter') || lowerService.includes('توییتر')) return 'twitter';
  return 'other';
}

export function getPlatformIcon(service: string): React.ReactElement {
  const platform = getPlatformFromService(service);
  switch (platform) {
    case 'instagram':
      return <FaInstagram className="text-pink-500" />;
    case 'tiktok':
      return <FaTiktok className="text-black" />;
    case 'youtube':
      return <FaYoutube className="text-red-500" />;
    case 'twitter':
      return <FaTwitter className="text-blue-400" />;
    default:
      return <FaEye />;
  }
}

export function getStatusIcon(status: string): React.ReactElement {
  switch (status) {
    case 'completed':
      return <FaCheckCircle className="text-green-600" />;
    case 'in_progress':
    case 'processing':
      return <FaSpinner className="animate-spin text-blue-600" />;
    case 'pending':
      return <FaClock className="text-amber-600" />;
    case 'cancelled':
    case 'refunded':
      return <FaExclamationTriangle className="text-red-600" />;
    default:
      return <FaExclamationTriangle className="text-gray-600" />;
  }
}
