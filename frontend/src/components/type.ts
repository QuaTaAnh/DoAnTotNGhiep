export interface ButtonProps {
  to?: string;
  children: React.ReactNode;
  href?: string;
  leftIcon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  activeClassName?: string;
  exact?: boolean;
}

export interface IModal {
  children: React.ReactNode;
  isOpen: boolean;
  onRequestClose: () => void;
}

export interface ILogin {
  isOpen: boolean;
  onRequestClose: () => void;
}
