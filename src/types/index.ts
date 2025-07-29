import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface User {
  uid: string;
  email: string;
  username: string;
  displayName?: string;
}

export interface Gift {
  id: string;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  link?: string;
  isPurchased?: boolean;
  purchasedBy?: string;
  purchasedAt?: Date;
  createdAt?: any; // Firestore Timestamp
  updatedAt?: any; // Firestore Timestamp
}

export interface UserProfile {
  uid: string;
  username: string;
  displayName: string;
  email: string;
  bio?: string;
  profileImage?: string;
  gifts: Gift[];
  createdAt: Date;
  updatedAt: Date;
}
