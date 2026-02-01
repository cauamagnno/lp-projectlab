
export interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface DifferentialCardProps {
  title: string;
  subtitle: string;
  description: string;
  practicalResult: string;
  icon: React.ReactNode;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
