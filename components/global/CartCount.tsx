function CartCount() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={`Cart, 1 item`}
      className="relative flex h-10 w-10 items-center justify-center rounded-full text-white"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        aria-hidden="true"
        className="h-5 w-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 3h1.386c.51 0 .955.343 1.087.836l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121 0 2.104-.75 2.399-1.83l1.318-4.815a1.125 1.125 0 0 0-1.087-1.405H5.106M7.5 14.25 5.106 5.272M6 18.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
        />
      </svg>

      <span
        key={1}
        aria-hidden="true"
        className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 animate-bump items-center justify-center rounded-full bg-indigo-600 px-1 text-[10px] font-semibold leading-none text-white"
      >
        1
      </span>
    </div>
  );
}

export default CartCount;
