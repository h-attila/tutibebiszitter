import React from 'react';

import Contact from './Contact/Contact';
import Facebook from './Facebook/Facebook';
import classes from './Footer.scss';
import NewMembers from "./NewMembers/NewMembers";
import Pages from './Pages/Pages';

const footer = (props) => {
    const y = new Date().getFullYear();

    return (
        <section className={[classes.Footer, "w-100"].join(' ')}>

            <div className={classes.LightBox}/>

            <div className={classes.LinkBox}>
                <div className="container text-center text-md-left pt-3">
                    <div className="row">

                        <div className="col-md-6 col-lg-6 col-xl-3 mx-auto mb-4 mt-1">
                            <h6 className="text-uppercase"><strong>Legújabb bébiszitterek</strong></h6>
                            <hr className="accent-2 mb-2 mt-0 d-inline-block mx-auto w-50"/>

                            <NewMembers newMembers={props.newMembers}/>

                        </div>

                        <div className="col-md-6 col-lg-6 col-xl-3 mx-auto mb-4 mt-1">

                            <h6 className="text-uppercase"><strong>Oldalak</strong></h6>
                            <hr className="accent-2 mb-2 mt-0 d-inline-block mx-auto w-50"/>

                            <Pages/>

                        </div>

                        <div className="col-md-6 col-lg-6 col-xl-3 mx-auto mb-4 mt-1">
                            <h6 className="text-uppercase"><strong>Elérhetőség</strong></h6>
                            <hr className="accent-2 mb-2 mt-0 d-inline-block mx-auto w-50"/>

                            <Contact/>

                        </div>

                        {/*<div className="col-md-6 col-lg-6 col-xl-3 mx-auto mb-4 mt-1">*/}
                        {/*    <div className="fb-page" data-href="https://www.facebook.com/tutibebiszitter" data-tabs="timeline" data-width="" data-height="350"*/}
                        {/*         data-small-header="true" data-adapt-container-width="true" data-hide-cover="true" data-show-facepile="true">*/}
                        {/*        <blockquote cite="https://www.facebook.com/tutibebiszitter" className="fb-xfbml-parse-ignore"><a*/}
                        {/*            href="https://www.facebook.com/tutibebiszitter">TUTI bébiszitter-közvetítő</a></blockquote>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                    </div>

                </div>
            </div>

            <div className={[classes.Copyright, "text-center py-3"].join(' ')}>
                <p className="mb-0">
                    © {y} <a href="http://www.tutibebiszitter.hu" target="_blank" className="mr-1 ml-1" rel="noreferrer">www.tutibebiszitter.hu</a>
                    - minden jog fenntartva
                </p>
            </div>
        </section>
    );
};

export default footer;