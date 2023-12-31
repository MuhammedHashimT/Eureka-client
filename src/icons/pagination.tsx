interface Props {
    className: string;
  }
export function PageChevronRight(props: Props) {
    return (
      <svg
        className={props.className}
        xmlns="http://www.w3.org/2000/svg"
        height="1em"
        viewBox="0 0 512 512"
      >
        <path d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM241 377c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l87-87-87-87c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L345 239c9.4 9.4 9.4 24.6 0 33.9L241 377z" />
      </svg>
    );
  }
  
  export function PageChevronLeft(props: Props) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="1em"
        viewBox="0 0 512 512"
        className={props.className}
      >
        <path d="M512 256A256 256 0 1 0 0 256a256 256 0 1 0 512 0zM271 135c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-87 87 87 87c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L167 273c-9.4-9.4-9.4-24.6 0-33.9L271 135z" />
      </svg>
    );
  }