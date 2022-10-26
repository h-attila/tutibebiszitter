import React from 'react';

import Aux from '../../../hoc/Aux';
import Link from '../Link/Link';

const newMembers = (props) => {
    let newMembers = null;
    if (props.newMembers) {
        newMembers = props.newMembers.map(member => {
            return (<li key={member.id}><Link name={member.name} to={member.url}/></li>)
        });
    }

    return (
        <ul>
            {newMembers}
        </ul>
    );
}

export default newMembers;