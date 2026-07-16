import { cn } from "../cn";
import { type ClassValue } from "clsx";

type ConfigVariants = Record<string, Record<string, ClassValue>>;
type ConfigCompoundVariants<V extends ConfigVariants> = Array<
  {
    [K in keyof V]?: keyof V[K] | boolean | string;
  } & { class: ClassValue }
>;

interface CreateVariantsConfig<V extends ConfigVariants> {
  base?: ClassValue;
  variants?: V;
  defaultVariants?: { [K in keyof V]?: keyof V[K] };
  compoundVariants?: ConfigCompoundVariants<V>;
}

export function createVariants<V extends ConfigVariants>(
  config: CreateVariantsConfig<V>
) {
  return function (props?: { [K in keyof V]?: keyof V[K] | null } & { class?: ClassValue, className?: ClassValue }) {
    const { base, variants, defaultVariants, compoundVariants } = config;

    const getVariantClassNames = () => {
      if (!variants) return [];
      return Object.keys(variants).map((variantName) => {
        const variantProp = props?.[variantName as keyof V];
        const defaultVariantProp = defaultVariants?.[variantName];
        const value = variantProp !== undefined ? variantProp : defaultVariantProp;

        if (value === null || value === undefined) return null;
        return variants[variantName as keyof V]?.[value as keyof V[keyof V]];
      });
    };

    const getCompoundVariantClassNames = () => {
      if (!compoundVariants) return [];
      return compoundVariants.filter((compound) => {
        const { class: _, ...compoundVariantConfig } = compound;
        return Object.entries(compoundVariantConfig).every(
          ([key, value]) => {
            const propValue = props?.[key as keyof V];
            const defaultPropValue = defaultVariants?.[key as keyof V];
            return (propValue !== undefined ? propValue : defaultPropValue) === value;
          }
        );
      }).map(compound => compound.class);
    };

    return cn(
      base,
      ...getVariantClassNames(),
      ...getCompoundVariantClassNames(),
      props?.class,
      props?.className
    );
  };
}
