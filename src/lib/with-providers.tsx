type Component = React.ComponentType<any>;

type Provider = Component | [Component, Record<string, any>];

export function withProviders<T extends Component>(Component: T) {
  return (...providers: Provider[]) => {
    return (props: React.ComponentProps<T>) => {
      return providers.reduceRight(
        (acc, Provider) => {
          // Handle providers passed as an array [Provider, props]
          if (Array.isArray(Provider)) {
            const [ActualProvider, providerProps] = Provider;
            return <ActualProvider {...providerProps}> {acc} </ActualProvider>;
          }

          // Handle standard providers passed without props
          return <Provider>{acc} </Provider>;
        },
        <Component {...props} />,
      );
    };
  };
}
