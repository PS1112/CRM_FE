export interface ColourOption {
    readonly value: string;
    readonly label: string;
    readonly color: string;
    readonly isFixed?: boolean;
    readonly isDisabled?: boolean;
  }
  
  export const colourOptions: readonly ColourOption[] = [
    { value: '1', label: 'Ready', color: '#F44336', isFixed: true }, 
    { value: '2', label: 'Call', color: 'Blue' },
    { value: '3', label: 'Demo', color: 'yellow', isFixed: true },
    { value: '4', label: 'Usage', color: 'orange' },
    { value: '5', label: 'Completed', color: '#4CAF50' },
  ];
  
  export interface FlavourOption {
    readonly value: string;
    readonly label: string;
    readonly rating: string;
  }
  
  export const flavourOptions: readonly FlavourOption[] = [
    { value: 'vanilla', label: 'Vanilla', rating: 'safe' },
    { value: 'chocolate', label: 'Chocolate', rating: 'good' },
    { value: 'strawberry', label: 'Strawberry', rating: 'wild' },
    { value: 'salted-caramel', label: 'Salted Caramel', rating: 'crazy' },
  ];
  
  export interface StateOption {
    readonly value: string;
    readonly label: string;
  }
  
  export interface GroupedOption {
    readonly label: string;
    readonly options: readonly ColourOption[] | readonly FlavourOption[];
  }
  
  export const groupedOptions: readonly GroupedOption[] = [
    {
      label: 'Colours',
      options: colourOptions,
    },
    {
      label: 'Flavours',
      options: flavourOptions,
    },
  ];
  