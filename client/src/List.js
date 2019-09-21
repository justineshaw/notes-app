import React from 'react';

const List = props => {
    const listItems = props.items.map(obj =>
        <li key={obj.id}>{obj.message}</li>
    );

    return (
        <ul>{listItems}</ul>
    )
}

export default List;