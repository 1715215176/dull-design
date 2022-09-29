---
nav:
    title: 组件
    order: 2
    path: /components
group:
    title: 基本组件
    order: 0
---

## Calendar

Demo:

```tsx
/**
 * title: Calendar\
 */
import React, {useState} from 'react';
import { Calendar, Button } from 'dull-design';
export default () => {
    const [visiable, setVisiable] = useState<boolean>(false)
    return (
        <>
            <Button onClick={() => setVisiable(true)}>从顶部出现</Button>
            <Calendar visiable={visiable} 
                      closeCalender={() => setVisiable(false)}
                      onSuccess={(e) => {console.log(e)}}
                      format="YYYY-MM-DD"
            />
        </>
    )
}

```