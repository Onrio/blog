export const PageContainer: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return <main className={'root'}>{children}</main>;
};
