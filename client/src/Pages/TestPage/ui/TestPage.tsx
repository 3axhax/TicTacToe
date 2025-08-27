import React, {memo, useCallback, useRef, useState} from "react";

interface IData {
    id: number;
    name: string;
    value: number;
}

const data: IData[] = [];

for (let i = 0; i < 1000; i++) {
    data.push({
        id: i,
        name: `Item ${i}`,
        value: 0,
    });
}

export const ArrayTest = () => {
    const [items, setItems] = useState(data);

    const IncrementValue = useCallback((id: number)=> {
        setItems((items) => {
            const newItems = [...items];
            const index = newItems.findIndex((i) => i.id === id);
            newItems[index].value += 1;
            return newItems;
        });
    }, []);

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <ul style={{ listStyle: "none" }}>
                <li>Добавь счетчик ререндеров для каждого элемента</li>
                <li>Сделай так, чтобы элементы ререндерились по одному</li>
            </ul>
            {items.map((item) => (
                <Item
                    key={item.id}
                    name={item.name}
                    value={item.value}
                    id={item.id}
                    onChange={IncrementValue}
                />
            ))}
        </div>
    );
};

const Item = memo((props: {
    name: string;
    value: number;
    id: number;
    onChange: (id: number) => void;
}) => {

    const rerender = useRef(0)

    rerender.current++;

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: 300,
            }}
        >
            <div>{props.name}</div>
            <div>{props.value}</div>
            <div>Rerenders count: {rerender.current}</div>
            <button
                onClick={() =>
                    props.onChange(props.id)
                }
            >
                +
            </button>
        </div>
    );
})




export default ArrayTest;
