import React from 'react';

import classes from './Contact.scss';

const contact = () => (
    <ul className={classes.Contact}>
        <li className="mb-1">IQ-Help Kft.</li>
        <li className="mb-1 page-footer__info-text"><a href="http://www.tutibebiszitter.hu" target="_blank" rel="noreferrer">www.tutibebiszitter.hu</a> - bébiszitter keresés
            országosan
        </li>
        <li><i className="fa fa-home mt-3 mr-2" aria-hidden="true" />1204 Budapest, Eperjes u. 52.</li>
        <li><i className="fa fa-phone-square mt-2 mr-2" aria-hidden="true" />06-70/251-0077</li>
        <li><i className="fa fa-at mt-2 mr-2" aria-hidden="true" />info@tutibebiszitter.hu</li>
        <li><i className="fa fa-id-card-o mt-2 mr-2" aria-hidden="true" />24097868-1-43</li>
        <li><i className="fa fa-balance-scale mt-2 mr-2" aria-hidden="true" />CG. 01-09-990328
        </li>
        <li><i className="fa fa-university mt-2 mr-2" aria-hidden="true" />OTP Bank,
            11705998-21300154
        </li>
        <li>
            <a href="" target="_blank">
                <i className="fa fa-clipboard mt-3 mr-2" aria-hidden="true" /> Adatkezelési tájékoztató
            </a>
        </li>
        <li>
            <a href="" target="_blank">
                <i className="fa fa-book mt-3 mb-4 mr-2" aria-hidden="true" />Általános Szerződési Feltételek
            </a>
        </li>
    </ul>
);

export default contact;