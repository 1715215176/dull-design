interface CalendarProps {
    /**
     * 可以这样写属性描述
     * @description       也可以显式加上描述名
     * @description.zh-CN 还支持不同的 locale 后缀来实现多语言描述，使用 description 兜底
     * @default           支持定义默认值
     */
    className?: string;
    visiable: boolean;
    isContinuous: boolean;
    format: 'YYYY-MM-DD' | 'MM-DD';
    closeCalender: () => void;
    onSuccess: (e: any) => any;
}
declare const Calendar: (props: CalendarProps) => JSX.Element;
export default Calendar;
