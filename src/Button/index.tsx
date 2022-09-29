import * as React from 'react';
import { ButtonHTMLAttributes } from 'react';
import style from "./index.less"

type btnType = 'permary' | 'ban';

interface BtnProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement> ,'type'> {
  type: btnType;
  nativeType: ButtonHTMLAttributes<HTMLButtonElement>['type']
}


const Button = (props: BtnProps) => {
  const { type, nativeType, ...rest } = props
  const selfType = props.type || 'permary';  
  return <button className={selfType === 'permary' ? style.dull_main_btn : style.dull_ban_btn} {...rest} type={nativeType}></button>;
};

export default Button