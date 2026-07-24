export function SectionTitle(props: React.PropsWithChildren) {
  return (
    <h2 className="mb-1 border-b-2 border-gray-300 text-base font-bold">
      {props.children}
    </h2>
  );
}
