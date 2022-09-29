import { ButtonHTMLAttributes } from 'react';
declare type btnType = 'permary' | 'ban';
interface BtnProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
    type: btnType;
    nativeType: ButtonHTMLAttributes<HTMLButtonElement>['type'];
}
declare const Button: (props: BtnProps) => JSX.Element;
export default Button;
