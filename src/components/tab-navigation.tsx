type TabNavigationProps<Value extends string> = {
  label: string;
  items: readonly { value: Value; label: string; href: string }[];
  activeValue: Value;
  className?: string;
};

export function TabNavigation<Value extends string>({
  label,
  items,
  activeValue,
  className,
}: TabNavigationProps<Value>) {
  return (
    <nav aria-label={label} className={className}>
      <ul className="tab-list">
        {items.map((item) => (
          <li key={item.value}>
            <a
              className="tab-link"
              href={item.href}
              aria-current={item.value === activeValue ? "page" : undefined}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
