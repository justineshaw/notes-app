import React from 'react';

const List = props => {
    const listItems = props.items.map(obj =>
        <tr key={obj.id}>
            <th>{obj.message}</th>
        </tr>
    );

    return (
        <table style={{ width: "100%" }}>
            <thead>
                <tr>
                    <th>Note</th>
                </tr>
            </thead >
            <tbody>
                {listItems}
            </tbody>

        </table>
    )
}

export default List;