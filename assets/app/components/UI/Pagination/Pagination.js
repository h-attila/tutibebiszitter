import React from 'react';

import Item from './Item/Item';

const pagination = (props) => {
    if (!props.max || !props.current) {return('')}

    const pages = Math.ceil(props.max / props.limit);
    const prev = props.current <= 1 ? 'page-item disabled' : 'page-item';
    const next = props.current === props.max ? 'page-item disabled' : 'page-item';
    let pagination = [];

    for (let i=1; i <= pages; i++) {
        pagination.push(
            <Item active={i===props.current} current={i} key={i} />
        );
    }

    return (
        <nav>
            <ul className="pagination">
                <li className={prev}>
                    <a className="page-link" href="#" tabIndex="-1" aria-disabled="true">«</a>
                </li>
                {pagination}
                <li className={next}>
                    <a className="page-link" href="#">»</a>
                </li>
            </ul>
        </nav>
    )
}

export default pagination;