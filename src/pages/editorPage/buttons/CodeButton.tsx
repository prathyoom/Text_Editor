export const CodeButton = ({ className }: { className: string }) => {
  return (
    <svg
      className={className}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 20 16">
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M5 4 1 8l4 4m10-8 4 4-4 4M11 1 9 15"
      />
    </svg>
  );
};
