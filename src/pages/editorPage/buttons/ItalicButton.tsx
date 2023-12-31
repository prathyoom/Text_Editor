export const ItalicButton = ({ className }: { className: string }) => {
  return (
    <svg
      className={className}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 14 16">
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="m3.874 15 6.143-14M1 15h6.33M6.67 1H13"
      />
    </svg>
  );
};
