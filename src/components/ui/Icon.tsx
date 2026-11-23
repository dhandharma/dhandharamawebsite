import {
  Banknote,
  FileText,
  Gem,
  Handshake,
  Landmark,
  Lock,
  MapPin,
  Scale,
  Store,
  Wallet,
  type LucideProps,
} from "lucide-react";

const icons = {
  banknote: Banknote,
  fileText: FileText,
  gem: Gem,
  handshake: Handshake,
  landmark: Landmark,
  lock: Lock,
  mapPin: MapPin,
  scale: Scale,
  store: Store,
  wallet: Wallet,
} as const;

export type IconName = keyof typeof icons;

export function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const Component = icons[name];
  return <Component aria-hidden="true" {...props} />;
}
