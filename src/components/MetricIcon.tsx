'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWallet,
  faCartShopping,
  faPiggyBank,
  faFaceSmile,
  faTriangleExclamation,
  faCreditCard,
  faQuestion,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

const iconMap: Record<string, IconDefinition> = {
  wallet: faWallet,
  'cart-shopping': faCartShopping,
  'piggy-bank': faPiggyBank,
  'face-smile': faFaceSmile,
  'triangle-exclamation': faTriangleExclamation,
  'credit-card': faCreditCard,
};

interface MetricIconProps {
  icon: string;
  className?: string;
  'aria-label'?: string;
}

export function MetricIcon({ icon, className = '', 'aria-label': ariaLabel }: MetricIconProps) {
  const iconDefinition = iconMap[icon] || faQuestion;

  return (
    <FontAwesomeIcon
      icon={iconDefinition}
      className={className}
      aria-label={ariaLabel}
      role="img"
    />
  );
}
