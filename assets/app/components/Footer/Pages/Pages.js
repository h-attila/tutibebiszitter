import React from 'react';

import Link from '../Link/Link';

const pages = () => (
    <ul>
        <li><Link to="/" name="Kezdőlap" /></li>
        <li><Link to="/bebiszittert-keresek" name="Bébiszittert keresek" /></li>
        <li><Link to="/bebiszitter-vagyok" name="Bébiszitter vagyok" /></li>
        <li><Link to="/hasznos-infok" name="Hasznos infók" /></li>
        <li><Link to="/kapcsolat" name="Kapcsolat" /></li>
    </ul>
);

export default pages;