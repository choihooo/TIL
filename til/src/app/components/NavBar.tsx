interface NavBarProps {
  author: string;
}

export default function NavBar({ author }: NavBarProps) {
  return (
    <header>
      <div>{author}</div>
    </header>
  );
}
