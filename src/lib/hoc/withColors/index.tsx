export default 1;

// import React from "react";
// import styled from "styled-components";
// import {
//   PalleteColor,
//   PalleteColorWithOptions,
//   changeColorLightness,
//   colors
// } from "../../styles/colors";

// type ColorProp = PalleteColor | PalleteColorWithOptions;

// type Props = {
//   bg?: string;
//   // color?: string;
//   // bgHover?: string;
//   // colorHover?: string;
// };

// function withColors<TProps>(
//   Component: React.ComponentType<TProps>
// ): React.ComponentType<TProps & Props> {
//   const ColoredComponent: React.ComponentType<TProps & Props> = props => {
//     const { bg, ...componentProps } = props;
//     const ComponentWithAdddedColors = styled(Component)`
//       ${bg && `background: ${bg};`}
//     `;

//     return <ComponentWithAdddedColors {...componentProps} />;
//   };

//   return ColoredComponent;
// }

// // // const propToColor = (prop: ColorProp): string => {
// // //   if (typeof prop === "string") return colors[prop];
// // //   return changeColorLightness(prop.lightness, prop.color);
// // // };

// // // const withStyles = (WrappedComponent: React.ComponentType) => styled(WrappedComponent)`
// // //   color: ${props => props.x === 'abc' ? 'red' : 'black'};
// // // `

// // // function withColors<TProps>(
// // //   Component: React.ComponentType<TProps>
// // // ): React.ComponentType<TProps> {
// // //   const ColoredComponent = styled(Component)`
// // //     ${(props: Props) => props.bg && `background: ${props.bg};`}
// // //     ${(props: Props) => props.color && `color: ${props.color};`}
// // //   `;

// // //   return (props: TProps) => <ColoredComponent {...props} />;
// // // }

// // // const withColors = <P extends object>(Component: React.ComponentType<P>) =>
// // //   class WithColors extends React.Component<P & Props> {
// // //     render() {
// // //       const { bg, color, bgHover, colorHover, ...props } = this.props;

// // //       const ColoredWrapper = styled(Component)`
// // //         ${bg && `background: ${propToColor("red")};`}
// // //         ${color && `color: ${propToColor("red")};`}

// // //       &:hover {
// // //           ${bgHover && `background: ${propToColor("blue")};`}
// // //           ${colorHover && `color: ${propToColor("blue")};`}
// // //         }
// // //       `;
// // //       return <ColoredWrapper {...props as P} />;
// // //     }
// // //   };
